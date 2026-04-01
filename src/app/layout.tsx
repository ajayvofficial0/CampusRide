import AppShell from '@/components/AppShell';
import './globals.css';

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className="min-h-screen bg-background text-foreground antialiased">
                <AppShell>{children}</AppShell>
            </body>
        </html>
    );
}
