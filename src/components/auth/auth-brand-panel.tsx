/**
 * AuthBrandPanel — Left side of the auth layout.
 *
 * Dark surface with:
 * - Synapse brand
 * - Value proposition
 * - Network/connection visual (pure CSS, no external assets)
 * - Role indicators
 *
 * Design intent: sophisticated, restrained — not decorative.
 * The dark panel grounds the auth experience.
 */

import {
  BookOpen,
  Building2,
  GraduationCap,
  Layers,
  Link2,
} from "lucide-react";

// Subtle connection node visual — pure CSS/SVG
function ConnectionMark() {
  return (
    <div className="relative w-full flex items-center justify-center py-8 select-none" aria-hidden="true">
      <svg
        viewBox="0 0 280 120"
        fill="none"
        className="w-full max-w-[280px] opacity-30"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Connection lines */}
        <line x1="55" y1="60" x2="140" y2="30" stroke="white" strokeWidth="0.75" strokeDasharray="4 3" />
        <line x1="55" y1="60" x2="140" y2="60" stroke="white" strokeWidth="0.75" strokeDasharray="4 3" />
        <line x1="55" y1="60" x2="140" y2="90" stroke="white" strokeWidth="0.75" strokeDasharray="4 3" />
        <line x1="225" y1="60" x2="140" y2="30" stroke="white" strokeWidth="0.75" strokeDasharray="4 3" />
        <line x1="225" y1="60" x2="140" y2="60" stroke="white" strokeWidth="0.75" strokeDasharray="4 3" />
        <line x1="225" y1="60" x2="140" y2="90" stroke="white" strokeWidth="0.75" strokeDasharray="4 3" />

        {/* Left node */}
        <circle cx="55" cy="60" r="18" stroke="white" strokeWidth="0.75" />
        <circle cx="55" cy="60" r="3" fill="white" />

        {/* Right node */}
        <circle cx="225" cy="60" r="18" stroke="white" strokeWidth="0.75" />
        <circle cx="225" cy="60" r="3" fill="white" />

        {/* Center nodes */}
        <circle cx="140" cy="30" r="4" fill="white" fillOpacity="0.7" />
        <circle cx="140" cy="60" r="4" fill="white" fillOpacity="0.7" />
        <circle cx="140" cy="90" r="4" fill="white" fillOpacity="0.7" />

        {/* Center bridge */}
        <line x1="140" y1="30" x2="140" y2="90" stroke="white" strokeWidth="0.75" strokeDasharray="2 2" />

        {/* Center accent dot */}
        <circle cx="140" cy="60" r="6" stroke="white" strokeWidth="0.75" fillOpacity="0" />
      </svg>
    </div>
  );
}

const roles = [
  { icon: GraduationCap, label: "Students" },
  { icon: BookOpen, label: "Faculty" },
  { icon: Building2, label: "Industry" },
  { icon: Layers, label: "Institutions" },
];

export function AuthBrandPanel() {
  return (
    <div className="flex flex-col justify-between h-full px-10 py-12 xl:px-14">
      {/* Top: brand */}
      <div>
        {/* Mark + wordmark */}
        <div className="flex items-center gap-2.5 mb-1">
          <div
            className="shrink-0 rounded-[5px] bg-white flex items-center justify-center"
            style={{ width: 22, height: 22 }}
            aria-hidden="true"
          >
            <div
              className="rounded-[2px] bg-foreground"
              style={{ width: 8, height: 8 }}
            />
          </div>
          <span className="text-lg font-semibold text-white tracking-tight leading-none">
            Synapse
          </span>
        </div>
        <p className="text-[11px] font-medium uppercase tracking-widest text-white/40 pl-[30px]">
          Academia × Industry
        </p>
      </div>

      {/* Center: value prop + visual */}
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl xl:text-3xl font-semibold text-white tracking-tight leading-snug">
            Where potential
            <br />
            meets opportunity.
          </h2>
          <p className="mt-3 text-[13px] text-white/50 leading-relaxed max-w-xs">
            A unified collaboration platform bridging students, academia
            and industry through meaningful connections.
          </p>
        </div>

        {/* Network visual */}
        <ConnectionMark />

        {/* Role indicators */}
        <div className="space-y-2">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-white/30">
            Built for
          </p>
          <div className="flex flex-wrap gap-2">
            {roles.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1"
              >
                <Icon className="size-3 text-white/50" />
                <span className="text-[11px] text-white/60 font-medium">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom: subtle footnote */}
      <div>
        <div className="flex items-center gap-1.5 text-[11px] text-white/25">
          <Link2 className="size-3" />
          <span>Smart India Hackathon · Prototype</span>
        </div>
      </div>
    </div>
  );
}
