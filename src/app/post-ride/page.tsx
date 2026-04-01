"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { MapPin, Navigation, Calendar, Car, DollarSign, ArrowRight, Plus, Route } from 'lucide-react';
import Link from 'next/link';

// Helper for fetching vehicles
async function getVehicles(token: string) {
    const res = await fetch('/api/vehicles', {
        headers: { 'Authorization': `Bearer ${token}` }
    });
    if (!res.ok) throw new Error('Failed to fetch vehicles');
    return res.json();
}

export default function PostRidePage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [vehicles, setVehicles] = useState<any[]>([]);
    const [token, setToken] = useState<string | null>(null);
    const [newStop, setNewStop] = useState('');

    const [formData, setFormData] = useState({
        direction: 'TO_COLLEGE',
        origin: '',
        destination: '',
        departureTime: '',
        vehicleId: '',
        seatPrice: '',
        availableSeats: '3',
        stops: [] as string[],
    });

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (!storedToken) {
            router.push('/login');
            return;
        }
        setToken(storedToken);

        getVehicles(storedToken)
            .then(data => {
                setVehicles(data);
                if (data.length > 0) {
                    setFormData(prev => ({ ...prev, vehicleId: data[0].id }));
                }
            })
            .catch(err => console.error(err));
    }, [router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!token) return;
        setLoading(true);

        try {
            const res = await fetch('/api/rides', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    origin: formData.origin,
                    destination: formData.destination,
                    departureTime: formData.departureTime,
                    vehicleId: formData.vehicleId,
                    seatPrice: formData.seatPrice
                })
            });

            if (res.ok) {
                alert('Ride posted successfully!');
                router.push('/my-journeys');
            } else {
                const error = await res.json();
                alert(error.error || 'Failed to post ride');
            }
        } catch (error) {
            console.error(error);
            alert('An error occurred');
        } finally {
            setLoading(false);
        }
    };

    const addStop = () => {
        if (!newStop.trim()) return;
        setFormData(prev => ({ ...prev, stops: [...prev.stops, newStop.trim()] }));
        setNewStop('');
    };

    return (
        <div className="grid gap-4 xl:grid-cols-[1.05fr_0.95fr]">
            <section className="rounded-[28px] border border-border/70 bg-card/90 p-6 shadow-[0_30px_80px_-45px_rgba(15,23,42,0.45)]">
                <div className="space-y-1">
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">Create Journey</p>
                    <h2 className="text-3xl font-semibold tracking-tight">Build your campus commute</h2>
                    <p className="text-sm text-muted-foreground">Define the direction, route stops, vehicle, seats, and fare.</p>
                </div>

                <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                    <div className="space-y-2">
                        <label className="flex items-center gap-2 text-sm font-medium">
                            <Route className="h-4 w-4 text-primary" /> Journey Direction
                        </label>
                        <div className="grid gap-3 md:grid-cols-3">
                            {[
                                ['TO_COLLEGE', 'To College'],
                                ['FROM_COLLEGE', 'From College'],
                                ['CUSTOM', 'Custom Route'],
                            ].map(([value, label]) => (
                                <button
                                    key={value}
                                    type="button"
                                    onClick={() => setFormData({ ...formData, direction: value })}
                                    className={`rounded-2xl border px-4 py-3 text-sm font-medium transition ${
                                        formData.direction === value
                                            ? 'border-primary bg-primary text-primary-foreground'
                                            : 'border-border bg-background hover:bg-accent'
                                    }`}
                                >
                                    {label}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <label className="text-sm font-medium flex items-center gap-2">
                                <MapPin className="h-4 w-4 text-primary" /> From
                            </label>
                            <input
                                required
                                type="text"
                                placeholder="e.g. Whitefield"
                                className="w-full rounded-2xl border border-border bg-background p-4 focus:outline-none focus:ring-2 focus:ring-primary/20"
                                value={formData.origin}
                                onChange={e => setFormData({ ...formData, origin: e.target.value })}
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium flex items-center gap-2">
                                <Navigation className="h-4 w-4 text-secondary" /> To
                            </label>
                            <input
                                required
                                type="text"
                                placeholder="e.g. University Campus"
                                className="w-full rounded-2xl border border-border bg-background p-4 focus:outline-none focus:ring-2 focus:ring-primary/20"
                                value={formData.destination}
                                onChange={e => setFormData({ ...formData, destination: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="space-y-3">
                        <label className="text-sm font-medium">Pickup Stops</label>
                        <div className="flex gap-3">
                            <input
                                type="text"
                                placeholder="Add a pickup landmark"
                                className="flex-1 rounded-2xl border border-border bg-background p-4 focus:outline-none focus:ring-2 focus:ring-primary/20"
                                value={newStop}
                                onChange={e => setNewStop(e.target.value)}
                            />
                            <button
                                type="button"
                                onClick={addStop}
                                className="inline-flex items-center gap-2 rounded-2xl border border-border bg-background px-4 py-3 text-sm font-semibold"
                            >
                                <Plus className="h-4 w-4" />
                                Add Stop
                            </button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {formData.stops.length === 0 ? (
                                <span className="text-sm text-muted-foreground">No stops added yet.</span>
                            ) : (
                                formData.stops.map(stop => (
                                    <span key={stop} className="rounded-full border border-border bg-accent px-3 py-1.5 text-xs font-medium">
                                        {stop}
                                    </span>
                                ))
                            )}
                        </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <label className="text-sm font-medium flex items-center gap-2">
                                <Calendar className="h-4 w-4 text-muted-foreground" /> Departure Time
                            </label>
                            <input
                                required
                                type="datetime-local"
                                className="w-full rounded-2xl border border-border bg-background p-4 focus:outline-none focus:ring-2 focus:ring-primary/20"
                                value={formData.departureTime}
                                onChange={e => setFormData({ ...formData, departureTime: e.target.value })}
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium flex items-center gap-2">
                                <Car className="h-4 w-4 text-muted-foreground" /> Vehicle
                            </label>
                            {vehicles.length > 0 ? (
                                <select
                                    className="w-full appearance-none rounded-2xl border border-border bg-background p-4 focus:outline-none focus:ring-2 focus:ring-primary/20"
                                    value={formData.vehicleId}
                                    onChange={e => setFormData({ ...formData, vehicleId: e.target.value })}
                                >
                                    {vehicles.map(v => (
                                        <option key={v.id} value={v.id}>
                                            {v.model} ({v.plateNumber})
                                        </option>
                                    ))}
                                </select>
                            ) : (
                                <Link href="/vehicles/add" className="block w-full rounded-2xl bg-primary/10 p-4 text-center text-sm font-semibold text-primary transition hover:bg-primary/20">
                                    Add Vehicle First
                                </Link>
                            )}
                        </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Available Seats</label>
                            <input
                                required
                                type="number"
                                min="1"
                                max="6"
                                className="w-full rounded-2xl border border-border bg-background p-4 focus:outline-none focus:ring-2 focus:ring-primary/20"
                                value={formData.availableSeats}
                                onChange={e => setFormData({ ...formData, availableSeats: e.target.value })}
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium flex items-center gap-2">
                                <DollarSign className="h-4 w-4 text-muted-foreground" /> Price per Seat
                            </label>
                            <input
                                required
                                type="number"
                                placeholder="40"
                                className="w-full rounded-2xl border border-border bg-background p-4 focus:outline-none focus:ring-2 focus:ring-primary/20"
                                value={formData.seatPrice}
                                onChange={e => setFormData({ ...formData, seatPrice: e.target.value })}
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading || vehicles.length === 0}
                        className="flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-4 py-4 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {loading ? 'Posting...' : (
                            <>
                                Publish Journey <ArrowRight className="h-5 w-5" />
                            </>
                        )}
                    </button>
                </form>
            </section>

            <section className="space-y-4">
                <div className="rounded-[28px] border border-border/70 bg-card/90 p-5 shadow-[0_30px_80px_-45px_rgba(15,23,42,0.45)]">
                    <p className="text-lg font-semibold">Route preview area</p>
                    <div className="mt-4 h-[260px] rounded-[24px] border border-border bg-[radial-gradient(circle_at_top_left,rgba(255,122,84,0.18),transparent_22%),radial-gradient(circle_at_bottom_right,rgba(14,165,233,0.18),transparent_20%),linear-gradient(180deg,#fff,#f7f3ef)] p-5">
                        <div className="rounded-2xl bg-card/85 p-4 shadow-sm">
                            <p className="text-sm font-semibold">{formData.origin || 'Start location'} to {formData.destination || 'Destination'}</p>
                            <p className="mt-2 text-sm leading-6 text-muted-foreground">
                                Map route preview will be wired here with Leaflet in the next pass. Stops and direction are already reflected in the form flow.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="rounded-[28px] border border-border/70 bg-card/90 p-5 shadow-[0_30px_80px_-45px_rgba(15,23,42,0.45)]">
                    <p className="text-lg font-semibold">Current prototype notes</p>
                    <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                        <li>Direction and stops are in the UI now.</li>
                        <li>Stops are still frontend-only until the schema is extended.</li>
                        <li>Vehicle selection still uses the existing API.</li>
                    </ul>
                </div>
            </section>
        </div>
    );
}
