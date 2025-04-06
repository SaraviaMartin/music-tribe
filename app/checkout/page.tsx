"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { CalendarIcon, MapPinIcon, TicketIcon, CreditCardIcon, CheckCircleIcon } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"

// Mock festival data
const festivals = [
  {
    id: 1,
    name: "Sonic Bloom",
    image: "/placeholder.svg?height=300&width=500",
    date: "June 15-18, 2025",
    location: "Denver, CO",
    venue: "Red Rocks Amphitheatre",
    category: "Electronic",
    tickets: [
      { id: 1, name: "General Admission", price: 199, description: "Standard festival access", fees: 15 },
      { id: 2, name: "VIP Access", price: 349, description: "Premium viewing areas & lounges", fees: 25 },
      { id: 3, name: "Premium Package", price: 499, description: "All access + exclusive perks", fees: 35 },
    ],
  },
  {
    id: 2,
    name: "Rock Revolution",
    image: "/placeholder.svg?height=300&width=500",
    date: "July 8-10, 2025",
    location: "Austin, TX",
    venue: "Zilker Park",
    category: "Rock",
    tickets: [
      { id: 1, name: "General Admission", price: 249, description: "Standard festival access", fees: 20 },
      { id: 2, name: "VIP Access", price: 399, description: "Premium viewing areas & lounges", fees: 30 },
      { id: 3, name: "Premium Package", price: 549, description: "All access + exclusive perks", fees: 40 },
    ],
  },
]

