import {mkdir, writeFile, stat} from "node:fs/promises";
import {join} from "node:path";

// Demo photography is bundled at build time and served from this site's own
// /media/ path; client browsers never need to reach Unsplash directly.
const originals = {
  "hero": "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1800&q=88&fit=crop",
  "house": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1500&q=88&fit=crop",
  "gallery": "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1400&q=87&fit=crop",
  "interior": "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1500&q=87&fit=crop",
  "minimal": "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1400&q=87&fit=crop",
  "workspace": "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1500&q=88&fit=crop",
  "architecture": "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=1700&q=88&fit=crop",
  "architecture2": "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?w=1600&q=88&fit=crop"
};
const folder = join(process.cwd(), "public", "media");
await mkdir(folder, {recursive: true});
const completed = [];
async function download(name, original) {
  const path = join(folder, `${name}.jpg`);
  try { if ((await stat(path)).size > 12000) { completed.push(name); return; } } catch {}
  const address = new URL(original);
  address.searchParams.set("w", name === "hero" ? "1600" : "1050");
  address.searchParams.set("q", "79");
  address.searchParams.set("fit", "crop");
  address.searchParams.set("fm", "jpg");
  let lastError;
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const response = await fetch(address, {
        headers: {"User-Agent":"Mozilla/5.0 (compatible; PortfolioMediaBuilder/1.0)", "Accept":"image/jpeg"},
        signal: AbortSignal.timeout(24000),
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      if (!(response.headers.get("content-type") || "").includes("image/")) throw new Error("not image content");
      const bytes = Buffer.from(await response.arrayBuffer());
      if (bytes.length < 12000 || bytes[0] !== 255 || bytes[1] !== 216) throw new Error("incomplete/non-JPEG image");
      await writeFile(path, bytes);
      completed.push(name);
      console.log(`LOCAL_MEDIA_OK ${name} (${Math.round(bytes.length / 1024)} KiB)`);
      return;
    } catch (error) {
      lastError = error;
      if (attempt < 3) await new Promise(resolve => setTimeout(resolve, 550 * attempt));
    }
  }
  throw new Error(`Cannot bundle image ${name}: ${lastError}`);
}
await Promise.all(Object.entries(originals).map(([name, url]) => download(name, url)));
if (completed.length !== Object.keys(originals).length) throw new Error("Media preflight incomplete");
console.log(`LOCAL_MEDIA_COMPLETE ${completed.length} locally bundled photographs`);
