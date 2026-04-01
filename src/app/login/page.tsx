"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, Loader2, Smartphone, ShieldCheck } from 'lucide-react';

export default function LoginPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [step, setStep] = useState<'phone' | 'otp'>('phone');

    const [formData, setFormData] = useState({
        phone: '',
        otp: ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            if (step === 'phone') {
                if (!/^\d{10}$/.test(formData.phone)) {
                    setError('Enter a valid 10 digit mobile number.');
                } else {
                    setStep('otp');
                }
            } else if (formData.otp === '123456') {
                localStorage.setItem('token', 'dev-demo-token');
                localStorage.setItem(
                    'user',
                    JSON.stringify({
                        name: 'Aarav Kumar',
                        phone: formData.phone,
                        department: 'CSE 3rd Year',
                        isVerified: true,
                    })
                );
                router.push('/home');
            } else {
                setError('Use 123456 for the dev OTP.');
            }
        } catch {
            setError('An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center px-4 py-10">
            <div className="grid w-full max-w-6xl overflow-hidden rounded-[36px] border border-border/70 bg-card shadow-[0_40px_120px_-55px_rgba(15,23,42,0.55)] lg:grid-cols-[1.1fr_0.9fr]">
                <div className="relative hidden overflow-hidden bg-[radial-gradient(circle_at_top_left,rgba(255,122,84,0.95),rgba(255,255,255,0)_38%),linear-gradient(150deg,#0f172a,#18212e_55%,#203449)] p-10 text-white lg:block">
                    <div className="relative z-10 max-w-md">
                        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-white/70">CampusRide</p>
                        <h1 className="mt-6 text-5xl font-semibold leading-tight tracking-tight">
                            Your college commute, designed like a premium network.
                        </h1>
                        <p className="mt-6 text-base leading-7 text-white/78">
                            Create rides, join trusted journeys, and coordinate with verified students across campus.
                        </p>
                    </div>

                    <div className="relative z-10 mt-16 grid gap-4">
                        <FeatureCard title="Route-first journeys" description="Create and discover rides with pickup points, campus direction, and clear route context." />
                        <FeatureCard title="Trusted community" description="Verification is visible across the shell so rides stay college-focused and safer." />
                        <FeatureCard title="Messaging built in" description="Direct chats and ride groups stay available while you browse or manage rides." />
                    </div>
                </div>

                <div className="flex items-center justify-center bg-card px-6 py-10 sm:px-10">
                    <div className="w-full max-w-md space-y-8">
                        <div className="space-y-3">
                            <div className="inline-flex items-center gap-2 rounded-full bg-accent px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                                <ShieldCheck className="h-4 w-4" />
                                Dev OTP mode
                            </div>
                            <h2 className="text-4xl font-semibold tracking-tight text-foreground">Sign in with mobile OTP</h2>
                            <p className="text-sm leading-6 text-muted-foreground">
                                Enter your number first. For this prototype, the OTP is always <span className="font-semibold text-foreground">123456</span>.
                            </p>
                        </div>

                        {error && (
                            <div className="rounded-2xl border border-destructive/20 bg-destructive/10 p-3 text-sm text-destructive">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-foreground">Mobile Number</label>
                                <div className="relative">
                                    <Smartphone className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                                    <input
                                        required
                                        type="tel"
                                        inputMode="numeric"
                                        maxLength={10}
                                        placeholder="Enter 10 digit number"
                                        className="w-full rounded-2xl border border-border bg-background py-4 pl-12 pr-4 text-base outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                                        value={formData.phone}
                                        onChange={e => setFormData({ ...formData, phone: e.target.value.replace(/\D/g, '') })}
                                    />
                                </div>
                            </div>

                            <div className={`space-y-2 transition ${step === 'otp' ? 'opacity-100' : 'pointer-events-none opacity-50'}`}>
                                <label className="text-sm font-medium text-foreground">OTP</label>
                                <input
                                    required={step === 'otp'}
                                    type="text"
                                    inputMode="numeric"
                                    maxLength={6}
                                    placeholder="Enter OTP"
                                    className="w-full rounded-2xl border border-border bg-background px-4 py-4 text-base tracking-[0.35em] outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                                    value={formData.otp}
                                    onChange={e => setFormData({ ...formData, otp: e.target.value.replace(/\D/g, '') })}
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-4 py-4 text-sm font-semibold text-primary-foreground transition hover:opacity-95 disabled:opacity-70"
                            >
                                {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <ArrowRight className="h-5 w-5" />}
                                {step === 'phone' ? 'Send OTP' : 'Enter App'}
                            </button>
                        </form>

                        <div className="rounded-[24px] border border-border bg-background p-4">
                            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Prototype flow</p>
                            <ol className="mt-3 space-y-2 text-sm text-foreground">
                                <li>1. Enter your mobile number.</li>
                                <li>2. Use the fixed dev OTP `123456`.</li>
                                <li>3. Land inside the desktop shell prototype.</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function FeatureCard({ title, description }: { title: string; description: string }) {
    return (
        <div className="rounded-[28px] border border-white/10 bg-white/8 p-5 backdrop-blur-sm">
            <p className="text-lg font-semibold">{title}</p>
            <p className="mt-2 text-sm leading-6 text-white/72">{description}</p>
        </div>
    );
}
