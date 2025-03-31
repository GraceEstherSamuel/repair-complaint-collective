
import { useState, useEffect, useRef } from "react";
import { useIssues } from "@/contexts/IssueContext";
import { useAuth } from "@/contexts/AuthContext";
import { 
  MapPin, 
  Locate, 
  Send, 
  AlertTriangle,
  Filter,
  Layers,
  RefreshCw,
  Search,
  UploadCloud,
  Crosshair,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Issue } from "@/types";

const IssueMapPage = () => {
  const { issues, addIssue } = useIssues();
  const { user } = useAuth();
  const [address, setAddress] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [priority, setPriority] = useState("");
  const [coordinates, setCoordinates] = useState<{lat: number, lng: number} | null>(null);
  const [issueType, setIssueType] = useState("all");
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const [helpCenter, setHelpCenter] = useState<{name: string, distance: string} | null>(null);
  const [mapView, setMapView] = useState(true);
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);
  
  const mapRef = useRef<HTMLDivElement>(null);

  // Mock function to simulate getting user location
  const getCurrentLocation = () => {
    setIsLoading(true);
    setTimeout(() => {
      // Mock coordinates for demo - using New Delhi coordinates
      const newCoords = {
        lat: 28.6139 + (Math.random() - 0.5) * 0.05,
        lng: 77.2090 + (Math.random() - 0.5) * 0.05
      };
      setCoordinates(newCoords);
      setAddress("Current Location");
      
      // Find nearest help center
      findNearestHelpCenter(newCoords, category || "general");
      
      setIsLoading(false);
      toast.success("Location detected successfully");
    }, 1000);
  };

  // Mock function to simulate address search
  const searchLocation = () => {
    if (!address) {
      toast.error("Please enter an address");
      return;
    }
    
    setIsLoading(true);
    setTimeout(() => {
      // Mock coordinates for demo - slightly randomized Delhi coordinates
      const newCoords = {
        lat: 28.6139 + (Math.random() - 0.5) * 0.05,
        lng: 77.2090 + (Math.random() - 0.5) * 0.05
      };
      setCoordinates(newCoords);
      
      // Find nearest help center
      findNearestHelpCenter(newCoords, category || "general");
      
      setIsLoading(false);
      toast.success("Location found");
    }, 1000);
  };
  
  // Simulate finding the nearest help center
  const findNearestHelpCenter = (coords: {lat: number, lng: number}, issueType: string) => {
    // Mock help centers based on issue type
    const centers = {
      "Water": ["Water Department", "Municipal Water Board"],
      "Electricity": ["Electricity Board", "Power Grid Station"],
      "Roads": ["Roads and Highways Dept", "Municipal Transport"],
      "Sanitation": ["Sanitation Department", "Waste Management"],
      "default": ["Municipal Corporation", "City Help Center"]
    };
    
    // Select appropriate center type
    const centerType = issueType in centers ? issueType : "default";
    const centerName = centers[centerType as keyof typeof centers][Math.floor(Math.random() * 2)];
    
    // Calculate mock distance (between 0.5 and 5 km)
    const distance = (0.5 + Math.random() * 4.5).toFixed(1);
    
    setHelpCenter({
      name: centerName,
      distance: `${distance} km`
    });
  };
  
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result as string);
      toast.success("Image uploaded successfully");
    };
    reader.readAsDataURL(file);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !description || !category || !priority || !address || !coordinates) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    setIsLoading(true);
    
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
      
      // Reset form after submission
      setTitle("");
      setDescription("");
      setCategory("");
      setPriority("");
      setImage(null);
      
      toast.success("Issue reported successfully!");
    } catch (error) {
      console.error("Error submitting issue:", error);
      toast.error("Failed to submit issue. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleMarkerClick = (issue: Issue) => {
    setSelectedIssue(issue);
  };
  
  const refreshMap = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Map refreshed");
    }, 800);
  };
  
  const toggleMapView = () => {
    setMapView(!mapView);
    setSelectedIssue(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold">Issue Map</h1>
          <p className="text-muted-foreground">Track and report issues in your area</p>
        </div>
        
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center gap-2"
            onClick={toggleMapView}
          >
            {mapView ? (
              <>
                <Layers className="h-4 w-4" />
                <span>List View</span>
              </>
            ) : (
              <>
                <MapPin className="h-4 w-4" />
                <span>Map View</span>
              </>
            )}
          </Button>
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center gap-2" 
            onClick={refreshMap}
          >
            <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 relative">
          {/* Map Container */}
          <div 
            ref={mapRef}
            className="bg-gradient-to-br from-blue-50 to-sky-100 rounded-xl overflow-hidden relative transition-all duration-300 shadow-sm border border-blue-100" 
            style={{ height: "500px" }}
          >
            {/* Mock Map with Markers */}
            <div className="h-full w-full relative overflow-hidden">
              {/* This would be a real map implementation in production */}
              <div className="absolute inset-0 bg-white/50 backdrop-blur-[2px]">
                <div className="grid grid-cols-12 grid-rows-12 h-full w-full">
                  {/* Grid lines for mock map */}
                  {Array.from({ length: 12 }).map((_, i) => (
                    <div 
                      key={`h-${i}`} 
                      className="w-full h-px bg-blue-200/50" 
                      style={{ gridRow: i + 1, gridColumn: "span 12" }} 
                    />
                  ))}
                  {Array.from({ length: 12 }).map((_, i) => (
                    <div 
                      key={`v-${i}`} 
                      className="h-full w-px bg-blue-200/50" 
                      style={{ gridColumn: i + 1, gridRow: "span 12" }} 
                    />
                  ))}
                </div>
              </div>
              
              {/* Sample Markers for visualization */}
              {issues.map((issue, index) => (
                <div 
                  key={issue.id}
                  className="absolute transition-all duration-300 transform cursor-pointer hover:scale-110"
                  style={{ 
                    top: `${20 + Math.random() * 60}%`, 
                    left: `${20 + Math.random() * 60}%`,
                    zIndex: selectedIssue?.id === issue.id ? 30 : 20
                  }}
                  onClick={() => handleMarkerClick(issue)}
                >
                  <div className="relative">
                    <img 
                      src="/assets/map-marker.svg" 
                      alt="location" 
                      className={`h-8 w-8 ${selectedIssue?.id === issue.id ? 'drop-shadow-lg' : ''}`}
                    />
                    <div className="absolute -top-1 -right-1 bg-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center border border-blue-500">
                      {issue.priority}
                    </div>
                  </div>
                  
                  {/* Popup when marker is selected */}
                  {selectedIssue?.id === issue.id && (
                    <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-56 bg-white rounded-lg shadow-lg p-3 border border-blue-200 z-30">
                      <div className="font-medium mb-1">{issue.title}</div>
                      <div className="text-xs text-gray-500 mb-2">
                        Reported {new Date(issue.createdAt).toLocaleString('en-US', { 
                          day: 'numeric',
                          month: 'short',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </div>
                      <div className="flex items-center text-xs mb-2">
                        <span className={`px-2 py-0.5 rounded-full ${
                          issue.status === 'open' ? 'bg-yellow-100 text-yellow-800' :
                          issue.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {issue.status.charAt(0).toUpperCase() + issue.status.slice(1)}
                        </span>
                        <div className="ml-auto text-gray-500">
                          {issue.category}
                        </div>
                      </div>
                      <div className="text-xs text-gray-600 mt-1">
                        <span className="font-medium">Nearest Help:</span> {Math.floor(Math.random() * 5) + 0.5} km
                      </div>
                      <div className="absolute w-3 h-3 bg-white border-b border-r border-blue-200 transform rotate-45 left-1/2 -bottom-1.5 -ml-1.5"></div>
                    </div>
                  )}
                </div>
              ))}
              
              {/* User's new location marker */}
              {coordinates && (
                <div 
                  className="absolute transition-all duration-500 animate-bounce-slow z-30"
                  style={{ 
                    top: '50%', 
                    left: '50%',
                    transform: 'translate(-50%, -50%)'
                  }}
                >
                  <img 
                    src="/assets/map-marker.svg" 
                    alt="Your location" 
                    className="h-10 w-10 drop-shadow-lg" 
                  />
                  <div className="absolute inset-0 bg-blue-500 rounded-full animate-ping opacity-30"></div>
                </div>
              )}
            </div>
            
            <div className="absolute top-4 right-4 flex flex-col gap-2">
              <Button size="icon" className="bg-white shadow-md hover:bg-gray-100" aria-label="Zoom in">
                <span className="text-lg">+</span>
              </Button>
              <Button size="icon" className="bg-white shadow-md hover:bg-gray-100" aria-label="Zoom out">
                <span className="text-lg">-</span>
              </Button>
              <Button 
                size="icon" 
                className="bg-white shadow-md hover:bg-gray-100 text-blue-600" 
                aria-label="My location"
                onClick={getCurrentLocation}
              >
                <Crosshair className="h-4 w-4" />
              </Button>
            </div>
            
            {!selectedIssue && (
              <div className="absolute top-4 left-4 right-20 max-w-sm">
                <div className="relative">
                  <Input
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Search for a location..."
                    className="w-full pl-10 pr-10 bg-white/90 backdrop-blur-sm shadow-md"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                  <Button 
                    size="icon"
                    variant="ghost"
                    className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8"
                    onClick={searchLocation}
                  >
                    <Send className="h-4 w-4 text-blue-500" />
                  </Button>
                </div>
              </div>
            )}
          </div>
          
          {/* Help Center Information - only show when coordinates are set */}
          {helpCenter && (
            <div className="mt-3 p-3 bg-white/90 backdrop-blur-sm rounded-xl border border-blue-100 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-blue-800">Nearest Help Center</h3>
                  <p className="text-sm text-gray-600">{helpCenter.name}</p>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 text-blue-600 mr-1" />
                  <span className="font-medium text-blue-600">{helpCenter.distance}</span>
                </div>
                <Button variant="ghost" size="sm" className="text-blue-600">
                  <span>Get Directions</span>
                  <ArrowRight className="h-3 w-3 ml-1" />
                </Button>
              </div>
            </div>
          )}
        </div>
        
        {/* Report Form Section */}
        <div className="space-y-4">
          <Card className="border-blue-100 shadow-md overflow-hidden">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4">
              <h3 className="font-medium text-lg flex items-center">
                <AlertTriangle className="h-5 w-5 mr-2" />
                Report an Issue
              </h3>
              <p className="text-sm text-blue-100">Fill the form below to report a problem</p>
            </div>
            
            <CardContent className="p-4">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="title">Issue Title <span className="text-red-500">*</span></Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Brief description of the issue"
                    required
                  />
                </div>
                
                <div className="space-y-1.5">
                  <Label htmlFor="category">Category <span className="text-red-500">*</span></Label>
                  <Select value={category} onValueChange={(value) => {
                    setCategory(value);
                    if (coordinates) {
                      findNearestHelpCenter(coordinates, value);
                    }
                  }}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select issue type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Water">Water Supply</SelectItem>
                      <SelectItem value="Electricity">Electricity</SelectItem>
                      <SelectItem value="Roads">Road Damage</SelectItem>
                      <SelectItem value="Sanitation">Garbage Collection</SelectItem>
                      <SelectItem value="Lighting">Street Lighting</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-1.5">
                  <Label htmlFor="priority">Priority <span className="text-red-500">*</span></Label>
                  <Select value={priority} onValueChange={setPriority}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority level" />
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
                
                <div className="space-y-1.5">
                  <div className="flex justify-between">
                    <Label htmlFor="location">Location <span className="text-red-500">*</span></Label>
                    {!coordinates && (
                      <Button 
                        type="button" 
                        variant="ghost" 
                        size="sm" 
                        className="text-blue-600 h-5 p-0"
                        onClick={getCurrentLocation}
                      >
                        Use current location
                      </Button>
                    )}
                  </div>
                  
                  <div className="flex gap-2">
                    <Input
                      id="location"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Address or landmark"
                      className="flex-1"
                      required
                    />
                    <Button 
                      type="button" 
                      onClick={searchLocation}
                      className="bg-blue-500 hover:bg-blue-600"
                    >
                      <Search className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  {coordinates && (
                    <p className="text-xs text-gray-500">
                      Coordinates: {coordinates.lat.toFixed(6)}, {coordinates.lng.toFixed(6)}
                    </p>
                  )}
                </div>
                
                <div className="space-y-1.5">
                  <Label htmlFor="description">Description <span className="text-red-500">*</span></Label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Provide details about the issue..."
                    rows={3}
                    required
                  />
                </div>
                
                <div className="space-y-1.5">
                  <Label htmlFor="image">Evidence (Optional)</Label>
                  <div className="border-2 border-dashed border-gray-200 rounded-lg p-4 transition-colors hover:border-blue-400">
                    <label 
                      htmlFor="image-upload" 
                      className="flex flex-col items-center justify-center cursor-pointer"
                    >
                      {image ? (
                        <div className="relative w-full h-28">
                          <img 
                            src={image} 
                            alt="Preview" 
                            className="h-full w-full object-cover rounded-md" 
                          />
                          <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity rounded-md">
                            <p className="text-white text-sm">Click to change</p>
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center text-gray-400 hover:text-blue-500 transition-colors">
                          <UploadCloud className="h-10 w-10 mb-2" />
                          <p className="text-sm">Upload image or document</p>
                          <p className="text-xs">Click to browse</p>
                        </div>
                      )}
                      <input
                        id="image-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      Submit Report
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
          
          <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
            <h3 className="font-medium text-blue-800 text-sm mb-2">Recent Reports</h3>
            <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
              {issues.slice(0, 5).map((issue) => (
                <div 
                  key={issue.id}
                  className="bg-white p-2 rounded-lg border border-blue-100 hover:border-blue-300 transition-colors flex items-start gap-2 text-sm cursor-pointer"
                  onClick={() => handleMarkerClick(issue)}
                >
                  <div className={`p-1.5 rounded-full flex-shrink-0 ${
                    issue.priority >= 4 ? 'bg-red-100' :
                    issue.priority === 3 ? 'bg-yellow-100' :
                    'bg-blue-100'
                  }`}>
                    <MapPin className={`h-3 w-3 ${
                      issue.priority >= 4 ? 'text-red-600' :
                      issue.priority === 3 ? 'text-yellow-600' :
                      'text-blue-600'
                    }`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{issue.title}</p>
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-gray-500">
                        {new Date(issue.createdAt).toLocaleString('en-US', { 
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                      <p className="text-xs font-medium px-1.5 py-0.5 rounded-full bg-gray-100">
                        {issue.category}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IssueMapPage;
