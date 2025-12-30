"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";

interface SettingsTabProps {
  form_id: string;
  on_copy_public_link: () => void;
  on_open_in_google: () => void;
}

export function SettingsTab({ form_id, on_copy_public_link, on_open_in_google }: SettingsTabProps) {
  return (
    <Card>
      <CardContent className="space-y-4 pt-6">
        <div className="flex items-center justify-between p-4 border rounded-lg">
          <div>
            <h3 className="font-medium">Share Link</h3>
            <p className="text-sm text-muted-foreground">Copy the Google Forms link to share with users</p>
          </div>
          <Button variant="outline" onClick={on_copy_public_link}>
            Copy Link
          </Button>
        </div>
        <div className="flex items-center justify-between p-4 border rounded-lg">
          <div>
            <h3 className="font-medium">Edit in Google Forms</h3>
            <p className="text-sm text-muted-foreground">Open and edit this form in Google Forms editor</p>
          </div>
          <Button variant="outline" onClick={on_open_in_google}>
            <ExternalLink className="mr-2 h-4 w-4" />
            Open
          </Button>
        </div>
        <div className="flex items-center justify-between p-4 border rounded-lg">
          <div>
            <h3 className="font-medium">Form ID</h3>
            <p className="text-sm text-muted-foreground font-mono">{form_id}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
