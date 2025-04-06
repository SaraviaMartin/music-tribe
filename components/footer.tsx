import Link from "next/link"
import { MusicIcon } from "lucide-react"

export default function Footer() {
  return (
    <footer className="w-full bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <MusicIcon className="h-6 w-6" />
              <h3 className="font-bold">FestivalHub</h3>
            </div>
            <p className="text-slate-400 text-sm">
              Connecting artists and fans through unforgettable festival experiences.
            </p>
          </div>
          <div>
            <h4 className="font-medium mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <Link href="/festivals" className="hover:text-white">
                  Festivals
                </Link>
              </li>
              <li>
                <Link href="/map" className="hover:text-white">
                  Festival Map
                </Link>
              </li>
              <li>
                <Link href="/artists" className="hover:text-white">
                  Artists
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-white">
                  Event Gallery
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-4">For Artists & Promoters</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <Link href="/artist-signup" className="hover:text-white">
                  Artist Registration
                </Link>
              </li>
              <li>
                <Link href="/promoter-signup" className="hover:text-white">
                  Promoter Registration
                </Link>
              </li>
              <li>
                <Link href="/create-festival" className="hover:text-white">
                  Create Festival
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-white">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/resources" className="hover:text-white">
                  Resources
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <Link href="/terms" className="hover:text-white">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="hover:text-white">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-800 mt-8 pt-8 text-center text-sm text-slate-400">
          <p>
            © {new Date().getFullYear()} FestivalHub. All rights reserved. Made with ❤️ by{" "}
            <Link href="https://github.com/SaraviaMartin" className="hover:text-white">
              Juan Martin
            </Link>
          </p>
        </div>
      </div>
    </footer>
  )
}