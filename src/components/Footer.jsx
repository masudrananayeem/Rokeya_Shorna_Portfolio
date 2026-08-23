import { useState } from "react";
import { ArrowUpRight, Mail, Github, Linkedin, Check } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { profile } from "../data/portfolio";

export default function Footer() {
  const [copied, setCopied] = useState(false);

  const handleArrowClick = async (e) => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(profile.email);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch {
      // clipboard unavailable — the mailto href below still handles the click natively
    }
  };

  return <footer className="footer">
    <div className="container">
      <div className="footer-top">
        <div><span className="eyebrow">LET'S CONNECT</span><h2>Have an idea?<br/><em>Let's talk.</em></h2></div>
        <div className="circle-arrow-wrap">
          <motion.a
            className="circle-arrow"
            href={`mailto:${profile.email}`}
            aria-label={`Email ${profile.email}`}
            onClick={handleArrowClick}
            whileHover={{ scale: 1.1, rotate: 45 }}
            whileTap={{ scale: 0.92 }}
            transition={{ type: "spring", stiffness: 300, damping: 18 }}
          ><AnimatePresence mode="wait" initial={false}>
            {copied
              ? <motion.span key="check" initial={{opacity:0,scale:.6}} animate={{opacity:1,scale:1}} exit={{opacity:0,scale:.6}} style={{display:"grid"}}><Check size={26}/></motion.span>
              : <motion.span key="arrow" initial={{opacity:0,scale:.6}} animate={{opacity:1,scale:1}} exit={{opacity:0,scale:.6}} style={{display:"grid"}}><ArrowUpRight size={28}/></motion.span>}
          </AnimatePresence></motion.a>
          <AnimatePresence>
            {copied && <motion.span className="copied-tip" initial={{opacity:0,y:6}} animate={{opacity:1,y:0}} exit={{opacity:0,y:6}}>Email copied — {profile.email}</motion.span>}
          </AnimatePresence>
        </div>
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
