import { ArrowUpRight, Mail, Github, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { profile } from "../data/portfolio";

export default function Footer() {
  return <footer className="footer">
    <div className="container">
      <div className="footer-top">
        <div><span className="eyebrow">LET'S CONNECT</span><h2>Have an idea?<br/><em>Let's talk.</em></h2></div>
        <motion.a
          className="circle-arrow"
          href={`mailto:${profile.email}`}
          aria-label="Email"
          whileHover={{ scale: 1.1, rotate: 45 }}
          whileTap={{ scale: 0.92 }}
          transition={{ type: "spring", stiffness: 300, damping: 18 }}
        ><ArrowUpRight size={28}/></motion.a>
      </div>
      <div className="footer-grid">
        <div><p className="muted">A research-driven technology professional exploring intelligent systems, web development and meaningful digital experiences.</p></div>
        <div className="footer-links">
          <Link to="/about">About</Link><Link to="/projects">Projects</Link><Link to="/research">Research</Link><Link to="/contact">Contact</Link>
        </div>
        <div className="footer-social">
          <a href={profile.github} target="_blank" rel="noreferrer"><Github size={17}/> GitHub</a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer"><Linkedin size={17}/> LinkedIn</a>
          <a href={`mailto:${profile.email}`}><Mail size={17}/> Email</a>
        </div>
      </div>
      <div className="footer-bottom"><span>© 2026 {profile.name}. All rights reserved.</span><span>BUILT WITH REACT • GSAP • THREE.JS</span></div>
    </div>
  </footer>;
}
