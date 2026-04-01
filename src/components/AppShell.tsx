import { getDemoConversations, getDemoShellData } from '@/lib/demo-content';
import AppShellClient from '@/components/AppShellClient';

export default async function AppShell({ children }: { children: React.ReactNode }) {
  const [shellData, conversations] = await Promise.all([getDemoShellData(), getDemoConversations()]);

  return (
    <AppShellClient shellData={shellData} conversations={conversations}>
      {children}
    </AppShellClient>
  );
}
