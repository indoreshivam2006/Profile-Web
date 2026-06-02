"use client";
import { GithubIcon, LinkedinIcon, InstagramIcon, EmailIcon } from "@/components/ui/Icons";
import { ReactNode } from "react";

const socials: { icon: ReactNode; label: string; value: string; href: string }[] = [
  { icon: <EmailIcon className="w-5 h-5" />, label: "EMAIL", value: "indoreshivam2006@gmail.com", href: "mailto:indoreshivam2006@gmail.com" },
  { icon: <GithubIcon className="w-5 h-5" />, label: "GITHUB", value: "@indoreshivam2006", href: "https://github.com/indoreshivam2006" },
  { icon: <LinkedinIcon className="w-5 h-5" />, label: "LINKEDIN", value: "/in/shivamindore2006", href: "https://www.linkedin.com/in/shivamindore2006/" },
  { icon: <InstagramIcon className="w-5 h-5" />, label: "INSTAGRAM", value: "@shivtechflow_09", href: "https://www.instagram.com/shivtechflow_09" },
];

export default function Contact() {
  return (
    <section id="contact" className="relative z-[2] bg-primary/50">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 py-24 md:py-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-14 items-start max-w-[340px] md:max-w-none mx-auto">
          {/* Left */}
          <div className="reveal-left">
            <p className="font-mono text-xs text-accent-cyan tracking-[2px] uppercase mb-4">
              // CONTACT
            </p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4 tracking-tight leading-tight">
              Let&apos;s <span className="text-accent-cyan">Connect</span>
            </h2>
            <p className="text-text-secondary text-[0.95rem] leading-relaxed mb-10">
              Have a project idea, collaboration, or just want to say hello? I&apos;d love to hear from you.
            </p>

            <div className="flex flex-col gap-4">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 no-underline text-text-secondary px-5 py-3.5 rounded-xl border border-border-subtle transition-all duration-300 hover:text-accent-cyan hover:border-accent-cyan/20 hover:bg-accent-cyan/[0.04] hover:translate-x-1.5"
                >
                  <span className="w-10 h-10 rounded-[10px] bg-accent-cyan/10 flex items-center justify-center text-lg flex-shrink-0">
                    {s.icon}
                  </span>
                  <div>
                    <span className="font-mono text-[0.65rem] text-text-muted tracking-widest uppercase block">
                      {s.label}
                    </span>
                    <span className="text-[0.92rem] mt-0.5 block">{s.value}</span>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Right — Terminal Form */}
          <div className="reveal-right">
            <div className="bg-card border border-border-subtle rounded-[14px] overflow-hidden">
              {/* Terminal Bar */}
              <div className="flex items-center gap-2 px-5 py-3.5 border-b border-border-subtle">
                <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
                <span className="w-3 h-3 rounded-full bg-[#28c840]" />
                <span className="font-mono text-[0.72rem] text-text-muted ml-2">
                  terminal_session_v1.0
                </span>
              </div>

              {/* Form */}
              <form
                className="p-7"
                onSubmit={(e) => {
                  e.preventDefault();
                  const fd = new FormData(e.currentTarget);
                  const name = fd.get("name") as string;
                  const email = fd.get("email") as string;
                  const message = fd.get("message") as string;
                  window.location.href = `mailto:indoreshivam2006@gmail.com?subject=Portfolio Contact from ${name}&body=${encodeURIComponent(
                    `From: ${name} (${email})\n\n${message}`
                  )}`;
                }}
              >
                <div className="mb-5">
                  <label className="font-mono text-xs text-accent-cyan block mb-2">
                    #_ IDENTIFIER (NAME)
                  </label>
                  <input
                    name="name"
                    required
                    placeholder="user_primary"
                    className="w-full bg-white/[0.03] border border-border-subtle rounded-lg px-4 py-3 text-text-primary text-sm font-body outline-none transition-all duration-300 terminal-input placeholder:text-text-muted/50"
                  />
                </div>
                <div className="mb-5">
                  <label className="font-mono text-xs text-accent-cyan block mb-2">
                    #_ RETURN_PATH (EMAIL)
                  </label>
                  <input
                    name="email"
                    type="email"
                    required
                    placeholder="address@protocol.net"
                    className="w-full bg-white/[0.03] border border-border-subtle rounded-lg px-4 py-3 text-text-primary text-sm font-body outline-none transition-all duration-300 terminal-input placeholder:text-text-muted/50"
                  />
                </div>
                <div className="mb-6">
                  <label className="font-mono text-xs text-accent-cyan block mb-2">
                    #_ PAYLOAD (MESSAGE)
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    placeholder="Initiate handshake..."
                    className="w-full bg-white/[0.03] border border-border-subtle rounded-lg px-4 py-3 text-text-primary text-sm font-body outline-none transition-all duration-300 terminal-textarea resize-y placeholder:text-text-muted/50"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3.5 border-none rounded-lg accent-gradient-bg text-black font-mono text-sm font-semibold uppercase tracking-[2px] cursor-pointer transition-all duration-300 hover:shadow-[0_6px_25px_rgba(208,96,80,0.3)] hover:-translate-y-0.5"
                >
                  EXECUTE_TRANSMISSION &gt;
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
