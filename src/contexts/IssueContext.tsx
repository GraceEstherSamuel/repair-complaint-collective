
import React, { createContext, useState, useContext, useEffect } from "react";
import { Issue, ChartData } from "@/types";
import { toast } from "sonner";
import { useAuth } from "./AuthContext";

interface IssueContextType {
  issues: Issue[];
  loading: boolean;
  addIssue: (issue: Omit<Issue, "id" | "createdAt" | "updatedAt" | "votes" | "comments">) => void;
  voteForIssue: (issueId: string) => void;
  getTopIssues: (limit?: number) => Issue[];
  getPriorityIssues: () => Issue[];
  getChartData: () => ChartData[];
  getBarChartData: () => { name: string; priority: number; votes: number; id: string }[];
  getIssueById: (id: string) => Issue | undefined;
  addComment: (issueId: string, content: string) => void;
}

const IssueContext = createContext<IssueContextType | undefined>(undefined);

export const useIssues = () => {
  const context = useContext(IssueContext);
  if (context === undefined) {
    throw new Error("useIssues must be used within an IssueProvider");
  }
  return context;
};

// Mock data for initial issues
const mockIssues: Issue[] = [
  {
    id: "issue_1",
    title: "Pothole on Main Street",
    description: "Large pothole causing traffic hazards near the intersection of Main and Oak streets.",
    category: "Roads",
    location: {
      address: "123 Main St, Anytown, USA",
      lat: 40.7128,
      lng: -74.0060,
    },
    status: "open",
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    imageUrl: "https://images.unsplash.com/photo-1515162305285-0293e4767cc2?q=80&w=2936&auto=format&fit=crop",
    userId: "usr_1",
    votes: 24,
    priority: 4,
    comments: [
      {
        id: "comment_1",
        content: "This is getting worse by the day!",
        userId: "usr_2",
        userName: "Jane Smith",
        userAvatar: "https://ui-avatars.com/api/?name=Jane+Smith&background=random",
        createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      }
    ],
  },
  {
    id: "issue_2",
    title: "Broken Street Light",
    description: "Street light hasn't been working for weeks, creating safety concerns at night.",
    category: "Lighting",
    location: {
      address: "456 Elm St, Anytown, USA",
      lat: 40.7145,
      lng: -74.0075,
    },
    status: "in-progress",
    createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    imageUrl: "https://images.unsplash.com/photo-1563409236340-c174b51cbb81?q=80&w=2960&auto=format&fit=crop",
    userId: "usr_3",
    votes: 18,
    priority: 3,
    comments: [],
  },
  {
    id: "issue_3",
    title: "Overflowing Trash Bin",
    description: "Public trash bin has been overflowing for days, attracting pests.",
    category: "Sanitation",
    location: {
      address: "789 Pine St, Anytown, USA",
      lat: 40.7111,
      lng: -74.0048,
    },
    status: "open",
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    imageUrl: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=2913&auto=format&fit=crop",
    userId: "usr_4",
    votes: 12,
    priority: 2,
    comments: [],
  },
  {
    id: "issue_4",
    title: "Graffiti on Public Library",
    description: "Offensive graffiti has appeared on the north wall of the public library.",
    category: "Vandalism",
    location: {
      address: "321 Oak St, Anytown, USA",
      lat: 40.7139,
      lng: -74.0080,
    },
    status: "open",
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    imageUrl: "https://images.unsplash.com/photo-1585244759837-6bc7b77198fc?q=80&w=2930&auto=format&fit=crop",
    userId: "usr_5",
    votes: 6,
    priority: 1,
    comments: [],
  },
  {
    id: "issue_5",
    title: "Damaged Playground Equipment",
    description: "The swing set at Central Park has broken chains making it unsafe for children.",
    category: "Parks",
    location: {
      address: "555 Park Ave, Anytown, USA",
      lat: 40.7150,
      lng: -74.0050,
    },
    status: "open",
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    imageUrl: "https://images.unsplash.com/photo-1553361072-b620fa8f8627?q=80&w=2874&auto=format&fit=crop",
    userId: "usr_6",
    votes: 30,
    priority: 5,
    comments: [],
  },
];

export const IssueProvider: React.FC<{ children: React.ReactNode }> = ({ 
  children 
}) => {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    // Load issues from localStorage or use mock data
    const savedIssues = localStorage.getItem("issues");
    if (savedIssues) {
      setIssues(JSON.parse(savedIssues));
    } else {
      setIssues(mockIssues);
      localStorage.setItem("issues", JSON.stringify(mockIssues));
    }
    setLoading(false);
  }, []);

  const addIssue = (newIssueData: Omit<Issue, "id" | "createdAt" | "updatedAt" | "votes" | "comments">) => {
    if (!user) {
      toast.error("You must be logged in to add an issue");
      return;
    }

    const now = new Date().toISOString();
    const newIssue: Issue = {
      ...newIssueData,
      id: "issue_" + Math.random().toString(36).substr(2, 9),
      createdAt: now,
      updatedAt: now,
      votes: 1, // Start with creator's vote
      comments: [],
    };

    const updatedIssues = [...issues, newIssue];
    setIssues(updatedIssues);
    localStorage.setItem("issues", JSON.stringify(updatedIssues));
    toast.success("Issue reported successfully!");
  };

  const voteForIssue = (issueId: string) => {
    if (!user) {
      toast.error("You must be logged in to vote");
      return;
    }

    const updatedIssues = issues.map((issue) => {
      if (issue.id === issueId) {
        return {
          ...issue,
          votes: issue.votes + 1,
          updatedAt: new Date().toISOString(),
        };
      }
      return issue;
    });

    setIssues(updatedIssues);
    localStorage.setItem("issues", JSON.stringify(updatedIssues));
    toast.success("Vote registered!");
  };

  const getTopIssues = (limit = 10) => {
    return [...issues]
      .sort((a, b) => b.votes - a.votes)
      .slice(0, limit);
  };

  const getPriorityIssues = () => {
    return [...issues]
      .sort((a, b) => b.priority - a.priority);
  };

  const getChartData = (): ChartData[] => {
    return getTopIssues(5).map(issue => ({
      name: issue.title,
      value: issue.votes,
      id: issue.id
    }));
  };

  const getBarChartData = () => {
    return getPriorityIssues()
      .slice(0, 10)
      .map(issue => ({
        name: issue.title,
        priority: issue.priority,
        votes: issue.votes,
        id: issue.id
      }));
  };

  const getIssueById = (id: string) => {
    return issues.find(issue => issue.id === id);
  };

  const addComment = (issueId: string, content: string) => {
    if (!user) {
      toast.error("You must be logged in to comment");
      return;
    }

    const updatedIssues = issues.map((issue) => {
      if (issue.id === issueId) {
        const newComment = {
          id: "comment_" + Math.random().toString(36).substr(2, 9),
          content,
          userId: user.id,
          userName: user.name,
          userAvatar: user.avatar,
          createdAt: new Date().toISOString(),
        };
        
        return {
          ...issue,
          comments: [...issue.comments, newComment],
          updatedAt: new Date().toISOString(),
        };
      }
      return issue;
    });

    setIssues(updatedIssues);
    localStorage.setItem("issues", JSON.stringify(updatedIssues));
    toast.success("Comment added!");
  };

  return (
    <IssueContext.Provider value={{ 
      issues, 
      loading, 
      addIssue, 
      voteForIssue, 
      getTopIssues, 
      getPriorityIssues,
      getChartData,
      getBarChartData,
      getIssueById,
      addComment
    }}>
      {children}
    </IssueContext.Provider>
  );
};
