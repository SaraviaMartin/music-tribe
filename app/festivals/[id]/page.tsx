import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { CalendarIcon, MapPinIcon, ClockIcon, UsersIcon, MusicIcon, InfoIcon, ShareIcon, HeartIcon } from "lucide-react"

// This would normally come from a database
const getFestival = (id: string) => {
  return {
    id: Number.parseInt(id),
    name: "Sonic Bloom",
    image: "/placeholder.svg?height=600&width=1200",
    date: "June 15-18, 2025",
    location: "Denver, CO",
    venue: "Red Rocks Amphitheatre",
    category: "Electronic",
    description:
      "Sonic Bloom is Colorado's premier electronic music festival, featuring world-class artists, immersive art installations, workshops, and a vibrant community experience.",
    price: {
      general: "$199",
      vip: "$349",
      premium: "$499",
    },
    status: "On Sale",
    lineup: [
      { name: "DJ Quantum", time: "Friday, 8:00 PM", stage: "Main Stage" },
      { name: "Bass Collective", time: "Friday, 10:00 PM", stage: "Main Stage" },
      { name: "Electra Waves", time: "Saturday, 7:30 PM", stage: "Forest Stage" },
      { name: "Rhythm Pulse", time: "Saturday, 9:30 PM", stage: "Main Stage" },
      { name: "Synth Masters", time: "Sunday, 6:00 PM", stage: "Beach Stage" },
      { name: "Neon Dreams", time: "Sunday, 8:30 PM", stage: "Main Stage" },
    ],
    amenities: [
      "Food vendors",
      "Free water stations",
      "VIP lounges",
      "Art installations",
      "Camping areas",
      "Workshops & activities",
    ],
  }
}

