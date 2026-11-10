import {notFound} from "next/navigation";
import type {Metadata} from "next";
import {projects} from "../../../lib/architecture-data";
import ProjectNarrative from "../../../components/ProjectNarrative";
export function generateStaticParams(){return projects.map(p=>({slug:p.slug}))}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{
 const {slug}=await params;const p=projects.find(x=>x.slug===slug);
 return {title:p?`${p.title} | FORMA`:"پروژه یافت نشد | FORMA",description:p?.description};
}
export default async function ProjectPage({params}:{params:Promise<{slug:string}>}){
 const {slug}=await params;const project=projects.find(x=>x.slug===slug);
 if(!project)notFound();
 return <ProjectNarrative project={project}/>;
}
