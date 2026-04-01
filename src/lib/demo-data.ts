import prisma from '@/lib/prisma';
import { BookingStatus, RideStatus, Role, VehicleType } from '@prisma/client';

const demoUserEmail = 'aarav.kumar.demo@campusride.local';

const demoDrivers = [
  {
    email: demoUserEmail,
    name: 'Aarav Kumar',
    department: 'CSE 3rd Year',
    isVerified: true,
    vehicle: { model: 'Swift Dzire', plateNumber: 'KA-05-MK-1204', type: VehicleType.CAR, capacity: 4 },
  },
  {
    email: 'rahul.mehta.demo@campusride.local',
    name: 'Rahul Mehta',
    department: 'ECE 4th Year',
    isVerified: true,
    vehicle: { model: 'Hyundai i20', plateNumber: 'KA-03-RM-4481', type: VehicleType.CAR, capacity: 4 },
  },
  {
    email: 'sneha.patel.demo@campusride.local',
    name: 'Sneha Patel',
    department: 'ISE 3rd Year',
    isVerified: true,
    vehicle: { model: 'Activa 6G', plateNumber: 'KA-01-SP-8822', type: VehicleType.BIKE, capacity: 2 },
  },
];

const demoRiders = [
  {
    email: 'ananya.sharma.demo@campusride.local',
    name: 'Ananya Sharma',
    department: 'AIML 2nd Year',
    isVerified: true,
  },
];

const demoRides = [
  {
    driverEmail: 'rahul.mehta.demo@campusride.local',
    origin: 'Whitefield',
    destination: 'Campus Main Gate',
    departureTime: '2026-04-02T08:10:00.000Z',
    seatPrice: 40,
  },
  {
    driverEmail: 'sneha.patel.demo@campusride.local',
    origin: 'Marathahalli Bridge',
    destination: 'Campus Main Gate',
    departureTime: '2026-04-02T08:30:00.000Z',
    seatPrice: 30,
  },
  {
    driverEmail: demoUserEmail,
    origin: 'Campus Main Gate',
    destination: 'Whitefield',
    departureTime: '2026-04-02T17:45:00.000Z',
    seatPrice: 50,
  },
];

const routeStopsByKey: Record<string, string[]> = {
  'Whitefield->Campus Main Gate': ['Forum Signal', 'Graphite India', 'Marathahalli Bridge'],
  'Marathahalli Bridge->Campus Main Gate': ['Kalamandir Junction', 'HAL Underpass'],
  'Campus Main Gate->Whitefield': ['Marathahalli Bridge', 'Graphite India', 'Hope Farm'],
};

export async function ensureDemoDataset() {
  const users = [];

  for (const driver of demoDrivers) {
    const user = await prisma.user.upsert({
      where: { email: driver.email },
      update: {
        name: driver.name,
        department: driver.department,
        isVerified: driver.isVerified,
      },
      create: {
        email: driver.email,
        passwordHash: 'demo-auth-disabled',
        name: driver.name,
        department: driver.department,
        isVerified: driver.isVerified,
        role: Role.STUDENT,
      },
    });

    users.push(user);

    const existingVehicle = await prisma.vehicle.findFirst({
      where: {
        ownerId: user.id,
        plateNumber: driver.vehicle.plateNumber,
      },
    });

    if (existingVehicle) {
      await prisma.vehicle.update({
        where: { id: existingVehicle.id },
        data: {
          model: driver.vehicle.model,
          type: driver.vehicle.type,
          capacity: driver.vehicle.capacity,
        },
      });
    } else {
      await prisma.vehicle.create({
        data: {
          ownerId: user.id,
          model: driver.vehicle.model,
          plateNumber: driver.vehicle.plateNumber,
          type: driver.vehicle.type,
          capacity: driver.vehicle.capacity,
        },
      });
    }
  }

  for (const rider of demoRiders) {
    const user = await prisma.user.upsert({
      where: { email: rider.email },
      update: {
        name: rider.name,
        department: rider.department,
        isVerified: rider.isVerified,
      },
      create: {
        email: rider.email,
        passwordHash: 'demo-auth-disabled',
        name: rider.name,
        department: rider.department,
        isVerified: rider.isVerified,
        role: Role.STUDENT,
      },
    });

    users.push(user);
  }

  const userByEmail = new Map(users.map((user) => [user.email, user]));

  for (const ride of demoRides) {
    const driver = userByEmail.get(ride.driverEmail);
    if (!driver) continue;

    const vehicle = await prisma.vehicle.findFirst({
      where: { ownerId: driver.id },
      orderBy: { createdAt: 'asc' },
    });

    if (!vehicle) continue;

    const existingRide = await prisma.ride.findFirst({
      where: {
        driverId: driver.id,
        origin: ride.origin,
        destination: ride.destination,
        departureTime: new Date(ride.departureTime),
      },
    });

    if (!existingRide) {
      await prisma.ride.create({
        data: {
          driverId: driver.id,
          vehicleId: vehicle.id,
          origin: ride.origin,
          destination: ride.destination,
          departureTime: new Date(ride.departureTime),
          seatPrice: ride.seatPrice,
          status: RideStatus.SCHEDULED,
        },
      });
    }
  }

  const rahul = userByEmail.get('rahul.mehta.demo@campusride.local');
  const aarav = userByEmail.get(demoUserEmail);

  if (rahul && aarav) {
    const rahulRide = await prisma.ride.findFirst({
      where: {
        driverId: rahul.id,
        origin: 'Whitefield',
        destination: 'Campus Main Gate',
      },
      orderBy: { departureTime: 'asc' },
    });

    if (rahulRide) {
      const existingBooking = await prisma.booking.findFirst({
        where: {
          rideId: rahulRide.id,
          passengerId: aarav.id,
        },
      });

      if (existingBooking) {
        await prisma.booking.update({
          where: { id: existingBooking.id },
          data: { status: BookingStatus.APPROVED },
        });
      } else {
        await prisma.booking.create({
          data: {
            rideId: rahulRide.id,
            passengerId: aarav.id,
            status: BookingStatus.APPROVED,
          },
        });
      }
    }
  }

  const ananya = userByEmail.get('ananya.sharma.demo@campusride.local');

  if (aarav && ananya) {
    const aaravRide = await prisma.ride.findFirst({
      where: {
        driverId: aarav.id,
        origin: 'Campus Main Gate',
        destination: 'Whitefield',
      },
      orderBy: { departureTime: 'asc' },
    });

    if (aaravRide) {
      const existingRequest = await prisma.booking.findFirst({
        where: {
          rideId: aaravRide.id,
          passengerId: ananya.id,
        },
      });

      if (existingRequest) {
        await prisma.booking.update({
          where: { id: existingRequest.id },
          data: { status: BookingStatus.PENDING },
        });
      } else {
        await prisma.booking.create({
          data: {
            rideId: aaravRide.id,
            passengerId: ananya.id,
            status: BookingStatus.PENDING,
          },
        });
      }
    }
  }

  return {
    currentUser: users[0],
  };
}

export async function getDemoUser() {
  const { currentUser } = await ensureDemoDataset();
  return currentUser;
}

export async function ensureDemoBooking(rideId: string, passengerId: string) {
  return prisma.booking.create({
    data: {
      rideId,
      passengerId,
      status: BookingStatus.PENDING,
    },
  });
}

export function getDemoStops(origin: string, destination: string) {
  return routeStopsByKey[`${origin}->${destination}`] ?? [];
}
