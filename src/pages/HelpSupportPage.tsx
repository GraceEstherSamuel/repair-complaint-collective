
import React, { useState, useRef, useEffect } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger 
} from "@/components/ui/popover";
import { 
  HelpCircle, 
  Search, 
  Clock, 
  AlertTriangle, 
  MessageSquare, 
  Send,
  ChevronRight
} from "lucide-react";
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";
import { toast } from "sonner";

const HelpSupportPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [customMessage, setCustomMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Auto-focus the input when the component mounts
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleSubmitCustomMessage = () => {
    if (customMessage.trim()) {
      console.log('Submitting custom message:', customMessage);
      toast.success("Thanks! We've received your message.", {
        description: "Our support team will get back to you shortly.",
        duration: 5000,
      });
      setSubmitted(true);
      setCustomMessage('');
      
      // Reset submitted status after 3 seconds
      setTimeout(() => {
        setSubmitted(false);
        setShowCustomInput(false);
        setSelectedTopic(null);
      }, 3000);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery('');
    setIsPopoverOpen(false);
    
    if (suggestion === 'custom') {
      setShowCustomInput(true);
      setSelectedTopic('custom');
    } else {
      setShowCustomInput(false);
      setSelectedTopic(suggestion);
    }
  };

  const renderSelectedTopicContent = () => {
    switch (selectedTopic) {
      case 'time':
        return (
          <Card className="mt-6 border-l-4 border-l-app-blue animate-in slide-in-from-bottom-4 duration-300">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl flex items-center gap-2">
                <Clock className="h-5 w-5 text-app-blue" />
                Issue Resolution Time
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Most issues are typically resolved within 3-5 business days, depending on complexity. 
                Priority issues reported by multiple users may be addressed sooner. You can always 
                check the status of your reported issues in your dashboard.
              </p>
            </CardContent>
            <CardFooter className="border-t pt-4 flex justify-end">
              <Button variant="outline" size="sm" onClick={() => setSelectedTopic(null)}>
                Close
              </Button>
            </CardFooter>
          </Card>
        );
      case 'noAction':
        return (
          <Card className="mt-6 border-l-4 border-l-app-orange animate-in slide-in-from-bottom-4 duration-300">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-app-orange" />
                No Action Taken
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                We're sorry to hear that your issue hasn't been addressed. There could be several reasons:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
                <li>The issue might require additional investigation</li>
                <li>It could be queued behind higher priority items</li>
                <li>Technical complications might have delayed resolution</li>
              </ul>
              <div className="mt-4">
                <Textarea 
                  placeholder="Please provide the issue ID or description to help us investigate further..."
                  className="min-h-[80px] resize-none"
                />
              </div>
            </CardContent>
            <CardFooter className="border-t pt-4 flex justify-between">
              <Button variant="outline" size="sm" onClick={() => setSelectedTopic(null)}>
                Cancel
              </Button>
              <Button 
                className="bg-app-blue hover:bg-app-blue/90 text-white"
                onClick={() => {
                  toast.success("Thank you for the follow-up", {
                    description: "We've escalated your issue to our support team.",
                  });
                  setSelectedTopic(null);
                }}
              >
                Submit Follow-up
              </Button>
            </CardFooter>
          </Card>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Help & Support</h1>
        <p className="text-muted-foreground">
          Find answers, report issues, and get assistance with our support tools.
        </p>
      </div>

      <Card className="border-2 border-primary/10 shadow-lg overflow-hidden">
        <CardHeader className="bg-muted/50 pb-4">
          <CardTitle className="flex items-center gap-2 text-app-blue">
            <HelpCircle className="h-5 w-5" />
            How can we help you?
          </CardTitle>
          <CardDescription>
            Search for help or select from suggested topics below
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="relative">
            <div className="flex w-full items-center p-2 rounded-full border border-gray-200 shadow-sm bg-white focus-within:ring-2 focus-within:ring-app-blue focus-within:border-app-blue transition-all">
              <Search className="ml-2 mr-3 h-5 w-5 text-gray-400 flex-shrink-0" />
              
              <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
                <PopoverTrigger asChild>
                  <Input
                    ref={inputRef}
                    type="text"
                    placeholder="Describe your issue..."
                    className="w-full border-none shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent h-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setIsPopoverOpen(true)}
                  />
                </PopoverTrigger>
                <PopoverContent align="start" className="w-[400px] p-0" sideOffset={5}>
                  <Command>
                    <CommandList>
                      <CommandGroup>
                        <CommandItem 
                          className="flex items-center gap-2 py-3 px-4 cursor-pointer hover:bg-muted"
                          onSelect={() => handleSuggestionClick('time')}
                        >
                          <Clock className="h-5 w-5 text-app-blue" />
                          <div className="flex flex-col">
                            <span>How long will it take for my issue to get resolved?</span>
                            <span className="text-xs text-muted-foreground">Learn about our resolution timeframes</span>
                          </div>
                          <ChevronRight className="ml-auto h-4 w-4 text-muted-foreground" />
                        </CommandItem>
                        
                        <CommandItem 
                          className="flex items-center gap-2 py-3 px-4 cursor-pointer hover:bg-muted"
                          onSelect={() => handleSuggestionClick('noAction')}
                        >
                          <AlertTriangle className="h-5 w-5 text-app-orange" />
                          <div className="flex flex-col">
                            <span>No action was taken on the issue I reported!</span>
                            <span className="text-xs text-muted-foreground">Get help with unresolved issues</span>
                          </div>
                          <ChevronRight className="ml-auto h-4 w-4 text-muted-foreground" />
                        </CommandItem>
                        
                        <CommandItem 
                          className="flex items-center gap-2 py-3 px-4 cursor-pointer hover:bg-muted"
                          onSelect={() => handleSuggestionClick('custom')}
                        >
                          <MessageSquare className="h-5 w-5 text-app-green" />
                          <div className="flex flex-col">
                            <span>Custom Write</span>
                            <span className="text-xs text-muted-foreground">Describe your issue in your own words</span>
                          </div>
                          <ChevronRight className="ml-auto h-4 w-4 text-muted-foreground" />
                        </CommandItem>
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <Button 
                variant="outline" 
                className="flex items-center gap-2 rounded-full shadow-sm"
                onClick={() => handleSuggestionClick('time')}
              >
                <Clock className="h-4 w-4 text-app-blue" />
                Issue resolution time
              </Button>
              <Button 
                variant="outline" 
                className="flex items-center gap-2 rounded-full shadow-sm"
                onClick={() => handleSuggestionClick('noAction')}
              >
                <AlertTriangle className="h-4 w-4 text-app-orange" />
                No action taken
              </Button>
              <Button 
                variant="outline" 
                className="flex items-center gap-2 rounded-full shadow-sm"
                onClick={() => handleSuggestionClick('custom')}
              >
                <MessageSquare className="h-4 w-4 text-app-green" />
                Custom Write
              </Button>
            </div>
          </div>

          {selectedTopic && renderSelectedTopicContent()}

          {showCustomInput && (
            <div className="mt-6 space-y-4 animate-in fade-in-50 slide-in-from-bottom-4 duration-300 border-l-4 border-l-app-green p-4 rounded-md bg-gray-50">
              <div className="flex items-center gap-2 mb-2">
                <MessageSquare className="h-5 w-5 text-app-green" />
                <h3 className="font-medium">Custom Message</h3>
              </div>
              <Textarea
                placeholder="Please describe the issue you're facing with our web-app..."
                className="min-h-[120px] resize-none focus-visible:ring-app-blue"
                value={customMessage}
                onChange={(e) => setCustomMessage(e.target.value)}
              />
              <div className="flex justify-end">
                <Button 
                  className="bg-app-blue hover:bg-app-blue/90 text-white flex items-center gap-2"
                  onClick={handleSubmitCustomMessage}
                  disabled={!customMessage.trim() || submitted}
                >
                  {submitted ? "Submitted! Thank you" : "Submit"}
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h3 className="font-medium">How do I report a new issue?</h3>
              <p className="text-sm text-muted-foreground">
                Use the "Report Issue" section in the sidebar to file a new complaint or problem.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium">Can I track my reported issues?</h3>
              <p className="text-sm text-muted-foreground">
                Yes, visit the "Dashboard" page to see all your reported issues and their current status.
              </p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h3 className="font-medium">Support Email</h3>
              <p className="text-sm text-muted-foreground">support@sahaay.org</p>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium">Emergency Hotline</h3>
              <p className="text-sm text-muted-foreground">+1 (800) 555-1234</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HelpSupportPage;
