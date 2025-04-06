"use client"

import { useState } from "react"
import Link from "next/link"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import {
  CalendarIcon,
  TicketIcon,
  UsersIcon,
  DollarSignIcon,
  PlusIcon,
  EditIcon,
  TrashIcon,
  LayoutDashboardIcon,
  LineChartIcon,
  ListIcon,
  SettingsIcon,
  LogOutIcon,
  MusicIcon,
  BuildingIcon,
} from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"

// Mock data for promoter festivals
const promoterFestivals = [
  {
    id: 1,
    name: "Summer Music Festival",
    image: "/placeholder.svg?height=300&width=500",
    date: "July 15-17, 2025",
    location: "Central Park, New York",
    status: "Published",
    ticketsSold: 3245,
    revenue: 648750,
    capacity: 10000,
    artists: 24,
  },
  {
    id: 2,
    name: "Urban Beats Weekend",
    image: "/placeholder.svg?height=300&width=500",
    date: "September 8-10, 2025",
    location: "Downtown LA",
    status: "Published",
    ticketsSold: 1875,
    revenue: 375000,
    capacity: 5000,
    artists: 18,
  },
  {
    id: 3,
    name: "Winter Music Conference",
    image: "/placeholder.svg?height=300&width=500",
    date: "December 12-14, 2025",
    location: "Miami Beach",
    status: "Draft",
    ticketsSold: 0,
    revenue: 0,
    capacity: 8000,
    artists: 0,
  },
]

// Mock data for analytics
const salesData = [
  { name: "Jan", sales: 1200 },
  { name: "Feb", sales: 1900 },
  { name: "Mar", sales: 2400 },
  { name: "Apr", sales: 3200 },
  { name: "May", sales: 4500 },
  { name: "Jun", sales: 5800 },
  { name: "Jul", sales: 6200 },
]

const audienceData = [
  { name: "18-24", value: 35 },
  { name: "25-34", value: 40 },
  { name: "35-44", value: 15 },
  { name: "45+", value: 10 },
]

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042"]

