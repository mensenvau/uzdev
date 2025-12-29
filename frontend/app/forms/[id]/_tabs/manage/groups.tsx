import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function GroupsTab() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Group Access</CardTitle>
        <CardDescription>
          Manage which groups can access this form
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Assign this form to specific user groups to control access
            </p>
            <Button variant="outline" size="sm">
              Add Group
            </Button>
          </div>
          <div className="border rounded-lg p-8 text-center">
            <p className="text-muted-foreground mb-2">No groups assigned</p>
            <p className="text-xs text-muted-foreground">
              Click "Add Group" to assign this form to groups
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
