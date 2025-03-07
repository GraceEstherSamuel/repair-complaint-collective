
import { useIssues } from "@/contexts/IssueContext";
import { useAuth } from "@/contexts/AuthContext";
import IssuesList from "@/components/IssuesList";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  MapPin, 
  ThumbsUp, 
  CheckCircle2, 
  Clock, 
  PlusCircle 
} from "lucide-react";
import { Link } from "react-router-dom";
import PieChartDisplay from "@/components/PieChartDisplay";
import BarChartDisplay from "@/components/BarChartDisplay";

const DashboardPage = () => {
  const { issues, getTopIssues } = useIssues();
  const { user } = useAuth();
  
  const topIssues = getTopIssues(3);
  
  const openIssues = issues.filter(i => i.status === "open").length;
  const inProgressIssues = issues.filter(i => i.status === "in-progress").length;
  const resolvedIssues = issues.filter(i => i.status === "resolved").length;
  const totalVotes = issues.reduce((sum, issue) => sum + issue.votes, 0);
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-gray-500">
            Overview of community issues and activity
          </p>
        </div>
        <Link to="/report-issue">
          <Button className="bg-app-green hover:bg-app-green/90">
            <PlusCircle className="h-4 w-4 mr-2" />
            Report Issue
          </Button>
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <MapPin className="h-6 w-6 text-app-blue" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Issues</p>
                <h3 className="text-2xl font-bold">{issues.length}</h3>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="bg-orange-100 p-3 rounded-full">
                <Clock className="h-6 w-6 text-app-orange" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Open Issues</p>
                <h3 className="text-2xl font-bold">{openIssues}</h3>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="bg-green-100 p-3 rounded-full">
                <CheckCircle2 className="h-6 w-6 text-app-green" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Resolved</p>
                <h3 className="text-2xl font-bold">{resolvedIssues}</h3>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="bg-purple-100 p-3 rounded-full">
                <ThumbsUp className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Votes</p>
                <h3 className="text-2xl font-bold">{totalVotes}</h3>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PieChartDisplay />
        <BarChartDisplay />
      </div>
      
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Top Voted Issues</h2>
          <Link to="/community-issues">
            <Button variant="outline">View All</Button>
          </Link>
        </div>
        <IssuesList issues={topIssues} />
      </div>
    </div>
  );
};

export default DashboardPage;
