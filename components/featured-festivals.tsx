import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CalendarIcon, MapPinIcon, TicketIcon, ClockIcon } from "lucide-react"

// Mock data for featured festivals
const featuredFestivals = [
  {
    id: 1,
    name: "Sonic Bloom",
    image: "/placeholder.svg?height=300&width=500",
    date: "June 15-18, 2025",
    location: "Denver, CO",
    category: "Electronic",
    price: "$199",
    status: "On Sale",
  },
  {
    id: 2,
    name: "Rock Revolution",
    image: "/placeholder.svg?height=300&width=500",
    date: "July 8-10, 2025",
    location: "Austin, TX",
    category: "Rock",
    price: "$249",
    status: "On Sale",
  },
  {
    id: 3,
    name: "Jazz Fusion Fest",
    image: "/placeholder.svg?height=300&width=500",
    date: "August 22-24, 2025",
    location: "New Orleans, LA",
    category: "Jazz",
    price: "$179",
    status: "Coming Soon",
  },
  {
    id: 4,
    name: "Hip Hop Summit",
    image: "/placeholder.svg?height=300&width=500",
    date: "September 5-7, 2025",
    location: "Atlanta, GA",
    category: "Hip Hop",
    price: "$229",
    status: "On Sale",
  },
]

export default function FeaturedFestivals() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {featuredFestivals.map((festival) => (
        <Card key={festival.id} className="overflow-hidden group">
          <div className="relative overflow-hidden">
            <img
              src={festival.image || "/placeholder.svg"}
              alt={festival.name}
              className="w-full h-48 object-cover transition-transform group-hover:scale-105"
            />
            <Badge className="absolute top-3 right-3 bg-white text-black font-medium">{festival.category}</Badge>
          </div>
          <CardContent className="pt-6">
            <h3 className="text-xl font-bold mb-2">{festival.name}</h3>
            <div className="space-y-2 text-sm text-slate-600">
              <div className="flex items-center gap-2">
                <CalendarIcon className="h-4 w-4" />
                <span>{festival.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPinIcon className="h-4 w-4" />
                <span>{festival.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <TicketIcon className="h-4 w-4" />
                <span>Starting at {festival.price}</span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between items-center pt-0">
            <div className="flex items-center gap-1 text-sm">
              <ClockIcon className="h-4 w-4 text-purple-600" />
              <span
                className={festival.status === "On Sale" ? "text-green-600 font-medium" : "text-amber-600 font-medium"}
              >
                {festival.status}
              </span>
            </div>
            <Link href={`/festivals/${festival.id}`}>
              <Button variant={festival.status === "On Sale" ? "default" : "outline"}>
                {festival.status === "On Sale" ? "Buy Tickets" : "View Details"}
              </Button>
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

