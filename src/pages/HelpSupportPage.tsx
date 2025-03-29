
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger 
} from "@/components/ui/popover";
import { HelpCircle, Search, Clock, AlertTriangle, MessageSquare } from "lucide-react";

const HelpSupportPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [customMessage, setCustomMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmitCustomMessage = () => {
    if (customMessage.trim()) {
      console.log('Submitting custom message:', customMessage);
      setSubmitted(true);
      setCustomMessage('');
      // Reset submitted status after 3 seconds
      setTimeout(() => {
        setSubmitted(false);
        setShowCustomInput(false);
      }, 3000);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery('');
    setShowCustomInput(suggestion === 'custom');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Help & Support</h1>
        <p className="text-muted-foreground">
          Find answers, report issues, and get assistance with our support tools.
        </p>
      </div>

      <Card className="border-2 border-primary/10 shadow-lg">
        <CardHeader className="bg-muted/50">
          <CardTitle className="flex items-center gap-2">
            <HelpCircle className="h-5 w-5 text-app-blue" />
            How can we help you?
          </CardTitle>
          <CardDescription>
            Search for help or select from suggested topics below
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="relative">
            <div className="flex w-full items-center border-b-2 border-gray-200 pb-2 focus-within:border-app-blue transition-all">
              <Search className="mr-2 h-5 w-5 text-gray-400" />
              <Popover open={searchQuery.length > 0}>
                <PopoverTrigger asChild>
                  <input
                    type="text"
                    placeholder="Type your question or issue..."
                    className="w-full border-none focus:outline-none bg-transparent"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </PopoverTrigger>
                <PopoverContent align="start" className="w-[400px] p-0">
                  <div className="space-y-1 p-2">
                    <button
                      className="w-full rounded-md p-2 text-left hover:bg-muted flex items-center gap-2"
                      onClick={() => handleSuggestionClick('time')}
                    >
                      <Clock className="h-4 w-4 text-app-blue" />
                      How long will it take for my issue to get resolved?
                    </button>
                    <button
                      className="w-full rounded-md p-2 text-left hover:bg-muted flex items-center gap-2"
                      onClick={() => handleSuggestionClick('noAction')}
                    >
                      <AlertTriangle className="h-4 w-4 text-app-orange" />
                      No action was taken on the issue I reported about!
                    </button>
                    <button
                      className="w-full rounded-md p-2 text-left hover:bg-muted flex items-center gap-2"
                      onClick={() => handleSuggestionClick('custom')}
                    >
                      <MessageSquare className="h-4 w-4 text-app-green" />
                      Custom Write
                    </button>
                  </div>
                </PopoverContent>
              </Popover>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <Button 
                variant="outline" 
                className="flex items-center gap-2 rounded-full"
                onClick={() => handleSuggestionClick('time')}
              >
                <Clock className="h-4 w-4 text-app-blue" />
                Issue resolution time
              </Button>
              <Button 
                variant="outline" 
                className="flex items-center gap-2 rounded-full"
                onClick={() => handleSuggestionClick('noAction')}
              >
                <AlertTriangle className="h-4 w-4 text-app-orange" />
                No action taken
              </Button>
              <Button 
                variant="outline" 
                className="flex items-center gap-2 rounded-full"
                onClick={() => handleSuggestionClick('custom')}
              >
                <MessageSquare className="h-4 w-4 text-app-green" />
                Custom Write
              </Button>
            </div>
          </div>

          {showCustomInput && (
            <div className="mt-6 space-y-4 animate-in fade-in-50 slide-in-from-bottom-4 duration-300">
              <Textarea
                placeholder="Please describe the issue you're facing with our web-app..."
                className="min-h-[120px] resize-none focus-within:border-app-blue"
                value={customMessage}
                onChange={(e) => setCustomMessage(e.target.value)}
              />
              <Button 
                className="bg-app-blue hover:bg-app-blue/90 text-white"
                onClick={handleSubmitCustomMessage}
                disabled={!customMessage.trim() || submitted}
              >
                {submitted ? "Submitted! Thank you" : "Submit"}
              </Button>
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
