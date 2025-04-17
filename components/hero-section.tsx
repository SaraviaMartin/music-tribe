'use client'

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { SearchIcon, MapPinIcon } from "lucide-react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function HeroSection() {
  const { data: session } = useSession()
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/festivals?search=${encodeURIComponent(searchQuery)}`)
    }
  }

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
          
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4 justify-center">
            <div className="relative flex-1 max-w-xl">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search for festivals, artists, or locations..."
                className="w-full h-12 pl-10 pr-4 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button type="submit" className="h-12 px-6 bg-white text-purple-700 hover:bg-white/90">Search</Button>
          </form>
          
          <div className="flex justify-center mt-4">
            <Link href="/map">
              <Button 
                className="bg-white text-purple-700 hover:bg-white/90 hover:text-purple-800 font-medium px-6 py-2 rounded-md transition-colors duration-200 flex items-center gap-2"
              >
                <MapPinIcon className="h-4 w-4" />
                Find Festivals Near Me
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

