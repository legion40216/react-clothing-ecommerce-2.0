import { useState } from "react"
import {
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from "@/components/ui/card"

import {
  Tabs,  
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs"
import ReportCard from "./report-list/report-card";

// Import the separated component

export default function ReportsList({
  reports,
  currentLocation,
  onStatusUpdate,
  isUpdatingStatus,
  onReportSelect,
  calculateDistance,
  onDelete
}) {
  const [activeTab, setActiveTab] = useState("pending");

  const filteredReports = reports.filter((report) => {
    switch (activeTab) {
      case "pending":
        return report.status === "PENDING";
      case "in-progress":
        return report.status === "ASSIGNED";
      case "completed":
        return report.status === "COMPLETED";
      default:
        return true;
    }
  });

  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <CardTitle>Collection Reports</CardTitle>
        <CardDescription>Manage your assigned collections</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <Tabs defaultValue="pending" onValueChange={setActiveTab}>
          <TabsList className="w-full">
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="in-progress">In Progress</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>
          <div className="p-4 h-[calc(100vh-16rem)] overflow-auto">
            {filteredReports.map((report) => (
              <ReportCard
                key={report.id}
                report={report}
                currentLocation={currentLocation}
                onStatusUpdate={onStatusUpdate}
                isUpdatingStatus={isUpdatingStatus}
                onSelect={() => onReportSelect(report)}
                calculateDistance={calculateDistance}
                onDelete={onDelete}
              />
            ))}
          </div>
        </Tabs>
      </CardContent>
    </Card>
  );
}
