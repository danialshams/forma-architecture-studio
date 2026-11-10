import type { Metadata } from "next";
import "./globals.css";
import "./architectural-v2.css";
export const metadata: Metadata = {
  title: "FORMA | استودیو معماری فرما",
  description: "استودیو معماری و طراحی داخلی فرما؛ فضاهایی که احساس و عملکرد را به هم پیوند می‌زنند.",
  metadataBase: new URL("https://forma-architecture-studio.vercel.app"),
  openGraph: { title: "FORMA — فضایی برای زندگی", description: "Architecture, in its most human form.", type: "website", locale: "fa_IR" },
};
export default function RootLayout({children}:{children:React.ReactNode}) {return <html lang="fa" dir="rtl"><body>{children}</body></html>}
