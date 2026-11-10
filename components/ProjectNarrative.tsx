"use client";
import React,{useEffect} from "react";
import Link from "next/link";
import gsap from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import type {ArchitectureProject} from "../lib/architecture-data";
import {projects} from "../lib/architecture-data";
import {ArrowDiagonal,HouseOutline,PlanDrawing,PlanMark} from "./ArchitectureMarks";
export default function ProjectNarrative({project:p}:{project:ArchitectureProject}){
 useEffect(()=>{
  gsap.registerPlugin(ScrollTrigger);
  if(matchMedia("(prefers-reduced-motion: reduce)").matches)return;
  const ctx=gsap.context(()=>{
   gsap.utils.toArray<HTMLElement>(".a2-detail-reveal").forEach(el=>gsap.fromTo(el,{opacity:0,y:40},{opacity:1,y:0,duration:1.05,ease:"power3.out",scrollTrigger:{trigger:el,start:"top 90%",once:true}}));
   gsap.to(".a2-detail-hero-img",{scale:1.1,yPercent:7,scrollTrigger:{trigger:".a2-detail-hero",start:"top top",end:"bottom top",scrub:true}});
   gsap.utils.toArray<SVGPathElement>(".a2-story-plan path").forEach(el=>{let n=el.getTotalLength();gsap.set(el,{strokeDasharray:n,strokeDashoffset:n});gsap.to(el,{strokeDashoffset:0,ease:"none",scrollTrigger:{trigger:".a2-detail-plan",start:"top 80%",end:"bottom 60%",scrub:true}})});
  });ScrollTrigger.refresh();return()=>{ctx.revert();ScrollTrigger.getAll().forEach(t=>t.kill())};
 },[p.slug]);
 const index=projects.findIndex(x=>x.slug===p.slug);const next=projects[(index+1)%projects.length];
 return <div className="a2-project" dir="rtl">
  <header className="a2-detail-header"><Link href="/#projects" className="a2-back"><ArrowDiagonal size={18}/> بازگشت به پروژه‌ها</Link><Link href="/" className="a2-detail-logo" dir="ltr">F O R M A</Link><span className="a2-detail-planmark"><PlanMark size={28}/></span></header>
  <main>
   <section className="a2-detail-heading">
    <div className="a2-eyebrow" dir="ltr">PROJECT {p.id} / {p.english}</div>
    <h1>{p.title}</h1><p>{p.statement}</p>
    <div className="a2-detail-stats"><span>{p.kind}</span><span>{p.city}</span><span>{p.area}</span><span>{p.year}</span></div>
   </section>
   <section className="a2-detail-hero"><img className="a2-detail-hero-img" src={p.image} alt={`نمای اصلی پروژه ${p.title}`}/><div className="a2-detail-image-label" dir="ltr">01 / THE BUILT SPACE</div></section>
   <section className="a2-detail-intro"><span dir="ltr" className="a2-eyebrow">DESIGN INTENT / 01</span><div><h2 className="a2-detail-reveal">فراتر از یک فرم.</h2><p className="a2-detail-reveal">{p.description}</p></div></section>
   <section className="a2-detail-plan"><div className="a2-detail-plan-graphic"><PlanDrawing className="a2-story-plan"/><span dir="ltr">CONCEPTUAL PLAN / NOT TO SCALE</span></div><div className="a2-detail-plan-text"><span className="a2-eyebrow" dir="ltr">SPACE & STRUCTURE / 02</span><h2 className="a2-detail-reveal">یک ایده،<br/>چند خط دقیق.</h2><p className="a2-detail-reveal">{p.concept}</p></div></section>
   <section className="a2-detail-pair"><div><img src={p.detail} alt={`فضا و جزئیات پروژه ${p.title}`} loading="lazy"/><span dir="ltr">03 / MATERIAL & LIGHT</span></div><div><img src={p.material} alt={`انتخاب مصالح و مقیاس در ${p.title}`} loading="lazy"/><span dir="ltr">04 / ATMOSPHERE</span></div></section>
   <section className="a2-detail-conclusion"><HouseOutline/><div><span className="a2-eyebrow" dir="ltr">THE RESULT / 05</span><h2 className="a2-detail-reveal">معماری خوب،<br/>به زندگی جا می‌دهد.</h2><p>نمونه‌پروژه نمایشی برای نمایش طراحی رابط کاربری FORMA؛ تصاویر و اطلاعات ارائه‌شده مربوط به پروژه واقعی قابل سفارش نیستند.</p></div></section>
   <Link href={`/projects/${next.slug}`} className="a2-next-project"><span>پروژه بعدی <ArrowDiagonal size={20}/></span><strong>{next.title}</strong><small dir="ltr">{next.english}</small></Link>
  </main>
  <footer className="a2-footer"><Link href="/" dir="ltr">F O R M A</Link><span>ARCHITECTURE STUDIO / SHOWCASE</span><Link href="/#projects">همه پروژه‌ها ↑</Link></footer>
 </div>;
}
