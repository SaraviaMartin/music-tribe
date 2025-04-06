import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MusicIcon, TicketIcon, CalendarIcon } from "lucide-react"
import FeaturedFestivals from "@/components/featured-festivals"
import HeroSection from "@/components/hero-section"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
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
      <Footer />
    </div>
  )
}
