"use client";

const categories = [
  {
    icon: "⚡",
    title: "Frontend",
    skills: [
      { name: "Next.js", pct: 90 },
      { name: "Tailwind CSS", pct: 88 },
    ],
  },
  {
    icon: "🔧",
    title: "Backend",
    skills: [
      { name: "Django", pct: 92 },
      { name: "FastAPI", pct: 85 },
      { name: "Python", pct: 94 },
    ],
  },
  {
    icon: "📊",
    title: "Data & Analytics",
    skills: [
      { name: "Pandas", pct: 88 },
      { name: "NumPy", pct: 86 },
      { name: "Data Visualization", pct: 82 },
      { name: "Data Analysis", pct: 85 },
    ],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="relative z-[2] bg-primary/50">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 py-24 md:py-32">
        <p className="font-mono text-xs text-accent-cyan tracking-[2px] uppercase mb-4 reveal">
          // SKILL_SET
        </p>
        <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4 tracking-tight reveal">
          My <span className="text-accent-cyan">Skills</span>
        </h2>
        <div className="w-14 h-[3px] accent-gradient-bg rounded mb-12 reveal" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((cat, ci) => (
            <div
              key={cat.title}
              className="reveal bg-card border border-border-subtle rounded-[14px] p-8 transition-all duration-400 hover:-translate-y-1 hover:border-accent-cyan/40 hover:shadow-[0_8px_40px_rgba(208,96,80,0.08)]"
              style={{ transitionDelay: `${ci * 100}ms` }}
            >
              <div className="w-12 h-12 rounded-xl bg-accent-cyan/10 flex items-center justify-center text-xl mb-5">
                {cat.icon}
              </div>
              <h3 className="font-heading text-lg font-semibold mb-6">{cat.title}</h3>

              {cat.skills.map((skill) => (
                <div key={skill.name} className="mb-5 last:mb-0">
                  <div className="flex justify-between mb-2">
                    <span className="font-mono text-[0.82rem] text-text-secondary">
                      {skill.name}
                    </span>
                    <span className="font-mono text-xs text-accent-cyan">{skill.pct}%</span>
                  </div>
                  <div className="h-1 bg-white/5 rounded overflow-hidden">
                    <div className="skill-fill" data-width={`${skill.pct}%`} />
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
