"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { SearchIcon, FilterIcon, CalendarIcon, MapPinIcon, HeartIcon, ShareIcon, XIcon } from "lucide-react"
import Footer from "@/components/footer"

// Mock data for gallery images
const galleryImages = [
  {
    id: 1,
    src: "/placeholder.svg?height=600&width=800",
    alt: "Concert crowd at night",
    festival: "Sonic Bloom",
    location: "Denver, CO",
    date: "June 15-18, 2025",
    category: "Electronic",
    likes: 245,
  },
  {
    id: 2,
    src: "/placeholder.svg?height=800&width=600",
    alt: "Rock band performing on stage",
    festival: "Rock Revolution",
    location: "Austin, TX",
    date: "July 8-10, 2025",
    category: "Rock",
    likes: 189,
  },
  {
    id: 3,
    src: "/placeholder.svg?height=600&width=800",
    alt: "Jazz musicians in performance",
    festival: "Jazz Fusion Fest",
    location: "New Orleans, LA",
    date: "August 22-24, 2025",
    category: "Jazz",
    likes: 132,
  },
  {
    id: 4,
    src: "/placeholder.svg?height=800&width=600",
    alt: "Hip hop artist with crowd",
    festival: "Hip Hop Summit",
    location: "Atlanta, GA",
    date: "September 5-7, 2025",
    category: "Hip Hop",
    likes: 278,
  },
  {
    id: 5,
    src: "/placeholder.svg?height=600&width=800",
    alt: "Folk band on outdoor stage",
    festival: "Folk & Roots Festival",
    location: "Portland, OR",
    date: "May 12-14, 2025",
    category: "Folk",
    likes: 156,
  },
  {
    id: 6,
    src: "/placeholder.svg?height=800&width=600",
    alt: "Indie band performing",
    festival: "Indie Music Showcase",
    location: "Brooklyn, NY",
    date: "October 3-5, 2025",
    category: "Indie",
    likes: 201,
  },
  {
    id: 7,
    src: "/placeholder.svg?height=600&width=800",
    alt: "Orchestra performance",
    festival: "Classical Symphony Festival",
    location: "Chicago, IL",
    date: "November 18-20, 2025",
    category: "Classical",
    likes: 98,
  },
  {
    id: 8,
    src: "/placeholder.svg?height=800&width=600",
    alt: "World music performers",
    festival: "World Music Celebration",
    location: "Miami, FL",
    date: "July 25-27, 2025",
    category: "World",
    likes: 167,
  },
  {
    id: 9,
    src: "/placeholder.svg?height=600&width=800",
    alt: "Festival aerial view",
    festival: "Sonic Bloom",
    location: "Denver, CO",
    date: "June 15-18, 2025",
    category: "Electronic",
    likes: 312,
  },
  {
    id: 10,
    src: "/placeholder.svg?height=800&width=600",
    alt: "Crowd dancing at electronic festival",
    festival: "Sonic Bloom",
    location: "Denver, CO",
    date: "June 15-18, 2025",
    category: "Electronic",
    likes: 289,
  },
  {
    id: 11,
    src: "/placeholder.svg?height=600&width=800",
    alt: "Rock festival night scene",
    festival: "Rock Revolution",
    location: "Austin, TX",
    date: "July 8-10, 2025",
    category: "Rock",
    likes: 176,
  },
  {
    id: 12,
    src: "/placeholder.svg?height=800&width=600",
    alt: "Jazz festival crowd",
    festival: "Jazz Fusion Fest",
    location: "New Orleans, LA",
    date: "August 22-24, 2025",
    category: "Jazz",
    likes: 145,
  },
]

