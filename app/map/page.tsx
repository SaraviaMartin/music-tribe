"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CalendarIcon, MapPinIcon, SearchIcon, FilterIcon, ArrowLeftIcon, ArrowRightIcon } from "lucide-react"
import Footer from "@/components/footer"
import { LocationButton } from "@/components/ui/location-button"

// Mock data for festivals with coordinates
const festivals = [
  {
    id: 1,
    name: "Sonic Bloom",
    image: "/placeholder.svg?height=300&width=500",
    date: "June 15-18, 2025",
    location: "Denver, CO",
    coordinates: { lat: 39.7392, lng: -104.9903 },
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
    coordinates: { lat: 30.2672, lng: -97.7431 },
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
    coordinates: { lat: 29.9511, lng: -90.0715 },
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
    coordinates: { lat: 33.7490, lng: -84.3880 },
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
    coordinates: { lat: 45.5152, lng: -122.6784 },
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
    coordinates: { lat: 40.6782, lng: -73.9442 },
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
    coordinates: { lat: 41.8781, lng: -87.6298 },
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
    coordinates: { lat: 25.7617, lng: -80.1918 },
    category: "World",
    price: "$175",
    status: "On Sale",
  },
]

export default function MapPage() {
  const [selectedFestival, setSelectedFestival] = useState<number | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [category, setCategory] = useState("all")
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [mapLoaded, setMapLoaded] = useState(false)

  // Filter festivals based on search and category
  const filteredFestivals = festivals.filter((festival) => {
    const matchesSearch = festival.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         festival.location.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = category === "all" || festival.category.toLowerCase() === category.toLowerCase()
    return matchesSearch && matchesCategory
  })

  // Sort festivals by distance from user if location is available
  const sortedFestivals = [...filteredFestivals].sort((a, b) => {
    if (userLocation) {
      const distA = calculateDistance(userLocation, a.coordinates)
      const distB = calculateDistance(userLocation, b.coordinates)
      return distA - distB
    }
    return 0
  })

  // Calculate distance between two coordinates using Haversine formula
  function calculateDistance(point1: { lat: number; lng: number }, point2: { lat: number; lng: number }) {
    const R = 6371 // Earth's radius in km
    const dLat = (point2.lat - point1.lat) * Math.PI / 180
    const dLon = (point2.lng - point1.lng) * Math.PI / 180
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(point1.lat * Math.PI / 180) * Math.cos(point2.lat * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
    return R * c
  }

  // Get user's location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          })
        },
        (error) => {
          console.error("Error getting location:", error)
          // Default to a central US location if geolocation fails
          setUserLocation({ lat: 39.8283, lng: -98.5795 })
        }
      )
    }
  }, [])

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <div className="container mx-auto max-w-7xl py-8 px-4">
          <h1 className="text-3xl font-bold mb-6 text-center">Find Festivals Near You</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-white rounded-lg shadow-sm border p-4">
                <div className="space-y-4">
                  <div className="relative">
                    <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input 
                      placeholder="Search by name or location..." 
                      className="pl-9" 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t">
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <FilterIcon className="h-4 w-4" />
                      <span>{filteredFestivals.length} festivals found</span>
                    </div>
                    <Button 
                      onClick={() => {
                        if (navigator.geolocation) {
                          navigator.geolocation.getCurrentPosition(
                            (position) => {
                              setUserLocation({
                                lat: position.coords.latitude,
                                lng: position.coords.longitude
                              })
                            }
                          )
                        }
                      }}
                      className="bg-purple-600 hover:bg-purple-700 text-white font-medium px-4 py-2 rounded-md transition-colors duration-200"
                    >
                      <MapPinIcon className="h-4 w-4 mr-2" />
                      Find Festivals Near Me
                    </Button>
                  </div>
                </div>
              </div>

              <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                {sortedFestivals.map((festival) => (
                  <Card 
                    key={festival.id} 
                    className={`overflow-hidden cursor-pointer transition-all ${selectedFestival === festival.id ? 'ring-2 ring-purple-500' : ''}`}
                    onClick={() => setSelectedFestival(festival.id)}
                  >
                    <div className="flex">
                      <div className="w-1/3">
                        <img
                          src={festival.image}
                          alt={festival.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <CardContent className="w-2/3 p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-bold">{festival.name}</h3>
                            <Badge className="mt-1">{festival.category}</Badge>
                          </div>
                          <Badge className={festival.status === "On Sale" ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"}>
                            {festival.status}
                          </Badge>
                        </div>
                        <div className="mt-2 space-y-1 text-sm text-slate-600">
                          <div className="flex items-center gap-1">
                            <CalendarIcon className="h-3 w-3" />
                            <span>{festival.date}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPinIcon className="h-3 w-3" />
                            <span>{festival.location}</span>
                          </div>
                          {userLocation && (
                            <div className="text-xs text-slate-500">
                              {Math.round(calculateDistance(userLocation, festival.coordinates))} km away
                            </div>
                          )}
                        </div>
                        <div className="mt-3 space-y-2">
                          <LocationButton 
                            location={festival.location}
                            size="sm"
                            className="w-full"
                          />
                          <Link href={`/festivals/${festival.id}`}>
                            <Button size="sm" className="w-full">
                              {festival.status === "On Sale" ? "Buy Tickets" : "View Details"}
                            </Button>
                          </Link>
                        </div>
                      </CardContent>
                    </div>
                  </Card>
                ))}
                
                {filteredFestivals.length === 0 && (
                  <div className="text-center py-12 text-slate-500">
                    <p>No festivals found matching your criteria.</p>
                    <p className="text-sm mt-2">Try adjusting your search or filters.</p>
                  </div>
                )}
              </div>
            </div>

            <div className="lg:col-span-2 bg-slate-100 rounded-lg overflow-hidden h-[700px] relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center p-8 max-w-md">
                  <h3 className="text-xl font-bold mb-4">Interactive Festival Map</h3>
                  <p className="text-slate-600 mb-6">
                    This is where an interactive map would be displayed, showing festival locations and allowing users to explore events geographically.
                  </p>
                  <p className="text-sm text-slate-500 mb-4">
                    In a production environment, this would be integrated with a mapping API like Google Maps or Mapbox to show festival locations.
                  </p>
                  <div className="flex justify-center gap-4">
                    <Button variant="outline" size="sm">
                      <ArrowLeftIcon className="h-4 w-4 mr-2" />
                      Zoom Out
                    </Button>
                    <Button variant="outline" size="sm">
                      Zoom In
                      <ArrowRightIcon className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </div>
              </div>
              
              {selectedFestival && (
                <div className="absolute bottom-0 left-0 right-0 bg-white p-4 border-t">
                  {festivals.find(f => f.id === selectedFestival)?.name} selected
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}