"use client"

import { useState } from "react"
import Link from "next/link"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { CalendarIcon, MapPinIcon, TicketIcon, DownloadIcon, ShareIcon, QrCodeIcon } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"

// Mock data for user tickets
const userTickets = [
  {
    id: "TKT-123456",
    festivalId: 1,
    festivalName: "Sonic Bloom",
    image: "/placeholder.svg?height=300&width=500",
    date: "June 15-18, 2025",
    location: "Denver, CO",
    venue: "Red Rocks Amphitheatre",
    ticketType: "General Admission",
    price: "$199",
    purchaseDate: "April 5, 2025",
    status: "Valid",
    qrCode: "/placeholder.svg?height=300&width=300",
  },
  {
    id: "TKT-789012",
    festivalId: 2,
    festivalName: "Rock Revolution",
    image: "/placeholder.svg?height=300&width=500",
    date: "July 8-10, 2025",
    location: "Austin, TX",
    venue: "Zilker Park",
    ticketType: "VIP Access",
    price: "$349",
    purchaseDate: "March 20, 2025",
    status: "Valid",
    qrCode: "/placeholder.svg?height=300&width=300",
  },
  {
    id: "TKT-345678",
    festivalId: 4,
    festivalName: "Hip Hop Summit",
    image: "/placeholder.svg?height=300&width=500",
    date: "September 5-7, 2025",
    location: "Atlanta, GA",
    venue: "Piedmont Park",
    ticketType: "General Admission",
    price: "$229",
    purchaseDate: "February 15, 2025",
    status: "Valid",
    qrCode: "/placeholder.svg?height=300&width=300",
  },
]

// Mock data for past tickets
const pastTickets = [
  {
    id: "TKT-901234",
    festivalId: 5,
    festivalName: "Folk & Roots Festival",
    image: "/placeholder.svg?height=300&width=500",
    date: "May 12-14, 2024",
    location: "Portland, OR",
    venue: "Waterfront Park",
    ticketType: "General Admission",
    price: "$159",
    purchaseDate: "January 10, 2024",
    status: "Used",
    qrCode: "/placeholder.svg?height=300&width=300",
  },
  {
    id: "TKT-567890",
    festivalId: 8,
    festivalName: "World Music Celebration",
    image: "/placeholder.svg?height=300&width=500",
    date: "July 25-27, 2024",
    location: "Miami, FL",
    venue: "Bayfront Park",
    ticketType: "VIP Access",
    price: "$299",
    purchaseDate: "March 5, 2024",
    status: "Used",
    qrCode: "/placeholder.svg?height=300&width=300",
  },
]

