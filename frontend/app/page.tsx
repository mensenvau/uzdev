import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <div className="max-w-4xl w-full space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
            Welcome to Core App
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A modern, full-stack application with authentication, form management, and more.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Get Started</CardTitle>
              <CardDescription>
                Create an account or sign in to access your dashboard
              </CardDescription>
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

          <Card>
            <CardHeader>
              <CardTitle>Features</CardTitle>
              <CardDescription>
                Explore what our platform has to offer
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-primary rounded-full" />
                <span className="text-sm">Secure Authentication</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-primary rounded-full" />
                <span className="text-sm">Dynamic Form Management</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-primary rounded-full" />
                <span className="text-sm">Real-time Updates</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-primary rounded-full" />
                <span className="text-sm">Responsive Design</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}
