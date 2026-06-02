"use client";
import { useEffect, useRef, useState } from "react";
import { GithubIcon } from "@/components/ui/Icons";

const projects = [
  {
    num: "01",
    name: "AI-Based Medical Recommendation System",
    desc: "An AI-powered system that recommends the most suitable drug/medicine for a patient based on their genetic profile and medical data — helping doctors make faster, safer, and more personalized prescribing decisions.",
    img: "/images/AI medical recommendation.png",
    github: "https://github.com/indoreshivam2006/AI-Based-Medical-Recommendation-System-Using-Genetic-and-Medical-Data",
    live: "https://ai-based-medical-recommendation-sys.vercel.app/",
  },
  {
    num: "02",
    name: "CareerLaunch",
    desc: "CareerLaunch is an all-in-one, AI-driven platform designed to help students prepare for and crack campus placements. It centralizes everything a job-seeker needs—from skill building to application tracking—into a single ecosystem.",
    img: "/images/Career_launch.png",
    github: "https://github.com/indoreshivam2006/CareerLaunch-AI-Placement-Platform",
    live: "https://career-launch-ai-placement-platform.vercel.app/",
  },
  {
    num: "03",
    name: "NEXTSHOPP",
    desc: "A blazing-fast, modern e-commerce platform built with cutting-edge technologies for a seamless online shopping experience.",
    img: "/images/Nextshop.png",
    github: "https://github.com/indoreshivam2006/NEXTSHOPP",
    live: "https://nextshopp-azure.vercel.app/",
  },
];

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return;
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const onScroll = () => {
      const rect = section.getBoundingClientRect();
      const sectionHeight = section.offsetHeight - window.innerHeight;
      const scrolled = -rect.top;

      if (scrolled < 0 || scrolled > sectionHeight) return;

      const progress = scrolled / sectionHeight;
      const maxTranslate = track.scrollWidth - window.innerWidth + 120;
      const tx = Math.min(Math.max(progress * maxTranslate, 0), maxTranslate);
      track.style.transform = `translateX(-${tx}px)`;

      /* Update counter */
      const cardWidth = track.scrollWidth / projects.length;
      const idx = Math.min(Math.floor(tx / cardWidth), projects.length - 1);
      setCurrentIdx(idx);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isMobile]);

  if (isMobile) {
    return (
      <section id="projects" className="relative z-[2] py-20 px-6">
        {/* Mobile Header */}
        <div className="mb-10 text-center">
          <p className="font-mono text-[0.68rem] text-accent-cyan tracking-[2px] uppercase mb-3">
            // PRODUCTION_BUILDS
          </p>
          <h2 className="font-heading text-3xl font-bold tracking-tight">
            My <span className="text-accent-cyan">Projects</span>
          </h2>
          <p className="text-text-secondary text-xs mt-2 max-w-xs mx-auto leading-relaxed">
            A collection of applications engineered for precision and performance.
          </p>
        </div>

        {/* Vertical Column Stack */}
        <div className="flex flex-col gap-8 w-full max-w-[340px] mx-auto mb-12">
          {projects.map((p) => (
            <div
              key={p.num}
              className="w-full bg-card border border-border-subtle rounded-2xl overflow-hidden flex flex-col transition-all duration-400 hover:border-accent-cyan/20"
            >
              {/* Image */}
              <div className="relative w-full aspect-[1.8/1] overflow-hidden border-b border-border-subtle">
                <img
                  src={p.img}
                  alt={p.name}
                  className="w-full h-full object-cover object-top"
                />
              </div>

              {/* Info Area */}
              <div className="p-5 flex flex-col flex-1 relative">
                {/* Index tag at top right */}
                <span className="absolute top-5 right-5 font-mono text-[0.68rem] text-accent-cyan bg-accent-cyan/10 px-2 py-0.5 rounded">
                  [{p.num}]
                </span>

                <h3 className="font-heading text-[1.05rem] font-bold mb-3 pr-12 leading-snug">{p.name}</h3>
                <p className="text-xs text-text-secondary leading-relaxed mb-6">
                  {p.desc}
                </p>
                
                {/* Double equal buttons */}
                <div className="grid grid-cols-2 gap-3 mt-auto">
                  <a
                     href={p.github}
                     target="_blank"
                     rel="noopener noreferrer"
                     className="font-mono text-[0.7rem] text-text-secondary text-center no-underline py-2.5 rounded-lg border border-border-subtle flex items-center justify-center gap-1.5 transition-all duration-300 hover:text-accent-cyan hover:border-accent-cyan hover:bg-accent-cyan/5"
                  >
                    <GithubIcon className="w-3.5 h-3.5" /> GitHub
                  </a>
                  <a
                     href={p.live}
                     target="_blank"
                     rel="noopener noreferrer"
                     className="font-mono text-[0.7rem] text-text-secondary text-center no-underline py-2.5 rounded-lg border border-border-subtle flex items-center justify-center gap-1.5 transition-all duration-300 hover:text-accent-purple hover:border-accent-purple hover:bg-accent-purple/5"
                  >
                    ◉ Live Site
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dynamic progress bar matching Screen 3 */}
        <div className="flex items-center justify-center gap-4">
          <span className="font-mono text-[0.68rem] text-accent-cyan font-bold">01</span>
          <div className="w-24 h-[2px] bg-white/10 relative rounded-full overflow-hidden">
            <div className="absolute top-0 left-0 w-1/3 h-full bg-accent-cyan" />
          </div>
          <span className="font-mono text-[0.68rem] text-text-muted">03</span>
        </div>
      </section>
    );
  }

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative z-[2]"
      style={{ height: `${projects.length * 100 + 50}vh` }}
    >
      <div className="sticky top-0 h-screen flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-8 md:px-14 pt-24 pb-6 flex-shrink-0">
          <p className="font-mono text-xs text-accent-cyan tracking-[2px] uppercase mb-3">
            // PRODUCTION_BUILDS
          </p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold tracking-tight">
            My <span className="text-accent-cyan">Projects</span>
          </h2>
          <p className="text-text-secondary text-sm mt-2 max-w-md">
            A collection of applications engineered for precision and performance.
          </p>
        </div>

        {/* Horizontal Track */}
        <div className="flex-1 flex items-center overflow-hidden">
          <div
            ref={trackRef}
            className="projects-track flex gap-8 md:gap-10 px-8 md:px-14 h-[75%]"
          >
            {projects.map((p) => (
              <div
                key={p.num}
                className="flex-shrink-0 w-[85vw] md:w-[520px] bg-card border border-border-subtle rounded-[14px] overflow-hidden flex flex-col transition-all duration-400 hover:border-accent-cyan/25 hover:shadow-[0_12px_50px_rgba(208,96,80,0.08)]"
              >
                {/* Image */}
                <div className="relative w-full h-[55%] overflow-hidden">
                  <img
                    src={p.img}
                    alt={p.name}
                    className="w-full h-full object-cover object-top transition-transform duration-600 hover:scale-105"
                  />
                  <span className="absolute top-3 right-3 font-mono text-xs text-accent-cyan bg-black/60 px-3 py-1 rounded-full backdrop-blur-md">
                    [{p.num}]
                  </span>
                </div>

                {/* Info */}
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="font-heading text-lg font-semibold mb-2">{p.name}</h3>
                  <p className="text-sm text-text-secondary leading-relaxed mb-5 line-clamp-3">
                    {p.desc}
                  </p>
                  <div className="flex gap-3 mt-auto">
                    <a
                      href={p.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-xs text-text-secondary no-underline px-4 py-2 rounded-lg border border-border-subtle flex items-center gap-2 transition-all duration-300 hover:text-accent-cyan hover:border-accent-cyan hover:bg-accent-cyan/5"
                    >
                      <GithubIcon className="w-3.5 h-3.5" /> GitHub
                    </a>
                    <a
                      href={p.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-xs text-text-secondary no-underline px-4 py-2 rounded-lg border border-border-subtle flex items-center gap-2 transition-all duration-300 hover:text-accent-purple hover:border-accent-purple hover:bg-accent-purple/5"
                    >
                      ◉ Live Site
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Counter */}
        <div className="absolute bottom-6 right-8 md:right-14 font-mono text-sm text-text-muted z-10">
          <span className="text-accent-cyan text-lg">{String(currentIdx + 1).padStart(2, "0")}</span>
          {" / "}
          <span>{String(projects.length).padStart(2, "0")}</span>
        </div>
      </div>
    </section>
  );
}
