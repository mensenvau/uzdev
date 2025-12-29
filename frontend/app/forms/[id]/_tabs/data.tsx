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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FormStructure } from "@/lib/forms-api";
import { Download, RefreshCw } from "lucide-react";
import { toast } from "sonner";

interface FormResponse {
  response_id: string;
  created_at: string;
  updated_at: string;
  respondent_email: string | null;
  answers: Array<{
    field_id: string;
    label: string;
    field_type: string;
    value: any;
  }>;
}

interface DataTabProps {
  form: FormStructure | null;
  responses: FormResponse[];
  loading_responses: boolean;
  on_refresh: () => void;
  on_export_csv: () => void;
}

export function DataTab({ form, responses, loading_responses, on_refresh, on_export_csv }: DataTabProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Form Responses</CardTitle>
            <CardDescription>
              View and analyze responses from this form ({responses.length} total)
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Button onClick={on_refresh} variant="outline" size="sm" disabled={loading_responses}>
              <RefreshCw className={`mr-2 h-4 w-4 ${loading_responses ? "animate-spin" : ""}`} />
              Refresh
            </Button>
            <Button onClick={on_export_csv} variant="outline" size="sm" disabled={responses.length === 0}>
              <Download className="mr-2 h-4 w-4" />
              Export CSV
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {loading_responses ? (
          <div className="text-center py-12">
            <RefreshCw className="h-8 w-8 mx-auto mb-2 animate-spin text-muted-foreground" />
            <p className="text-muted-foreground">Loading responses...</p>
          </div>
        ) : responses.length > 0 ? (
          <div className="border rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Submitted</TableHead>
                    <TableHead>Email</TableHead>
                    {form?.fields.map((field) => (
                      <TableHead key={field.field_id}>{field.label}</TableHead>
                    ))}
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {responses.map((response) => (
                    <TableRow key={response.response_id}>
                      <TableCell className="text-xs text-muted-foreground">
                        {new Date(response.created_at).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-sm">
                        {response.respondent_email || "Anonymous"}
                      </TableCell>
                      {form?.fields.map((field) => {
                        const answer = response.answers.find((a) => a.field_id === field.field_id);
                        return (
                          <TableCell key={field.field_id} className="text-sm">
                            {answer?.value || "-"}
                          </TableCell>
                        );
                      })}
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">⋮</Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => {
                              navigator.clipboard.writeText(response.response_id);
                              toast.success("Response ID copied");
                            }}>
                              Copy Response ID
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        ) : (
          <div className="text-center py-12 text-muted-foreground">
            <p>No responses yet. Share the form to start collecting responses.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
