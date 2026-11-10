import React from "react";
export function PlanMark({size=30}:{size?:number}) {
 return <svg width={size} height={size} viewBox="0 0 48 48" fill="none" aria-hidden="true"><path d="M6 6H42V42H6V6ZM6 23H22V42M22 6V17H42M22 23H33M33 23V33" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/><path d="M22 23a11 11 0 0 0 11-11" stroke="currentColor" strokeWidth="1.3" strokeDasharray="3 2"/><path d="M10 10h7M10 13h4" stroke="currentColor" strokeWidth="1.2"/></svg>;
}
export function HouseOutline({className="",style}:{className?:string;style?:React.CSSProperties}) {
 return <svg className={className} style={style} viewBox="0 0 460 330" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
 <g className="a2-draw-primary" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter">
 <path d="M57 272 V148 L232 64 L406 148 V272 H57 Z"/>
 <path d="M42 149 L232 53 L420 149"/>
 <path d="M94 272V170H368V272"/>
 <path d="M176 272V177H290V272"/>
 <path d="M200 272V204H266V272"/>
 <path d="M119 188H160V235H119Z M310 188H350V235H310Z"/>
 </g>
 <g className="a2-draw-secondary" stroke="currentColor" strokeWidth="1" opacity=".48">
 <path d="M30 286H433 M44 51V295 M419 51V295"/>
 <path d="M57 306H406 M57 301V311 M406 301V311"/>
 <path d="M439 149V273 M434 149H444 M434 273H444"/>
 <path d="M116 187V235 M140 187V235 M310 210H350 M176 237H290"/>
 </g>
 <g fill="currentColor" opacity=".45" fontFamily="sans-serif" fontSize="10"><text x="224" y="323">12 400</text><text x="450" y="211" transform="rotate(90 450 211)">7 600</text><text x="37" y="27">ELEVATION / 01</text></g>
 </svg>;
}
export function PlanDrawing({className=""}:{className?:string}){
 return <svg className={className} viewBox="0 0 500 360" fill="none" aria-hidden="true">
  <g className="a2-plan-lines" stroke="currentColor" strokeWidth="2">
   <path d="M72 56H409V309H72Z M72 170H231 M245 170H409 M233 56V170 M245 170V309 M72 245H245 M325 170V309"/>
   <path d="M100 56V104H157V56 M333 56V117H409 M72 203H136V245 M325 217H409"/>
  </g>
  <g className="a2-plan-fine" stroke="currentColor" strokeWidth="1" opacity=".48">
   <path d="M233 170a55 55 0 0 0-55-55 M245 242a67 67 0 0 1 67-67 M325 217a42 42 0 0 0-42 42"/>
   <path d="M57 56V309 M52 56H62 M52 309H62 M72 328H409 M72 322V334 M409 322V334 M100 73H157 M333 73H409"/>
   <path d="M15 170H57 M72 27V56 M245 27V56 M409 27V56 M72 27H409" strokeDasharray="3 5"/>
  </g>
  <g fill="currentColor" opacity=".52" fontFamily="sans-serif" fontSize="11"><text x="190" y="20">GROUND FLOOR PLAN / 01</text><text x="223" y="345">15 800</text><text x="26" y="195" transform="rotate(-90 26 195)">11 400</text></g>
 </svg>
}
export function ArrowDiagonal({size=21}:{size?:number}) {return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 18 18 6M9 6h9v9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
