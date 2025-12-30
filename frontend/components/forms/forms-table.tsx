"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Eye, ExternalLink, MoreHorizontal, Calendar } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { toast } from "sonner";

interface GoogleForm {
  id: string;
  name: string;
  createdTime: string;
  modifiedTime: string;
  webViewLink: string;
  owners?: Array<{ displayName?: string; emailAddress?: string }>;
}

interface FormsTableProps {
  forms: GoogleForm[];
  loading?: boolean;
  showSearch?: boolean;
  searchTerm?: string;
  onSearchChange?: (value: string) => void;
  onManage?: (id: string) => void;
  bare?: boolean;
}

export function FormsTable({ forms, loading, showSearch = true, searchTerm, onSearchChange, onManage, bare = false }: FormsTableProps) {
  const router = useRouter();
  const [searchInternal, setSearchInternal] = useState("");

  const searchValue = showSearch ? searchInternal : searchTerm || "";

  const filteredForms = forms.filter((form) => form.name.toLowerCase().includes(searchValue.toLowerCase()));

  const openGoogleForm = (webViewLink: string) => {
    window.open(webViewLink, "_blank");
  };

  const tableContent = loading ? (
    <div className="p-6 text-center text-muted-foreground text-sm">Loading forms...</div>
  ) : (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Form Name</TableHead>
          <TableHead>Owner</TableHead>
          <TableHead>Created</TableHead>
          <TableHead>Modified</TableHead>
          <TableHead className="text-right w-52">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filteredForms.length === 0 ? (
          <TableRow>
            <TableCell colSpan={5} className="text-center text-muted-foreground">
              {search ? "No forms found matching your search" : "No forms available"}
            </TableCell>
          </TableRow>
        ) : (
          filteredForms.map((form) => (
            <TableRow key={form.id} className="hover:bg-muted/50">
              <TableCell className="font-medium">{form.name}</TableCell>
              <TableCell>
                <div className="text-sm">
                  <div className="font-medium">
                    {form.owners?.[0]?.displayName || "Unknown"}
                  </div>
                  <div className="text-muted-foreground text-xs">
                    {form.owners?.[0]?.emailAddress}
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-3 w-3" />
                  {formatDistanceToNow(new Date(form.createdTime), { addSuffix: true })}
                </div>
              </TableCell>
              <TableCell>
                <div className="text-sm text-muted-foreground">
                  {formatDistanceToNow(new Date(form.modifiedTime), { addSuffix: true })}
                </div>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button variant="outline" size="sm" onClick={() => (onManage ? onManage(form.id) : router.push(`/forms/${form.id}`))}>
                    Manage
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => openGoogleForm(form.webViewLink)}>
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );

  return (
    <div className="space-y-4">
      {showSearch && (
        <div className="flex items-center justify-between">
          <Input
            placeholder="Search forms..."
            value={searchValue}
            onChange={(e) => {
              setSearchInternal(e.target.value);
              onSearchChange?.(e.target.value);
            }}
            className="max-w-sm"
          />
          <Badge variant="secondary">
            {filteredForms.length} {filteredForms.length === 1 ? "form" : "forms"}
          </Badge>
        </div>
      )}

      {bare ? (
        tableContent
      ) : (
        <div className="overflow-x-auto rounded-xl border bg-white/80 backdrop-blur">
          {tableContent}
        </div>
      )}
    </div>
  );
}
