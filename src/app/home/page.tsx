import Link from 'next/link';
import { ArrowRight, Clock3, Map, MessageSquareMore, ShieldCheck, Sparkles } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="grid gap-4 xl:grid-cols-[1.25fr_0.75fr]">
      <section className="space-y-4 rounded-[28px] border border-border/70 bg-card/90 p-6 shadow-[0_30px_80px_-45px_rgba(15,23,42,0.45)]">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">Home</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight">Choose what you want to do next.</h2>
          </div>
          <div className="hidden rounded-full bg-accent px-4 py-2 text-sm font-medium text-foreground lg:block">
            Desktop prototype active
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <ActionCard
            href="/post-ride"
            title="Create Journey"
            description="Publish a route to college or from campus with stops, seats, and fare."
            icon={<Map className="h-5 w-5" />}
            accent="from-[rgba(255,121,84,0.18)] to-[rgba(255,255,255,0.6)]"
          />
          <ActionCard
            href="/journeys"
            title="Ongoing Journeys"
            description="Browse active routes posted by other students and request a seat."
            icon={<ArrowRight className="h-5 w-5" />}
            accent="from-[rgba(34,197,94,0.16)] to-[rgba(255,255,255,0.6)]"
          />
        </div>

        <div className="rounded-[28px] border border-border/80 bg-background p-5">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold">What makes this version useful</h3>
          </div>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            <InfoTile title="Map-first rides" description="Routes, stops, and direction stay central to the product." />
            <InfoTile title="Trusted network" description="Verification is visible before riders book or message." />
            <InfoTile title="Built-in chat" description="Right rail keeps DMs and ride groups close to the journey flow." />
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <div className="rounded-[28px] border border-border/70 bg-card/90 p-5 shadow-[0_30px_80px_-45px_rgba(15,23,42,0.45)]">
          <div className="flex items-center gap-2">
            <Clock3 className="h-5 w-5 text-secondary" />
            <h3 className="text-lg font-semibold">Recent commute context</h3>
          </div>
          <div className="mt-4 space-y-3">
            <TimelineItem title="Tomorrow, 8:10 AM" text="Whitefield to Campus via Graphite India." />
            <TimelineItem title="Last booking accepted" text="You joined Rahul's route from Marathahalli." />
            <TimelineItem title="Chat reminder" text="Whitefield Route group has 3 unread messages." />
          </div>
        </div>

        <div className="rounded-[28px] border border-border/70 bg-card/90 p-5 shadow-[0_30px_80px_-45px_rgba(15,23,42,0.45)]">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold">Trust and access</h3>
          </div>
          <div className="mt-4 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-900">
            Your profile is verified, so you can post rides, request seats, and join ride groups.
          </div>
          <Link href="/profile" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary">
            Open profile and verification
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="rounded-[28px] border border-border/70 bg-card/90 p-5 shadow-[0_30px_80px_-45px_rgba(15,23,42,0.45)]">
          <div className="flex items-center gap-2">
            <MessageSquareMore className="h-5 w-5 text-secondary" />
            <h3 className="text-lg font-semibold">Communication ready</h3>
          </div>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            Direct chats are useful for pickup coordination. Ride group chats keep the driver and approved riders in one thread.
          </p>
        </div>
      </section>
    </div>
  );
}

function ActionCard({
  href,
  title,
  description,
  icon,
  accent,
}: {
  href: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  accent: string;
}) {
  return (
    <Link
      href={href}
      className={`rounded-[28px] border border-border/70 bg-[linear-gradient(135deg,var(--tw-gradient-stops))] ${accent} p-5 transition hover:-translate-y-0.5`}
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-card text-primary">{icon}</div>
      <h3 className="mt-5 text-2xl font-semibold tracking-tight">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-muted-foreground">{description}</p>
      <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-foreground">
        Open
        <ArrowRight className="h-4 w-4" />
      </span>
    </Link>
  );
}

function InfoTile({ title, description }: { title: string; description: string }) {
  return (
    <div className="rounded-2xl border border-border/80 bg-card p-4">
      <p className="text-sm font-semibold">{title}</p>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">{description}</p>
    </div>
  );
}

function TimelineItem({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-2xl border border-border/80 bg-background p-4">
      <p className="text-sm font-semibold">{title}</p>
      <p className="mt-1 text-sm text-muted-foreground">{text}</p>
    </div>
  );
}
