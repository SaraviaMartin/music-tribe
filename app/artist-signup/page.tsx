"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CheckCircle2Icon, UploadIcon } from "lucide-react"

export default function ArtistSignupPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleNextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
    } else {
      setIsSubmitted(true)
    }
  }

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  return (
    <div className="container max-w-3xl py-12">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Artist Registration</h1>
        <p className="text-slate-600">Join our platform to showcase your talent and create music festivals</p>
      </div>

      {!isSubmitted ? (
        <>
          <div className="mb-8">
            <div className="flex justify-between items-center relative">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex flex-col items-center relative z-10">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                      step <= currentStep
                        ? "border-purple-600 bg-purple-600 text-white"
                        : "border-slate-300 bg-white text-slate-400"
                    }`}
                  >
                    {step}
                  </div>
                  <span
                    className={`text-sm mt-2 ${step <= currentStep ? "text-purple-600 font-medium" : "text-slate-400"}`}
                  >
                    {step === 1 ? "Basic Info" : step === 2 ? "Profile Details" : "Verification"}
                  </span>
                </div>
              ))}
              <div className="absolute top-5 left-0 right-0 h-0.5 bg-slate-200 -z-0">
                <div
                  className="h-full bg-purple-600 transition-all duration-300"
                  style={{ width: `${(currentStep - 1) * 50}%` }}
                ></div>
              </div>
            </div>
          </div>

          <Card>
            <CardContent className="pt-6">
              {currentStep === 1 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" placeholder="Enter your first name" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" placeholder="Enter your last name" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="your@email.com" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type="password" placeholder="Create a secure password" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input id="confirmPassword" type="password" placeholder="Confirm your password" />
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="artistName">Artist/Band Name</Label>
                    <Input id="artistName" placeholder="Your stage name or band name" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="genre">Primary Music Genre</Label>
                    <Select>
                      <SelectTrigger id="genre">
                        <SelectValue placeholder="Select genre" />
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
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">Artist Bio</Label>
                    <Textarea id="bio" placeholder="Tell us about yourself or your band" className="min-h-32" />
                  </div>

                  <div className="space-y-2">
                    <Label>Profile Image</Label>
                    <div className="border-2 border-dashed rounded-lg p-6 text-center">
                      <UploadIcon className="h-8 w-8 mx-auto mb-2 text-slate-400" />
                      <p className="text-sm text-slate-600 mb-2">Drag and drop your profile image here</p>
                      <p className="text-xs text-slate-500 mb-4">PNG, JPG or GIF, max 5MB</p>
                      <Button variant="outline" size="sm">
                        Browse Files
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="website">Website (Optional)</Label>
                    <Input id="website" placeholder="https://yourwebsite.com" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="socialMedia">Social Media Links</Label>
                    <div className="grid grid-cols-2 gap-4">
                      <Input placeholder="Instagram" />
                      <Input placeholder="Twitter/X" />
                      <Input placeholder="Facebook" />
                      <Input placeholder="YouTube" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Music Samples</Label>
                    <div className="border-2 border-dashed rounded-lg p-6 text-center">
                      <UploadIcon className="h-8 w-8 mx-auto mb-2 text-slate-400" />
                      <p className="text-sm text-slate-600 mb-2">Upload audio samples of your music</p>
                      <p className="text-xs text-slate-500 mb-4">MP3 or WAV, max 10MB each</p>
                      <Button variant="outline" size="sm">
                        Browse Files
                      </Button>
                    </div>
                  </div>

                  <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                    <p className="text-sm text-amber-800">
                      To complete your verification, we'll need to review your submission. This typically takes 1-2
                      business days.
                    </p>
                  </div>
                </div>
              )}
            </CardContent>

            <CardFooter className="flex justify-between border-t p-6">
              {currentStep > 1 ? (
                <Button variant="outline" onClick={handlePrevStep}>
                  Back
                </Button>
              ) : (
                <Link href="/">
                  <Button variant="outline">Cancel</Button>
                </Link>
              )}
              <Button onClick={handleNextStep}>{currentStep < 3 ? "Continue" : "Submit Application"}</Button>
            </CardFooter>
          </Card>
        </>
      ) : (
        <Card className="text-center p-8">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle2Icon className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Application Submitted!</h2>
            <p className="text-slate-600 mb-6">
              Thank you for applying to join FestivalHub as an artist. We'll review your application and get back to you
              within 1-2 business days.
            </p>
            <div className="space-y-4 w-full max-w-xs">
              <Link href="/" className="w-full">
                <Button className="w-full">Return to Home</Button>
              </Link>
              <Link href="/login" className="w-full">
                <Button variant="outline" className="w-full">
                  Go to Login
                </Button>
              </Link>
            </div>
          </div>
        </Card>
      )}
    </div>
  )
}

