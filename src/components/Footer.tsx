import { GithubIcon, LinkedinIcon, InstagramIcon } from "@/components/ui/Icons";
import { ReactNode } from "react";

const footerLinks: { label: string; href: string; icon: ReactNode }[] = [
  { label: "GitHub", href: "https://github.com/indoreshivam2006", icon: <GithubIcon className="w-3.5 h-3.5" /> },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/shivamindore2006/", icon: <LinkedinIcon className="w-3.5 h-3.5" /> },
  { label: "Instagram", href: "https://www.instagram.com/shivtechflow_09", icon: <InstagramIcon className="w-3.5 h-3.5" /> },
];

export default function Footer() {
  return (
    <footer className="border-t border-border-subtle py-10 px-6 md:px-10">
      <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="font-mono text-xs text-text-muted">
          © {new Date().getFullYear()} SHIVAM INDORE // BUILT_WITH_PRECISION
        </p>
        <div className="flex gap-6">
          {footerLinks.map((l) => (
            <a
              key={l.label}
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs text-text-secondary no-underline transition-colors duration-300 hover:text-accent-cyan flex items-center gap-1.5"
            >
              {l.icon} {l.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