export default function GalleryPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [category, setCategory] = useState("all")
  const [festival, setFestival] = useState("all")
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const [likedImages, setLikedImages] = useState<number[]>([])

  // Get unique festivals for filter
  const uniqueFestivals = Array.from(new Set(galleryImages.map(img => img.festival)))

  // Filter images based on search, category, and festival
  const filteredImages = galleryImages.filter((image) => {
    const matchesSearch = image.festival.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         image.location.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = category === "all" || image.category.toLowerCase() === category.toLowerCase()
    const matchesFestival = festival === "all" || image.festival === festival
    return matchesSearch && matchesCategory && matchesFestival
  })

  // Toggle like for an image
  const toggleLike = (id: number) => {
    if (likedImages.includes(id)) {
      setLikedImages(likedImages.filter(imgId => imgId !== id))
    } else {
      setLikedImages([...likedImages, id])
    }
  }

  // Get the selected image details
  const getSelectedImage = () => {
    return galleryImages.find(img => img.id === selectedImage)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <div className="container mx-auto max-w-7xl py-8 px-4">
          <h1 className="text-3xl font-bold mb-6 text-center">Festival Gallery</h1>

          <div className="bg-white rounded-lg shadow-sm border p-4 mb-8 max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input 
                  placeholder="Search festivals or locations..." 
                  className="pl-9" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="rock">Rock</SelectItem>
                    <SelectItem value="electronic">Electronic</SelectItem>
                    <SelectItem value="jazz">Jazz</SelectItem>
                    <SelectItem value="hip hop">Hip Hop</SelectItem>
                    <SelectItem value="folk">Folk</SelectItem>
                    <SelectItem value="indie">Indie</SelectItem>
                    <SelectItem value="classical">Classical</SelectItem>
                    <SelectItem value="world">World</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Select value={festival} onValueChange={setFestival}>
                  <SelectTrigger>
                    <SelectValue placeholder="Festival" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Festivals</SelectItem>
                    {uniqueFestivals.map((fest) => (
                      <SelectItem key={fest} value={fest}>{fest}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <FilterIcon className="h-4 w-4" />
                  <span>{filteredImages.length} photos</span>
                </div>
                <Button>Apply Filters</Button>
              </div>
            </div>
          </div>

          <Tabs defaultValue="grid" className="mb-6 max-w-6xl mx-auto">
            <TabsList className="flex justify-center">
              <TabsTrigger value="grid">Grid View</TabsTrigger>
              <TabsTrigger value="masonry">Masonry View</TabsTrigger>
            </TabsList>
            <TabsContent value="grid" className="mt-6">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredImages.map((image) => (
                  <Dialog key={image.id}>
                    <DialogTrigger asChild>
                      <div 
                        className="relative group cursor-pointer overflow-hidden rounded-lg"
                        onClick={() => setSelectedImage(image.id)}
                      >
                        <img
                          src={image.src}
                          alt={image.alt}
                          className="w-full h-64 object-cover transition-transform group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-end">
                          <div className="p-3 text-white w-full">
                            <p className="font-medium">{image.festival}</p>
                            <p className="text-sm text-white/80">{image.location}</p>
                          </div>
                        </div>
                      </div>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl">
                      <DialogHeader>
                        <DialogTitle>{image.festival}</DialogTitle>
                        <DialogDescription>{image.location} • {image.date}</DialogDescription>
                      </DialogHeader>
                      <div className="relative">
                        <img
                          src={image.src}
                          alt={image.alt}
                          className="w-full rounded-md"
                        />
                        <div className="absolute top-2 right-2 flex gap-2">
                          <Button 
                            variant="outline" 
                            size="icon" 
                            className="bg-white/80 hover:bg-white"
                            onClick={() => toggleLike(image.id)}
                          >
                            <HeartIcon 
                              className={`h-4 w-4 ${likedImages.includes(image.id) ? 'fill-red-500 text-red-500' : ''}`} 
                            />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="icon" 
                            className="bg-white/80 hover:bg-white"
                          >
                            <ShareIcon className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <HeartIcon className="h-4 w-4 text-red-500" />
                            <span className="text-sm">{image.likes + (likedImages.includes(image.id) ? 1 : 0)}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <CalendarIcon className="h-4 w-4 text-slate-500" />
                            <span className="text-sm">{image.date}</span>
                          </div>
                        </div>
                        <Link href={`/festivals?category=${image.category.toLowerCase()}`}>
                          <Button variant="outline" size="sm">{image.category}</Button>
                        </Link>
                      </div>
                    </DialogContent>
                  </Dialog>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="masonry" className="mt-6">
              <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
                {filteredImages.map((image) => (
                  <Dialog key={image.id}>
                    <DialogTrigger asChild>
                      <div 
                        className="relative group cursor-pointer overflow-hidden rounded-lg break-inside-avoid"
                        onClick={() => setSelectedImage(image.id)}
                      >
                        <img
                          src={image.src}
                          alt={image.alt}
                          className="w-full object-cover transition-transform group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-end">
                          <div className="p-3 text-white w-full">
                            <p className="font-medium">{image.festival}</p>
                            <p className="text-sm text-white/80">{image.location}</p>
                          </div>
                        </div>
                      </div>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl">
                      <DialogHeader>
                        <DialogTitle>{image.festival}</DialogTitle>
                        <DialogDescription>{image.location} • {image.date}</DialogDescription>
                      </DialogHeader>
                      <div className="relative">
                        <img
                          src={image.src}
                          alt={image.alt}
                          className="w-full rounded-md"
                        />
                        <div className="absolute top-2 right-2 flex gap-2">
                          <Button 
                            variant="outline" 
                            size="icon" 
                            className="bg-white/80 hover:bg-white"
                            onClick={() => toggleLike(image.id)}
                          >
                            <HeartIcon 
                              className={`h-4 w-4 ${likedImages.includes(image.id) ? 'fill-red-500 text-red-500' : ''}`} 
                            />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="icon" 
                            className="bg-white/80 hover:bg-white"
                          >
                            <ShareIcon className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <HeartIcon className="h-4 w-4 text-red-500" />
                            <span className="text-sm">{image.likes + (likedImages.includes(image.id) ? 1 : 0)}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <CalendarIcon className="h-4 w-4 text-slate-500" />
                            <span className="text-sm">{image.date}</span>
                          </div>
                        </div>
                        <Link href={`/festivals?category=${image.category.toLowerCase()}`}>
                          <Button variant="outline" size="sm">{image.category}</Button>
                        </Link>
                      </div>
                    </DialogContent>
                  </Dialog>
                ))}
              </div>
            </TabsContent>
          </Tabs>

          {filteredImages.length === 0 && (
            <div className="text-center py-12 text-slate-500">
              <p>No photos found matching your criteria.</p>
              <p className="text-sm mt-2">Try adjusting your search or filters.</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}