export default function PromoterDashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("overview")

  // Redirect if not authenticated or not a promoter
  if (status === "unauthenticated") {
    router.push("/login")
    return null
  }

  if (status === "authenticated" && session.user.role !== "promoter") {
    router.push("/")
    return null
  }

  // Calculate totals
  const totalTicketsSold = promoterFestivals.reduce((sum, festival) => sum + festival.ticketsSold, 0)
  const totalRevenue = promoterFestivals.reduce((sum, festival) => sum + festival.revenue, 0)
  const totalArtists = promoterFestivals.reduce((sum, festival) => sum + festival.artists, 0)
  const publishedFestivals = promoterFestivals.filter(festival => festival.status === "Published").length

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-1 container py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <aside className="md:w-64 flex-shrink-0">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                  <BuildingIcon className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h2 className="font-bold">{session?.user?.name || "Promoter Name"}</h2>
                  <p className="text-sm text-slate-500">Promoter Dashboard</p>
                </div>
              </div>
              
              <nav className="space-y-1">
                <Button
                  variant={activeTab === "overview" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab("overview")}
                >
                  <LayoutDashboardIcon className="h-4 w-4 mr-2" />
                  Overview
                </Button>
                <Button
                  variant={activeTab === "festivals" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab("festivals")}
                >
                  <CalendarIcon className="h-4 w-4 mr-2" />
                  My Festivals
                </Button>
                <Button
                  variant={activeTab === "artists" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab("artists")}
                >
                  <MusicIcon className="h-4 w-4 mr-2" />
                  Artists
                </Button>
                <Button
                  variant={activeTab === "analytics" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab("analytics")}
                >
                  <LineChartIcon className="h-4 w-4 mr-2" />
                  Analytics
                </Button>
                <Button
                  variant={activeTab === "settings" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab("settings")}
                >
                  <SettingsIcon className="h-4 w-4 mr-2" />
                  Settings
                </Button>
              </nav>
              
              <div className="pt-4 border-t">
                <Link href="/create-festival">
                  <Button className="w-full">
                    <PlusIcon className="h-4 w-4 mr-2" />
                    Create Festival
                  </Button>
                </Link>
              </div>
            </div>
          </aside>
          
          {/* Main content */}
          <main className="flex-1">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsContent value="overview" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-slate-500">Total Festivals</p>
                          <h3 className="text-2xl font-bold">{promoterFestivals.length}</h3>
                        </div>
                        <div className="bg-blue-100 p-2 rounded-full">
                          <CalendarIcon className="h-5 w-5 text-blue-600" />
                        </div>
                      </div>
                      <div className="mt-2 text-xs text-slate-500">
                        {publishedFestivals} published, {promoterFestivals.length - publishedFestivals} drafts
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-slate-500">Tickets Sold</p>
                          <h3 className="text-2xl font-bold">{totalTicketsSold.toLocaleString()}</h3>
                        </div>
                        <div className="bg-green-100 p-2 rounded-full">
                          <TicketIcon className="h-5 w-5 text-green-600" />
                        </div>
                      </div>
                      <div className="mt-2 text-xs text-green-600">
                        +325 in the last 7 days
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-slate-500">Total Revenue</p>
                          <h3 className="text-2xl font-bold">${totalRevenue.toLocaleString()}</h3>
                        </div>
                        <div className="bg-purple-100 p-2 rounded-full">
                          <DollarSignIcon className="h-5 w-5 text-purple-600" />
                        </div>
                      </div>
                      <div className="mt-2 text-xs text-purple-600">
                        +$64,500 in the last 30 days
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-slate-500">Total Artists</p>
                          <h3 className="text-2xl font-bold">{totalArtists}</h3>
                        </div>
                        <div className="bg-orange-100 p-2 rounded-full">
                          <MusicIcon className="h-5 w-5 text-orange-600" />
                        </div>
                      </div>
                      <div className="mt-2 text-xs text-orange-600">
                        +5 new artists this month
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Ticket Sales Trend</CardTitle>
                    <CardDescription>Your ticket sales over the past 7 months</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                          data={salesData}
                          margin={{
                            top: 20,
                            right: 30,
                            left: 20,
                            bottom: 5,
                          }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Line type="monotone" dataKey="sales" stroke="#8884d8" activeDot={{ r: 8 }} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Upcoming Festivals</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {promoterFestivals.map((festival) => (
                        <div key={festival.id} className="flex items-center gap-4 py-3 border-b last:border-0">
                          <div className="w-12 h-12 rounded-md overflow-hidden">
                            <img src={festival.image} alt={festival.name} className="w-full h-full object-cover" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium">{festival.name}</h4>
                            <div className="flex items-center gap-2 text-xs text-slate-500">
                              <CalendarIcon className="h-3 w-3" />
                              <span>{festival.date}</span>
                            </div>
                          </div>
                          <Badge variant={festival.status === "Published" ? "default" : "outline"}>
                            {festival.status}
                          </Badge>
                        </div>
                      ))}
                    </CardContent>
                    <CardFooter>
                      <Link href="/create-festival" className="w-full">
                        <Button variant="outline" className="w-full">
                          <PlusIcon className="h-4 w-4 mr-2" />
                          Create New Festival
                        </Button>
                      </Link>
                    </CardFooter>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Audience Demographics</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={audienceData}
                              cx="50%"
                              cy="50%"
                              labelLine={false}
                              outerRadius={80}
                              fill="#8884d8"
                              dataKey="value"
                              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                            >
                              {audienceData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                              ))}
                            </Pie>
                            <Tooltip />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                      <div className="mt-4 space-y-2">
                        {audienceData.map((entry, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                            <span className="text-sm">{entry.name}: {entry.value}%</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="festivals" className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold">My Festivals</h2>
                  <Link href="/create-festival">
                    <Button>
                      <PlusIcon className="h-4 w-4 mr-2" />
                      Create Festival
                    </Button>
                  </Link>
                </div>
                
                <div className="space-y-4">
                  {promoterFestivals.map((festival) => (
                    <Card key={festival.id}>
                      <div className="flex flex-col md:flex-row">
                        <div className="md:w-1/4">
                          <img src={festival.image} alt={festival.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 p-6">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="text-xl font-bold">{festival.name}</h3>
                              <div className="flex items-center gap-4 mt-1 text-sm text-slate-600">
                                <div className="flex items-center gap-1">
                                  <CalendarIcon className="h-4 w-4" />
                                  <span>{festival.date}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <UsersIcon className="h-4 w-4" />
                                  <span>Capacity: {festival.capacity.toLocaleString()}</span>
                                </div>
                              </div>
                              <p className="mt-2 text-slate-600">{festival.location}</p>
                            </div>
                            <Badge variant={festival.status === "Published" ? "default" : "outline"}>
                              {festival.status}
                            </Badge>
                          </div>
                          
                          <Separator className="my-4" />
                          
                          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div>
                              <p className="text-sm text-slate-500">Tickets Sold</p>
                              <div className="flex items-end gap-2">
                                <p className="text-xl font-bold">{festival.ticketsSold.toLocaleString()}</p>
                                <p className="text-sm text-slate-500">/ {festival.capacity.toLocaleString()}</p>
                              </div>
                              <Progress value={(festival.ticketsSold / festival.capacity) * 100} className="h-2 mt-2" />
                            </div>
                            
                            <div>
                              <p className="text-sm text-slate-500">Revenue</p>
                              <p className="text-xl font-bold">${festival.revenue.toLocaleString()}</p>
                            </div>
                            
                            <div>
                              <p className="text-sm text-slate-500">Artists</p>
                              <p className="text-xl font-bold">{festival.artists}</p>
                            </div>
                            
                            <div className="flex items-end justify-end gap-2">
                              <Button variant="outline" size="sm">
                                <EditIcon className="h-4 w-4 mr-2" />
                                Edit
                              </Button>
                              <Button variant="outline" size="sm" className="text-red-600 hover:text-red-600">
                                <TrashIcon className="h-4 w-4 mr-2" />
                                Delete
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="artists" className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold">Manage Artists</h2>
                  <Button>
                    <PlusIcon className="h-4 w-4 mr-2" />
                    Add Artist
                  </Button>
                </div>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Artists</CardTitle>
                    <CardDescription>Manage artists for your festivals</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600 mb-4">
                      This section would contain a list of artists you've worked with, allowing you to manage their profiles, 
                      schedule performances, and track their popularity.
                    </p>
                    
                    <div className="border rounded-md">
                      <div className="p-4 bg-slate-50 border-b font-medium flex">
                        <div className="w-1/3">Artist</div>
                        <div className="w-1/4">Genre</div>
                        <div className="w-1/4">Festivals</div>
                        <div className="w-1/6">Actions</div>
                      </div>
                      
                      <div className="divide-y">
                        {[
                          { name: "DJ Quantum", genre: "Electronic", festivals: 2, image: "/placeholder.svg?height=100&width=100" },
                          { name: "Bass Collective", genre: "Electronic", festivals: 1, image: "/placeholder.svg?height=100&width=100" },
                          { name: "Electra Waves", genre: "Electronic", festivals: 2, image: "/placeholder.svg?height=100&width=100" },
                          { name: "Rhythm Pulse", genre: "Hip Hop", festivals: 1, image: "/placeholder.svg?height=100&width=100" },
                        ].map((artist, index) => (
                          <div key={index} className="p-4 flex items-center">
                            <div className="w-1/3 flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full overflow-hidden">
                                <img src={artist.image} alt={artist.name} className="w-full h-full object-cover" />
                              </div>
                              <span className="font-medium">{artist.name}</span>
                            </div>
                            <div className="w-1/4">{artist.genre}</div>
                            <div className="w-1/4">{artist.festivals} festivals</div>
                            <div className="w-1/6 flex gap-2">
                              <Button variant="outline" size="sm">View</Button>
                              <Button variant="outline" size="sm">Edit</Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="analytics" className="space-y-6">
                <h2 className="text-2xl font-bold">Analytics</h2>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Revenue Over Time</CardTitle>
                    <CardDescription>Track your revenue performance</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-96">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={salesData.map(item => ({ ...item, revenue: item.sales * 200 }))}
                          margin={{
                            top: 20,
                            right: 30,
                            left: 20,
                            bottom: 5,
                          }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip formatter={(value) => [`$${value}`, "Revenue"]} />
                          <Bar dataKey="revenue" fill="#8884d8" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Audience Demographics</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={audienceData}
                              cx="50%"
                              cy="50%"
                              labelLine={false}
                              outerRadius={80}
                              fill="#8884d8"
                              dataKey="value"
                              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                            >
                              {audienceData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                              ))}
                            </Pie>
                            <Tooltip />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Festival Performance</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {promoterFestivals.map((festival) => (
                          <div key={festival.id} className="space-y-2">
                            <div className="flex justify-between items-center">
                              <h4 className="font-medium">{festival.name}</h4>
                              <span className="text-sm">{Math.round((festival.ticketsSold / festival.capacity) * 100)}% sold</span>
                            </div>
                            <Progress value={(festival.ticketsSold / festival.capacity) * 100} className="h-2" />
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="settings" className="space-y-6">
                <h2 className="text-2xl font-bold">Account Settings</h2>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Company Information</CardTitle>
                    <CardDescription>Update your promoter company details</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600">
                      This section would contain forms to update your company profile, including company name, logo, description, etc.
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Payment Settings</CardTitle>
                    <CardDescription>Manage your payment methods and payout preferences</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600">
                      This section would contain payment settings, including bank account information, payout schedule, etc.
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Team Members</CardTitle>
                    <CardDescription>Manage team access to your promoter account</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600">
                      This section would allow you to invite team members and manage their permissions.
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </main>
        </div>
      </div>
      <Footer />
    </div>
  )
}