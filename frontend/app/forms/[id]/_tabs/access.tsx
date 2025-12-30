"use client";

import { useState, useEffect } from "react";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Users, Plus, Trash2 } from "lucide-react";
import api from "@/lib/api";
import { toast } from "sonner";

interface Group {
  id: number;
  name: string;
  description: string | null;
  member_count: number;
  assigned_at?: string;
}

interface AccessTabProps {
  form_id: string;
}

export function AccessTab({ form_id }: AccessTabProps) {
  const [assigned_groups, setAssignedGroups] = useState<Group[]>([]);
  const [all_groups, setAllGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState(true);
  const [show_dialog, setShowDialog] = useState(false);
  const [assigning, setAssigning] = useState(false);

  useEffect(() => {
    fetchFormGroups();
  }, [form_id]);

  const fetchFormGroups = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/forms/${form_id}/groups`);
      setAssignedGroups(response.data.groups || []);
    } catch (error: any) {
      console.error("Failed to fetch form groups:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAllGroups = async () => {
    try {
      const response = await api.get("/groups-all");
      setAllGroups(response.data.groups || []);
      setShowDialog(true);
    } catch (error: any) {
      console.error("Failed to fetch all groups:", error);
      toast.error("Failed to load groups");
    }
  };

  const handleAssignGroup = async (group_id: number) => {
    try {
      setAssigning(true);
      await api.post(`/forms/${form_id}/groups`, { group_id });
      toast.success("Group assigned successfully");
      setShowDialog(false);
      fetchFormGroups();
    } catch (error: any) {
      console.error("Failed to assign group:", error);
      toast.error("Failed to assign group");
    } finally {
      setAssigning(false);
    }
  };

  const handleRemoveGroup = async (group_id: number) => {
    try {
      await api.delete(`/forms/${form_id}/groups/${group_id}`);
      toast.success("Group removed successfully");
      fetchFormGroups();
    } catch (error: any) {
      console.error("Failed to remove group:", error);
      toast.error("Failed to remove group");
    }
  };

  const available_groups = all_groups.filter(
    (g) => !assigned_groups.find((ag) => ag.id === g.id)
  );

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Group Access Management</CardTitle>
              <CardDescription>
                Assign this form to user groups to control who can access and fill it
              </CardDescription>
            </div>
            <Button variant="default" size="sm" onClick={fetchAllGroups}>
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

            {loading ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Loading...</p>
              </div>
            ) : assigned_groups.length > 0 ? (
              <div className="border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Group Name</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Members</TableHead>
                      <TableHead>Assigned Date</TableHead>
                      <TableHead className="w-[100px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {assigned_groups.map((group) => (
                      <TableRow key={group.id}>
                        <TableCell className="font-medium">{group.name}</TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {group.description || "-"}
                        </TableCell>
                        <TableCell>{group.member_count} users</TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {group.assigned_at
                            ? new Date(group.assigned_at).toLocaleDateString()
                            : "-"}
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveGroup(group.id)}
                          >
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
                <Button variant="outline" size="sm" onClick={fetchAllGroups}>
                  <Plus className="mr-2 h-4 w-4" />
                  Assign First Group
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Dialog open={show_dialog} onOpenChange={setShowDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Assign Group to Form</DialogTitle>
            <DialogDescription>
              Select a group to give access to this form
            </DialogDescription>
          </DialogHeader>
          <div className="max-h-[400px] overflow-y-auto">
            {available_groups.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Group Name</TableHead>
                    <TableHead>Members</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead className="w-[100px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {available_groups.map((group) => (
                    <TableRow key={group.id}>
                      <TableCell className="font-medium">{group.name}</TableCell>
                      <TableCell>{group.member_count} users</TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {group.description || "-"}
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleAssignGroup(group.id)}
                          disabled={assigning}
                        >
                          Assign
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                All groups are already assigned to this form
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDialog(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
