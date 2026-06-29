"use client";
import { GithubIcon, LinkedinIcon, InstagramIcon, PhoneIcon } from "@/components/ui/Icons";

export default function About() {
  return (
    <section id="about" className="relative z-[2]">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 py-24 md:py-32">
        <p className="font-mono text-xs text-accent-cyan tracking-[2px] uppercase mb-4 reveal">
          // ABOUT_ME
        </p>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.3fr] gap-10 md:gap-16 items-center">
          {/* Profile Photo */}
          <div className="reveal-left flex flex-col items-center">
            <div className="relative rounded-[14px] overflow-hidden aspect-[3/4] max-w-[320px] w-full">
              <img
                src="/images/Profile Photo.png"
                alt="Shivam Indore"
                className="w-full h-full object-cover grayscale-[20%] contrast-[1.05] hover:grayscale-0 hover:contrast-100 transition-all duration-500"
              />
              <div className="image-glow-border" />
            </div>
            <span className="font-mono text-xs text-text-muted mt-4">
              [DEVELOPER_PROFILE]
            </span>
          </div>

          {/* Info */}
          <div className="reveal-right">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6 tracking-tight">
              About <span className="text-accent-cyan">Me</span>
            </h2>
            <div className="w-14 h-[3px] accent-gradient-bg rounded mb-8" />
            <p className="text-text-secondary text-[1.05rem] leading-[1.85] mb-8">
              I am a Full-Stack Developer and Data Analyst who loves building smart web applications.
              Proficient in Django, Next.js, and Python data libraries, I combine clean coding with
              data analysis to solve real-world problems. With proven leadership experience in
              national hackathons, I enjoy working in teams to build reliable, data-driven software.
            </p>

            <div className="grid grid-cols-3 gap-3 w-full mb-8">
              {[
                { num: "3+", label: "PROJECTS" },
                { num: "2", label: "CERTS" },
                { num: "10+", label: "SKILLS" },
              ].map((s) => (
                <div key={s.label} className="bg-white/[0.02] border border-white/[0.05] rounded-xl py-4 px-2 text-center transition-all duration-300 hover:border-accent-cyan/20">
                  <div className="font-heading text-xl sm:text-2xl font-bold text-accent-cyan mb-1">{s.num}</div>
                  <div className="font-mono text-[0.62rem] text-text-muted tracking-widest">{s.label}</div>
                </div>
              ))}
            </div>

            {/* Action buttons matching Screen 2 */}
            <div className="flex gap-3 mb-8 w-full max-w-sm sm:max-w-none">
              <a
                href="/Shivam Indore Resume.pdf"
                download="Shivam Indore Resume.pdf"
                className="flex-1 inline-flex items-center justify-center px-6 py-3.5 rounded-xl font-mono text-sm font-semibold accent-gradient-bg text-black no-underline transition-all duration-300 hover:shadow-[0_8px_30px_rgba(208,96,80,0.35)] hover:-translate-y-0.5 text-center cursor-pointer"
              >
                Download CV
              </a>
              <a
                href="tel:+919321504940"
                className="w-12 h-12 rounded-xl border border-white/10 bg-white/[0.03] flex items-center justify-center text-text-secondary hover:text-accent-cyan hover:border-accent-cyan/30 transition-all duration-300 no-underline"
                aria-label="Call Shivam"
              >
                <PhoneIcon className="w-5 h-5" />
              </a>
            </div>

            {/* Social text links */}
            <div className="flex gap-5 font-mono text-xs text-text-muted justify-center sm:justify-start items-center">
              <a href="https://github.com/indoreshivam2006" target="_blank" rel="noopener noreferrer" className="no-underline text-text-muted hover:text-accent-cyan transition-colors duration-300 flex items-center gap-1.5">
                <GithubIcon className="w-3.5 h-3.5" /> GitHub
              </a>
              <span>·</span>
              <a href="https://www.linkedin.com/in/shivamindore2006/" target="_blank" rel="noopener noreferrer" className="no-underline text-text-muted hover:text-accent-cyan transition-colors duration-300 flex items-center gap-1.5">
                <LinkedinIcon className="w-3.5 h-3.5" /> LinkedIn
              </a>
              <span>·</span>
              <a href="https://www.instagram.com/shivtechflow_09" target="_blank" rel="noopener noreferrer" className="no-underline text-text-muted hover:text-accent-cyan transition-colors duration-300 flex items-center gap-1.5">
                <InstagramIcon className="w-3.5 h-3.5" /> Instagram
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
