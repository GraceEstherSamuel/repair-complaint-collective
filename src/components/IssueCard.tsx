
import { Issue } from "@/types";
import { useIssues } from "@/contexts/IssueContext";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ThumbsUp, 
  MessageSquare, 
  MapPin, 
  Calendar, 
  AlertTriangle 
} from "lucide-react";
import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";

interface IssueCardProps {
  issue: Issue;
  showVoteButton?: boolean;
}

const IssueCard = ({ issue, showVoteButton = true }: IssueCardProps) => {
  const { voteForIssue } = useIssues();
  
  const handleVote = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    voteForIssue(issue.id);
  };
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case "open":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "in-progress":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "resolved":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };
  
  const getPriorityBadge = (priority: number) => {
    const colors = [
      "bg-gray-100 text-gray-800",
      "bg-blue-100 text-blue-800",
      "bg-yellow-100 text-yellow-800",
      "bg-orange-100 text-orange-800",
      "bg-red-100 text-red-800",
    ];
    
    return (
      <Badge className={`${colors[priority - 1]} gap-1 py-1`}>
        <AlertTriangle className="h-3 w-3" />
        Priority {priority}
      </Badge>
    );
  };

  return (
    <Link to={`/issues/${issue.id}`}>
      <Card className="h-full overflow-hidden hover:shadow-md transition-all duration-300 hover:translate-y-[-2px]">
        {issue.imageUrl && (
          <div className="h-48 overflow-hidden">
            <img 
              src={issue.imageUrl} 
              alt={issue.title} 
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <CardHeader>
          <div className="flex justify-between items-start gap-2">
            <CardTitle className="text-lg">{issue.title}</CardTitle>
            {getPriorityBadge(issue.priority)}
          </div>
          <CardDescription>
            <div className="flex items-center gap-1 text-gray-500 mt-1">
              <MapPin className="h-4 w-4" />
              <span className="text-xs truncate max-w-[200px]">
                {issue.location.address}
              </span>
            </div>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm line-clamp-2 mb-3">
            {issue.description}
          </p>
          <div className="flex gap-2 flex-wrap">
            <Badge variant="outline" className={getStatusColor(issue.status)}>
              {issue.status.charAt(0).toUpperCase() + issue.status.slice(1)}
            </Badge>
            <Badge variant="outline" className="bg-gray-100">
              {issue.category}
            </Badge>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between border-t pt-3">
          <div className="flex gap-3">
            <div className="flex items-center gap-1 text-app-blue font-medium">
              <ThumbsUp className="h-4 w-4" />
              <span>{issue.votes}</span>
            </div>
            <div className="flex items-center gap-1 text-gray-500">
              <MessageSquare className="h-4 w-4" />
              <span>{issue.comments.length}</span>
            </div>
          </div>
          <div className="flex items-center gap-1 text-gray-500 text-xs">
            <Calendar className="h-3 w-3" />
            <span>
              {formatDistanceToNow(new Date(issue.createdAt), { addSuffix: true })}
            </span>
          </div>
        </CardFooter>
        {showVoteButton && (
          <div className="absolute top-2 right-2">
            <Button 
              size="sm" 
              className="bg-gradient-to-r from-app-blue to-app-green hover:shadow-md hover:opacity-90"
              onClick={handleVote}
            >
              <ThumbsUp className="h-4 w-4 mr-1" /> Vote
            </Button>
          </div>
        )}
      </Card>
    </Link>
  );
};

export default IssueCard;
