"use client";
import React,{useCallback,useEffect,useRef,useState} from "react";
import Link from "next/link";
import gsap from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import Lenis from "lenis";
import {projects} from "../lib/architecture-data";
import {PlanDrawing,HouseOutline,PlanMark,ArrowDiagonal} from "./ArchitectureMarks";

const navLinks=[["پروژه‌ها","#projects"],["نگاه ما","#philosophy"],["فرایند","#process"],["تماس","#contact"]] as const;
function ArchitectureIntro({onFinish}:{onFinish:()=>void}){
 const [show,setShow]=useState(true);
 const finished=useRef(false),root=useRef<HTMLDivElement>(null);
 const complete=useCallback(()=>{if(finished.current)return;finished.current=true;try{sessionStorage.setItem("forma-intro-v2","seen")}catch{};setShow(false);onFinish()},[onFinish]);
 useEffect(()=>{
  const rootEl=root.current;if(!rootEl)return;
  let seen=false;try{seen=sessionStorage.getItem("forma-intro-v2")==="seen"}catch{}
  if(seen||matchMedia("(prefers-reduced-motion: reduce)").matches){const f=requestAnimationFrame(complete);return()=>cancelAnimationFrame(f)}
  const ctx=gsap.context(()=>{
   const paths=Array.from(rootEl.querySelectorAll<SVGPathElement>(".a2-intro-house path"));
   paths.forEach(path=>{const length=path.getTotalLength();gsap.set(path,{strokeDasharray:length,strokeDashoffset:length})});
   const tl=gsap.timeline({onComplete:complete});
   tl.to(".a2-intro-house .a2-draw-primary path",{strokeDashoffset:0,duration:.68,stagger:.15,ease:"power2.inOut"})
    .to(".a2-intro-house .a2-draw-secondary path",{strokeDashoffset:0,duration:.5,stagger:.045,ease:"power1.out"},"-=.5")
    .fromTo(".a2-intro-label",{opacity:0,y:12},{opacity:1,y:0,duration:.4},"-=.75")
    .to(rootEl,{opacity:0,duration:.45,ease:"power2.inOut"},"+=.1");
  },rootEl);
  return()=>ctx.revert();
 },[complete]);
 if(!show)return null;
 return <div className="a2-intro" ref={root} role="status" aria-label="در حال ترسیم خطوط یک خانه">
   <HouseOutline className="a2-intro-house"/>
   <div className="a2-intro-label" dir="ltr">FORMA <span>ARCHITECTURE IN LINES</span></div>
   <button className="a2-intro-skip" onClick={complete}>عبور از مقدمه</button>
 </div>;
}
function useArchitectureMotion(ready:boolean){
 useEffect(()=>{
  if(!ready)return;
  gsap.registerPlugin(ScrollTrigger);
  const reduced=matchMedia("(prefers-reduced-motion: reduce)").matches;
  if(reduced)return;
  let lenis:Lenis|undefined;let tick:((t:number)=>void)|undefined;
  if(matchMedia("(pointer:fine)").matches){
   lenis=new Lenis({duration:1.04,smoothWheel:true,anchors:true});
   tick=(t:number)=>lenis?.raf(t*1000);gsap.ticker.add(tick);
   lenis.on("scroll",ScrollTrigger.update);
  }
  const ctx=gsap.context(()=>{
   gsap.utils.toArray<HTMLElement>(".a2-reveal").forEach(el=>gsap.fromTo(el,{opacity:0,y:32},{opacity:1,y:0,duration:1.04,ease:"power3.out",scrollTrigger:{trigger:el,start:"top 90%",once:true}}));
   gsap.fromTo(".a2-hero-photo img",{scale:1.08},{scale:1,duration:2,ease:"power3.out"});
   gsap.to(".a2-hero-photo img",{yPercent:10,ease:"none",scrollTrigger:{trigger:".a2-hero",start:"top top",end:"bottom top",scrub:true}});
   gsap.to(".a2-transition-drawing",{clipPath:"inset(0 0 100% 0)",ease:"none",scrollTrigger:{trigger:".a2-transform",start:"top 78%",end:"bottom 50%",scrub:1}});
   gsap.utils.toArray<SVGPathElement>(".a2-plan-demo path").forEach(path=>{
    const total=path.getTotalLength();gsap.set(path,{strokeDasharray:total,strokeDashoffset:total});
    gsap.to(path,{strokeDashoffset:0,ease:"none",scrollTrigger:{trigger:".a2-process",start:"top 77%",end:"bottom 65%",scrub:true}});
   });
   gsap.utils.toArray<HTMLElement>(".a2-work-image img").forEach(el=>gsap.fromTo(el,{scale:1.14},{scale:1,duration:1.5,ease:"power3.out",scrollTrigger:{trigger:el,start:"top 95%",once:true}}));
  });
  ScrollTrigger.refresh();
  return()=>{ctx.revert();if(tick)gsap.ticker.remove(tick);lenis?.destroy();ScrollTrigger.getAll().forEach(s=>s.kill())};
 },[ready]);
}
export default function ArchitecturalExperience(){
 const [ready,setReady]=useState(false),[menu,setMenu]=useState(false),[sent,setSent]=useState(false);
 const finish=useCallback(()=>setReady(true),[]);
 useArchitectureMotion(ready);
 useEffect(()=>{document.body.style.overflow=menu?"hidden":"";return()=>{document.body.style.overflow=""}},[menu]);
 useEffect(()=>{const esc=(e:KeyboardEvent)=>{if(e.key==="Escape")setMenu(false)};addEventListener("keydown",esc);return()=>removeEventListener("keydown",esc)},[]);
 const close=()=>setMenu(false);
 return <><ArchitectureIntro onFinish={finish}/><div className={`a2-site ${ready?"a2-visible":""}`} id="top">
  <header className="a2-header">
   <button className={`a2-nav-toggle ${menu?"is-open":""}`} onClick={()=>setMenu(v=>!v)} aria-expanded={menu} aria-label={menu?"بستن منو":"باز کردن منوی معماری"} aria-controls="forma-nav">
    <PlanMark size={26}/><span>{menu?"بستن":"فهرست"}</span>
   </button>
   <a href="#top" className="a2-logo" dir="ltr">F O R M A <small>ARCHITECTURE STUDIO</small></a>
   <a className="a2-header-contact" href="#contact">شروع یک پروژه <ArrowDiagonal size={17}/></a>
  </header>
  <div id="forma-nav" className={`a2-navigation ${menu?"is-open":""}`} aria-hidden={!menu}>
    <div className="a2-nav-note">INDEX / PLAN 01 <span>FORMA — STUDIO</span></div>
    <nav aria-label="منوی اصلی">{navLinks.map(([name,href],i)=><a key={href} href={href} tabIndex={menu?0:-1} onClick={close} style={{"--index":i} as React.CSSProperties}><span dir="ltr">0{i+1}</span>{name}<ArrowDiagonal size={25}/></a>)}</nav>
    <PlanDrawing className="a2-nav-plan"/><span className="a2-nav-footer" dir="ltr">LESS, BUT MEANINGFUL.</span>
  </div>
  <main>
  <section className="a2-hero">
   <div className="a2-hero-copy">
     <div className="a2-section-id" dir="ltr">01 / INTRODUCTION <span>35° 41′ N</span></div>
     <p className="a2-kicker a2-reveal">استودیو معماری فرما</p>
     <h1 className="a2-reveal">معماری،<br/>برای <em>زندگی.</em></h1>
     <p className="a2-hero-desc a2-reveal">کمتر می‌سازیم، دقیق‌تر فکر می‌کنیم. فضاهایی که نور، مقیاس و سکوت در آن‌ها معنا دارند.</p>
     <a className="a2-linkline" href="#projects">کشف پروژه‌ها <ArrowDiagonal size={19}/></a>
   </div>
   <div className="a2-hero-photo">
     <img src="/media/hero.jpg" alt="خانه‌ای مدرن با فرم‌های مینیمال و نور طبیعی" fetchPriority="high"/>
     <div className="a2-hero-frame"><span className="a2-corner a2-tl"/><span className="a2-corner a2-br"/><span className="a2-photo-label" dir="ltr">ELEVATION / BUILT FORM</span></div>
   </div>
   <div className="a2-hero-foot" dir="ltr"><span>FORMA / 2026</span><span>SCROLL TO DISCOVER · ↓</span></div>
  </section>
  <section className="a2-philosophy" id="philosophy">
    <div className="a2-eyebrow" dir="ltr">02 / OUR APPROACH</div>
    <div><h2 className="a2-reveal">هر خط،<br/>باید <em>دلیلی</em> داشته باشد.</h2><p className="a2-reveal">زیبایی را در حذف اضافات پیدا می‌کنیم. از اولین اسکیس تا آخرین جزئیات، هر تصمیم پاسخی به یک نیاز واقعی است.</p></div>
  </section>
  <section className="a2-transform" aria-label="تبدیل نقشه معماری به فضای ساخته‌شده">
    <div className="a2-transform-media">
      <img src="/media/house.jpg" alt="نمای واقعی خانه نور"/>
      <div className="a2-transition-drawing"><div className="a2-plan-grid"/><PlanDrawing className="a2-transition-plan"/><span dir="ltr">DRAWING → BUILT SPACE</span></div>
      <div className="a2-transform-note" dir="ltr">01 / DRAWING INTO REALITY</div>
    </div>
    <div className="a2-transform-text"><span>از خط تا فضا</span><p>نقشه پایان داستان نیست؛ آغاز تجربه زندگی در یک مکان است.</p></div>
  </section>
  <section className="a2-works" id="projects">
    <div className="a2-works-head"><div><span className="a2-eyebrow" dir="ltr">03 / SELECTED PROJECTS</span><h2 className="a2-reveal">پروژه‌های منتخب</h2></div><span dir="ltr" className="a2-muted">2024 — 2026 / 04 WORKS</span></div>
    <div className="a2-work-grid">{projects.map((p,i)=><Link key={p.slug} href={`/projects/${p.slug}`} className={`a2-work a2-work-${i+1}`} aria-label={`مشاهده صفحه پروژه ${p.title}`}>
      <div className="a2-work-image"><img src={p.image} alt={`پروژه معماری ${p.title}`} loading="lazy"/><span className="a2-work-arrow"><ArrowDiagonal/></span></div>
      <div className="a2-work-meta" dir="ltr"><span>PROJECT / {p.id}</span><span>{p.year}</span></div>
      <div className="a2-work-caption"><h3>{p.title}</h3><span>{p.kind} — {p.city}</span></div>
    </Link>)}</div>
    <p className="a2-works-foot">برای دیدن داستان طراحی، یکی از پروژه‌ها را انتخاب کنید.</p>
  </section>
  <section className="a2-process" id="process">
    <div className="a2-process-head"><span className="a2-eyebrow" dir="ltr">04 / DESIGN METHOD</span><h2 className="a2-reveal">از ایده تا اجرا.</h2><p>چهار مرحله، یک هدف: خلق فضایی ماندگار.</p></div>
    <div className="a2-process-layout"><div className="a2-process-diagram"><PlanDrawing className="a2-plan-demo"/><span dir="ltr">GROUND FLOOR / CONCEPT STUDY</span></div>
      <div className="a2-process-steps">
       {[
         ["01","شنیدن","شناخت آدم‌ها، نیازها و زندگی روزمره"],
         ["02","ترسیم","شکل‌دادن به ایده در پلان، نور و حجم"],
         ["03","جزئیات","انتخاب دقیق مصالح و نسبت‌ها"],
         ["04","اجرا","تبدیل طرح به فضایی قابل لمس"]
       ].map(([num,title,description])=><div key={num} className="a2-process-step a2-reveal"><span dir="ltr">{num} / 04</span><div><h3>{title}</h3><p>{description}</p></div></div>)}
      </div>
    </div>
  </section>
  <section className="a2-contact" id="contact">
   <span className="a2-eyebrow" dir="ltr">05 / GET IN TOUCH</span>
   <div className="a2-contact-layout"><div><h2 className="a2-reveal">فضای بعدی،<br/>از یک گفت‌وگو شروع می‌شود.</h2><p>پروژه‌ای در ذهن داری؟ این فرم برای نمایش تجربه ارتباط طراحی شده است.</p></div>
   <form className="a2-contact-form" onSubmit={e=>{e.preventDefault();setSent(true)}} aria-label="فرم نمایشی درخواست طراحی">
    {sent?<p role="status" className="a2-form-success">فرم نمایشی تکمیل شد. هیچ اطلاعاتی ذخیره یا ارسال نشده است.</p>:<>
     <label>نام و نام خانوادگی<input required maxLength={80} placeholder="نام شما"/></label>
     <label>نوع پروژه<select defaultValue="مسکونی"><option>مسکونی</option><option>تجاری</option><option>طراحی داخلی</option></select></label>
     <label>راه ارتباطی<input required type="email" dir="ltr" placeholder="you@example.com"/></label>
     <button type="submit">ثبت درخواست نمایشی <ArrowDiagonal/></button>
    </>}
   </form></div>
  </section>
  </main>
  <footer className="a2-footer"><span dir="ltr">F O R M A — 2026</span><span>استودیو معماری / نمونه نمایشی</span><a href="#top">بازگشت به بالا ↑</a></footer>
 </div></>;
}
