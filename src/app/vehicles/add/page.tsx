"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { PlusCircle, Loader2 } from 'lucide-react';

export default function AddVehiclePage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        model: '',
        plateNumber: '',
        type: 'CAR', // Default
        capacity: '4'
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        const token = localStorage.getItem('token');

        try {
            const res = await fetch('/api/vehicles', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                alert('Vehicle added!');
                router.back(); // Go back to where they came from (likely Post Ride page)
            } else {
                alert('Failed to add vehicle');
            }
        } catch (error) {
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold">Add New Vehicle</h1>

            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    required
                    placeholder="Model (e.g. Swift Dzire)"
                    className="w-full p-3 rounded-xl bg-card border border-border"
                    value={formData.model}
                    onChange={e => setFormData({ ...formData, model: e.target.value })}
                />
                <input
                    required
                    placeholder="Plate Number (e.g. KA-05-AB-1234)"
                    className="w-full p-3 rounded-xl bg-card border border-border"
                    value={formData.plateNumber}
                    onChange={e => setFormData({ ...formData, plateNumber: e.target.value })}
                />

                <div className="grid grid-cols-2 gap-4">
                    <select
                        className="w-full p-3 rounded-xl bg-card border border-border"
                        value={formData.type}
                        onChange={e => setFormData({ ...formData, type: e.target.value })}
                    >
                        <option value="CAR">Car</option>
                        <option value="BIKE">Bike</option>
                    </select>

                    <input
                        type="number"
                        placeholder="Seats"
                        className="w-full p-3 rounded-xl bg-card border border-border"
                        value={formData.capacity}
                        onChange={e => setFormData({ ...formData, capacity: e.target.value })}
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-primary text-primary-foreground font-bold py-3 rounded-xl flex items-center justify-center gap-2"
                >
                    {loading ? <Loader2 className="animate-spin" /> : <PlusCircle />}
                    Add Vehicle
                </button>
            </form>
        </div>
    );
}
