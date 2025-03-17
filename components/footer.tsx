import Link from "next/link"
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-[#f8f9fa] border-t border-gray-200">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                <span className="text-white font-bold">TG</span>
              </div>
              <span className="ml-2 text-xl font-bold text-primary">Trek-Gems</span>
            </div>
            <p className="text-gray-600 mb-4">
              Connecting travelers with Rwanda's hidden gems, fostering economic growth and cultural appreciation.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-500 hover:text-primary">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-gray-500 hover:text-primary">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-gray-500 hover:text-primary">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4 text-gray-900">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/tours" className="text-gray-600 hover:text-primary">
                  Explore Tours
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-600 hover:text-primary">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/impact" className="text-gray-600 hover:text-primary">
                  Our Impact
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-600 hover:text-primary">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-600 hover:text-primary">
                  FAQs
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4 text-gray-900">For Tour Operators</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/operators/register" className="text-gray-600 hover:text-primary">
                  Become a Partner
                </Link>
              </li>
              <li>
                <Link href="/operators/login" className="text-gray-600 hover:text-primary">
                  Operator Login
                </Link>
              </li>
              <li>
                <Link href="/operators/resources" className="text-gray-600 hover:text-primary">
                  Resources
                </Link>
              </li>
              <li>
                <Link href="/operators/support" className="text-gray-600 hover:text-primary">
                  Support
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4 text-gray-900">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex">
                <MapPin className="h-5 w-5 mr-2 text-primary" />
                <span className="text-gray-600">Kigali, Rwanda</span>
              </li>
              <li className="flex">
                <Phone className="h-5 w-5 mr-2 text-primary" />
                <span className="text-gray-600">+250 123 456 789</span>
              </li>
              <li className="flex">
                <Mail className="h-5 w-5 mr-2 text-primary" />
                <span className="text-gray-600">info@trek-gems.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 text-sm">&copy; {new Date().getFullYear()} Trek-Gems. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/terms" className="text-sm text-gray-600 hover:text-primary">
                Terms of Service
              </Link>
              <Link href="/privacy" className="text-sm text-gray-600 hover:text-primary">
                Privacy Policy
              </Link>
              <Link href="/cookies" className="text-sm text-gray-600 hover:text-primary">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

