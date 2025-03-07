
import { useIssues } from "@/contexts/IssueContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import IssuesList from "@/components/IssuesList";
import PieChartDisplay from "@/components/PieChartDisplay";
import { Link } from "react-router-dom";
import { ArrowRight, AlertTriangle, CheckCircle2, Clock } from "lucide-react";

const DashboardPage = () => {
  const { getTopIssues, issues } = useIssues();
  
  // Get the top issues by votes
  const topIssues = getTopIssues(5);
  
  // Count issues by status
  const statusCounts = {
    open: issues.filter(issue => issue.status === "open").length,
    "in-progress": issues.filter(issue => issue.status === "in-progress").length,
    resolved: issues.filter(issue => issue.status === "resolved").length,
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Sahaay Dashboard</h1>
        <p className="text-gray-500">
          View and manage community issues in your area
        </p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Open Issues</CardTitle>
            <AlertTriangle className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statusCounts.open}</div>
            <p className="text-xs text-gray-500">Issues awaiting attention</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            <Clock className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statusCounts["in-progress"]}</div>
            <p className="text-xs text-gray-500">Issues being addressed</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Resolved</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statusCounts.resolved}</div>
            <p className="text-xs text-gray-500">Issues successfully fixed</p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Top Community Issues</CardTitle>
            <CardDescription>
              Highest voted issues in your community
            </CardDescription>
          </CardHeader>
          <CardContent>
            <IssuesList issues={topIssues} />
            <div className="mt-4 text-right">
              <Link 
                to="/community-issues" 
                className="text-sm font-medium text-primary inline-flex items-center hover:underline"
              >
                View all issues 
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Issue Distribution</CardTitle>
            <CardDescription>
              Categories of reported issues
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <PieChartDisplay />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;
