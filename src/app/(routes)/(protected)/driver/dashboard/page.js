import { format } from "date-fns";
import prisma from "@/lib/prismadb";
import Client from "./components/client";
import { useRoleProtection } from "@/hooks/use-role-protection";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Page() {
  const hasAccess = await useRoleProtection("DRIVER");
  if (!hasAccess) {
    redirect("/unauthorized"); // Redirect user to the unauthorized page
  }

  // Fetch the current session (userId) 
  const session = await auth();

  // Fetch the driver record for the current user
  const driver = await prisma.driver.findUnique({
    where: {
      userId: session.user.id, // Find the driver by userId
    },
    include: {
      currentLocation: true, // Include the driver's current location
    },
  });

  // Fetch pending reports and reports accepted by the current driver
  const reports = await prisma.report.findMany({
    where: {
      OR: [
        { status: "PENDING" }, // Pending reports
        {
          assignment: {
            driverId: driver?.id, // Reports accepted by the current driver
          },
        },
      ],
    },
    include: {
      assignment: true, // Include assignment details
    },
  });

  // Format the reports for display
  const formattedReports = reports.map((report) => ({
    id: report.id,
    description: report.description,
    imageUrl: report.imageUrl,
    latitude: report.latitude,
    longitude: report.longitude,
    status: report.status,
    assignmentStatus: report.assignment?.status || null, // Include assignment status
    assignmentId: report.assignment?.id,
    createdAt: format(new Date(report.createdAt), "MMMM do, yyyy"),
    time: format(new Date(report.createdAt), "hh:mm a"),
  }));

  // Include the driver's current location in the data passed to the Client component
  const driverLocation = driver?.currentLocation
    ? {
        lat: driver.currentLocation.latitude,
        lng: driver.currentLocation.longitude,
      }
    : null;

  return (
    <div>
      <Client
        reports={formattedReports}
        driverLocation={driverLocation} // Pass the driver's current location
        driverId={driver.id}
      />
    </div>
  );
}