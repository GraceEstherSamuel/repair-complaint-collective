
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useIssues } from "@/contexts/IssueContext";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  ThumbsUp, 
  MapPin, 
  Calendar, 
  AlertTriangle, 
  MessageSquare,
  ArrowLeft
} from "lucide-react";
import { format, formatDistanceToNow } from "date-fns";
import { toast } from "sonner";

const IssueDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getIssueById, voteForIssue, addComment } = useIssues();
  const { user } = useAuth();
  
  const [comment, setComment] = useState("");
  
  const issue = getIssueById(id as string);
  
  if (!issue) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <AlertTriangle className="h-12 w-12 text-yellow-500 mb-4" />
        <h2 className="text-2xl font-bold">Issue Not Found</h2>
        <p className="text-gray-500 mb-6">The issue you're looking for doesn't exist or has been removed</p>
        <Button onClick={() => navigate(-1)}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Go Back
        </Button>
      </div>
    );
  }
  
  const handleVote = () => {
    voteForIssue(issue.id);
  };
  
  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) {
      toast.error("Comment cannot be empty");
      return;
    }
    
    addComment(issue.id, comment);
    setComment("");
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
    <div className="max-w-4xl mx-auto">
      <Button 
        variant="ghost" 
        onClick={() => navigate(-1)}
        className="mb-4"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back
      </Button>
      
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        {issue.imageUrl && (
          <div className="h-64 sm:h-80 overflow-hidden">
            <img 
              src={issue.imageUrl} 
              alt={issue.title} 
              className="w-full h-full object-cover"
            />
          </div>
        )}
        
        <div className="p-6">
          <div className="flex flex-wrap justify-between items-start gap-4 mb-4">
            <h1 className="text-2xl font-bold">{issue.title}</h1>
            <div className="flex items-center gap-2">
              {getPriorityBadge(issue.priority)}
              <Badge variant="outline" className={getStatusColor(issue.status)}>
                {issue.status.charAt(0).toUpperCase() + issue.status.slice(1)}
              </Badge>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-6">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>Reported {format(new Date(issue.createdAt), 'MMM d, yyyy')}</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              <span>{issue.location.address}</span>
            </div>
            <div>
              <Badge variant="outline" className="bg-gray-100">
                {issue.category}
              </Badge>
            </div>
          </div>
          
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-2">Description</h2>
            <p className="text-gray-700 whitespace-pre-line">{issue.description}</p>
          </div>
          
          <div className="flex justify-between items-center py-4 border-t border-b">
            <div className="flex items-center gap-1">
              <ThumbsUp className="h-5 w-5 text-app-blue" />
              <span className="font-medium">{issue.votes} votes</span>
            </div>
            <Button onClick={handleVote} className="bg-app-blue hover:bg-app-blue/90">
              <ThumbsUp className="h-4 w-4 mr-2" />
              Vote
            </Button>
          </div>
          
          <div className="mt-8">
            <div className="flex items-center gap-2 mb-4">
              <MessageSquare className="h-5 w-5 text-gray-500" />
              <h2 className="text-lg font-semibold">Comments ({issue.comments.length})</h2>
            </div>
            
            <form onSubmit={handleCommentSubmit} className="mb-6">
              <div className="flex gap-4">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={user?.avatar} />
                  <AvatarFallback>
                    {user?.name.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <Textarea
                    placeholder="Add a comment..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="mb-2"
                  />
                  <Button type="submit" className="bg-app-blue hover:bg-app-blue/90">
                    Post Comment
                  </Button>
                </div>
              </div>
            </form>
            
            <div className="space-y-6">
              {issue.comments.length > 0 ? (
                issue.comments
                  .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                  .map((comment) => (
                    <div key={comment.id} className="flex gap-4">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={comment.userAvatar} />
                        <AvatarFallback>
                          {comment.userName.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium">{comment.userName}</span>
                          <span className="text-xs text-gray-500">
                            {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                          </span>
                        </div>
                        <p className="text-gray-700">{comment.content}</p>
                      </div>
                    </div>
                  ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <p>No comments yet. Be the first to comment!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IssueDetailsPage;