export default function CheckoutPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const festivalId = Number(searchParams.get("festival") || "1")
  const ticketId = Number(searchParams.get("ticket") || "1")
  const quantity = Number(searchParams.get("quantity") || "1")
  
  const [paymentMethod, setPaymentMethod] = useState("credit-card")
  const [cardNumber, setCardNumber] = useState("")
  const [cardName, setCardName] = useState("")
  const [cardExpiry, setCardExpiry] = useState("")
  const [cardCvc, setCardCvc] = useState("")
  const [email, setEmail] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [orderNumber, setOrderNumber] = useState("")

  // Get festival and ticket details
  const festival = festivals.find(f => f.id === festivalId) || festivals[0]
  const ticket = festival.tickets.find(t => t.id === ticketId) || festival.tickets[0]

  // Calculate totals
  const subtotal = ticket.price * quantity
  const fees = ticket.fees * quantity
  const total = subtotal + fees

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false)
      setIsComplete(true)
      setOrderNumber(`FH-${Math.floor(100000 + Math.random() * 900000)}`)
    }, 2000)
  }

  if (isComplete) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 container py-12">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                <CheckCircleIcon className="h-8 w-8 text-green-600" />
              </div>
              <h1 className="text-3xl font-bold mb-2">Order Confirmed!</h1>
              <p className="text-slate-600">
                Thank you for your purchase. Your tickets have been confirmed.
              </p>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
                <CardDescription>Order #{orderNumber}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-20 h-20 rounded-md overflow-hidden">
                    <img src={festival.image} alt={festival.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className="font-bold">{festival.name}</h3>
                    <div className="text-sm text-slate-600 space-y-1">
                      <div className="flex items-center gap-1">
                        <CalendarIcon className="h-3 w-3" />
                        <span>{festival.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPinIcon className="h-3 w-3" />
                        <span>{festival.venue}, {festival.location}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="font-medium mb-2">Ticket Details</h3>
                  <div className="bg-slate-50 p-3 rounded-md">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">{ticket.name}</p>
                        <p className="text-sm text-slate-600">{ticket.description}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">${ticket.price.toFixed(2)}</p>
                        <p className="text-xs text-slate-500">x{quantity}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="font-medium mb-2">Payment Information</h3>
                  <div className="text-sm">
                    <p>Payment Method: Credit Card</p>
                    <p>Card: •••• •••• •••• {cardNumber.slice(-4) || "1234"}</p>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Service Fees</span>
                    <span>${fees.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-bold mt-2">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-4">
                <p className="text-sm text-slate-600">
                  Your e-tickets have been sent to your email. You can also access them in your account.
                </p>
                <div className="flex gap-4">
                  <Link href="/tickets" className="flex-1">
                    <Button variant="outline" className="w-full">View My Tickets</Button>
                  </Link>
                  <Link href="/festivals" className="flex-1">
                    <Button className="w-full">Explore More Festivals</Button>
                  </Link>
                </div>
              </CardFooter>
            </Card>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h1 className="text-3xl font-bold mb-6">Checkout</h1>
            
            <form onSubmit={handleSubmit}>
              <div className="space-y-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Your Information</CardTitle>
                    <CardDescription>Enter your contact details for the tickets</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        placeholder="your@email.com" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input 
                          id="firstName" 
                          placeholder="First name" 
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input 
                          id="lastName" 
                          placeholder="Last name" 
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Payment Method</CardTitle>
                    <CardDescription>Select your preferred payment method</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                      <div className="flex items-center space-x-2 border rounded-md p-3">
                        <RadioGroupItem value="credit-card" id="credit-card" />
                        <Label htmlFor="credit-card" className="flex items-center gap-2 cursor-pointer">
                          <CreditCardIcon className="h-4 w-4" />
                          Credit or Debit Card
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 border rounded-md p-3">
                        <RadioGroupItem value="paypal" id="paypal" disabled />
                        <Label htmlFor="paypal" className="flex items-center gap-2 cursor-pointer text-slate-400">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M7 11V7a5 5 0 0 1 9.9-1" />
                            <path d="M8.93 13.4A1.44 1.44 0 0 1 10.3 14H13a2 2 0 0 0 2-2v-1" />
                            <path d="M14 16v2a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-1" />
                          </svg>
                          PayPal (Coming Soon)
                        </Label>
                      </div>
                    </RadioGroup>
                    
                    {paymentMethod === "credit-card" && (
                      <div className="space-y-4 mt-4">
                        <div className="space-y-2">
                          <Label htmlFor="cardNumber">Card Number</Label>
                          <Input 
                            id="cardNumber" 
                            placeholder="1234 5678 9012 3456" 
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value)}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cardName">Name on Card</Label>
                          <Input 
                            id="cardName" 
                            placeholder="John Doe" 
                            value={cardName}
                            onChange={(e) => setCardName(e.target.value)}
                            required
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="cardExpiry">Expiry Date</Label>
                            <Input 
                              id="cardExpiry" 
                              placeholder="MM/YY" 
                              value={cardExpiry}
                              onChange={(e) => setCardExpiry(e.target.value)}
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="cardCvc">CVC</Label>
                            <Input 
                              id="cardCvc" 
                              placeholder="123" 
                              value={cardCvc}
                              onChange={(e) => setCardCvc(e.target.value)}
                              required
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
                
                <div className="lg:hidden">
                  <Card>
                    <CardHeader>
                      <CardTitle>Order Summary</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-start gap-4">
                        <div className="w-16 h-16 rounded-md overflow-hidden">
                          <img src={festival.image} alt={festival.name} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <h3 className="font-bold">{festival.name}</h3>
                          <div className="text-sm text-slate-600">
                            <p>{festival.date}</p>
                            <p>{festival.location}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-slate-50 p-3 rounded-md">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-medium">{ticket.name}</p>
                            <p className="text-sm text-slate-600">{ticket.description}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">${ticket.price.toFixed(2)}</p>
                            <p className="text-xs text-slate-500">x{quantity}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between text-sm">
                          <span>Subtotal</span>
                          <span>${subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Service Fees</span>
                          <span>${fees.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between font-bold mt-2">
                          <span>Total</span>
                          <span>${total.toFixed(2)}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="flex justify-between">
                  <Link href={`/festivals/${festival.id}`}>
                    <Button variant="outline">Back to Festival</Button>
                  </Link>
                  <Button type="submit" disabled={isProcessing}>
                    {isProcessing ? "Processing..." : `Pay $${total.toFixed(2)}`}
                  </Button>
                </div>
              </div>
            </form>
          </div>
          
          <div className="hidden lg:block">
            <div className="sticky top-6">
              <Card>
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-20 h-20 rounded-md overflow-hidden">
                      <img src={festival.image} alt={festival.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h3 className="font-bold">{festival.name}</h3>
                      <div className="text-sm text-slate-600 space-y-1">
                        <div className="flex items-center gap-1">
                          <CalendarIcon className="h-3 w-3" />
                          <span>{festival.date}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPinIcon className="h-3 w-3" />
                          <span>{festival.venue}, {festival.location}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="font-medium mb-2">Ticket Details</h3>
                    <div className="bg-slate-50 p-3 rounded-md">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">{ticket.name}</p>
                          <p className="text-sm text-slate-600">{ticket.description}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">${ticket.price.toFixed(2)}</p>
                          <p className="text-xs text-slate-500">x{quantity}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <div className="flex justify-between text-sm">
                      <span>Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Service Fees</span>
                      <span>${fees.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-bold mt-2">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <div className="text-xs text-slate-500">
                    <p>By completing this purchase, you agree to our <Link href="/terms" className="text-purple-600 hover:underline">Terms of Service</Link> and <Link href="/privacy" className="text-purple-600 hover:underline">Privacy Policy</Link>.</p>
                  </div>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}