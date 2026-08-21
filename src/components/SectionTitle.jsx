export default function SectionTitle({ eyebrow, title, text, number }) {
  return <div className="section-title" data-reveal>
    <div><span className="eyebrow">{number} / {eyebrow}</span><h2>{title}</h2></div>
    {text && <p>{text}</p>}
  </div>;
}