export default function FestivalDetailPage({ params }: { params: { id: string } }) {
  const festival = getFestival(params.id)

  return (
    <div className="container py-8">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1">
          <div className="mb-6">
            <Link href="/festivals" className="text-sm text-purple-600 hover:underline mb-2 inline-block">
              ← Back to Festivals
            </Link>
            <h1 className="text-3xl md:text-4xl font-bold">{festival.name}</h1>
            <div className="flex items-center gap-2 mt-2">
              <Badge>{festival.category}</Badge>
              <span className="text-sm text-slate-500">|</span>
              <span
                className={`text-sm ${festival.status === "On Sale" ? "text-green-600" : "text-amber-600"} font-medium flex items-center gap-1`}
              >
                <ClockIcon className="h-3 w-3" />
                {festival.status}
              </span>
            </div>
          </div>

          <div className="rounded-lg overflow-hidden mb-8">
            <img src={festival.image || "/placeholder.svg"} alt={festival.name} className="w-full h-auto" />
          </div>

          <Tabs defaultValue="details">
            <TabsList className="grid grid-cols-4 mb-6">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="lineup">Lineup</TabsTrigger>
              <TabsTrigger value="venue">Venue</TabsTrigger>
              <TabsTrigger value="faq">FAQ</TabsTrigger>
            </TabsList>

            <TabsContent value="details" className="space-y-6">
              <div>
                <h2 className="text-xl font-bold mb-3">About This Festival</h2>
                <p className="text-slate-600">{festival.description}</p>
              </div>

              <div>
                <h2 className="text-xl font-bold mb-3">Festival Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-purple-100 p-2 rounded-full">
                      <CalendarIcon className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">Date & Time</h3>
                      <p className="text-sm text-slate-600">{festival.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="bg-purple-100 p-2 rounded-full">
                      <MapPinIcon className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">Location</h3>
                      <p className="text-sm text-slate-600">
                        {festival.venue}, {festival.location}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="bg-purple-100 p-2 rounded-full">
                      <UsersIcon className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">Attendees</h3>
                      <p className="text-sm text-slate-600">5,000+ expected</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="bg-purple-100 p-2 rounded-full">
                      <MusicIcon className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">Music Type</h3>
                      <p className="text-sm text-slate-600">{festival.category}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-bold mb-3">Amenities</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {festival.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-purple-600"></div>
                      <span className="text-sm">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="lineup">
              <h2 className="text-xl font-bold mb-4">Festival Lineup</h2>
              <div className="space-y-4">
                {festival.lineup.map((artist, index) => (
                  <Card key={index}>
                    <CardContent className="p-4 flex justify-between items-center">
                      <div>
                        <h3 className="font-bold">{artist.name}</h3>
                        <div className="text-sm text-slate-600 flex flex-col sm:flex-row sm:gap-2">
                          <span>{artist.time}</span>
                          <span className="hidden sm:inline">•</span>
                          <span>{artist.stage}</span>
                        </div>
                      </div>
                      <Link href={`/artists/${artist.name.toLowerCase().replace(/\s+/g, "-")}`}>
                        <Button variant="outline" size="sm">
                          View Artist
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="venue">
              <h2 className="text-xl font-bold mb-4">Venue Information</h2>
              <div className="rounded-lg overflow-hidden mb-6">
                <img src="/placeholder.svg?height=400&width=800" alt={festival.venue} className="w-full h-auto" />
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-lg">{festival.venue}</h3>
                  <p className="text-slate-600">{festival.location}</p>
                </div>
                <p className="text-slate-600">
                  Red Rocks Amphitheatre is a natural rock structure that creates an open-air amphitheatre. Known for
                  its exceptional acoustics and stunning views, it's one of the most iconic music venues in the United
                  States.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <h4 className="font-medium mb-2">Directions</h4>
                    <p className="text-sm text-slate-600">
                      Located just 15 miles west of Denver, Red Rocks is easily accessible by car or shuttle services
                      from downtown Denver.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Parking</h4>
                    <p className="text-sm text-slate-600">
                      Parking is available on-site for $15 per vehicle. Early arrival is recommended as lots fill up
                      quickly.
                    </p>
                  </div>
                </div>
                <Button variant="outline" className="mt-2">
                  View on Map
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="faq">
              <h2 className="text-xl font-bold mb-4">Frequently Asked Questions</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-bold">What items are prohibited?</h3>
                  <p className="text-slate-600">
                    Outside food and beverages, glass containers, weapons, illegal substances, and professional
                    cameras/recording equipment are prohibited.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold">Is there an age restriction?</h3>
                  <p className="text-slate-600">
                    This is an all-ages event. However, attendees under 18 must be accompanied by an adult.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold">What's the refund policy?</h3>
                  <p className="text-slate-600">
                    Tickets are non-refundable but can be transferred to another person up to 7 days before the event.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold">Are there accommodations nearby?</h3>
                  <p className="text-slate-600">
                    Yes, there are several hotels in the area. We also offer on-site camping options with your festival
                    pass.
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div className="md:w-80 lg:w-96">
          <div className="sticky top-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold">Tickets</h2>
                  <Badge
                    className={
                      festival.status === "On Sale" ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"
                    }
                  >
                    {festival.status}
                  </Badge>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-center p-3 border rounded-md hover:bg-slate-50 cursor-pointer">
                    <div>
                      <h3 className="font-medium">General Admission</h3>
                      <p className="text-sm text-slate-600">Standard festival access</p>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">{festival.price.general}</div>
                      <div className="text-xs text-slate-500">+ $15 fees</div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center p-3 border rounded-md hover:bg-slate-50 cursor-pointer">
                    <div>
                      <h3 className="font-medium">VIP Access</h3>
                      <p className="text-sm text-slate-600">Premium viewing areas & lounges</p>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">{festival.price.vip}</div>
                      <div className="text-xs text-slate-500">+ $25 fees</div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center p-3 border rounded-md hover:bg-slate-50 cursor-pointer">
                    <div>
                      <h3 className="font-medium">Premium Package</h3>
                      <p className="text-sm text-slate-600">All access + exclusive perks</p>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">{festival.price.premium}</div>
                      <div className="text-xs text-slate-500">+ $35 fees</div>
                    </div>
                  </div>
                </div>

                <Button className="w-full mb-4">Buy Tickets</Button>

                <div className="flex gap-2">
                  <Button variant="outline" size="icon" className="flex-1">
                    <HeartIcon className="h-5 w-5" />
                  </Button>
                  <Button variant="outline" size="icon" className="flex-1">
                    <ShareIcon className="h-5 w-5" />
                  </Button>
                  <Button variant="outline" size="icon" className="flex-1">
                    <InfoIcon className="h-5 w-5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

