'use client'

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { SearchIcon } from "lucide-react"
import { useSession, signIn, signOut } from "next-auth/react"

export default function HeroSection() {
  // const { data: session, status } = useSession()

  return (
    <div className="relative w-full overflow-hidden bg-gradient-to-r from-purple-700 to-pink-600 text-white">
      <div className="absolute inset-0 bg-black/30 mix-blend-multiply" />
      <div className="relative py-24 md:py-32">
        <div className="mx-auto max-w-2xl space-y-6 text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">Connecting the Music <strong>Tribe</strong></h1>
          <p className="text-lg md:text-xl text-white/90">
            Find and book tickets to the best music festivals around the world. Connect with your favorite artists and
            never miss a beat.
          </p>
          
          {/* <div className="flex justify-center gap-4">
            {status === 'loading' ? (
              <div>Cargando...</div>
            ) : session ? (
              <>
                <span className="text-white">Bienvenido, {session.user?.name}</span>
                <Button onClick={() => signOut()} className="bg-white text-purple-700 hover:bg-white/90">
                  Cerrar Sesión
                </Button>
              </>
            ) : (
              <>
                <Button onClick={() => signIn('github')} className="bg-white text-purple-700 hover:bg-white/90">
                  Iniciar Sesión con GitHub
                </Button>
              </>
            )}
          </div> */}

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <div className="relative flex-1 max-w-xl">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search for festivals, artists, or locations..."
                className="w-full h-12 pl-10 pr-4 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <Button className="h-12 px-6 bg-white text-purple-700 hover:bg-white/90">Search</Button>
          </div>
          
          <div className="flex flex-wrap gap-4 pt-2 justify-center">
            <Link href="/festivals/category/rock">
              <Button className="border-white/30 hover:bg-white/10 hover:border-white/50">Rock</Button>
            </Link>
            <Link href="/festivals/category/electronic">
              <Button className="border-white/30 hover:bg-white/10 hover:border-white/50">Electronic</Button>
            </Link>
            <Link href="/festivals/category/jazz">
              <Button className="border-white/30 hover:bg-white/10 hover:border-white/50">Jazz</Button>
            </Link>
            <Link href="/festivals/category/hip-hop">
              <Button className="border-white/30 hover:bg-white/10 hover:border-white/50">Hip Hop</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

