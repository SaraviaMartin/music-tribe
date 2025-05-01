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

  // Placeholder functions -  Replace with actual implementation using next-auth providers
  const handleGoogleLogin = () => {
    signIn("google", { callbackUrl: "/" });
  };

  const handleFacebookLogin = () => {
    signIn("facebook", { callbackUrl: "/" });
  };


  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="container max-w-md py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
          <p className="text-slate-600">Sign in to your account to continue</p>
        </div>

        <Tabs defaultValue="credentials" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="credentials">Email</TabsTrigger>
            <TabsTrigger value="github">GitHub</TabsTrigger>
            <TabsTrigger value="social">Social</TabsTrigger>
          </TabsList>
          <TabsContent value="credentials">
            <Card>
              <CardHeader>
                <CardTitle className="text-center">Sign in with Email</CardTitle>
              </CardHeader>
              <div className="space-y-4">
                <form onSubmit={handleSubmit} className="space-y-4">
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
              </div>
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
          <TabsContent value="social">
            <Card>
              <CardHeader>
                <CardTitle className="text-center">Sign in with Social</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={handleGoogleLogin}
                >
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Continue with Google
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={handleFacebookLogin}
                >
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z"/>
                  </svg>
                  Continue with Facebook
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