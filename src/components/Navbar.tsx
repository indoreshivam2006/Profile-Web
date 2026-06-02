"use client";
import { useEffect, useState } from "react";
import { GithubIcon, LinkedinIcon, InstagramIcon, PhoneIcon } from "@/components/ui/Icons";

const links = [
  { href: "#about", label: ".about()" },
  { href: "#skills", label: ".skills()" },
  { href: "#projects", label: ".projects()" },
  { href: "#certificates", label: ".certs()" },
  { href: "#contact", label: ".contact()" },
];

const mobileBottomLinks = [
  { href: "#hero", label: "Home", icon: "⌂" },
  { href: "#projects", label: "Projects", icon: "⟁" },
  { href: "#certificates", label: "Credentials", icon: "◧" },
  { href: "#contact", label: "Contact", icon: "✉" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
      
      // Dynamic section highlighting for mobile bottom nav
      const sections = ["hero", "projects", "certificates", "contact"];
      const scrollPos = window.scrollY + 200; // offset for detection
      
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav
        id="navbar"
        className={`fixed top-0 left-0 w-full z-[1000] px-6 md:px-10 py-4 transition-all duration-400 ${
          scrolled || mobileOpen
            ? "bg-deep/80 backdrop-blur-xl shadow-[0_1px_0_rgba(255,255,255,0.06)]"
            : ""
        }`}
      >
        <div className="max-w-[1300px] mx-auto flex items-center justify-between">
          <a
            href="#hero"
            className="font-mono text-xl font-bold text-accent-cyan tracking-wider no-underline"
          >
            &lt;SI /&gt;
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex gap-2">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="font-mono text-[0.82rem] text-text-secondary no-underline px-3.5 py-2 rounded-lg transition-all duration-300 hover:text-accent-cyan hover:bg-accent-cyan/10"
              >
                {l.label}
              </a>
            ))}
          </div>

          {/* Mobile Toggle */}
          <button
            className="flex md:hidden flex-col gap-[5px] bg-transparent border-none cursor-pointer p-1 z-[1001]"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <span
              className={`block w-6 h-0.5 bg-text-primary transition-transform duration-300 ${
                mobileOpen ? "translate-y-[7px] rotate-45" : ""
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-text-primary transition-opacity duration-300 ${
                mobileOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-text-primary transition-transform duration-300 ${
                mobileOpen ? "-translate-y-[7px] -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Backdrop overlay */}
      <div
        className={`fixed inset-0 bg-deep/80 backdrop-blur-md z-[998] md:hidden transition-all duration-500 ease-in-out ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMobileOpen(false)}
      />

      {/* Premium Side Nav Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-[310px] max-w-[85vw] bg-[#0c0e17]/96 backdrop-blur-2xl border-l border-white/[0.05] z-[999] md:hidden flex flex-col justify-between transition-all duration-500 cubic-bezier(0.16, 1, 0.3, 1) shadow-[-10px_0_40px_rgba(0,0,0,0.6)] ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Drawer Header */}
        <div className="pt-8 px-6 pb-6 border-b border-white/[0.04]">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xl font-bold tracking-wider bg-gradient-to-r from-text-primary via-accent-cyan to-accent-purple bg-clip-text text-transparent">
              &lt;SI /&gt;
            </span>
            <span className="font-mono text-[9px] text-accent-cyan/80 uppercase tracking-[0.25em] font-semibold bg-accent-cyan/10 px-2 py-0.5 rounded-full">
              MENU
            </span>
          </div>
        </div>

        {/* Drawer Links */}
        <div className="flex-1 py-8 px-4 flex flex-col gap-2 overflow-y-auto">
          {links.map((l, index) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMobileOpen(false)}
              className="group flex items-center justify-between font-mono text-sm text-text-secondary no-underline px-5 py-3.5 rounded-xl border border-white/[0.02] bg-white/[0.01] transition-all duration-300 hover:text-accent-cyan hover:bg-accent-cyan/10 hover:border-accent-cyan/20"
            >
              <div className="flex items-center gap-3.5">
                <span className="text-[10px] font-semibold text-accent-cyan/50 group-hover:text-accent-cyan tracking-wider">
                  0{index + 1}.
                </span>
                <span className="font-medium text-text-primary group-hover:text-accent-cyan transition-colors">
                  {l.label}
                </span>
              </div>
              <span className="text-text-muted group-hover:text-accent-cyan group-hover:translate-x-1.5 transition-all duration-300">
                →
              </span>
            </a>
          ))}
        </div>

        {/* Drawer Footer */}
        <div className="p-6 border-t border-white/[0.04] bg-[#07080d]/60 flex flex-col gap-5">
          {/* Status block */}
          <div className="flex items-center gap-2.5 px-2 py-1.5 rounded-lg bg-white/[0.02] border border-white/[0.04]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="font-mono text-[10px] text-text-secondary uppercase tracking-widest font-medium">
              AVAILABLE FOR HIRE
            </span>
          </div>

          {/* Socials */}
          <div className="flex flex-col gap-3">
            <span className="font-mono text-[9px] text-text-muted uppercase tracking-[0.2em] px-1">
              CONNECT
            </span>
            <div className="flex items-center gap-3">
              <a
                href="https://github.com/indoreshivam2006"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-text-secondary hover:text-accent-cyan hover:bg-accent-cyan/10 hover:border-accent-cyan/20 transition-all duration-300 flex-1 flex justify-center items-center"
                aria-label="GitHub"
              >
                <GithubIcon className="w-4.5 h-4.5" />
              </a>
              <a
                href="https://linkedin.com/in/shivam-indore"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-text-secondary hover:text-accent-cyan hover:bg-accent-cyan/10 hover:border-accent-cyan/20 transition-all duration-300 flex-1 flex justify-center items-center"
                aria-label="LinkedIn"
              >
                <LinkedinIcon className="w-4.5 h-4.5" />
              </a>
              <a
                href="https://instagram.com/shivam_indore_03"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-text-secondary hover:text-accent-cyan hover:bg-accent-cyan/10 hover:border-accent-cyan/20 transition-all duration-300 flex-1 flex justify-center items-center"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-4.5 h-4.5" />
              </a>
              <a
                href="tel:9321504940"
                className="p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-text-secondary hover:text-accent-cyan hover:bg-accent-cyan/10 hover:border-accent-cyan/20 transition-all duration-300 flex-1 flex justify-center items-center"
                aria-label="Call"
              >
                <PhoneIcon className="w-4.5 h-4.5" />
              </a>
            </div>
          </div>
        </div>
      </div>


      {/* Premium Floating Mobile Bottom Tab Bar */}
      <div className="mobile-bottom-nav md:hidden">
        {mobileBottomLinks.map((l) => {
          const sectionId = l.href.substring(1);
          const isActive = activeSection === sectionId;
          return (
            <a
              key={l.href}
              href={l.href}
              className={`mobile-bottom-nav-item ${isActive ? "active" : ""}`}
            >
              <span className="mobile-bottom-nav-icon">{l.icon}</span>
              <span>{l.label}</span>
            </a>
          );
        })}
      </div>
    </>
  );
}
