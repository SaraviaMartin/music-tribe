"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useSession, signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { MusicIcon, MenuIcon, UserIcon, LogOutIcon, TicketIcon, CalendarIcon, LayoutDashboardIcon, HomeIcon } from "lucide-react"

export default function Header() {
  const { data: session, status } = useSession()
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const isActive = (path: string) => {
    return pathname === path
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  const userInitials = session?.user?.name
    ? session.user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : "U"

  return (
    <header className="border-b sticky top-0 z-50 bg-white">
      <div className="container flex items-center py-4">
        <Link href="/" className="flex items-center gap-2">
          <MusicIcon className="h-6 w-6" />
          <span className="text-xl font-bold">Music Tribe</span>
        </Link>
        <div className="flex-1"></div>
        <div className="flex items-center gap-4">
          <nav className="hidden md:flex items-center gap-6">
            <Link 
              href="/" 
              className={`text-sm font-medium ${isActive("/") ? "text-purple-600" : "hover:text-purple-600"}`}
            >
              Inicio
            </Link>
            <Link 
              href="/festivals" 
              className={`text-sm font-medium ${isActive("/festivals") ? "text-purple-600" : "hover:text-purple-600"}`}
            >
              Festivals
            </Link>
            <Link 
              href="/map" 
              className={`text-sm font-medium ${isActive("/map") ? "text-purple-600" : "hover:text-purple-600"}`}
            >
              Map
            </Link>
            <Link 
              href="/artists" 
              className={`text-sm font-medium ${isActive("/artists") ? "text-purple-600" : "hover:text-purple-600"}`}
            >
              Artists
            </Link>
            <Link 
              href="/gallery" 
              className={`text-sm font-medium ${isActive("/gallery") ? "text-purple-600" : "hover:text-purple-600"}`}
            >
              Gallery
            </Link>
          </nav>
          
          {status === "loading" ? (
            <div className="h-9 w-20 bg-slate-100 animate-pulse rounded-md"></div>
          ) : session ? (
            <>
              {session.user?.role === "artist" && (
                <Link href="/artist/dashboard">
                  <Button variant="outline" size="sm" className="hidden md:flex">
                    <LayoutDashboardIcon className="h-4 w-4 mr-2" />
                    Artist Dashboard
                  </Button>
                </Link>
              )}
              
              {session.user?.role === "promoter" && (
                <Link href="/promoter/dashboard">
                  <Button variant="outline" size="sm" className="hidden md:flex">
                    <LayoutDashboardIcon className="h-4 w-4 mr-2" />
                    Promoter Dashboard
                  </Button>
                </Link>
              )}
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={session.user?.image || ""} alt={session.user?.name || "User"} />
                      <AvatarFallback>{userInitials}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>
                    <div className="flex flex-col">
                      <span>{session.user?.name}</span>
                      <span className="text-xs text-slate-500">{session.user?.email}</span>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/profile" className="cursor-pointer">
                      <UserIcon className="h-4 w-4 mr-2" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/tickets" className="cursor-pointer">
                      <TicketIcon className="h-4 w-4 mr-2" />
                      My Tickets
                    </Link>
                  </DropdownMenuItem>
                  {session.user?.role === "artist" && (
                    <DropdownMenuItem asChild>
                      <Link href="/artist/dashboard" className="cursor-pointer md:hidden">
                        <LayoutDashboardIcon className="h-4 w-4 mr-2" />
                        Artist Dashboard
                      </Link>
                    </DropdownMenuItem>
                  )}
                  {session.user?.role === "promoter" && (
                    <DropdownMenuItem asChild>
                      <Link href="/promoter/dashboard" className="cursor-pointer md:hidden">
                        <LayoutDashboardIcon className="h-4 w-4 mr-2" />
                        Promoter Dashboard
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => signOut()} className="cursor-pointer text-red-600">
                    <LogOutIcon className="h-4 w-4 mr-2" />
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Link href="/login" className="hidden md:block">
                <Button variant="outline" size="sm">
                  Log in
                </Button>
              </Link>
              <Link href="/signup" className="hidden md:block">
                <Button size="sm">Sign up</Button>
              </Link>
            </>
          )}
          
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <MenuIcon className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle>FestivalHub</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-4 mt-6">
                <Link href="/" onClick={closeMenu} className="flex items-center gap-2 py-2">
                  <HomeIcon className="h-5 w-5" />
                  Inicio
                </Link>
                <Link href="/festivals" onClick={closeMenu} className="flex items-center gap-2 py-2">
                  <CalendarIcon className="h-5 w-5" />
                  Festivals
                </Link>
                <Link href="/map" onClick={closeMenu} className="flex items-center gap-2 py-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                    <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"></polygon>
                    <line x1="9" x2="9" y1="3" y2="18"></line>
                    <line x1="15" x2="15" y1="6" y2="21"></line>
                  </svg>
                  Map
                </Link>
                <Link href="/artists" onClick={closeMenu} className="flex items-center gap-2 py-2">
                  <MusicIcon className="h-5 w-5" />
                  Artists
                </Link>
                <Link href="/gallery" onClick={closeMenu} className="flex items-center gap-2 py-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                    <path d="M3 9a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z"></path>
                    <path d="m21 9-9 6-9-6"></path>
                    <path d="m3 9 9 6 9-6"></path>
                  </svg>
                  Gallery
                </Link>
                
                {!session && (
                  <>
                    <div className="h-px bg-slate-200 my-2"></div>
                    <Link href="/login" onClick={closeMenu} className="flex items-center gap-2 py-2">
                      <UserIcon className="h-5 w-5" />
                      Log in
                    </Link>
                    <Link href="/signup" onClick={closeMenu}>
                      <Button className="w-full">Sign up</Button>
                    </Link>
                  </>
                )}
                
                {session && (
                  <>
                    <div className="h-px bg-slate-200 my-2"></div>
                    <Link href="/profile" onClick={closeMenu} className="flex items-center gap-2 py-2">
                      <UserIcon className="h-5 w-5" />
                      Profile
                    </Link>
                    <Link href="/tickets" onClick={closeMenu} className="flex items-center gap-2 py-2">
                      <TicketIcon className="h-5 w-5" />
                      My Tickets
                    </Link>
                    {session.user?.role === "artist" && (
                      <Link href="/artist/dashboard" onClick={closeMenu} className="flex items-center gap-2 py-2">
                        <LayoutDashboardIcon className="h-5 w-5" />
                        Artist Dashboard
                      </Link>
                    )}
                    {session.user?.role === "promoter" && (
                      <Link href="/promoter/dashboard" onClick={closeMenu} className="flex items-center gap-2 py-2">
                        <LayoutDashboardIcon className="h-5 w-5" />
                        Promoter Dashboard
                      </Link>
                    )}
                    <Button 
                      variant="destructive" 
                      className="mt-2" 
                      onClick={() => {
                        signOut()
                        closeMenu()
                      }}
                    >
                      Sign out
                    </Button>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}