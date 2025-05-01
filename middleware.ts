
import { NextResponse } from "next/server"
import { getToken } from "next-auth/jwt"
import type { NextRequest } from "next/server"

// Add routes that require authentication
const protectedRoutes = [
  "/profile",
  "/checkout",
  "/api/tickets/purchase",
]

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request })
  const isProtectedRoute = protectedRoutes.some(route => 
    request.nextUrl.pathname.startsWith(route)
  )

  if (isProtectedRoute && !token) {
    const loginUrl = new URL("/login", request.url)
    loginUrl.searchParams.set("callbackUrl", request.nextUrl.pathname)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    "/profile/:path*",
    "/checkout/:path*",
    "/api/tickets/:path*",
  ],
}
