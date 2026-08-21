import { useEffect, useRef, useState } from "react";
import { Routes, Route, useLocation, Link, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Download, Mail, MapPin, Github, Linkedin, ExternalLink, Award, Users, BookOpen, BriefcaseBusiness } from "lucide-react";
import useLenis from "./hooks/useLenis";
import useReveal from "./hooks/useReveal";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Loader from "./components/Loader";
import CustomCursor from "./components/CustomCursor";
import ScrollProgress from "./components/ScrollProgress";
import SectionTitle from "./components/SectionTitle";
import MagneticButton from "./components/MagneticButton";
import ProjectCard from "./components/ProjectCard";
import ThreeOrb from "./components/ThreeOrb";
import { profile, education, experiences, skills, projects, publications, awards, workshops, leadership, references, coursework, hobbies } from "./data/portfolio";

function Layout({theme, setTheme}) {
  const location = useLocation();
  const scope = useRef(null);
  useLenis(); useReveal(scope);
  useEffect(() => { window.scrollTo({top:0, behavior:"instant"}); }, [location.pathname]);
  return <div ref={scope}>
    <ScrollProgress/><CustomCursor/><Navbar theme={theme} setTheme={setTheme}/><Loader/>
    <AnimatePresence mode="wait"><motion.main key={location.pathname} initial={{opacity:0,y:14}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-12}} transition={{duration:.45,ease:"easeOut"}}><Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/about" element={<About/>}/>
      <Route path="/skills" element={<Skills/>}/>
      <Route path="/projects" element={<Projects/>}/>
      <Route path="/projects/:slug" element={<ProjectDetail/>}/>
      <Route path="/experience" element={<Experience/>}/>
      <Route path="/research" element={<Research/>}/>
      <Route path="/services" element={<Services/>}/>
      <Route path="/resume" element={<Resume/>}/>
      <Route path="/contact" element={<Contact/>}/>
      <Route path="*" element={<NotFound/>}/>
    </Routes></motion.main></AnimatePresence>
    <Footer/>
  </div>;
}

