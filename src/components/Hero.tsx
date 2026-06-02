"use client";
import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";

const LightRays = dynamic(() => import("@/components/ui/LightRays"), { ssr: false });

/* ── Particle Network (subtle overlay on top of rays) ── */
function useParticles(canvasRef: React.RefObject<HTMLCanvasElement | null>) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let mouse = { x: -500, y: -500 };
    const PARTICLE_COUNT = window.innerWidth < 768 ? 30 : 55;
    const CONNECT_DIST = 130;

    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener("resize", resize);

    type P = { x: number; y: number; vx: number; vy: number; r: number; a: number };
    const particles: P[] = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      r: Math.random() * 1.5 + 0.4,
      a: Math.random() * 0.3 + 0.1,
    }));

    const onMouse = (e: MouseEvent) => { mouse.x = e.clientX; mouse.y = e.clientY; };
    window.addEventListener("mousemove", onMouse);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        const dx = p.x - mouse.x, dy = p.y - mouse.y;
        if (Math.sqrt(dx * dx + dy * dy) < 120) { p.x += dx * 0.02; p.y += dy * 0.02; }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(208,96,80,${p.a})`;
        ctx.fill();
        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const d = Math.hypot(p.x - q.x, p.y - q.y);
          if (d < CONNECT_DIST) {
            ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = `rgba(208,96,80,${0.07 * (1 - d / CONNECT_DIST)})`;
            ctx.lineWidth = 0.5; ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouse);
    };
  }, [canvasRef]);
}

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useParticles(canvasRef);

  return (
    <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden bg-[#08080f]">

      {/* ── LightRays WebGL background ── */}
      <div className="absolute inset-0 z-0">
        <LightRays
          raysOrigin="top-center"
          raysColor="#d06050"
          raysSpeed={1.2}
          lightSpread={0.65}
          rayLength={1.8}
          pulsating={true}
          fadeDistance={1.2}
          saturation={1.0}
          followMouse={true}
          mouseInfluence={0.08}
          noiseAmount={0.04}
          distortion={0.03}
        />
      </div>

      {/* ── Particle canvas (subtle depth layer) ── */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-[1] pointer-events-none" />

      {/* ── Bottom section blend ── */}
      <div className="absolute bottom-0 left-0 right-0 h-48 z-[2] pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, #08080f)" }} />

      {/* ── Hero Content ── */}
      <div className="relative z-[3] text-center px-4 sm:px-6 max-w-5xl mx-auto select-none">

        {/* Subtitle above name */}
        <div className="hero-fade-1 mb-4">
          <span className="font-mono text-[0.68rem] text-[#d06050]/80 tracking-[4px] uppercase font-semibold">
            // INITIATING_PORTFOLIO...
          </span>
        </div>

        {/* Name */}
        <div className="mb-6 select-none overflow-visible">
          <h1
            className="name-reveal gradient-text font-heading font-bold leading-[1.05] tracking-[-2px] block"
            style={{ fontSize: "clamp(2.8rem, 9.5vw, 7.5rem)" }}
          >
            <span className="block sm:inline">SHIVAM</span>{" "}
            <span className="block sm:inline">INDORE</span>
          </h1>
        </div>

        {/* Role with colored curly braces */}
        <p className="hero-fade-2 font-mono text-[0.95rem] text-text-secondary mb-12"
          style={{ fontSize: "clamp(0.85rem, 2.2vw, 1.2rem)" }}>
          <span className="text-[#d06050] font-bold">{"{ "}</span>
          <span className="text-white/90">Full Stack Developer</span>
          <span className="text-[#d06050] mx-2">&</span>
          <span className="text-white/90">Data Analyst</span>
          <span className="text-[#d06050] font-bold">{" }"}</span>
        </p>

        {/* CTA Buttons */}
        <div className="hero-fade-3 flex flex-col sm:flex-row gap-4 justify-center items-center w-full max-w-[290px] sm:max-w-none mx-auto">
          <a href="#projects"
            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 rounded-full font-mono text-sm font-medium accent-gradient-bg text-black no-underline transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(208,96,80,0.45)]">
            View Projects
          </a>
          <a href="#contact"
            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 rounded-full font-mono text-sm font-medium text-white no-underline border border-white/10 bg-white/[0.03] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#d06050]/40 hover:bg-white/[0.07]">
            Get in Touch
          </a>
        </div>
      </div>

      {/* Floating social links bottom right */}
      <div className="absolute bottom-10 right-6 md:right-10 flex items-center gap-4 z-[3] hero-fade-4">
        <a href="https://github.com/indoreshivam2006" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full border border-white/10 bg-white/[0.03] flex items-center justify-center text-text-secondary hover:text-accent-cyan hover:border-[#d06050]/30 transition-all duration-300 text-sm no-underline">
          <GithubIcon className="w-4 h-4" />
        </a>
        <a href="https://www.linkedin.com/in/shivamindore2006/" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full border border-white/10 bg-white/[0.03] flex items-center justify-center text-text-secondary hover:text-accent-cyan hover:border-[#d06050]/30 transition-all duration-300 text-sm no-underline">
          <LinkedinIcon className="w-4 h-4" />
        </a>
      </div>

      {/* Scroll indicator */}
      <div className="hero-fade-4 absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-[3] pointer-events-none">
        <span className="font-mono text-[0.6rem] text-text-muted tracking-[4px]">SCROLL</span>
        <div className="w-px h-12" style={{ background: "linear-gradient(to bottom, #d06050, transparent)", animation: "scrollPulse 2s infinite" }} />
      </div>
    </section>
  );
}
