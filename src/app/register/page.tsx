"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { UserPlus, User, Lock, Mail, GraduationCap, Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function RegisterPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        department: '' // Optional for MVP but good to have
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const res = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const data = await res.json();

            if (res.ok) {
                // Store token
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));

                // Redirect to dashboard (or verification page later)
                router.push('/dashboard');
            } else {
                setError(data.error || 'Registration failed');
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] w-full px-4 py-8">
            <div className="w-full max-w-sm space-y-8">
                <div className="text-center space-y-2">
                    <h1 className="text-3xl font-bold text-foreground">Create Account</h1>
                    <p className="text-muted-foreground text-sm">Join the student community</p>
                </div>

                {error && (
                    <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-lg text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Name */}
                    <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <input
                            required
                            type="text"
                            placeholder="Full Name"
                            className="w-full pl-10 p-3 rounded-xl bg-card border border-border focus:ring-2 focus:ring-primary focus:outline-none"
                            value={formData.name}
                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                        />
                    </div>

                    {/* Email */}
                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <input
                            required
                            type="email"
                            placeholder="College Email"
                            className="w-full pl-10 p-3 rounded-xl bg-card border border-border focus:ring-2 focus:ring-primary focus:outline-none"
                            value={formData.email}
                            onChange={e => setFormData({ ...formData, email: e.target.value })}
                        />
                    </div>

                    {/* Password */}
                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <input
                            required
                            type="password"
                            placeholder="Password"
                            className="w-full pl-10 p-3 rounded-xl bg-card border border-border focus:ring-2 focus:ring-primary focus:outline-none"
                            value={formData.password}
                            onChange={e => setFormData({ ...formData, password: e.target.value })}
                        />
                    </div>

                    {/* Department (Optional Visual) */}
                    <div className="relative">
                        <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Department (e.g. CS 3rd Year) - Optional"
                            className="w-full pl-10 p-3 rounded-xl bg-card border border-border focus:ring-2 focus:ring-primary focus:outline-none"
                            value={formData.department}
                            onChange={e => setFormData({ ...formData, department: e.target.value })}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground font-bold py-3.5 rounded-xl shadow-lg shadow-secondary/20 flex items-center justify-center gap-2 transition-all active:scale-[0.98] mt-4"
                    >
                        {loading ? <Loader2 className="animate-spin w-5 h-5" /> : <UserPlus className="w-5 h-5" />}
                        Create Account
                    </button>
                </form>

                <p className="text-center text-sm text-muted-foreground">
                    Already have an account?{' '}
                    <Link href="/login" className="text-secondary font-semibold hover:underline">
                        Login here
                    </Link>
                </p>
            </div>
        </div>
    );
}
