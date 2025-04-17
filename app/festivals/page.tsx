import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CalendarIcon, MapPinIcon, TicketIcon, SearchIcon, FilterIcon } from "lucide-react"

// Mock data for festivals
const festivals = [
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
  {
    id: 5,
    name: "Folk & Roots Festival",
    image: "/placeholder.svg?height=300&width=500",
    date: "May 12-14, 2025",
    location: "Portland, OR",
    category: "Folk",
    price: "$159",
    status: "On Sale",
  },
  {
    id: 6,
    name: "Indie Music Showcase",
    image: "/placeholder.svg?height=300&width=500",
    date: "October 3-5, 2025",
    location: "Brooklyn, NY",
    category: "Indie",
    price: "$189",
    status: "Coming Soon",
  },
  {
    id: 7,
    name: "Classical Symphony Festival",
    image: "/placeholder.svg?height=300&width=500",
    date: "November 18-20, 2025",
    location: "Chicago, IL",
    category: "Classical",
    price: "$210",
    status: "On Sale",
  },
  {
    id: 8,
    name: "World Music Celebration",
    image: "/placeholder.svg?height=300&width=500",
    date: "July 25-27, 2025",
    location: "Miami, FL",
    category: "World",
    price: "$175",
    status: "On Sale",
  },
]

export default function FestivalsPage() {
  return (
    <div className="container py-8 mx-auto">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Explore Festivals</h1>

        <div className="bg-white rounded-lg shadow-sm border p-4 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input placeholder="Search festivals..." className="pl-9" />
            </div>
            <div>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="rock">Rock</SelectItem>
                  <SelectItem value="electronic">Electronic</SelectItem>
                  <SelectItem value="jazz">Jazz</SelectItem>
                  <SelectItem value="hip-hop">Hip Hop</SelectItem>
                  <SelectItem value="folk">Folk</SelectItem>
                  <SelectItem value="indie">Indie</SelectItem>
                  <SelectItem value="classical">Classical</SelectItem>
                  <SelectItem value="world">World</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  <SelectItem value="denver">Denver, CO</SelectItem>
                  <SelectItem value="austin">Austin, TX</SelectItem>
                  <SelectItem value="new-orleans">New Orleans, LA</SelectItem>
                  <SelectItem value="atlanta">Atlanta, GA</SelectItem>
                  <SelectItem value="portland">Portland, OR</SelectItem>
                  <SelectItem value="brooklyn">Brooklyn, NY</SelectItem>
                  <SelectItem value="chicago">Chicago, IL</SelectItem>
                  <SelectItem value="miami">Miami, FL</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Date" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Dates</SelectItem>
                  <SelectItem value="this-month">This Month</SelectItem>
                  <SelectItem value="next-month">Next Month</SelectItem>
                  <SelectItem value="three-months">Next 3 Months</SelectItem>
                  <SelectItem value="six-months">Next 6 Months</SelectItem>
                  <SelectItem value="this-year">This Year</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex items-center justify-between mt-4 pt-4 border-t">
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <FilterIcon className="h-4 w-4" />
              <span>8 festivals found</span>
            </div>
            <Button>Apply Filters</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {festivals.map((festival) => (
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
              <CardFooter className="pt-0">
                <Link href={`/festivals/${festival.id}`} className="w-full">
                  <Button variant={festival.status === "On Sale" ? "default" : "outline"} className="w-full">
                    {festival.status === "On Sale" ? "Buy Tickets" : "View Details"}
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

