
import { useState } from "react";
import { useIssues } from "@/contexts/IssueContext";
import IssuesList from "@/components/IssuesList";
import PieChartDisplay from "@/components/PieChartDisplay";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, SlidersHorizontal, X } from "lucide-react";

const CommunityIssuesPage = () => {
  const { issues } = useIssues();
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  
  // Get unique categories from issues
  const categories = [...new Set(issues.map(issue => issue.category))];
  
  // Filter issues based on search term and filters
  const filteredIssues = issues.filter(issue => {
    const matchesSearch = searchTerm === "" || 
      issue.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      issue.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      issue.location.address.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesCategory = category === "" || issue.category === category;
    const matchesStatus = status === "" || issue.status === status;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });
  
  // Sort by votes (highest first)
  const sortedIssues = [...filteredIssues].sort((a, b) => b.votes - a.votes);
  
  const resetFilters = () => {
    setSearchTerm("");
    setCategory("");
    setStatus("");
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Community Issues</h1>
        <p className="text-gray-500">
          View and vote on issues reported by the community
        </p>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-2/3">
          <div className="mb-6 space-y-4">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search issues..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button 
                variant="outline" 
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2"
              >
                <SlidersHorizontal className="h-4 w-4" />
                <span className="hidden sm:inline">Filters</span>
              </Button>
              {(searchTerm || category || status) && (
                <Button 
                  variant="ghost" 
                  onClick={resetFilters}
                  size="icon"
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
            
            {showFilters && (
              <div className="flex flex-wrap gap-4 p-4 bg-gray-50 rounded-md">
                <div className="w-full sm:w-auto">
                  <p className="text-sm font-medium mb-1">Category</p>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger className="w-full sm:w-[180px]">
                      <SelectValue placeholder="All categories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All categories</SelectItem>
                      {categories.map(cat => (
                        <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="w-full sm:w-auto">
                  <p className="text-sm font-medium mb-1">Status</p>
                  <Select value={status} onValueChange={setStatus}>
                    <SelectTrigger className="w-full sm:w-[180px]">
                      <SelectValue placeholder="All statuses" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All statuses</SelectItem>
                      <SelectItem value="open">Open</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="resolved">Resolved</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
          </div>
          
          <div>
            <p className="text-sm text-gray-500 mb-4">
              Showing {sortedIssues.length} of {issues.length} issues
            </p>
            <IssuesList issues={sortedIssues} />
          </div>
        </div>
        
        <div className="lg:w-1/3">
          <PieChartDisplay />
        </div>
      </div>
    </div>
  );
};

export default CommunityIssuesPage;
