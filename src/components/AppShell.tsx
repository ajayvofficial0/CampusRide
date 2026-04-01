"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  BadgeCheck,
  CarFront,
  ChevronRight,
  CircleUserRound,
  LogOut,
  MapPinned,
  MessageSquareMore,
  PlusSquare,
  Search,
  Settings,
  ShieldAlert,
  Ticket,
  UserRound,
} from 'lucide-react';

type NavItem = {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
};

const navItems: NavItem[] = [
  { href: '/home', label: 'Home', icon: CircleUserRound },
  { href: '/journeys', label: 'Journeys', icon: MapPinned },
  { href: '/post-ride', label: 'Create Journey', icon: PlusSquare },
  { href: '/messages', label: 'Messages', icon: MessageSquareMore },
  { href: '/bookings', label: 'Bookings', icon: Ticket },
  { href: '/profile', label: 'Profile', icon: UserRound },
];

const recentChats = [
  { name: 'Whitefield Route', meta: 'Driver group chat', unread: 3 },
  { name: 'Ananya S', meta: 'Asked about pickup point', unread: 1 },
  { name: 'CS Hostel Circle', meta: 'Group planning tomorrow ride', unread: 0 },
];

const quickContacts = ['Rahul M', 'Sneha P', 'Transport Club', 'ECE Block Riders'];

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuthPage = pathname === '/login' || pathname === '/register';

  if (isAuthPage) {
    return <main className="min-h-screen">{children}</main>;
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto flex min-h-screen max-w-[1600px] gap-6 px-4 py-4 lg:px-6">
        <aside className="hidden w-[290px] shrink-0 rounded-[28px] border border-border/70 bg-card/90 p-6 shadow-[0_30px_80px_-45px_rgba(15,23,42,0.45)] backdrop-blur xl:flex xl:flex-col">
          <Link href="/home" className="mb-8 inline-flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
              <CarFront className="h-6 w-6" />
            </div>
            <div>
              <p className="text-lg font-semibold tracking-tight">CampusRide</p>
              <p className="text-xs text-muted-foreground">College carpool network</p>
            </div>
          </Link>

          <section className="rounded-[24px] border border-border/80 bg-background/70 p-5">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,rgba(255,104,111,0.16),rgba(33,150,243,0.18))]">
                <UserRound className="h-8 w-8 text-foreground" />
              </div>
              <div className="min-w-0">
                <p className="truncate text-base font-semibold">Aarav Kumar</p>
                <p className="text-sm text-muted-foreground">CSE 3rd Year</p>
                <p className="mt-1 text-xs font-medium text-secondary">Usually from Whitefield</p>
              </div>
            </div>

            <div className="mt-5 rounded-2xl border border-emerald-200/70 bg-emerald-50 px-4 py-3 text-emerald-900">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <BadgeCheck className="h-4 w-4" />
                Verified Student
              </div>
              <p className="mt-1 text-xs text-emerald-700">You can create rides, request seats, and join group chats.</p>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-2 text-center">
              <Metric value="12" label="Created" />
              <Metric value="19" label="Joined" />
              <Metric value="27" label="Trips" />
            </div>
          </section>

          <nav className="mt-8 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active =
                pathname === item.href ||
                (item.href === '/journeys' && pathname === '/dashboard') ||
                (item.href === '/post-ride' && pathname.startsWith('/vehicles'));

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-medium transition ${
                    active
                      ? 'bg-primary text-primary-foreground shadow-[0_20px_45px_-30px_rgba(255,104,111,0.8)]'
                      : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </span>
                  {active ? <ChevronRight className="h-4 w-4" /> : null}
                </Link>
              );
            })}
          </nav>

          <div className="mt-auto space-y-2 pt-8">
            <button className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm text-muted-foreground transition hover:bg-accent hover:text-foreground">
              <Settings className="h-4 w-4" />
              Settings
            </button>
            <button className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm text-muted-foreground transition hover:bg-accent hover:text-foreground">
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col gap-4">
          <header className="flex flex-col gap-4 rounded-[28px] border border-border/70 bg-card/90 px-5 py-5 shadow-[0_30px_80px_-45px_rgba(15,23,42,0.45)] backdrop-blur sm:px-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">College commute network</p>
                <h1 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">Book, create, and coordinate rides across campus.</h1>
              </div>
              <div className="hidden items-center gap-2 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-amber-900 lg:flex">
                <ShieldAlert className="h-4 w-4" />
                <span className="text-sm font-medium">Verification keeps the community trusted.</span>
              </div>
            </div>

            <div className="relative">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search places, journeys, or students"
                className="w-full rounded-2xl border border-border/80 bg-background px-11 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </header>

          <div className="min-h-0 flex-1">{children}</div>
        </div>

        <aside className="hidden w-[340px] shrink-0 rounded-[28px] border border-border/70 bg-card/90 p-5 shadow-[0_30px_80px_-45px_rgba(15,23,42,0.45)] backdrop-blur 2xl:flex 2xl:flex-col">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-lg font-semibold">Messages</p>
              <p className="text-sm text-muted-foreground">Direct chats and ride groups</p>
            </div>
            <div className="rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">4 unread</div>
          </div>

          <div className="mt-5 rounded-2xl bg-background p-3">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Recent chats</div>
            <div className="mt-3 space-y-2">
              {recentChats.map((chat) => (
                <button
                  key={chat.name}
                  className="flex w-full items-start gap-3 rounded-2xl px-3 py-3 text-left transition hover:bg-accent"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,rgba(255,104,111,0.14),rgba(33,150,243,0.16))] text-sm font-semibold">
                    {chat.name.charAt(0)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <p className="truncate text-sm font-semibold">{chat.name}</p>
                      {chat.unread > 0 ? (
                        <span className="rounded-full bg-primary px-2 py-0.5 text-[10px] font-semibold text-primary-foreground">
                          {chat.unread}
                        </span>
                      ) : null}
                    </div>
                    <p className="mt-0.5 text-xs text-muted-foreground">{chat.meta}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="mt-5 rounded-2xl bg-background p-4">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold">Quick contacts</p>
              <Link href="/messages" className="text-xs font-semibold text-primary">
                Open inbox
              </Link>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {quickContacts.map((contact) => (
                <span key={contact} className="rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-foreground">
                  {contact}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-5 rounded-2xl bg-[linear-gradient(180deg,rgba(255,104,111,0.08),rgba(255,255,255,0.75))] p-4">
            <p className="text-sm font-semibold">Ride group preview</p>
            <p className="mt-1 text-xs text-muted-foreground">Whitefield Route</p>
            <div className="mt-4 space-y-3 rounded-2xl bg-card/80 p-3">
              <ChatBubble author="Rahul" message="Leaving in 20 minutes from Forum signal." mine={false} />
              <ChatBubble author="You" message="I will board at Graphite India stop." mine />
              <ChatBubble author="Sneha" message="Got it, sharing live update once we start." mine={false} />
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

function Metric({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-2xl border border-border/80 bg-card px-2 py-3">
      <p className="text-lg font-semibold leading-none">{value}</p>
      <p className="mt-1 text-[11px] uppercase tracking-[0.14em] text-muted-foreground">{label}</p>
    </div>
  );
}

function ChatBubble({ author, message, mine }: { author: string; message: string; mine: boolean }) {
  return (
    <div className={`max-w-[88%] rounded-2xl px-3 py-2 ${mine ? 'ml-auto bg-primary text-primary-foreground' : 'bg-background'}`}>
      <p className={`text-[11px] font-semibold ${mine ? 'text-primary-foreground/80' : 'text-secondary'}`}>{author}</p>
      <p className="mt-1 text-sm">{message}</p>
    </div>
  );
}
