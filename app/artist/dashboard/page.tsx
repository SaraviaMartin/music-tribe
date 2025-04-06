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
} from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"

// Mock data for artist festivals
const artistFestivals = [
  {
    id: 1,
    name: "Electronic Dreams",
    image: "/placeholder.svg?height=300&width=500",
    date: "August 15-17, 2025",
    location: "Denver, CO",
    status: "Published",
    ticketsSold: 1245,
    revenue: 248750,
    capacity: 5000,
  },
  {
    id: 2,
    name: "Bass Horizon",
    image: "/placeholder.svg?height=300&width=500",
    date: "October 8-10, 2025",
    location: "Austin, TX",
    status: "Draft",
    ticketsSold: 0,
    revenue: 0,
    capacity: 3000,
  },
]

// Mock data for analytics
const salesData = [
  { name: "Jan", sales: 0 },
  { name: "Feb", sales: 0 },
  { name: "Mar", sales: 0 },
  { name: "Apr", sales: 120 },
  { name: "May", sales: 350 },
  { name: "Jun", sales: 580 },
  { name: "Jul", sales: 820 },
]

const ticketTypeData = [
  { name: "General", value: 65 },
  { name: "VIP", value: 25 },
  { name: "Premium", value: 10 },
]

const COLORS = ["#8884d8", "#82ca9d", "#ffc658"]

export default function ArtistDashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("overview")

  // Redirect if not authenticated or not an artist
  if (status === "unauthenticated") {
    router.push("/login")
    return null
  }

  if (status === "authenticated" && session.user.role !== "artist") {
    router.push("/")
    return null
  }

  // Calculate totals
  const totalTicketsSold = artistFestivals.reduce((sum, festival) => sum + festival.ticketsSold, 0)
  const totalRevenue = artistFestivals.reduce((sum, festival) => sum + festival.revenue, 0)
  const publishedFestivals = artistFestivals.filter(festival => festival.status === "Published").length

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-1 container py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <aside className="md:w-64 flex-shrink-0">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                  <MusicIcon className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h2 className="font-bold">{session?.user?.name || "Artist Name"}</h2>
                  <p className="text-sm text-slate-500">Artist Dashboard</p>
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
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-slate-500">Total Festivals</p>
                          <h3 className="text-2xl font-bold">{artistFestivals.length}</h3>
                        </div>
                        <div className="bg-purple-100 p-2 rounded-full">
                          <CalendarIcon className="h-5 w-5 text-purple-600" />
                        </div>
                      </div>
                      <div className="mt-2 text-xs text-slate-500">
                        {publishedFestivals} published, {artistFestivals.length - publishedFestivals} drafts
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
                        +125 in the last 7 days
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
                        <div className="bg-blue-100 p-2 rounded-full">
                          <DollarSignIcon className="h-5 w-5 text-blue-600" />
                        </div>
                      </div>
                      <div className="mt-2 text-xs text-blue-600">
                        +$24,500 in the last 30 days
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Sales</CardTitle>
                    <CardDescription>Your ticket sales over the past 7 months</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
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
                          <Bar dataKey="sales" fill="#8884d8" />
                        </BarChart>
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
                      {artistFestivals.map((festival) => (
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
                      <CardTitle>Ticket Sales by Type</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={ticketTypeData}
                              cx="50%"
                              cy="50%"
                              labelLine={false}
                              outerRadius={80}
                              fill="#8884d8"
                              dataKey="value"
                              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                            >
                              {ticketTypeData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                              ))}
                            </Pie>
                            <Tooltip />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                      <div className="mt-4 space-y-2">
                        {ticketTypeData.map((entry, index) => (
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
                  {artistFestivals.map((festival) => (
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
                            </div>
                            <Badge variant={festival.status === "Published" ? "default" : "outline"}>
                              {festival.status}
                            </Badge>
                          </div>
                          
                          <Separator className="my-4" />
                          
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
              
              <TabsContent value="analytics" className="space-y-6">
                <h2 className="text-2xl font-bold">Analytics</h2>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Ticket Sales Over Time</CardTitle>
                    <CardDescription>Track your ticket sales performance</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-96">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
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
                          <Bar dataKey="sales" fill="#8884d8" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Ticket Types Distribution</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={ticketTypeData}
                              cx="50%"
                              cy="50%"
                              labelLine={false}
                              outerRadius={80}
                              fill="#8884d8"
                              dataKey="value"
                              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                            >
                              {ticketTypeData.map((entry, index) => (
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
                        {artistFestivals.map((festival) => (
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
                    <CardTitle>Profile Information</CardTitle>
                    <CardDescription>Update your artist profile details</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600">
                      This section would contain forms to update your artist profile, including bio, genre, social media links, etc.
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
                    <CardTitle>Notification Preferences</CardTitle>
                    <CardDescription>Control what notifications you receive</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600">
                      This section would contain notification settings, allowing you to choose which updates you want to receive.
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