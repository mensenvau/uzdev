"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { setAccessToken, setRefreshToken, setUserInfo } from "@/lib/auth";
import { formatApiError } from "@/lib/format-api-error";
import { toast } from "sonner";
import api from "@/lib/api";
const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

export function RegisterForm() {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
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

    if (!firstName || !lastName || !phone || !email || !password || !confirmPassword) {
      const message = "Please fill in all fields.";
      setError(message);
      toast.error(message);
      return;
    }

    const emailPattern = /\S+@\S+\.\S+/;
    if (!emailPattern.test(email)) {
      const message = "Enter a valid email address.";
      setError(message);
      toast.error(message);
      return;
    }

    if (password.length < 8) {
      const message = "Password should be at least 8 characters.";
      setError(message);
      toast.error(message);
      return;
    }

    if (password !== confirmPassword) {
      const message = "Passwords do not match";
      setError(message);
      toast.error(message);
      return;
    }

    setLoading(true);

    try {
      const response = await api.post("/auth/signup", {
        email,
        first_name: firstName,
        last_name: lastName,
        phone,
        password,
      });

      const { access_token, refresh_token, user } = response.data;

      setAccessToken(access_token);
      if (refresh_token) setRefreshToken(refresh_token);
      setUserInfo(user);
      toast.success("Account created! Redirecting to dashboard.");
      router.push("/dashboard");
    } catch (err: any) {
      const apiErrors = err.response?.data?.errors;
      const details =
        apiErrors && typeof apiErrors === "object"
          ? Object.values(apiErrors)
              .flat()
              .join(" ")
          : "";
      const combined = formatApiError(err, "Registration failed. Please try again.");
      setError(combined);
      toast.error(combined);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Create Account</CardTitle>
        <CardDescription>Enter your information to get started</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <div className="p-3 text-sm text-destructive bg-destructive/10 rounded-md">{error}</div>}

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="firstName" className="text-sm font-medium">
                First name
              </label>
              <Input id="firstName" type="text" placeholder="First name" value={firstName} onChange={(e) => setFirstName(e.target.value)} required disabled={loading} />
            </div>
            <div className="space-y-2">
              <label htmlFor="lastName" className="text-sm font-medium">
                Last name
              </label>
              <Input id="lastName" type="text" placeholder="Last name" value={lastName} onChange={(e) => setLastName(e.target.value)} required disabled={loading} />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <Input id="email" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required disabled={loading} />
          </div>

          <div className="space-y-2">
            <label htmlFor="phone" className="text-sm font-medium">
              Phone
            </label>
            <Input id="phone" type="tel" placeholder="+99890..." value={phone} onChange={(e) => setPhone(e.target.value)} required disabled={loading} />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium">
              Password
            </label>
            <Input id="password" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required disabled={loading} />
          </div>

          <div className="space-y-2">
            <label htmlFor="confirmPassword" className="text-sm font-medium">
              Confirm Password
            </label>
            <Input id="confirmPassword" type="password" placeholder="••••••••" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required disabled={loading} />
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Creating account..." : "Create Account"}
          </Button>
          <Button type="button" variant="outline" className="w-full" onClick={handleGoogle} disabled={loading || !googleReady}>
            Continue with Google
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
