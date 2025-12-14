"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { setAccessToken, setRefreshToken, setUserInfo } from "@/lib/auth";
import { toast } from "sonner";
import api from "@/lib/api";
import { formatApiError } from "@/lib/format-api-error";

const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleReady, setGoogleReady] = useState(false);

  useEffect(() => {
    const existing = document.getElementById("google-identity");
    if (existing) {
      setGoogleReady(true);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    script.id = "google-identity";
    script.onload = () => setGoogleReady(true);
    document.body.appendChild(script);
  }, []);

  const handleGoogle = () => {
    if (!googleClientId || !(window as any).google?.accounts?.id) {
      toast.error("Google Sign-In not configured");
      return;
    }
    (window as any).google.accounts.id.initialize({
      client_id: googleClientId,
      ux_mode: "popup",
      use_fedcm_for_prompt: false,
      callback: async (response: any) => {
        if (!response?.credential) {
          toast.error("Google sign-in failed");
          return;
        }
        try {
          const { data } = await api.post("/auth/google", { id_token: response.credential });
          setAccessToken(data.access_token);
          if (data.refresh_token) setRefreshToken(data.refresh_token);
          setUserInfo(data.user);
          toast.success("Signed in with Google");
          router.push("/dashboard");
        } catch (err: any) {
          toast.error(err.response?.data?.message || "Google sign-in failed");
        }
      },
    });
    (window as any).google.accounts.id.prompt();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      const message = "Please enter both email and password.";
      setError(message);
      toast.error(message);
      return;
    }

    setLoading(true);

    try {
      const response = await api.post("/auth/signin", { email, password });
      const { access_token, refresh_token, user } = response.data;

      setAccessToken(access_token);
      if (refresh_token) setRefreshToken(refresh_token);
      setUserInfo(user);
      toast.success("Welcome back! Redirecting to your dashboard.");
      router.push("/dashboard");
    } catch (err: any) {
      const combined = formatApiError(err, "Login failed. Please try again.");
      setError(combined);
      toast.error(combined);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Sign In</CardTitle>
        <CardDescription>Enter your credentials to access your account</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <div className="p-3 text-sm text-destructive bg-destructive/10 rounded-md">{error}</div>}

          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <Input id="email" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required disabled={loading} />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium">
              Password
            </label>
            <Input id="password" type="password" placeholder="********" value={password} onChange={(e) => setPassword(e.target.value)} required disabled={loading} />
            <div className="text-right">
              <Link href="/auth/forgot" className="text-xs text-primary hover:underline">
                Forgot password?
              </Link>
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
          </Button>
          <Button
            type="button"
            variant="secondary"
            className="w-full bg-white text-slate-900 border border-slate-200 hover:bg-slate-50 flex items-center justify-center gap-2"
            onClick={handleGoogle}
            disabled={loading || !googleReady}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="h-4 w-4">
              <path fill="#EA4335" d="M24 9.5c3.54 0 6 1.54 7.38 2.83l5.4-5.26C33.64 3.8 29.3 1.5 24 1.5 14.98 1.5 7.4 6.98 4.34 14.26l6.6 5.12C12.57 13.12 17.74 9.5 24 9.5z" />
              <path fill="#4285F4" d="M46.5 24.5c0-1.57-.14-3.08-.4-4.5H24v9h12.7c-.55 2.84-2.23 5.24-4.73 6.84l7.23 5.61C43.88 37.2 46.5 31.4 46.5 24.5z" />
              <path fill="#FBBC05" d="M10.94 28.88A11.97 11.97 0 0 1 9.98 24c0-1.69.36-3.3.96-4.74l-6.6-5.12C2.47 17.46 1.5 20.63 1.5 24c0 3.37.97 6.54 2.84 9.86l6.6-5.12z" />
              <path fill="#34A853" d="M24 46.5c6.3 0 11.6-2.07 15.47-5.65l-7.23-5.61C30.52 36.36 27.5 37.5 24 37.5c-6.26 0-11.43-3.62-13.06-8.62l-6.6 5.12C7.4 41.02 14.98 46.5 24 46.5z" />
              <path fill="none" d="M1.5 1.5h45v45h-45z" />
            </svg>
            Continue with Google
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