function Home() {
  return <div>
    <section className="hero">
      <div className="hero-grid"/><div className="hero-glow"/>
      <div className="container hero-inner">
        <div className="hero-copy">
          <span className="eyebrow hero-eyebrow">RESEARCHER • PROGRAMMER • WEB DEVELOPER</span>
          <h1><span>Ideas into</span><em>intelligent</em><span>experiences.</span></h1>
          <p>{profile.summary}</p>
          <div className="hero-actions"><MagneticButton to="/projects">Explore Work <ArrowUpRight size={15}/></MagneticButton><MagneticButton to="/resume" secondary>View Resume <Download size={15}/></MagneticButton></div>
          <div className="hero-mini-stats">
            <div><strong>3.90</strong><span>B.Sc CGPA</span></div><div><strong>3.78</strong><span>M.Sc CGPA</span></div><div><strong>4+</strong><span>Roles & experiences</span></div>
          </div>
        </div>
        <div className="hero-visual" data-reveal="right">
          <div className="portrait-card">
            <div className="portrait-glow"/>
            <img src="/assets/profile.png" alt="Rokeya Shorna"/>
            <div className="portrait-meta"><span>ROKEYA SHORNA</span><small>AI • WEB • RESEARCH</small></div>
          </div>
          <div className="visual-orb"><ThreeOrb/></div>
          <span className="orb-label">SCROLL / EXPLORE</span>
        </div>
      </div>
      <div className="container hero-bottom"><span>SCROLL TO EXPLORE ↓</span><span>DHAKA • BANGLADESH</span></div>
    </section>
    <section className="statement section-pad"><div className="container statement-grid"><span className="eyebrow">01 / PROFILE</span><h2 data-reveal>I work at the intersection of <em>research, code and design.</em></h2></div></section>
    <section className="section-pad quick-profile"><div className="container quick-grid">
      <article data-reveal><BriefcaseBusiness/><span>CURRENT ROLE</span><h3>Junior Programmer</h3><p>GIS-based development for the Rural Road Master Plan under RCIP, LGED funded by ADB.</p></article>
      <article data-reveal><BookOpen/><span>RESEARCH FOCUS</span><h3>AI & Pattern Recognition</h3><p>Digital image processing, pattern recognition, artificial intelligence and machine learning.</p></article>
      <article data-reveal><Award/><span>PUBLICATIONS</span><h3>IEEE + Research</h3><p>Published work includes Bangla sentiment analysis and combined regression methods for rainfall measurement.</p></article>
    </div></section>
    <section className="feature section-pad"><div className="container">
      <SectionTitle number="02" eyebrow="SELECTED WORK" title="Built with purpose." text="Academic, research and software projects grounded in practical problems and implementation."/>
      <div className="project-grid">{projects.slice(0,3).map((p,i)=><ProjectCard key={p.slug} project={p} index={i}/>)}</div>
      <div className="center-link"><Link to="/projects">View all projects <ArrowUpRight size={17}/></Link></div>
    </div></section>
    <section className="marquee"><div>ARTIFICIAL INTELLIGENCE • MACHINE LEARNING • DIGITAL IMAGE PROCESSING • WEB DEVELOPMENT • PATTERN RECOGNITION • </div></section>
    <section className="section-pad dark-panel"><div className="container split">
      <div><span className="eyebrow">03 / RESEARCH</span><h2 data-reveal>Curious about how <em>technology understands.</em></h2></div>
      <div data-reveal><p className="large-muted">Research interests include digital image processing, pattern recognition, artificial intelligence and machine learning. The portfolio also highlights published work and academic milestones.</p><MagneticButton to="/research">Explore Research <ArrowUpRight size={15}/></MagneticButton></div>
    </div></section>
    <section className="section-pad timeline-preview"><div className="container"><SectionTitle number="04" eyebrow="JOURNEY" title="Experience that compounds." text="From teaching and technical support to web development and GIS-based programming."/><div className="journey-grid">{experiences.map((e,i)=><article key={e.role} data-reveal><span>0{i+1}</span><small>{e.period}</small><h3>{e.role}</h3><p>{e.organization}</p></article>)}</div></div></section>
    <section className="cta section-pad"><div className="container"><span className="eyebrow">05 / CONTACT</span><h2 data-reveal>Let's make the next<br/><em>idea meaningful.</em></h2><MagneticButton href={`mailto:${profile.email}`}>Start a conversation <ArrowUpRight size={15}/></MagneticButton></div></section>
  </div>;
}

function PageHero({kicker,title,sub}) {
  return <section className="page-hero"><div className="container"><span className="eyebrow">{kicker}</span><h1 data-reveal>{title}</h1>{sub && <p data-reveal>{sub}</p>}</div></section>;
}

