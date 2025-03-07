
import { useIssues } from "@/contexts/IssueContext";
import IssuesList from "@/components/IssuesList";
import BarChartDisplay from "@/components/BarChartDisplay";
import { AlertTriangle } from "lucide-react";

const PriorityIssuesPage = () => {
  const { getPriorityIssues } = useIssues();
  
  // Get issues sorted by priority
  const priorityIssues = getPriorityIssues();
  
  // Group issues by priority
  const issuesByPriority: Record<number, typeof priorityIssues> = {
    5: [],
    4: [],
    3: [],
    2: [],
    1: [],
  };
  
  priorityIssues.forEach(issue => {
    issuesByPriority[issue.priority].push(issue);
  });
  
  // Priority labels
  const priorityLabels = {
    5: "Critical Priority",
    4: "High Priority",
    3: "Medium Priority",
    2: "Low Priority",
    1: "Very Low Priority",
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Priority Issues</h1>
        <p className="text-gray-500">
          Issues ranked by priority for municipal attention
        </p>
      </div>
      
      <BarChartDisplay />
      
      <div className="space-y-10">
        {Object.entries(issuesByPriority)
          .sort(([a], [b]) => Number(b) - Number(a)) // Sort by priority (highest first)
          .map(([priority, issues]) => {
            if (issues.length === 0) return null;
            
            const priorityLevel = Number(priority);
            const priorityColors = {
              5: "text-red-600 bg-red-100",
              4: "text-orange-600 bg-orange-100",
              3: "text-yellow-600 bg-yellow-100",
              2: "text-blue-600 bg-blue-100",
              1: "text-gray-600 bg-gray-100",
            };
            
            return (
              <div key={priority}>
                <div className="flex items-center gap-2 mb-4">
                  <div className={`p-1 rounded ${priorityColors[priorityLevel as keyof typeof priorityColors]}`}>
                    <AlertTriangle className="h-5 w-5" />
                  </div>
                  <h2 className="text-xl font-semibold">
                    {priorityLabels[priorityLevel as keyof typeof priorityLabels]}
                  </h2>
                </div>
                <IssuesList issues={issues} />
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default PriorityIssuesPage;
