import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MusicIcon, TicketIcon, CalendarIcon } from "lucide-react"
import FeaturedFestivals from "@/components/featured-festivals"
import HeroSection from "@/components/hero-section"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
        <div className="container flex items-center justify-between py-4">
          <Link href="/" className="flex items-center gap-2">
            <MusicIcon className="h-6 w-6" />
            <span className="text-xl font-bold">FestivalHub</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/festivals" className="text-sm font-medium hover:underline">
              Festivals
            </Link>
            <Link href="/artists" className="text-sm font-medium hover:underline">
              Artists
            </Link>
            <Link href="/about" className="text-sm font-medium hover:underline">
              Pricing
            </Link>
            <Link href="/about" className="text-sm font-medium hover:underline">
              About
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="outline" size="sm">
                Log in
              </Button>
            </Link>
            <Link href="/signup">
              <Button size="sm">Sign up</Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <HeroSection />
        <section className="container py-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">Upcoming Festivals</h2>
            <Link href="/festivals">
              <Button variant="outline">View all</Button>
            </Link>
          </div>
          <FeaturedFestivals />
        </section>
        <section className="bg-slate-50 py-16">
          <div className="container">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-4">For Artists</h2>
                <p className="text-slate-600 mb-6">
                  Showcase your talent and connect with fans. Create and manage your music festivals with our
                  easy-to-use platform.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="bg-slate-200 p-2 rounded-full">
                      <MusicIcon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-medium">Create Your Profile</h3>
                      <p className="text-sm text-slate-600">Showcase your music, photos, and bio to fans.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-slate-200 p-2 rounded-full">
                      <CalendarIcon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-medium">Publish Festivals</h3>
                      <p className="text-sm text-slate-600">Create and manage your upcoming festival events.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-slate-200 p-2 rounded-full">
                      <TicketIcon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-medium">Sell Tickets</h3>
                      <p className="text-sm text-slate-600">Manage ticket sales and track attendance.</p>
                    </div>
                  </div>
                </div>
                <Link href="/artist-signup" className="mt-6 inline-block">
                  <Button>Register as an Artist</Button>
                </Link>
              </div>
              <div className="rounded-lg overflow-hidden shadow-lg">
                <img
                  src="/placeholder.svg?height=400&width=600"
                  alt="Artist performing at a festival"
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full bg-gray-900 text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold mb-4">FestivalHub</h3>
              <p className="text-slate-400 text-sm">
                Connecting artists and fans through unforgettable festival experiences.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>
                  <Link href="/festivals" className="hover:text-white">
                    Festivals
                  </Link>
                </li>
                <li>
                  <Link href="/artists" className="hover:text-white">
                    Artists
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-white">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-4">For Artists</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>
                  <Link href="/artist-signup" className="hover:text-white">
                    Register
                  </Link>
                </li>
                <li>
                  <Link href="/artist-login" className="hover:text-white">
                    Login
                  </Link>
                </li>
                <li>
                  <Link href="/create-festival" className="hover:text-white">
                    Create Festival
                  </Link>
                </li>
                <li>
                  <Link href="/artist-resources" className="hover:text-white">
                    Resources
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>
                  <Link href="/terms" className="hover:text-white">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-white">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/cookies" className="hover:text-white">
                    Cookie Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-8 pt-8 text-center text-sm text-slate-400">
            <p>© {new Date().getFullYear()} FestivalHub. All rights reserved. Made with ❤️ by <Link href="https://github.com/SaraviaMartin" className="hover:text-white">Juan Martin</Link></p>
          </div>
        </div>
      </footer>
    </div>
  )
}