function About() {
  return <><PageHero kicker="01 / ABOUT" title={<>A researcher with a <em>builder's mindset.</em></>} sub="A Computer Science professional whose journey spans research, programming, web development, technical support and teaching."/>
  <section className="section-pad"><div className="container about-intro-grid">
    <div className="about-photo-wrap" data-reveal="left"><img src="/assets/profile.png" alt="Rokeya Shorna"/><div><span>ROKEYA SHORNA</span><small>Computer Science & Engineering</small></div></div>
    <div><span className="eyebrow">PROFILE</span><h2 className="about-big" data-reveal>Building useful systems with <em>research-led thinking.</em></h2><p className="large-muted" data-reveal>{profile.summary}</p><div className="interest-list">{profile.interests.map(x=><span key={x}>{x}</span>)}</div></div>
  </div></section>
  <section className="section-pad"><div className="container two-col">
    <div><SectionTitle number="01" eyebrow="EDUCATION" title="Foundations."/><div className="timeline">{education.map((e,i)=><article key={i} data-reveal><span>{e.period}</span><h3>{e.degree}</h3><b>{e.institution}</b><p>Result: {e.result}. {e.detail}</p>{e.coursework && <div className="course-list">{e.coursework.map(c=><span key={c}>{c}</span>)}</div>}</article>)}</div></div>
    <div className="about-card" data-reveal><span className="eyebrow">COURSEWORK & INTERESTS</span><div className="course-list">{coursework.map(x=><span key={x}>{x}</span>)}</div><div className="about-contact"><MapPin size={16}/>{profile.location}<br/><Mail size={16}/>{profile.email}<br/><span className="birth-line">Born {profile.birth}</span></div></div>
  </div></section>
  <section className="section-pad light-section"><div className="container"><SectionTitle number="02" eyebrow="LEADERSHIP & COMMUNITY" title="Beyond the job title." text="Leadership, volunteering and community activities documented in the CV."/><div className="leadership-grid">{leadership.map((x,i)=><article key={x[0]+x[1]} data-reveal><span>0{String(i+1).padStart(2,'0')}</span><small>{x[2]}</small><h3>{x[0]}</h3><b>{x[1]}</b><p>{x[3]}</p></article>)}</div></div></section>
  <section className="section-pad"><div className="container"><SectionTitle number="03" eyebrow="WORKSHOPS & SEMINARS" title="Always learning."/><div className="workshop-grid">{workshops.map((w,i)=><article key={w} data-reveal><span>0{String(i+1).padStart(2,'0')}</span><p>{w}</p></article>)}</div></div></section>
  </>;
}

function Skills() {
  return <><PageHero kicker="02 / SKILLS" title={<>Tools for turning <em>questions into systems.</em></>} sub="A focused toolkit spanning programming, web technologies, databases, research and visual communication."/>
  <section className="section-pad"><div className="container skills-layout">{Object.entries(skills).map(([cat,items],i)=><article className="skill-block" data-reveal key={cat}><span className="skill-no">0{i+1}</span><h3>{cat}</h3><div className="skill-tags">{items.map(x=><span key={x}>{x}</span>)}</div></article>)}</div></section>
  <section className="section-pad dark-panel"><div className="container split"><h2 data-reveal>Technical depth is useful.<br/><em>Curiosity is essential.</em></h2><p className="large-muted" data-reveal>I enjoy learning new tools when they help solve a real problem better, more clearly or more efficiently.</p></div></section></>;
}

function Projects() {
  return <><PageHero kicker="03 / PROJECTS" title={<>Selected work, <em>explained.</em></>} sub="Academic and software projects grounded in practical problems, research and user-focused implementation."/>
  <section className="section-pad"><div className="container"><div className="project-grid projects-all">{projects.map((p,i)=><ProjectCard key={p.slug} project={p} index={i}/>)}</div></div></section></>;
}

function ProjectDetail() {
  const { slug } = useParams();
  const p = projects.find(x => x.slug === slug);
  if (!p) return <NotFound />;
  return <><PageHero kicker={`PROJECT / ${p.category}`} title={<>{p.title} <em>in detail.</em></>} sub={p.summary}/>
    <section className="project-detail-hero"><div className="container"><img src={p.image} alt={p.title}/></div></section>
    <section className="section-pad"><div className="container detail-grid">
      <aside><span className="eyebrow">TECHNOLOGY</span><div className="detail-tags">{p.stack.map(x=><span key={x}>{x}</span>)}</div><span className="eyebrow detail-label">YEAR</span><p>{p.year}</p><span className="eyebrow detail-label">TEAM</span><p>{p.team}</p></aside>
      <article className="detail-copy"><span className="eyebrow">01 / THE PROBLEM</span><h2>{p.problem}</h2><span className="eyebrow">02 / THE APPROACH</span><p>{p.solution}</p><span className="eyebrow">03 / OUTCOME</span><p>{p.outcome}</p><Link className="text-link" to="/projects">← Back to projects</Link></article>
    </div></section>
  </>;
}function Experience() {
  return <><PageHero kicker="04 / EXPERIENCE" title={<>Work shaped by <em>responsibility.</em></>} sub="Professional experience across GIS-based development, web development, technical support and teaching."/>
  <section className="section-pad"><div className="container experience-list">{experiences.map((e,i)=><article className="experience-item" data-reveal key={e.role}><div className="exp-year">{e.period}</div><div><span className="eyebrow">0{i+1}</span><h2>{e.role}</h2><h4>{e.organization}</h4><p>{e.description}</p></div></article>)}</div></section></>;
}

function Research() {
  return <><PageHero kicker="05 / RESEARCH" title={<>Questions become <em>evidence.</em></>} sub="Research interests and published work across machine learning, deep learning, Bangla NLP and data-driven methods."/>
  <section className="section-pad"><div className="container research-intro"><div><span className="eyebrow">RESEARCH INTERESTS</span><h2>Digital image processing.<br/>Pattern recognition.<br/><em>AI & machine learning.</em></h2></div><ThreeOrb/></div></section>
  <section className="section-pad light-section"><div className="container"><SectionTitle number="01" eyebrow="PUBLICATIONS" title="Published research."/><div className="publication-list">{publications.map((p,i)=><article key={p.title} data-reveal><span>0{i+1}</span><div><h3>{p.title}</h3><p>{p.venue} • {p.year}</p><a href={p.doi} target="_blank" rel="noreferrer">View DOI ↗</a></div></article>)}</div></div></section>
  <section className="section-pad"><div className="container"><SectionTitle number="02" eyebrow="AWARDS" title="Milestones."/><div className="award-grid">{awards.map((a,i)=><div key={i} data-reveal><span>0{i+1}</span><p>{a}</p></div>)}</div></div></section>
  <section className="section-pad light-section"><div className="container research-extra-grid"><div><span className="eyebrow">HOBBIES & INTERESTS</span><h2 className="extra-title">Writing. Painting.<br/><em>Graphics & design.</em></h2><div className="hobby-tags">{hobbies.map(h=><span key={h}>{h}</span>)}</div></div><div><span className="eyebrow">REFERENCES</span><div className="reference-list">{references.map(r=><article key={r[0]}><h3>{r[0]}</h3><p>{r[1]}</p><a href={`mailto:${r[2]}`}>{r[2]} <ExternalLink size={13}/></a></article>)}</div></div></div></section></>;
}

function Services() {
  const items = [
    ["01","Research & Data","Systematic literature review, quantitative and qualitative analysis, and research-oriented problem solving."],
    ["02","Web Development","Responsive websites and practical web applications using HTML, CSS, PHP, JavaScript and Bootstrap."],
    ["03","Machine Learning","Exploration of AI/ML methods with a focus on image processing, pattern recognition and intelligent systems."],
    ["04","Technical Support","Troubleshooting, maintenance and performance-focused technical assistance."]
  ];
  return <><PageHero kicker="06 / SERVICES" title={<>From idea to <em>working system.</em></>} sub="Areas where research thinking and implementation experience come together."/>
  <section className="section-pad"><div className="container service-list">{items.map(([n,t,d])=><article key={n} data-reveal><span>{n}</span><h2>{t}</h2><p>{d}</p><ArrowUpRight size={22}/></article>)}</div></section></>;
}

function Resume() {
  return <><PageHero kicker="07 / RESUME" title={<>A concise record of <em>the journey.</em></>} sub="A web version of the professional CV, with a print-friendly layout."/>
  <section className="resume-actions container"><button className="magnetic-btn" onClick={()=>window.print()}><Download size={16}/> Print / Save PDF</button><a className="magnetic-btn secondary" href={`mailto:${profile.email}`}><Mail size={16}/> Contact</a></section>
  <section className="resume-sheet container">
    <div className="resume-head"><div><h2>{profile.name}</h2><p>{profile.role}</p><span>{profile.email} • {profile.phone} • {profile.location}</span></div><div className="resume-mark">RS</div></div>
    <div className="resume-columns"><div>
      <ResumeSection title="Education">{education.map((e,i)=><div className="resume-entry" key={i}><b>{e.degree}</b><span>{e.period}</span><strong>{e.institution}</strong><p>CGPA / Result: {e.result}<br/>{e.detail}</p></div>)}</ResumeSection>
      <ResumeSection title="Experience">{experiences.map((e,i)=><div className="resume-entry" key={i}><b>{e.role}</b><span>{e.period}</span><strong>{e.organization}</strong><p>{e.description}</p></div>)}</ResumeSection>
      <ResumeSection title="Projects">{projects.map(p=><div className="resume-entry" key={p.slug}><b>{p.title}</b><span>{p.year} • {p.team}</span><p>{p.summary}</p></div>)}</ResumeSection>
    </div><div>
      <ResumeSection title="Technical Skills">{Object.entries(skills).map(([c,it])=><div className="skill-line" key={c}><b>{c}</b><p>{it.join(" • ")}</p></div>)}</ResumeSection>
      <ResumeSection title="Publications">{publications.map(p=><div className="resume-entry" key={p.title}><b>{p.title}</b><p>{p.venue}<br/>{p.doi}</p></div>)}</ResumeSection>
      <ResumeSection title="Awards & Achievements"><ul>{awards.map(a=><li key={a}>{a}</li>)}</ul></ResumeSection>
      <ResumeSection title="Leadership & Volunteer">{leadership.map(x=><div className="resume-entry" key={x[0]+x[1]}><b>{x[0]} — {x[1]}</b><span>{x[2]}</span><p>{x[3]}</p></div>)}</ResumeSection>
    </div></div>
  </section></>;
}

function ResumeSection({title,children}) { return <section className="resume-section"><h3>{title}</h3>{children}</section>; }

function Contact() {
  const [status,setStatus] = useState("");
  async function submit(e) {
    e.preventDefault();
    const endpoint = import.meta.env.VITE_CONTACT_ENDPOINT;
    if (!endpoint) { setStatus("Demo mode: connect VITE_CONTACT_ENDPOINT to send this form."); return; }
    setStatus("Sending…");
    try { await fetch(endpoint,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(Object.fromEntries(new FormData(e.currentTarget)))}); setStatus("Message sent successfully."); e.currentTarget.reset(); }
    catch { setStatus("Something went wrong. Please email directly."); }
  }
  return <><PageHero kicker="08 / CONTACT" title={<>Let's build something <em>meaningful.</em></>} sub="For research, development, collaboration or a thoughtful technology conversation, send a message."/>
  <section className="section-pad"><div className="container contact-grid"><div><span className="eyebrow">GET IN TOUCH</span><h2>Open to thoughtful<br/><em>conversations.</em></h2><div className="contact-info"><a href={`mailto:${profile.email}`}><Mail/> {profile.email}</a><a href={profile.linkedin} target="_blank" rel="noreferrer"><Linkedin/> LinkedIn</a><a href={profile.github} target="_blank" rel="noreferrer"><Github/> GitHub</a><span><MapPin/> {profile.location}</span></div></div>
  <form className="contact-form" onSubmit={submit}><label>Name<input name="name" required placeholder="Your name"/></label><label>Email<input type="email" name="email" required placeholder="you@example.com"/></label><label>Subject<input name="subject" required placeholder="What would you like to discuss?"/></label><label>Message<textarea name="message" required rows="7" placeholder="Tell me a little about your idea..."/></label><button className="magnetic-btn" type="submit">Send message <ArrowUpRight size={16}/></button>{status && <p className="form-status">{status}</p>}</form></div></section></>;
}

function NotFound() {
  return <section className="page-hero not-found"><div className="container"><span className="eyebrow">404 / NOT FOUND</span><h1>This page <em>doesn't exist.</em></h1><Link className="magnetic-btn" to="/">Back home <ArrowUpRight size={16}/></Link></div></section>;
}

export default function App() {
  const [theme,setTheme] = useState(localStorage.getItem("theme") || "dark");
  useEffect(()=>{ document.documentElement.dataset.theme = theme; localStorage.setItem("theme",theme); },[theme]);
  return <Layout theme={theme} setTheme={setTheme}/>;
}