export default function TicketsPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [selectedTicket, setSelectedTicket] = useState<string | null>(null)

  // Redirect if not authenticated
  if (status === "unauthenticated") {
    router.push("/login")
    return null
  }

  // Get the selected ticket details
  const getSelectedTicket = () => {
    return [...userTickets, ...pastTickets].find(ticket => ticket.id === selectedTicket)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container py-8">
        <h1 className="text-3xl font-bold mb-6">My Tickets</h1>
        
        <Tabs defaultValue="upcoming" className="space-y-6">
          <TabsList>
            <TabsTrigger value="upcoming">Upcoming Festivals</TabsTrigger>
            <TabsTrigger value="past">Past Festivals</TabsTrigger>
          </TabsList>
          
          <TabsContent value="upcoming" className="space-y-6">
            {userTickets.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {userTickets.map((ticket) => (
                  <Card key={ticket.id} className="overflow-hidden">
                    <div className="relative">
                      <img
                        src={ticket.image}
                        alt={ticket.festivalName}
                        className="w-full h-48 object-cover"
                      />
                      <Badge className="absolute top-3 right-3 bg-green-100 text-green-800">
                        {ticket.status}
                      </Badge>
                    </div>
                    <CardContent className="pt-6">
                      <h3 className="text-xl font-bold mb-2">{ticket.festivalName}</h3>
                      <div className="space-y-2 text-sm text-slate-600">
                        <div className="flex items-center gap-2">
                          <CalendarIcon className="h-4 w-4" />
                          <span>{ticket.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPinIcon className="h-4 w-4" />
                          <span>{ticket.venue}, {ticket.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <TicketIcon className="h-4 w-4" />
                          <span>{ticket.ticketType} - {ticket.price}</span>
                        </div>
                      </div>
                      
                      <Separator className="my-4" />
                      
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-500">Purchased: {ticket.purchaseDate}</span>
                        <span className="font-medium">#{ticket.id}</span>
                      </div>
                    </CardContent>
                    <CardFooter className="flex gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            variant="outline" 
                            className="flex-1"
                            onClick={() => setSelectedTicket(ticket.id)}
                          >
                            <QrCodeIcon className="h-4 w-4 mr-2" />
                            View Ticket
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-md">
                          <DialogHeader>
                            <DialogTitle>E-Ticket: {ticket.festivalName}</DialogTitle>
                            <DialogDescription>
                              {ticket.date} • {ticket.venue}
                            </DialogDescription>
                          </DialogHeader>
                          <div className="flex flex-col items-center">
                            <div className="bg-white p-4 rounded-lg mb-4">
                              <img src={ticket.qrCode} alt="QR Code" className="w-64 h-64" />
                            </div>
                            <div className="text-center mb-4">
                              <h3 className="font-bold">{ticket.ticketType}</h3>
                              <p className="text-sm text-slate-600">Ticket ID: {ticket.id}</p>
                            </div>
                            <div className="w-full space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span className="text-slate-500">Name:</span>
                                <span>{session?.user?.name}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-slate-500">Festival:</span>
                                <span>{ticket.festivalName}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-slate-500">Date:</span>
                                <span>{ticket.date}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-slate-500">Venue:</span>
                                <span>{ticket.venue}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-slate-500">Ticket Type:</span>
                                <span>{ticket.ticketType}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-2 mt-4">
                            <Button variant="outline" className="flex-1">
                              <DownloadIcon className="h-4 w-4 mr-2" />
                              Download
                            </Button>
                            <Button variant="outline" className="flex-1">
                              <ShareIcon className="h-4 w-4 mr-2" />
                              Share
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                      <Link href={`/festivals/${ticket.festivalId}`} className="flex-1">
                        <Button variant="outline" className="w-full">
                          Festival Details
                        </Button>
                      </Link>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 border rounded-lg bg-slate-50">
                <TicketIcon className="h-12 w-12 mx-auto text-slate-400 mb-4" />
                <h3 className="text-xl font-bold mb-2">No Upcoming Tickets</h3>
                <p className="text-slate-600 mb-6">You don't have any tickets for upcoming festivals.</p>
                <Link href="/festivals">
                  <Button>Browse Festivals</Button>
                </Link>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="past" className="space-y-6">
            {pastTickets.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pastTickets.map((ticket) => (
                  <Card key={ticket.id} className="overflow-hidden">
                    <div className="relative">
                      <img
                        src={ticket.image}
                        alt={ticket.festivalName}
                        className="w-full h-48 object-cover grayscale"
                      />
                      <Badge className="absolute top-3 right-3 bg-slate-100 text-slate-800">
                        {ticket.status}
                      </Badge>
                    </div>
                    <CardContent className="pt-6">
                      <h3 className="text-xl font-bold mb-2">{ticket.festivalName}</h3>
                      <div className="space-y-2 text-sm text-slate-600">
                        <div className="flex items-center gap-2">
                          <CalendarIcon className="h-4 w-4" />
                          <span>{ticket.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPinIcon className="h-4 w-4" />
                          <span>{ticket.venue}, {ticket.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <TicketIcon className="h-4 w-4" />
                          <span>{ticket.ticketType} - {ticket.price}</span>
                        </div>
                      </div>
                      
                      <Separator className="my-4" />
                      
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-500">Purchased: {ticket.purchaseDate}</span>
                        <span className="font-medium">#{ticket.id}</span>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Link href={`/festivals/${ticket.festivalId}`} className="w-full">
                        <Button variant="outline" className="w-full">
                          View Festival
                        </Button>
                      </Link>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 border rounded-lg bg-slate-50">
                <TicketIcon className="h-12 w-12 mx-auto text-slate-400 mb-4" />
                <h3 className="text-xl font-bold mb-2">No Past Tickets</h3>
                <p className="text-slate-600 mb-6">You don't have any tickets from past festivals.</p>
                <Link href="/festivals">
                  <Button>Browse Festivals</Button>
                </Link>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  )
}