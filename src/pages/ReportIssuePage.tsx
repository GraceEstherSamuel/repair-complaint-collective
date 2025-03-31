
import React from 'react';
import { MapPin } from 'lucide-react';

const ReportIssuePage = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Report Issue</h1>
        <div className="flex items-center gap-2 text-muted-foreground">
          <MapPin className="h-5 w-5" />
          <span className="text-sm">Report new community issues</span>
        </div>
      </div>
      
      <div className="grid gap-6">
        <div className="rounded-lg border bg-card p-6">
          <h2 className="text-xl font-semibold mb-4">Report a New Issue</h2>
          <p className="text-muted-foreground mb-4">
            Use this form to report new issues in your community. We'll review your submission and take appropriate action.
          </p>
          
          {/* Issue report form will go here in the future */}
          <div className="p-8 flex items-center justify-center">
            <p className="text-muted-foreground">Issue reporting functionality coming soon...</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportIssuePage;
