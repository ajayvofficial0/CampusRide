import { BadgeCheck, CarFront, IdCard, MapPinned, ShieldCheck } from 'lucide-react';
import { getDemoShellData } from '@/lib/demo-content';

export default async function ProfilePage() {
  const shellData = await getDemoShellData();

  return (
    <div className="grid gap-4 xl:grid-cols-[0.9fr_1.1fr]">
      <section className="rounded-[28px] border border-border/70 bg-card/90 p-6 shadow-[0_30px_80px_-45px_rgba(15,23,42,0.45)]">
        <div className="flex items-center gap-4">
          <div className="flex h-20 w-20 items-center justify-center rounded-[28px] bg-[linear-gradient(135deg,rgba(255,122,84,0.18),rgba(56,189,248,0.18))]">
            <BadgeCheck className="h-9 w-9 text-primary" />
          </div>
          <div>
            <p className="text-2xl font-semibold">{shellData.user.name}</p>
            <p className="text-sm text-muted-foreground">{shellData.user.department}</p>
            <p className="mt-1 text-sm font-medium text-secondary">{shellData.user.commuteLabel.replace('Usually', 'Usually commuting')}</p>
          </div>
        </div>

        <div className="mt-6 rounded-[24px] border border-emerald-200 bg-emerald-50 p-5">
          <div className="flex items-center gap-2 text-emerald-800">
            <ShieldCheck className="h-5 w-5" />
            <p className="text-base font-semibold">{shellData.user.isVerified ? 'Verified Student' : 'Pending Verification'}</p>
          </div>
          <p className="mt-2 text-sm text-emerald-700">Your verification is visible in the shell so riders and drivers can trust each other before booking or chatting.</p>
        </div>

        <div className="mt-6 grid gap-3">
          <ProfileStat icon={<CarFront className="h-4 w-4" />} label="Rides created" value={shellData.metrics.ridesCreated} />
          <ProfileStat icon={<MapPinned className="h-4 w-4" />} label="Rides joined" value={shellData.metrics.ridesJoined} />
          <ProfileStat icon={<IdCard className="h-4 w-4" />} label="College ID status" value={shellData.user.isVerified ? 'Approved' : 'Pending'} />
        </div>
      </section>

      <section className="space-y-4">
        <div className="rounded-[28px] border border-border/70 bg-card/90 p-6 shadow-[0_30px_80px_-45px_rgba(15,23,42,0.45)]">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">Profile and verification</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight">Trust belongs in the product shell, not hidden in settings.</h2>
          <p className="mt-4 text-sm leading-7 text-muted-foreground">
            This demo reads profile identity from the same shared source as the shell and bookings flow, so the app now feels like one coherent product rather than separate mock screens.
          </p>
        </div>

        <div className="rounded-[28px] border border-border/70 bg-card/90 p-6 shadow-[0_30px_80px_-45px_rgba(15,23,42,0.45)]">
          <p className="text-lg font-semibold">What should live here later</p>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {[
              'College verification management',
              'Preferred commute locations',
              'Saved vehicles',
              'Emergency contact setup',
            ].map((item) => (
              <div key={item} className="rounded-2xl border border-border bg-background p-4 text-sm text-muted-foreground">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function ProfileStat({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-border bg-background px-4 py-4">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-accent text-primary">{icon}</div>
        <p className="text-sm font-medium">{label}</p>
      </div>
      <p className="text-sm font-semibold">{value}</p>
    </div>
  );
}
