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

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      })

      if (result?.error) {
        setError("Invalid email or password")
        setIsLoading(false)
        return
      }

      router.push("/")
      router.refresh()
    } catch (error) {
      setError("Something went wrong. Please try again.")
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="container max-w-md py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
          <p className="text-slate-600">Sign in to your account to continue</p>
        </div>

        <Tabs defaultValue="credentials" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="credentials">Email</TabsTrigger>
            <TabsTrigger value="github">GitHub</TabsTrigger>
          </TabsList>
          <TabsContent value="credentials">
            <Card>
              <CardHeader>
                <CardTitle className="text-center">Sign in with Email</CardTitle>
              </CardHeader>
              <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4">
                  {error && (
                    <div className="p-3 bg-red-50 text-red-600 text-sm rounded-md">{error}</div>
                  )}
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
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">Password</Label>
                      <Link href="/forgot-password" className="text-xs text-purple-600 hover:underline">
                        Forgot password?
                      </Link>
                    </div>
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
                </CardContent>
                <CardFooter className="flex flex-col gap-4">
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Signing in..." : "Sign In"}
                  </Button>
                  <div className="text-center text-sm text-slate-600">
                    Don't have an account?{" "}
                    <Link href="/signup" className="text-purple-600 hover:underline">
                      Sign up
                    </Link>
                  </div>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
          <TabsContent value="github">
            <Card>
              <CardHeader>
                <CardTitle className="text-center">Sign in with GitHub</CardTitle>
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
              </CardContent>
              <CardFooter className="flex justify-center">
                <div className="text-center text-sm text-slate-600">
                  Don't have an account?{" "}
                  <Link href="/signup" className="text-purple-600 hover:underline">
                    Sign up
                  </Link>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-8 p-4 bg-slate-50 rounded-lg">
          <h3 className="font-medium mb-2">Demo Accounts</h3>
          <div className="space-y-2 text-sm">
            <div className="flex items-start gap-2">
              <UserIcon className="h-4 w-4 mt-0.5 text-slate-500" />
              <div>
                <p className="font-medium">Regular User</p>
                <p className="text-slate-600">Email: demo@example.com</p>
                <p className="text-slate-600">Password: password</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <UserIcon className="h-4 w-4 mt-0.5 text-slate-500" />
              <div>
                <p className="font-medium">Artist</p>
                <p className="text-slate-600">Email: artist@example.com</p>
                <p className="text-slate-600">Password: password</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <UserIcon className="h-4 w-4 mt-0.5 text-slate-500" />
              <div>
                <p className="font-medium">Promoter</p>
                <p className="text-slate-600">Email: promoter@example.com</p>
                <p className="text-slate-600">Password: password</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}