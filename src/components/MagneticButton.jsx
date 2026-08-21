import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

export default function MagneticButton({ children, to, href, secondary=false }) {
  const cls = `magnetic-btn ${secondary ? "secondary" : ""}`;
  if (href) return <a className={cls} href={href} target="_blank" rel="noreferrer">{children}<ArrowUpRight size={16}/></a>;
  return <Link className={cls} to={to}>{children}<ArrowUpRight size={16}/></Link>;
}