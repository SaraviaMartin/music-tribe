import Link from "next/link"
import { Button } from "@/components/ui/button"
import { SearchIcon } from "lucide-react"

export default function HeroSection() {
  return (
    <div className="relative bg-gradient-to-r from-purple-700 to-pink-600 text-white">
      <div className="absolute inset-0 bg-black/30 mix-blend-multiply" />
      <div className="container relative py-24 md:py-32">
        <div className="max-w-2xl space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">Discover Amazing Music Festivals</h1>
          <p className="text-lg md:text-xl text-white/90">
            Find and book tickets to the best music festivals around the world. Connect with your favorite artists and
            never miss a beat.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search for festivals, artists, or locations..."
                className="w-full h-12 pl-10 pr-4 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <Button className="h-12 px-6 bg-white text-purple-700 hover:bg-white/90">Search</Button>
          </div>
          <div className="flex flex-wrap gap-4 pt-2">
            <Link href="/festivals/category/rock">
              <Button variant="outline" className="border-white/30 hover:bg-white/10 hover:border-white/50">
                Rock
              </Button>
            </Link>
            <Link href="/festivals/category/electronic">
              <Button variant="outline" className="border-white/30 hover:bg-white/10 hover:border-white/50">
                Electronic
              </Button>
            </Link>
            <Link href="/festivals/category/jazz">
              <Button variant="outline" className="border-white/30 hover:bg-white/10 hover:border-white/50">
                Jazz
              </Button>
            </Link>
            <Link href="/festivals/category/hip-hop">
              <Button variant="outline" className="border-white/30 hover:bg-white/10 hover:border-white/50">
                Hip Hop
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

