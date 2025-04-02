"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { ImageIcon, MusicIcon, PlusIcon, UploadIcon } from "lucide-react"

export default function CreateFestivalPage() {
  const [activeTab, setActiveTab] = useState("basic")

  return (
    <div className="container max-w-4xl py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Create a New Festival</h1>
        <p className="text-slate-600">Fill out the details below to create and publish your music festival</p>
      </div>

      <Tabs defaultValue="basic" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid grid-cols-4">
          <TabsTrigger value="basic">Basic Info</TabsTrigger>
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="lineup">Lineup</TabsTrigger>
          <TabsTrigger value="tickets">Tickets</TabsTrigger>
        </TabsList>

        <Card>
          <CardContent className="pt-6">
            <TabsContent value="basic" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="festivalName">Festival Name</Label>
                <Input id="festivalName" placeholder="Enter festival name" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select>
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="rock">Rock</SelectItem>
                      <SelectItem value="electronic">Electronic</SelectItem>
                      <SelectItem value="jazz">Jazz</SelectItem>
                      <SelectItem value="hip-hop">Hip Hop</SelectItem>
                      <SelectItem value="folk">Folk</SelectItem>
                      <SelectItem value="indie">Indie</SelectItem>
                      <SelectItem value="classical">Classical</SelectItem>
                      <SelectItem value="world">World</SelectItem>
                      <SelectItem value="mixed">Mixed Genres</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Festival Dates</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <Input type="date" placeholder="Start date" />
                    <Input type="date" placeholder="End date" />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="venue">Venue</Label>
                <Input id="venue" placeholder="Enter venue name" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input id="city" placeholder="City" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State/Province</Label>
                  <Input id="state" placeholder="State/Province" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <Select>
                    <SelectTrigger id="country">
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="us">United States</SelectItem>
                      <SelectItem value="ca">Canada</SelectItem>
                      <SelectItem value="uk">United Kingdom</SelectItem>
                      <SelectItem value="au">Australia</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Festival Banner Image</Label>
                <div className="border-2 border-dashed rounded-lg p-6 text-center">
                  <UploadIcon className="h-8 w-8 mx-auto mb-2 text-slate-400" />
                  <p className="text-sm text-slate-600 mb-2">Upload a banner image for your festival</p>
                  <p className="text-xs text-slate-500 mb-4">Recommended size: 1200 x 600 pixels</p>
                  <Button variant="outline" size="sm">
                    Browse Files
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="details" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="description">Festival Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your festival, its theme, and what attendees can expect"
                  className="min-h-32"
                />
              </div>

              <div className="space-y-2">
                <Label>Festival Features</Label>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="feature1" />
                    <label htmlFor="feature1" className="text-sm">
                      Food vendors
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="feature2" />
                    <label htmlFor="feature2" className="text-sm">
                      Camping available
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="feature3" />
                    <label htmlFor="feature3" className="text-sm">
                      VIP areas
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="feature4" />
                    <label htmlFor="feature4" className="text-sm">
                      Art installations
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="feature5" />
                    <label htmlFor="feature5" className="text-sm">
                      Workshops
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="feature6" />
                    <label htmlFor="feature6" className="text-sm">
                      Family-friendly
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="feature7" />
                    <label htmlFor="feature7" className="text-sm">
                      Accessible facilities
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="feature8" />
                    <label htmlFor="feature8" className="text-sm">
                      Free parking
                    </label>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Additional Images</Label>
                <div className="grid grid-cols-3 gap-4">
                  <div className="border-2 border-dashed rounded-lg p-4 text-center aspect-square flex flex-col items-center justify-center">
                    <ImageIcon className="h-6 w-6 text-slate-400 mb-2" />
                    <Button variant="ghost" size="sm" className="text-xs">
                      Add Image
                    </Button>
                  </div>
                  <div className="border-2 border-dashed rounded-lg p-4 text-center aspect-square flex flex-col items-center justify-center">
                    <ImageIcon className="h-6 w-6 text-slate-400 mb-2" />
                    <Button variant="ghost" size="sm" className="text-xs">
                      Add Image
                    </Button>
                  </div>
                  <div className="border-2 border-dashed rounded-lg p-4 text-center aspect-square flex flex-col items-center justify-center">
                    <ImageIcon className="h-6 w-6 text-slate-400 mb-2" />
                    <Button variant="ghost" size="sm" className="text-xs">
                      Add Image
                    </Button>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="website">Festival Website (Optional)</Label>
                <Input id="website" placeholder="https://yourfestival.com" />
              </div>

              <div className="space-y-2">
                <Label>Social Media</Label>
                <div className="grid grid-cols-2 gap-4">
                  <Input placeholder="Instagram" />
                  <Input placeholder="Twitter/X" />
                  <Input placeholder="Facebook" />
                  <Input placeholder="TikTok" />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="lineup" className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Festival Lineup</Label>
                  <Button variant="outline" size="sm" className="flex items-center gap-1">
                    <PlusIcon className="h-4 w-4" />
                    Add Artist
                  </Button>
                </div>

                <div className="space-y-4">
                  <Card className="p-4">
                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                      <div className="md:w-16 h-16 bg-slate-100 rounded-md flex items-center justify-center">
                        <MusicIcon className="h-8 w-8 text-slate-400" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <Input placeholder="Artist Name" className="font-medium" />
                        <div className="grid grid-cols-2 gap-2">
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Performance Day" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="day1">Day 1</SelectItem>
                              <SelectItem value="day2">Day 2</SelectItem>
                              <SelectItem value="day3">Day 3</SelectItem>
                            </SelectContent>
                          </Select>
                          <Input type="time" placeholder="Performance Time" />
                        </div>
                      </div>
                      <Select className="md:w-1/4">
                        <SelectTrigger>
                          <SelectValue placeholder="Stage" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="main">Main Stage</SelectItem>
                          <SelectItem value="second">Second Stage</SelectItem>
                          <SelectItem value="tent">Tent Stage</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button variant="ghost" size="icon" className="self-start">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-4 w-4"
                        >
                          <path d="M3 6h18" />
                          <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                          <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                        </svg>
                      </Button>
                    </div>
                  </Card>

                  <Card className="p-4">
                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                      <div className="md:w-16 h-16 bg-slate-100 rounded-md flex items-center justify-center">
                        <MusicIcon className="h-8 w-8 text-slate-400" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <Input placeholder="Artist Name" className="font-medium" />
                        <div className="grid grid-cols-2 gap-2">
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Performance Day" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="day1">Day 1</SelectItem>
                              <SelectItem value="day2">Day 2</SelectItem>
                              <SelectItem value="day3">Day 3</SelectItem>
                            </SelectContent>
                          </Select>
                          <Input type="time" placeholder="Performance Time" />
                        </div>
                      </div>
                      <Select className="md:w-1/4">
                        <SelectTrigger>
                          <SelectValue placeholder="Stage" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="main">Main Stage</SelectItem>
                          <SelectItem value="second">Second Stage</SelectItem>
                          <SelectItem value="tent">Tent Stage</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button variant="ghost" size="icon" className="self-start">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-4 w-4"
                        >
                          <path d="M3 6h18" />
                          <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                          <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                        </svg>
                      </Button>
                    </div>
                  </Card>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Upload Lineup Poster (Optional)</Label>
                <div className="border-2 border-dashed rounded-lg p-6 text-center">
                  <UploadIcon className="h-8 w-8 mx-auto mb-2 text-slate-400" />
                  <p className="text-sm text-slate-600 mb-2">Upload your festival lineup poster</p>
                  <p className="text-xs text-slate-500 mb-4">PNG, JPG or PDF, max 10MB</p>
                  <Button variant="outline" size="sm">
                    Browse Files
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="tickets" className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Ticket Types</Label>
                  <Button variant="outline" size="sm" className="flex items-center gap-1">
                    <PlusIcon className="h-4 w-4" />
                    Add Ticket Type
                  </Button>
                </div>

                <div className="space-y-4">
                  <Card className="p-4">
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="ticketName1">Ticket Name</Label>
                          <Input id="ticketName1" placeholder="General Admission" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="ticketPrice1">Price</Label>
                          <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2">$</span>
                            <Input id="ticketPrice1" placeholder="199.00" className="pl-8" />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="ticketDescription1">Description</Label>
                        <Textarea id="ticketDescription1" placeholder="Standard festival access" />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="ticketQuantity1">Quantity Available</Label>
                          <Input id="ticketQuantity1" type="number" placeholder="1000" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="ticketLimit1">Purchase Limit</Label>
                          <Input id="ticketLimit1" type="number" placeholder="4" />
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox id="earlyBird1" />
                        <label htmlFor="earlyBird1" className="text-sm">
                          Early bird pricing
                        </label>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-4">
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="ticketName2">Ticket Name</Label>
                          <Input id="ticketName2" placeholder="VIP Access" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="ticketPrice2">Price</Label>
                          <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2">$</span>
                            <Input id="ticketPrice2" placeholder="349.00" className="pl-8" />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="ticketDescription2">Description</Label>
                        <Textarea id="ticketDescription2" placeholder="Premium viewing areas & lounges" />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="ticketQuantity2">Quantity Available</Label>
                          <Input id="ticketQuantity2" type="number" placeholder="500" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="ticketLimit2">Purchase Limit</Label>
                          <Input id="ticketLimit2" type="number" placeholder="4" />
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox id="earlyBird2" />
                        <label htmlFor="earlyBird2" className="text-sm">
                          Early bird pricing
                        </label>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Ticket Sale Dates</Label>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="saleStart">Sale Start</Label>
                    <Input id="saleStart" type="datetime-local" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="saleEnd">Sale End</Label>
                    <Input id="saleEnd" type="datetime-local" />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Payment Options</Label>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="creditCard" checked />
                    <label htmlFor="creditCard" className="text-sm">
                      Credit Card
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="paypal" />
                    <label htmlFor="paypal" className="text-sm">
                      PayPal
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="applePay" />
                    <label htmlFor="applePay" className="text-sm">
                      Apple Pay
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="googlePay" />
                    <label htmlFor="googlePay" className="text-sm">
                      Google Pay
                    </label>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                <p className="text-sm text-amber-800">
                  Note: A 5% platform fee will be applied to all ticket sales. Funds will be transferred to your account
                  within 7 days after the event.
                </p>
              </div>
            </TabsContent>
          </CardContent>

          <CardFooter className="flex justify-between border-t p-6">
            {activeTab === "basic" ? (
              <Link href="/dashboard">
                <Button variant="outline">Cancel</Button>
              </Link>
            ) : (
              <Button
                variant="outline"
                onClick={() => {
                  const tabs = ["basic", "details", "lineup", "tickets"]
                  const currentIndex = tabs.indexOf(activeTab)
                  setActiveTab(tabs[currentIndex - 1])
                }}
              >
                Back
              </Button>
            )}

            {activeTab === "tickets" ? (
              <div className="flex gap-4">
                <Button variant="outline">Save as Draft</Button>
                <Button>Publish Festival</Button>
              </div>
            ) : (
              <Button
                onClick={() => {
                  const tabs = ["basic", "details", "lineup", "tickets"]
                  const currentIndex = tabs.indexOf(activeTab)
                  setActiveTab(tabs[currentIndex + 1])
                }}
              >
                Continue
              </Button>
            )}
          </CardFooter>
        </Card>
      </Tabs>
    </div>
  )
}

