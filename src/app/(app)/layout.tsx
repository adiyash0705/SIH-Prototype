/**
 * Synapse Application Shell — (app) Route Group Layout
 *
 * This layout wraps every authenticated page.
 * It composes:
 *   - Desktop sidebar (always visible on lg+)
 *   - Mobile sidebar drawer (triggered from header)
 *   - Sticky header
 *   - Main content area
 *
 * Nav sections are resolved from the mock user's role.
 * Replace `currentUser.role` with auth session when auth is implemented.
 */
"use client";

import { useState } from "react";
import { DesktopSidebar, MobileSidebar } from "@/components/layout/sidebar";
import { AppHeader } from "@/components/layout/header";
import { getNavSections } from "@/data/nav";
import { currentUser } from "@/data/mock";

const navSections = getNavSections(currentUser.role);

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className="flex h-full min-h-screen bg-background">
      {/* Desktop sidebar — visible lg+ */}
      <DesktopSidebar navSections={navSections} />

      {/* Mobile sidebar drawer */}
      <MobileSidebar
        navSections={navSections}
        isOpen={mobileSidebarOpen}
        onClose={() => setMobileSidebarOpen(false)}
      />

      {/* Right column: header + content */}
      <div className="flex flex-col flex-1 min-w-0">
        <AppHeader onMenuClick={() => setMobileSidebarOpen(true)} />

        {/* Page content */}
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}
