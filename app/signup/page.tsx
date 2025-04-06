"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { signIn } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { GithubIcon, UserIcon, MailIcon, LockIcon } from "lucide-react"

export default function SignupPage() {
  const router = useRouter()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      setIsLoading(false)
      return
    }

    // In a real app, you would register the user here
    // For demo purposes, we'll just redirect to login
    try {
      // Simulate registration success
      setTimeout(() => {
        router.push("/login?registered=true")
      }, 1000)
    } catch (error) {
      setError("Something went wrong. Please try again.")
      setIsLoading(false)
    }
  }

  return (
    <div className="container max-w-md py-12">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Create an Account</h1>
        <p className="text-slate-600">Join FestivalHub to discover and book music festivals</p>
      </div>

      <Tabs defaultValue="credentials" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="credentials">Email</TabsTrigger>
          <TabsTrigger value="github">GitHub</TabsTrigger>
        </TabsList>
        <TabsContent value="credentials">
          <Card>
            <CardHeader>
              <CardTitle className="text-center">Sign up with Email</CardTitle>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                {error && (
                  <div className="p-3 bg-red-50 text-red-600 text-sm rounded-md">{error}</div>
                )}
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <div className="relative">
                    <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input
                      id="name"
                      placeholder="Your name"
                      className="pl-9"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <MailIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      className="pl-9"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <LockIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      className="pl-9"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <div className="relative">
                    <LockIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="••••••••"
                      className="pl-9"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="text-xs text-slate-500">
                  By signing up, you agree to our{" "}
                  <Link href="/terms" className="text-purple-600 hover:underline">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy" className="text-purple-600 hover:underline">
                    Privacy Policy
                  </Link>
                  .
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-4">
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Creating account..." : "Create Account"}
                </Button>
                <div className="text-center text-sm text-slate-600">
                  Already have an account?{" "}
                  <Link href="/login" className="text-purple-600 hover:underline">
                    Sign in
                  </Link>
                </div>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
        <TabsContent value="github">
          <Card>
            <CardHeader>
              <CardTitle className="text-center">Sign up with GitHub</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button
                variant="outline"
                className="w-full flex items-center gap-2"
                onClick={() => signIn("github", { callbackUrl: "/" })}
              >
                <GithubIcon className="h-4 w-4" />
                Continue with GitHub
              </Button>
              <div className="text-xs text-slate-500 text-center">
                By signing up, you agree to our{" "}
                <Link href="/terms" className="text-purple-600 hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="text-purple-600 hover:underline">
                  Privacy Policy
                </Link>
                .
              </div>
            </CardContent>
            <CardFooter className="flex justify-center">
              <div className="text-center text-sm text-slate-600">
                Already have an account?{" "}
                <Link href="/login" className="text-purple-600 hover:underline">
                  Sign in
                </Link>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="mt-8 p-4 bg-slate-50 rounded-lg">
        <h3 className="font-medium mb-2">Are you an artist or promoter?</h3>
        <p className="text-sm text-slate-600 mb-4">
          If you're an artist or promoter looking to create and manage festivals, register through our specialized
          onboarding process.
        </p>
        <div className="flex flex-col sm:flex-row gap-2">
          <Link href="/artist-signup" className="flex-1">
            <Button variant="outline" className="w-full">
              Artist Registration
            </Button>
          </Link>
          <Link href="/promoter-signup" className="flex-1">
            <Button variant="outline" className="w-full">
              Promoter Registration
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}