import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function useReveal(scope) {
  useEffect(() => {
    if (!scope?.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray("[data-reveal]").forEach((el) => {
        const direction = el.dataset.reveal || "up";
        const from = direction === "left" ? { x: -45 } : direction === "right" ? { x: 45 } : { y: 38 };
        gsap.fromTo(el, { ...from, opacity: 0 }, {
          x: 0, y: 0, opacity: 1, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 88%", end: "bottom 12%", toggleActions: "play none none reverse" }
        });
      });

      gsap.utils.toArray("[data-parallax]").forEach((el) => {
        gsap.to(el, {
          y: Number(el.dataset.parallax || 30),
          ease: "none",
          scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true }
        });
      });
    }, scope);

    return () => ctx.revert();
  }, [scope]);
}