import prisma from '@/lib/prisma';
import { ensureDemoDataset, getDemoStops, getDemoUser } from '@/lib/demo-data';

export type DemoConversation = {
  id: string;
  title: string;
  type: string;
  meta: string;
  last: string;
  unread: number;
  messages: Array<{
    author: string;
    text: string;
    mine?: boolean;
  }>;
};

export async function getDemoShellData() {
  await ensureDemoDataset();
  const user = await getDemoUser();

  const [ridesCreated, ridesJoined, tripsCompleted] = await Promise.all([
    prisma.ride.count({ where: { driverId: user.id } }),
    prisma.booking.count({
      where: {
        passengerId: user.id,
        status: 'APPROVED',
      },
    }),
    prisma.booking.count({
      where: {
        OR: [{ passengerId: user.id }, { ride: { driverId: user.id } }],
        status: 'APPROVED',
      },
    }),
  ]);

  return {
    user: {
      name: user.name || 'Aarav Kumar',
      department: user.department || 'CSE 3rd Year',
      commuteLabel: 'Usually from Whitefield',
      isVerified: user.isVerified,
    },
    metrics: {
      ridesCreated: String(ridesCreated),
      ridesJoined: String(ridesJoined),
      tripsCompleted: String(tripsCompleted),
    },
  };
}

export async function getDemoConversations(): Promise<DemoConversation[]> {
  await ensureDemoDataset();
  const user = await getDemoUser();

  const approvedBooking = await prisma.booking.findFirst({
    where: {
      passengerId: user.id,
      status: 'APPROVED',
    },
    include: {
      ride: {
        include: {
          driver: {
            select: {
              name: true,
            },
          },
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  const myRideRequest = await prisma.booking.findFirst({
    where: {
      ride: { driverId: user.id },
      status: 'PENDING',
    },
    include: {
      passenger: {
        select: {
          name: true,
        },
      },
      ride: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  const rideGroupTitle = approvedBooking
    ? `${approvedBooking.ride.origin} Route`
    : 'Whitefield Route';
  const rideGroupStops = approvedBooking ? getDemoStops(approvedBooking.ride.origin, approvedBooking.ride.destination) : ['Graphite India'];
  const driverName = approvedBooking?.ride.driver.name || 'Rahul';
  const requesterName = myRideRequest?.passenger.name || 'Ananya S';

  return [
    {
      id: 'ride-group',
      title: rideGroupTitle,
      type: 'Ride group',
      meta: 'Driver group chat',
      last: `${driverName}: leaving in 20 minutes from ${rideGroupStops[0] || 'Forum signal'}.`,
      unread: 3,
      messages: [
        { author: driverName, text: `Starting from ${approvedBooking?.ride.origin || 'Whitefield'} in 20 mins. First stop is ${rideGroupStops[0] || 'Graphite India'}.` },
        { author: 'You', text: 'I will board at the signal near the bus stop.', mine: true },
        { author: 'Sneha', text: 'I am already on the way, should reach in 10 minutes.' },
        { author: driverName, text: 'Perfect. I will drop a ping once I cross Marathahalli bridge.' },
      ],
    },
    {
      id: 'direct-ananya',
      title: requesterName,
      type: 'Direct message',
      meta: 'Asked about pickup point',
      last: 'Can I board near Marathahalli bridge?',
      unread: 1,
      messages: [
        { author: requesterName, text: 'Can I board near Marathahalli bridge?' },
        { author: 'You', text: 'Yes, that stop works for this trip.', mine: true },
      ],
    },
    {
      id: 'community-group',
      title: 'CS Hostel Circle',
      type: 'Community group',
      meta: 'Group planning tomorrow ride',
      last: 'Anyone heading back after lab at 5?',
      unread: 0,
      messages: [
        { author: 'Transport Club', text: 'Anyone heading back after lab at 5?' },
      ],
    },
  ];
}
