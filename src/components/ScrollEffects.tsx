"use client";
import { useEffect } from "react";

export default function ScrollEffects() {
  useEffect(() => {
    /* ── Scroll Progress Bar ── */
    const progressBar = document.getElementById("scroll-progress");
    const handleScroll = () => {
      if (!progressBar) return;
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      progressBar.style.width = `${(scrollTop / docHeight) * 100}%`;
    };

    /* ── Cursor Glow ── */
    const glow = document.getElementById("cursor-glow");
    const handleMouse = (e: MouseEvent) => {
      if (!glow) return;
      glow.style.left = `${e.clientX}px`;
      glow.style.top = `${e.clientY}px`;
    };

    /* ── Reveal on Scroll (Intersection Observer) ── */
    const revealEls = document.querySelectorAll(".reveal, .reveal-left, .reveal-right");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.15 }
    );
    revealEls.forEach((el) => observer.observe(el));

    /* ── Skill Bar Animation ── */
    const skillBars = document.querySelectorAll(".skill-fill");
    const skillObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            el.style.width = el.dataset.width || "0%";
          }
        });
      },
      { threshold: 0.3 }
    );
    skillBars.forEach((el) => skillObserver.observe(el));

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("mousemove", handleMouse, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouse);
      observer.disconnect();
      skillObserver.disconnect();
    };
  }, []);

  return (
    <>
      <div id="scroll-progress" />
      <div id="cursor-glow" />
    </>
  );
}
