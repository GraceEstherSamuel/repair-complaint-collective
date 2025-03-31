
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ReportIssuePage = () => {
  return (
    <div className="container mx-auto">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Report an Issue</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-muted-foreground">
            Use this form to report repair or maintenance issues in your community.
          </p>
          
          {/* Basic placeholder content until we build the full form */}
          <div className="mt-6 space-y-4">
            <p>Report Issue form will be implemented here.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReportIssuePage;
