
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useIssues } from "@/contexts/IssueContext";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { MapPin, Upload, AlertTriangle, FileText, Plus } from "lucide-react";
import { toast } from "sonner";

const ReportIssuePage = () => {
  const navigate = useNavigate();
  const { addIssue } = useIssues();
  const { user } = useAuth();
  
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [priority, setPriority] = useState("");
  const [address, setAddress] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Mock geolocation
  const [coordinates, setCoordinates] = useState<{ lat: number; lng: number } | null>(null);
  
  const handleGetLocation = () => {
    // In a real app, we would use the browser's geolocation API
    // For demo purposes, set random coordinates near New York
    const lat = 40.7128 + (Math.random() - 0.5) * 0.1;
    const lng = -74.006 + (Math.random() - 0.5) * 0.1;
    
    setCoordinates({ lat, lng });
    setAddress("123 Main St, New York, NY 10001");
    toast.success("Location detected");
  };
  
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // In a real app, we would upload the file to storage
    // For demo purposes, create a data URL
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !description || !category || !priority || !address || !coordinates) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Create the new issue
      addIssue({
        title,
        description,
        category,
        location: {
          address,
          lat: coordinates.lat,
          lng: coordinates.lng,
        },
        status: "open",
        imageUrl: image || undefined,
        userId: user?.id || "",
        priority: Number(priority),
      });
      
      // Navigate to the dashboard after successful submission
      navigate("/dashboard");
      toast.success("Issue reported successfully!");
    } catch (error) {
      console.error("Error submitting issue:", error);
      toast.error("Failed to submit issue. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Report an Issue</h1>
          <p className="text-gray-500">
            Submit details about a problem in your community
          </p>
        </div>
        
        <div className="mt-4 sm:mt-0 flex gap-4">
          <Button 
            variant="outline" 
            className="border-app-blue text-app-blue hover:bg-app-blue/10"
            onClick={() => navigate("/community-issues")}
          >
            <FileText className="mr-2 h-4 w-4" />
            View Issues
          </Button>
          
          <Button 
            className="bg-app-green text-white hover:bg-app-green/90"
            onClick={() => navigate("/report-issue")}
          >
            <Plus className="mr-2 h-4 w-4" />
            New Complaint
          </Button>
        </div>
      </div>
      
      <Card>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Issue Title <span className="text-red-500">*</span></Label>
              <Input
                id="title"
                placeholder="E.g., Pothole on Main Street"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description <span className="text-red-500">*</span></Label>
              <Textarea
                id="description"
                placeholder="Provide details about the issue..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                required
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">Category <span className="text-red-500">*</span></Label>
                <Select value={category} onValueChange={setCategory} required>
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Roads">Roads</SelectItem>
                    <SelectItem value="Sidewalks">Sidewalks</SelectItem>
                    <SelectItem value="Lighting">Lighting</SelectItem>
                    <SelectItem value="Parks">Parks</SelectItem>
                    <SelectItem value="Sanitation">Sanitation</SelectItem>
                    <SelectItem value="Vandalism">Vandalism</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="priority">Priority <span className="text-red-500">*</span></Label>
                <Select value={priority} onValueChange={setPriority} required>
                  <SelectTrigger id="priority">
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 text-red-500" />
                        <span>Critical (5)</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="4">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 text-orange-500" />
                        <span>High (4)</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="3">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 text-yellow-500" />
                        <span>Medium (3)</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="2">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 text-blue-500" />
                        <span>Low (2)</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="1">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 text-gray-500" />
                        <span>Very Low (1)</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>Location <span className="text-red-500">*</span></Label>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
                <Input
                  placeholder="Street address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="md:col-span-3"
                  required
                />
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={handleGetLocation}
                  className="flex items-center gap-2"
                >
                  <MapPin className="h-4 w-4" />
                  <span>Get Location</span>
                </Button>
              </div>
              {coordinates && (
                <p className="text-sm text-gray-500">
                  Coordinates: {coordinates.lat.toFixed(6)}, {coordinates.lng.toFixed(6)}
                </p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="image">Upload Image</Label>
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <label 
                    htmlFor="image-upload" 
                    className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-md cursor-pointer hover:bg-gray-50"
                  >
                    {image ? (
                      <img 
                        src={image} 
                        alt="Preview" 
                        className="h-full w-full object-contain"
                      />
                    ) : (
                      <div className="flex flex-col items-center text-gray-500">
                        <Upload className="h-8 w-8 mb-2" />
                        <span>Click to upload image</span>
                      </div>
                    )}
                  </label>
                  <Input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </div>
              </div>
            </div>
            
            <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
              <Button 
                type="button" 
                variant="outline"
                className="border-app-orange text-app-orange hover:bg-app-orange/10"
                onClick={() => navigate("/dashboard")}
              >
                Cancel
              </Button>
              
              <Button 
                type="submit" 
                className="bg-app-blue hover:bg-app-blue/90"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Submitting...
                  </span>
                ) : (
                  "Submit Report"
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReportIssuePage;
