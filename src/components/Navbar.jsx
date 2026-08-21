import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X, ArrowUpRight, Sun, Moon } from "lucide-react";

const links = [
  ["Home", "/"], ["About", "/about"], ["Skills", "/skills"], ["Projects", "/projects"],
  ["Experience", "/experience"], ["Research", "/research"], ["Contact", "/contact"]
];

export default function Navbar({ theme, setTheme }) {
  const [open, setOpen] = useState(false);
  return (
    <header className="nav-wrap">
      <nav className="nav container">
        <Link className="brand" to="/" onClick={() => setOpen(false)}><span>RS</span><b>ROKEYA SHORNA</b></Link>
        <div className="desktop-nav">
          {links.map(([label, href]) => <NavLink key={href} to={href} className={({isActive}) => isActive ? "active" : ""}>{label}</NavLink>)}
          <Link className="nav-resume" to="/resume">Resume <ArrowUpRight size={14}/></Link>
          <button className="icon-btn" aria-label="Toggle theme" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
            {theme === "dark" ? <Sun size={17}/> : <Moon size={17}/>}
          </button>
        </div>
        <button className="mobile-menu" aria-label="Open menu" onClick={() => setOpen(true)}><Menu /></button>
      </nav>
      {open && <div className="mobile-overlay">
        <div className="mobile-top"><span className="brand"><span>RS</span><b>ROKEYA SHORNA</b></span><button className="icon-btn" onClick={() => setOpen(false)}><X/></button></div>
        <div className="mobile-links">
          {links.map(([label, href], i) => <NavLink key={href} to={href} onClick={() => setOpen(false)} style={{"--i": i}}>{label}</NavLink>)}
          <NavLink to="/resume" onClick={() => setOpen(false)}>Resume ↗</NavLink>
        </div>
        <p className="mobile-foot">RESEARCH • CODE • DESIGN</p>
      </div>}
    </header>
  );
}