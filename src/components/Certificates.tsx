"use client";
import { useCallback, useEffect, useState } from "react";

const certs = [
  {
    title: "AWS Cloud Practitioner Essentials",
    issuer: "Amazon Web Services (AWS)",
    img: "/images/AWS.png",
    date: "Completed Jan 2024",
  },
  {
    title: "Design Thinking for Innovation",
    issuer: "University of Virginia — Darden School of Business",
    img: "/images/UOV.png",
    date: "Completed Nov 2023",
  },
];

export default function Certificates() {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  const close = useCallback(() => setActiveIdx(null), []);

  /* Close on Escape key */
  useEffect(() => {
    if (activeIdx === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [activeIdx, close]);

  return (
    <>
      <section id="certificates" className="relative z-[2]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-10 py-24 md:py-32">
          <p className="font-mono text-xs text-accent-cyan tracking-[2px] uppercase mb-4 reveal">
            // CREDENTIALS_ROOT
          </p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4 tracking-tight reveal">
            My <span className="text-accent-cyan">Certificates</span>
          </h2>
          <div className="w-14 h-[3px] accent-gradient-bg rounded mb-12 reveal" />

          {/* Grid Layout (Responsive column stack on mobile, 2-cols on desktop) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-7 max-w-[340px] md:max-w-none mx-auto">
            {certs.map((cert, i) => (
              <div
                key={cert.title}
                onClick={() => setActiveIdx(i)}
                className="reveal bg-card border border-border-subtle rounded-2xl overflow-hidden transition-all duration-400 hover:border-accent-purple/30 hover:shadow-[0_8px_40px_rgba(133,80,96,0.08)] cursor-pointer group flex flex-col h-full"
                style={{ transitionDelay: `${i * 120}ms` }}
              >
                <div className="relative w-full h-[180px] sm:h-[210px] overflow-hidden border-b border-border-subtle">
                  <img
                    src={cert.img}
                    alt={cert.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                  {/* Click hint overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/35 transition-all duration-300 flex items-center justify-center">
                    <span className="font-mono text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/50 px-4 py-2 rounded-full backdrop-blur-sm">
                      Click to view ↗
                    </span>
                  </div>
                </div>
                
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="font-heading text-base sm:text-lg font-semibold mb-2 leading-snug group-hover:text-accent-cyan transition-colors duration-300">{cert.title}</h3>
                  <p className="font-mono text-[0.68rem] text-text-muted mb-1 uppercase tracking-wider">{cert.issuer}</p>
                  <p className="font-mono text-[0.62rem] text-accent-purple mb-5">{cert.date}</p>
                  
                  {/* EXECUTE_VIEW_CERT Button at the bottom */}
                  <div className="mt-auto pt-2">
                    <span className="inline-flex w-full items-center justify-center py-2.5 rounded-lg border border-border-subtle bg-white/[0.02] font-mono text-[0.72rem] text-text-secondary group-hover:text-accent-cyan group-hover:border-accent-cyan/30 transition-all duration-300 uppercase tracking-wider">
                      EXECUTE_VIEW_CERT ▷
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Lightbox Modal ── */}
      {activeIdx !== null && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-8"
          onClick={close}
          style={{ animation: "lightboxFadeIn 0.3s ease-out forwards" }}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />

          {/* Content */}
          <div
            className="relative z-10 max-w-4xl w-full bg-card border border-border-subtle rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
            style={{ animation: "lightboxScaleIn 0.3s ease-out forwards" }}
          >
            {/* Close Button */}
            <button
              onClick={close}
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-center text-text-secondary hover:text-white hover:border-accent-cyan/50 transition-all duration-300 cursor-pointer"
              aria-label="Close certificate view"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="3" y1="3" x2="13" y2="13" />
                <line x1="13" y1="3" x2="3" y2="13" />
              </svg>
            </button>

            {/* Certificate Image */}
            <div className="w-full bg-white/5 flex items-center justify-center p-4 md:p-6">
              <img
                src={certs[activeIdx].img}
                alt={certs[activeIdx].title}
                className="max-h-[60vh] w-auto max-w-full object-contain rounded-lg"
              />
            </div>

            {/* Info Bar */}
            <div className="px-6 py-5 border-t border-border-subtle flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <div>
                <h3 className="font-heading text-lg font-semibold text-text-primary">
                  {certs[activeIdx].title}
                </h3>
                <p className="font-mono text-xs text-accent-purple mt-1">
                  {certs[activeIdx].issuer}
                </p>
              </div>
              <span className="font-mono text-xs text-text-muted tracking-wider">
                [{String(activeIdx + 1).padStart(2, "0")} / {String(certs.length).padStart(2, "0")}]
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
