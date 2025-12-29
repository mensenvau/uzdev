"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { listForms, getCredentials, type GoogleForm } from "@/lib/forms-api";
import { FileText, ArrowRight, RefreshCw } from "lucide-react";
import { toast } from "sonner";

export default function Home() {
  const [forms, setForms] = useState<GoogleForm[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchForms();
  }, []);

  const fetchForms = async () => {
    try {
      setLoading(true);
      const credentials = getCredentials();
      if (!credentials) {
        setLoading(false);
        return;
      }

      const response = await listForms(credentials, 30, null);
      setForms(response.forms);
    } catch (error: any) {
      console.error("Failed to fetch forms:", error);
      toast.error("Failed to load forms");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <div className="max-w-6xl w-full space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">Welcome to Uzdev</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Fill out available forms or sign in to manage your dashboard
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Get Started</CardTitle>
              <CardDescription>Create an account or sign in to access your dashboard</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link href="/auth/login" className="block">
                <Button className="w-full" variant="default">
                  Sign In
                </Button>
              </Link>
              <Link href="/auth/register" className="block">
                <Button className="w-full" variant="outline">
                  Create Account
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Available Forms</CardTitle>
                  <CardDescription>Click on any form to fill it out</CardDescription>
                </div>
                <Button onClick={fetchForms} variant="ghost" size="sm" disabled={loading}>
                  <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="space-y-2">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="h-10 bg-muted animate-pulse rounded" />
                  ))}
                </div>
              ) : forms.length > 0 ? (
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {forms.map((form) => (
                    <Link
                      key={form.id}
                      href={`/forms/public/${form.id}`}
                      className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors group"
                    >
                      <div className="flex items-center gap-3">
                        <FileText className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium text-sm">{form.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(form.modifiedTime).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <FileText className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p>No forms available at the moment</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Features</CardTitle>
            <CardDescription>What our platform offers</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-3">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-primary rounded-full" />
                <span className="text-sm">Secure Authentication</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-primary rounded-full" />
                <span className="text-sm">Google Forms Integration</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-primary rounded-full" />
                <span className="text-sm">Real-time Updates</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-primary rounded-full" />
                <span className="text-sm">Responsive Design</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
