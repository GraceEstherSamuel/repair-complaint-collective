
import { useState, useRef, useEffect } from "react";
import { 
  Search, 
  Clock, 
  AlertTriangle, 
  Edit, 
  Send, 
  ArrowRight,
  MessageSquareText,
  HelpCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";

const HelpSupportPage = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [selectedSuggestion, setSelectedSuggestion] = useState<string | null>(null);
  const [customMessage, setCustomMessage] = useState("");
  const [responseMessage, setResponseMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Auto-suggested options
  const suggestedOptions = [
    {
      id: "resolution-time",
      title: "How long will it take for my issue to get resolved?",
      icon: Clock,
      response: "Most issues are resolved within 48-72 hours depending on priority and complexity. Critical issues receive immediate attention and are typically resolved within 24 hours."
    },
    {
      id: "no-action",
      title: "No action was taken on the issue I reported about!",
      icon: AlertTriangle,
      response: "We apologize for the delay. Your concern has been escalated to our priority team. A support representative will contact you within the next 12 hours to address this matter."
    },
    {
      id: "custom-write",
      title: "Custom Write",
      icon: Edit,
      response: null
    }
  ];
  
  // Focus input when component mounts
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);
  
  const handleInputClick = () => {
    setIsPopoverOpen(true);
  };
  
  const handleSuggestionSelect = (suggestion: typeof suggestedOptions[0]) => {
    setSearchQuery(suggestion.title);
    setSelectedSuggestion(suggestion.id);
    setIsPopoverOpen(false);
    
    if (suggestion.id === "custom-write") {
      setResponseMessage(null);
    } else {
      setResponseMessage(suggestion.response);
    }
  };
  
  const handleCustomSubmit = () => {
    if (!customMessage.trim()) {
      toast.error("Please enter your message");
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate sending to backend
    setTimeout(() => {
      setIsSubmitting(false);
      setResponseMessage("Thank you for your message. Our support team will review your issue and respond shortly.");
      toast.success("Message sent successfully");
      setCustomMessage("");
    }, 1000);
  };
  
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    
    if (!selectedSuggestion) {
      setIsPopoverOpen(true);
    }
  };
  
  const getSuggestionIcon = (id: string) => {
    const suggestion = suggestedOptions.find(s => s.id === id);
    if (!suggestion) return null;
    
    const Icon = suggestion.icon;
    return <Icon className="h-5 w-5" />;
  };
  
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <HelpCircle className="h-6 w-6 text-app-blue" />
          Help & Support
        </h1>
        <p className="text-gray-500 mt-1">
          Get assistance or report an issue with our smart support system
        </p>
      </div>
      
      <Card className="bg-white shadow-lg border-0 overflow-hidden mb-8">
        <div className="bg-gradient-to-r from-app-blue to-blue-600 p-6 text-white">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <MessageSquareText className="h-5 w-5" />
            How can we help you?
          </h2>
          <p className="text-blue-100 text-sm mt-1">
            Search for help or select from suggested options below
          </p>
        </div>
        
        <CardContent className="p-6">
          <form onSubmit={handleSearchSubmit} className="relative">
            <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
              <PopoverTrigger asChild>
                <div className="relative">
                  <Input
                    ref={inputRef}
                    className="w-full pl-12 py-6 text-lg rounded-lg border-gray-200 shadow-sm focus:border-app-blue focus:ring focus:ring-blue-100 transition-all"
                    placeholder="Describe your issue"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onClick={handleInputClick}
                  />
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  {searchQuery && (
                    <Button 
                      type="submit"
                      size="icon"
                      variant="ghost"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 h-8 w-8 hover:bg-blue-50"
                    >
                      <Send className="h-4 w-4 text-app-blue" />
                    </Button>
                  )}
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-[calc(100%-2rem)] max-w-md p-0 mt-2" align="center">
                <div className="p-4">
                  <h3 className="text-sm font-medium text-gray-500 mb-3">Suggested options</h3>
                  <div className="space-y-2">
                    {suggestedOptions.map((option) => (
                      <div
                        key={option.id}
                        className="flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-blue-50 transition-colors"
                        onClick={() => handleSuggestionSelect(option)}
                      >
                        <div className={`p-2 rounded-full ${
                          option.id === "resolution-time" ? "bg-blue-100 text-blue-600" :
                          option.id === "no-action" ? "bg-orange-100 text-orange-600" :
                          "bg-green-100 text-green-600"
                        }`}>
                          <option.icon className="h-4 w-4" />
                        </div>
                        <span className="text-gray-800 text-sm font-medium">{option.title}</span>
                        <ArrowRight className="h-4 w-4 text-gray-400 ml-auto" />
                      </div>
                    ))}
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </form>
          
          {/* Response or Custom Write Area */}
          {(responseMessage || selectedSuggestion === "custom-write") && (
            <div className="mt-6 animate-in fade-in slide-in-from-top-4 duration-300">
              {selectedSuggestion === "custom-write" ? (
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="bg-green-100 p-2 rounded-full text-green-600 mt-1">
                      <Edit className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-md font-medium text-gray-800">Custom Write</h3>
                      <p className="text-sm text-gray-500">Please describe the issue you're facing with our web-app...</p>
                    </div>
                  </div>
                  
                  <Textarea
                    value={customMessage}
                    onChange={(e) => setCustomMessage(e.target.value)}
                    placeholder="Please describe your issue in detail..."
                    className="min-h-[120px] border-gray-200 focus:border-app-blue focus:ring focus:ring-blue-100"
                  />
                  
                  <div className="flex justify-end">
                    <Button 
                      onClick={handleCustomSubmit} 
                      className="bg-app-blue hover:bg-blue-600"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                          Processing...
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4 mr-2" />
                          Submit
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="bg-blue-50 rounded-lg p-5 border border-blue-100">
                  <div className="flex items-start gap-3">
                    <div className="bg-white p-2 rounded-full text-app-blue mt-1 shadow-sm">
                      {selectedSuggestion && getSuggestionIcon(selectedSuggestion)}
                    </div>
                    <div>
                      <h3 className="text-md font-medium text-gray-800">
                        {selectedSuggestion && suggestedOptions.find(s => s.id === selectedSuggestion)?.title}
                      </h3>
                      <p className="text-gray-600 mt-2">{responseMessage}</p>
                      
                      <div className="mt-4 flex justify-end">
                        <Button 
                          variant="outline" 
                          className="text-app-blue border-app-blue hover:bg-blue-50"
                          onClick={() => {
                            setSelectedSuggestion("custom-write");
                            setResponseMessage(null);
                          }}
                        >
                          <Edit className="h-4 w-4 mr-2" />
                          Write Custom Message
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
      
      {/* FAQ Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Frequently Asked Questions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { title: "How do I report a new issue?", content: "You can report a new issue by selecting 'Custom Write' from the suggestions and describing your issue in detail." },
            { title: "What information should I include in my report?", content: "Include the location, category, and any relevant details that would help us understand and resolve your issue faster." },
            { title: "How can I track my reported issues?", content: "You can track all your reported issues from the Dashboard or Community Issues section in the main menu." },
            { title: "Who will handle my reported issues?", content: "Depending on the category, your issue will be routed to the appropriate municipal department or authority for resolution." }
          ].map((faq, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <h3 className="font-medium text-gray-800 mb-2">{faq.title}</h3>
                <p className="text-gray-600 text-sm">{faq.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      
      {/* Contact Information */}
      <Card className="bg-gray-50 border-0">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div>
              <h3 className="text-lg font-medium text-gray-800">Still need help?</h3>
              <p className="text-gray-600 text-sm mt-1">Our support team is available 24/7 to assist you</p>
            </div>
            <div className="mt-4 md:mt-0 flex gap-3">
              <Button variant="outline" className="border-app-blue text-app-blue hover:bg-blue-50">
                Email Support
              </Button>
              <Button className="bg-app-green hover:bg-app-green/90">
                Call Helpline
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HelpSupportPage;
