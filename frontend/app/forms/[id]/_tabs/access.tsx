import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Users, Plus, Trash2 } from "lucide-react";

interface AccessTabProps {
  form_id: string;
}

export function AccessTab({ form_id }: AccessTabProps) {
  const assigned_groups: any[] = [];

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Group Access Management</CardTitle>
            <CardDescription>
              Assign this form to user groups to control who can access and fill it
            </CardDescription>
          </div>
          <Button variant="default" size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Add Group
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
            <Users className="h-5 w-5 text-muted-foreground mt-0.5" />
            <div className="flex-1">
              <h3 className="font-medium mb-1">How Group Access Works</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Assign forms to specific user groups</li>
                <li>• Users in assigned groups can access forms from their dashboard</li>
                <li>• Forms can be filled in-system or via public link</li>
                <li>• Multi-page forms with various field types are supported</li>
              </ul>
            </div>
          </div>

          {assigned_groups.length > 0 ? (
            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Group Name</TableHead>
                    <TableHead>Members</TableHead>
                    <TableHead>Assigned Date</TableHead>
                    <TableHead className="w-[100px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {assigned_groups.map((group) => (
                    <TableRow key={group.id}>
                      <TableCell className="font-medium">{group.name}</TableCell>
                      <TableCell>{group.member_count} users</TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {new Date(group.assigned_at).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="border-2 border-dashed rounded-lg p-12 text-center">
              <Users className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="font-medium mb-2">No Groups Assigned</h3>
              <p className="text-sm text-muted-foreground mb-4">
                This form is not assigned to any groups yet. Add groups to control access.
              </p>
              <Button variant="outline" size="sm">
                <Plus className="mr-2 h-4 w-4" />
                Assign First Group
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
