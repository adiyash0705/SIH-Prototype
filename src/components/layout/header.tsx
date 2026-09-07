/**
 * AppHeader — Sticky application header.
 *
 * Left:  Mobile menu trigger (client component slot) + page title
 * Center: Search trigger pill
 * Right: Notifications + User menu
 *
 * Height: 52px — matches sidebar brand area for alignment.
 */
"use client";

import { useState } from "react";
import {
  Bell,
  ChevronDown,
  LogOut,
  Menu,
  Settings,
  User,
} from "lucide-react";
import { SearchTrigger } from "@/components/layout/search-trigger";
import { UserAvatar } from "@/components/layout/user-menu";
import { currentUser } from "@/data/mock";
import { mockNotifications } from "@/data/mock";
import { cn } from "@/lib/utils";
import { formatRelativeDate } from "@/lib/utils";

// ─── Notification Panel ────────────────────────────────────────────

function NotificationPanel({
  onClose,
}: {
  onClose: () => void;
}) {
  const unread = mockNotifications.filter((n) => !n.read);
  const all = mockNotifications;

  return (
    <div
      className="absolute top-full right-0 mt-2 w-[340px] rounded-xl border border-border bg-popover shadow-xl overflow-hidden z-50"
      role="dialog"
      aria-label="Notifications"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-foreground">Notifications</span>
          {unread.length > 0 && (
            <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-accent text-[9px] font-bold text-white">
              {unread.length}
            </span>
          )}
        </div>
        <button
          className="text-xs text-accent hover:underline"
          onClick={onClose}
        >
          Mark all read
        </button>
      </div>

      {/* Notification list */}
      <ul role="list" className="divide-y divide-border max-h-[320px] overflow-y-auto">
        {all.map((n) => (
          <li
            key={n.id}
            className={cn(
              "px-4 py-3 hover:bg-muted/50 transition-colors cursor-pointer",
              !n.read && "bg-accent/5"
            )}
          >
            <div className="flex items-start gap-2.5">
              {/* Unread dot */}
              <span
                className={cn(
                  "mt-1.5 w-1.5 h-1.5 rounded-full shrink-0",
                  !n.read ? "bg-accent" : "bg-transparent"
                )}
                aria-hidden="true"
              />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-foreground leading-snug">
                  {n.title}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                  {n.description}
                </p>
                <p className="text-[10px] text-muted-foreground/60 mt-1">
                  {formatRelativeDate(n.createdAt)}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {/* Footer */}
      <div className="px-4 py-2.5 border-t border-border">
        <button className="text-xs text-muted-foreground hover:text-foreground transition-colors">
          View all notifications
        </button>
      </div>
    </div>
  );
}

// ─── User Dropdown ─────────────────────────────────────────────────

function UserDropdown({ onClose }: { onClose: () => void }) {
  const roleLabel: Record<string, string> = {
    student: "Student",
    faculty: "Faculty",
    institution: "Institution",
    industry: "Industry",
    admin: "Admin",
  };

  return (
    <div
      className="absolute top-full right-0 mt-2 w-[200px] rounded-xl border border-border bg-popover shadow-xl overflow-hidden z-50 py-1"
      role="menu"
    >
      {/* User info */}
      <div className="px-3 py-2.5 border-b border-border mb-1">
        <p className="text-sm font-medium text-foreground leading-none">
          {currentUser.name}
        </p>
        <p className="text-xs text-muted-foreground mt-0.5">
          {roleLabel[currentUser.role]}
        </p>
      </div>

      {[
        { icon: User, label: "Profile" },
        { icon: Settings, label: "Settings" },
      ].map(({ icon: Icon, label }) => (
        <button
          key={label}
          role="menuitem"
          onClick={onClose}
          className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-foreground hover:bg-muted transition-colors"
        >
          <Icon className="size-3.5 text-muted-foreground" />
          {label}
        </button>
      ))}

      <hr className="my-1 border-border" />

      <button
        role="menuitem"
        onClick={onClose}
        className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-destructive hover:bg-destructive/10 transition-colors"
      >
        <LogOut className="size-3.5" />
        Sign out
      </button>
    </div>
  );
}

// ─── App Header ────────────────────────────────────────────────────

interface AppHeaderProps {
  onMenuClick: () => void;
  className?: string;
}

export function AppHeader({ onMenuClick, className }: AppHeaderProps) {
  const [notifOpen, setNotifOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);

  const unreadCount = mockNotifications.filter((n) => !n.read).length;

  const closeAll = () => {
    setNotifOpen(false);
    setUserOpen(false);
  };

  return (
    <>
      {/* Overlay to close dropdowns */}
      {(notifOpen || userOpen) && (
        <div
          className="fixed inset-0 z-40"
          onClick={closeAll}
          aria-hidden="true"
        />
      )}

      <header
        className={cn(
          "sticky top-0 z-30 flex items-center h-[52px] px-4 bg-background/95 backdrop-blur-sm border-b border-border gap-3",
          className
        )}
      >
        {/* Mobile menu trigger */}
        <button
          onClick={onMenuClick}
          className="lg:hidden flex items-center justify-center w-8 h-8 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          aria-label="Open navigation"
        >
          <Menu className="size-4" />
        </button>

        {/* Search trigger */}
        <SearchTrigger />

        {/* Spacer */}
        <div className="flex-1" />

        {/* Right actions */}
        <div className="flex items-center gap-1">

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => {
                setNotifOpen((v) => !v);
                setUserOpen(false);
              }}
              className={cn(
                "relative flex items-center justify-center w-8 h-8 rounded-md transition-colors",
                "text-muted-foreground hover:text-foreground hover:bg-muted",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                notifOpen && "bg-muted text-foreground"
              )}
              aria-label={`Notifications${unreadCount > 0 ? `, ${unreadCount} unread` : ""}`}
              aria-expanded={notifOpen}
            >
              <Bell className="size-4" />
              {unreadCount > 0 && (
                <span
                  className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-accent ring-2 ring-background"
                  aria-hidden="true"
                />
              )}
            </button>

            {notifOpen && (
              <NotificationPanel onClose={closeAll} />
            )}
          </div>

          {/* Vertical separator */}
          <div className="w-px h-4 bg-border mx-1" aria-hidden="true" />

          {/* User menu */}
          <div className="relative">
            <button
              onClick={() => {
                setUserOpen((v) => !v);
                setNotifOpen(false);
              }}
              className={cn(
                "flex items-center gap-1.5 rounded-md pl-1 pr-1.5 py-1 transition-colors",
                "hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                userOpen && "bg-muted"
              )}
              aria-label="User menu"
              aria-expanded={userOpen}
            >
              <UserAvatar
                name={currentUser.name}
                initials={currentUser.initials}
                size="sm"
              />
              <ChevronDown
                className={cn(
                  "size-3 text-muted-foreground transition-transform duration-150 hidden sm:block",
                  userOpen && "rotate-180"
                )}
              />
            </button>

            {userOpen && (
              <UserDropdown onClose={closeAll} />
            )}
          </div>
        </div>
      </header>
    </>
  );
}
