import { MessageSquareMore, Plus, UsersRound } from 'lucide-react';

const conversations = [
  {
    title: 'Whitefield Route',
    type: 'Ride group',
    last: 'Driver: leaving in 20 minutes from Forum signal.',
  },
  {
    title: 'Ananya S',
    type: 'Direct message',
    last: 'Can I board near Marathahalli bridge?',
  },
  {
    title: 'CS Hostel Circle',
    type: 'Community group',
    last: 'Anyone heading back after lab at 5?',
  },
];

export default function MessagesPage() {
  return (
    <div className="grid gap-4 xl:grid-cols-[0.95fr_1.05fr]">
      <section className="rounded-[28px] border border-border/70 bg-card/90 p-5 shadow-[0_30px_80px_-45px_rgba(15,23,42,0.45)]">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">Messages</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight">Inbox</h2>
          </div>
          <div className="flex gap-2">
            <button className="rounded-2xl border border-border bg-background p-3">
              <Plus className="h-4 w-4" />
            </button>
            <button className="rounded-2xl border border-border bg-background p-3">
              <UsersRound className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="mt-5 space-y-3">
          {conversations.map((conversation, index) => (
            <button
              key={conversation.title}
              className={`w-full rounded-[24px] border px-4 py-4 text-left transition ${
                index === 0 ? 'border-primary/30 bg-primary/10' : 'border-border bg-background hover:bg-accent'
              }`}
            >
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold">{conversation.title}</p>
                  <p className="mt-1 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
                    {conversation.type}
                  </p>
                </div>
                {index === 0 ? <span className="rounded-full bg-primary px-2 py-1 text-[10px] font-semibold text-primary-foreground">Live</span> : null}
              </div>
              <p className="mt-3 text-sm text-muted-foreground">{conversation.last}</p>
            </button>
          ))}
        </div>
      </section>

      <section className="rounded-[28px] border border-border/70 bg-card/90 p-5 shadow-[0_30px_80px_-45px_rgba(15,23,42,0.45)]">
        <div className="flex items-center gap-3 border-b border-border pb-4">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <MessageSquareMore className="h-5 w-5" />
          </div>
          <div>
            <p className="text-lg font-semibold">Whitefield Route</p>
            <p className="text-sm text-muted-foreground">Driver + 3 approved riders</p>
          </div>
        </div>

        <div className="space-y-4 py-6">
          <Bubble author="Rahul" text="Starting from Whitefield in 20 mins. First stop is Graphite India." />
          <Bubble author="You" text="I will board at the signal near the bus stop." mine />
          <Bubble author="Sneha" text="I am already on the way, should reach in 10 minutes." />
          <Bubble author="Rahul" text="Perfect. I will drop a ping once I cross Marathahalli bridge." />
        </div>

        <div className="rounded-[24px] border border-border bg-background p-3">
          <input
            type="text"
            placeholder="Type a message"
            className="w-full bg-transparent px-2 py-2 text-sm outline-none"
          />
        </div>
      </section>
    </div>
  );
}

function Bubble({ author, text, mine = false }: { author: string; text: string; mine?: boolean }) {
  return (
    <div className={`max-w-[80%] rounded-[22px] px-4 py-3 ${mine ? 'ml-auto bg-primary text-primary-foreground' : 'bg-background'}`}>
      <p className={`text-[11px] font-semibold uppercase tracking-[0.14em] ${mine ? 'text-primary-foreground/75' : 'text-secondary'}`}>{author}</p>
      <p className="mt-1 text-sm leading-6">{text}</p>
    </div>
  );
}
