
import { Issue } from "@/types";
import IssueCard from "./IssueCard";

interface IssuesListProps {
  issues: Issue[];
  showVoteButton?: boolean;
}

const IssuesList = ({ issues, showVoteButton = true }: IssuesListProps) => {
  if (issues.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No issues found.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {issues.map((issue) => (
        <IssueCard 
          key={issue.id} 
          issue={issue} 
          showVoteButton={showVoteButton}
        />
      ))}
    </div>
  );
};

export default IssuesList;
