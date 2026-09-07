/**
 * Synapse — Design System Verification Screen
 *
 * Purpose: Verify the visual foundation before building features.
 * This is NOT the final landing page or a documentation dump.
 * It should feel like a polished internal design-preview screen.
 */

import {
  ArrowRight,
  BookOpen,
  Building2,
  CheckCircle2,
  ChevronRight,
  GraduationCap,
  Layers,
  Link2,
  Users,
  Zap,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Brand } from "@/components/shared/brand";
import { StatusBadge, StatusDot } from "@/components/shared/status-badge";
import { UserAvatar } from "@/components/layout/user-menu";

// ─── Design system color tokens for the palette preview ────────────
const designTokens = [
  { name: "Background", css: "bg-background", border: true },
  { name: "Card", css: "bg-card", border: true },
  { name: "Muted", css: "bg-muted", border: false },
  { name: "Primary", css: "bg-primary", dark: true, border: false },
  { name: "Accent", css: "bg-accent", dark: true, border: false },
  { name: "Success", css: "bg-success", dark: true, border: false },
  { name: "Warning", css: "bg-warning", dark: true, border: false },
  { name: "Destructive", css: "bg-destructive", dark: true, border: false },
];

const roleIcons = [
  { icon: GraduationCap, label: "Students" },
  { icon: BookOpen, label: "Faculty" },
  { icon: Building2, label: "Industry" },
  { icon: Layers, label: "Institutions" },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">

      {/* ── Top bar ─────────────────────────────────────────────── */}
      <header className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-12 flex items-center justify-between">
          <Brand size="sm" showDescriptor={false} />

          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-[10px] font-medium uppercase tracking-wider">
              SIH Prototype
            </Badge>
            <Badge variant="secondary" className="text-[10px] font-medium">
              Design Preview
            </Badge>
          </div>
        </div>
      </header>

      {/* ── Hero section ────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-border">
        {/* Dot pattern — pure CSS, decorative only */}
        <div className="absolute inset-0 dot-pattern opacity-60 pointer-events-none" aria-hidden="true" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
          <div className="max-w-2xl">
            {/* Eyebrow */}
            <div className="flex items-center gap-2 mb-6">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" aria-hidden="true" />
                Smart India Hackathon · Design Foundation
              </span>
            </div>

            {/* Brand */}
            <Brand size="lg" className="mb-6" />

            {/* Headline */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-foreground mb-5 leading-[1.15]">
              Bridging talent, academia
              <br className="hidden sm:block" />
              {" "}and industry.
            </h2>

            {/* Supporting text */}
            <p className="text-base sm:text-lg text-muted-foreground mb-8 max-w-xl leading-relaxed">
              A unified platform for discovering talent, building partnerships
              and turning academic potential into real-world opportunity.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-5 text-sm font-medium">
                Explore the platform
                <ArrowRight className="ml-1.5 size-4" />
              </Button>
              <Button variant="outline" size="lg" className="h-10 px-5 text-sm font-medium">
                View design system
              </Button>
            </div>

            {/* Role indicators */}
            <div className="mt-10 flex flex-wrap gap-4">
              {roleIcons.map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Icon className="size-3.5 flex-shrink-0" />
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Design system showcase ──────────────────────────────── */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">

        {/* Section header */}
        <div className="mb-10">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1">
            Foundation
          </p>
          <h2 className="text-xl font-semibold text-foreground">
            Design System Verification
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Visual primitives, tokens, and components used throughout the platform.
          </p>
        </div>

        {/* ── Grid layout: 2 column on md+, stacked on mobile ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border rounded-xl overflow-hidden border border-border">

          {/* ─ Typography ───────────────────────────────────────── */}
          <div className="bg-background p-6 lg:p-8 space-y-4">
            <h3 className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground mb-4">
              01 — Typography
            </h3>
            <div className="space-y-3">
              <div>
                <p className="text-[10px] text-muted-foreground mb-0.5">Display</p>
                <p className="text-4xl font-semibold tracking-tight text-foreground leading-none">Synapse</p>
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground mb-0.5">Heading 1</p>
                <p className="text-2xl font-semibold tracking-tight text-foreground">Academia × Industry</p>
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground mb-0.5">Heading 2</p>
                <p className="text-lg font-medium text-foreground">Platform Overview</p>
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground mb-0.5">Body</p>
                <p className="text-sm text-foreground leading-relaxed">
                  Connecting students, faculty, institutions, and industry
                  through a single intelligent collaboration layer.
                </p>
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground mb-0.5">Caption</p>
                <p className="text-xs text-muted-foreground">Posted 3 days ago · IIT Bombay · Remote</p>
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground mb-0.5">Monospace</p>
                <p className="font-mono text-xs text-muted-foreground">REF-2026-IIT-ML-0047</p>
              </div>
            </div>
          </div>

          {/* ─ Color Palette ─────────────────────────────────────── */}
          <div className="bg-background p-6 lg:p-8">
            <h3 className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground mb-4">
              02 — Color System
            </h3>
            <div className="grid grid-cols-4 gap-2">
              {designTokens.map((token) => (
                <div key={token.name} className="space-y-1.5">
                  <div
                    className={`h-12 rounded-md ${token.css} ${token.border ? "border border-border" : ""} flex items-center justify-center`}
                  >
                    {token.dark && (
                      <span className="text-[9px] text-white/60 font-mono">#</span>
                    )}
                  </div>
                  <p className="text-[10px] text-muted-foreground leading-tight">{token.name}</p>
                </div>
              ))}
            </div>

            <Separator className="my-5" />

            {/* Semantic status dots */}
            <div className="space-y-2">
              <p className="text-[10px] font-medium text-muted-foreground mb-3">Status indicators</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-2 gap-x-4">
                {(["active", "pending", "review", "inactive", "closed"] as const).map((s) => (
                  <StatusDot key={s} status={s} label />
                ))}
              </div>
            </div>
          </div>

          {/* ─ Buttons ───────────────────────────────────────────── */}
          <div className="bg-background p-6 lg:p-8">
            <h3 className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground mb-4">
              03 — Buttons
            </h3>

            <div className="space-y-4">
              {/* Row: variants */}
              <div className="flex flex-wrap gap-2 items-center">
                <Button size="sm">Primary</Button>
                <Button variant="outline" size="sm">Outline</Button>
                <Button variant="secondary" size="sm">Secondary</Button>
                <Button variant="ghost" size="sm">Ghost</Button>
                <Button variant="destructive" size="sm">Destructive</Button>
              </div>

              <Separator />

              {/* Row: sizes */}
              <div className="flex flex-wrap gap-2 items-center">
                <Button size="xs">XSmall</Button>
                <Button size="sm">Small</Button>
                <Button>Default</Button>
                <Button size="lg">Large</Button>
              </div>

              <Separator />

              {/* Row: with icons */}
              <div className="flex flex-wrap gap-2 items-center">
                <Button size="sm">
                  <Link2 />
                  Connect
                </Button>
                <Button variant="outline" size="sm">
                  View details
                  <ChevronRight />
                </Button>
                <Button variant="ghost" size="icon" aria-label="Zap action">
                  <Zap className="size-4" />
                </Button>
              </div>

              <Separator />

              {/* Row: disabled */}
              <div className="flex flex-wrap gap-2 items-center">
                <Button size="sm" disabled>Disabled</Button>
                <Button variant="outline" size="sm" disabled>Disabled outline</Button>
              </div>
            </div>
          </div>

          {/* ─ Badges + Input + Avatar ───────────────────────────── */}
          <div className="bg-background p-6 lg:p-8 space-y-6">
            {/* Badges */}
            <div>
              <h3 className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground mb-3">
                04 — Badges
              </h3>
              <div className="flex flex-wrap gap-2 items-center">
                <Badge>Default</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="outline">Outline</Badge>
                <Badge variant="destructive">Destructive</Badge>
              </div>
              <div className="flex flex-wrap gap-2 items-center mt-2">
                <StatusBadge status="active" />
                <StatusBadge status="pending" />
                <StatusBadge status="review" />
                <StatusBadge status="closed" />
              </div>
            </div>

            <Separator />

            {/* Input */}
            <div>
              <h3 className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground mb-3">
                05 — Input
              </h3>
              <div className="space-y-2">
                <label
                  htmlFor="demo-email"
                  className="block text-xs font-medium text-foreground"
                >
                  Institutional email
                </label>
                <Input
                  id="demo-email"
                  type="email"
                  placeholder="you@institution.ac.in"
                  className="max-w-xs"
                />
                <p className="text-xs text-muted-foreground">
                  Used for institution verification.
                </p>
              </div>
            </div>

            <Separator />

            {/* Avatars */}
            <div>
              <h3 className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground mb-3">
                06 — Avatars
              </h3>
              <div className="flex items-center gap-4">
                {/* Stacked avatars */}
                <div className="flex -space-x-2" aria-label="Team members">
                  {[
                    { name: "Aditya Sharma", initials: "AS" },
                    { name: "Priya Nair", initials: "PN" },
                    { name: "Rohan Mehta", initials: "RM" },
                  ].map((u) => (
                    <UserAvatar
                      key={u.initials}
                      name={u.name}
                      initials={u.initials}
                      size="md"
                      className="ring-2 ring-background"
                    />
                  ))}
                  <div
                    className="w-8 h-8 rounded-full bg-muted ring-2 ring-background flex items-center justify-center text-[10px] font-semibold text-muted-foreground"
                    title="4 more"
                  >
                    +4
                  </div>
                </div>

                {/* Single with role */}
                <div className="flex items-center gap-2 text-sm">
                  <UserAvatar name="Dr. Priya Nair" initials="PN" size="md" />
                  <div>
                    <p className="text-sm font-medium text-foreground leading-none mb-0.5">Dr. Priya Nair</p>
                    <p className="text-xs text-muted-foreground">Faculty · NIT Calicut</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ─ Card sample ───────────────────────────────────────── */}
          <div className="bg-muted/30 p-6 lg:p-8 md:col-span-2">
            <h3 className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground mb-4">
              07 — Card Component
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Opportunity card */}
              <Card className="sm:col-span-2">
                <CardHeader>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <CardTitle>Machine Learning Intern</CardTitle>
                      <CardDescription className="mt-1">TechCorp India · Bengaluru</CardDescription>
                    </div>
                    <StatusBadge status="active" />
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Work with our AI team on production ML pipelines. Requires
                    Python, TensorFlow, and familiarity with data preprocessing.
                  </p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {["Python", "ML", "TensorFlow", "Remote-friendly"].map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-[11px]">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <CheckCircle2 className="size-3" />
                      Posted 8 days ago
                    </p>
                    <Button size="sm" variant="outline">
                      View details
                      <ChevronRight />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Stat card (minimal) */}
              <div className="space-y-3">
                {[
                  { label: "Active Opportunities", value: "248", trend: "+12 this week" },
                  { label: "Partner Institutions", value: "64", trend: "Across 18 states" },
                  { label: "Companies", value: "130+", trend: "From 12 sectors" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-lg border border-border bg-card p-4"
                  >
                    <p className="text-2xl font-semibold tracking-tight text-foreground">{stat.value}</p>
                    <p className="text-xs font-medium text-foreground mt-0.5">{stat.label}</p>
                    <p className="text-[11px] text-muted-foreground mt-0.5">{stat.trend}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* ── Stack: entity types overview ─────────────────────── */}
        <div className="mt-16 mb-4">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1">
            Platform
          </p>
          <h2 className="text-xl font-semibold text-foreground">
            Who uses Synapse
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            {
              icon: GraduationCap,
              title: "Students",
              desc: "Discover internships, research projects, and industry mentors.",
            },
            {
              icon: BookOpen,
              title: "Faculty",
              desc: "Post research needs, collaborate with industry partners.",
            },
            {
              icon: Building2,
              title: "Industry",
              desc: "Access curated talent and academic R&D partnerships.",
            },
            {
              icon: Users,
              title: "Institutions",
              desc: "Manage MoUs, placements, and institutional metrics.",
            },
          ].map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="group rounded-lg border border-border bg-card p-5 hover:border-border/80 hover:shadow-sm transition-all duration-150"
            >
              <div className="w-8 h-8 rounded-md bg-muted flex items-center justify-center mb-3">
                <Icon className="size-4 text-foreground" />
              </div>
              <p className="text-sm font-medium text-foreground mb-1">{title}</p>
              <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

      </main>

      {/* ── Footer ──────────────────────────────────────────────── */}
      <footer className="mt-auto border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <Brand size="sm" showDescriptor={false} />
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span>Design System v1.0</span>
            <span>·</span>
            <span>Next.js 16 · Tailwind v4 · shadcn/ui v4</span>
            <span>·</span>
            <Badge variant="outline" className="text-[10px]">SIH 2026</Badge>
          </div>
        </div>
      </footer>

    </div>
  );
}
