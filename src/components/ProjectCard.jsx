import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function ProjectCard({ project, index }) {
  return <Link to={`/projects/${project.slug}`} className="project-card" data-cursor data-reveal>
    <div className="project-media"><img src={project.image} alt={project.title}/><span className="project-index">0{index+1}</span><span className="project-view">VIEW <ArrowUpRight size={18}/></span></div>
    <div className="project-info"><div><span className="eyebrow">{project.category}</span><h3>{project.title}</h3></div><span className="project-year">{project.year}</span></div>
  </Link>;
}