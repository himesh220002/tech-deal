import React from 'react'
import {Zap, Users, MessageSquare, Gift}from "lucide-react"

function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row gap-8 justify-between">
              <div className="col-span-1 md:col-span-2">
                <div className="flex items-center justify-center md:justify-start space-x-2 mb-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                    <Zap className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-xl font-bold">Tech Deal Radar</span>
                </div>
                <p className="text-gray-400 text-center md:text-start mb-6 max-w-md">
                  Empowering users to make smarter tech purchases by combining specs, price intelligence, and community wisdom into one seamless experience.
                </p>
                <div className="flex justify-center md:justify-start space-x-4">
                  <button className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors">
                    <Users className="w-5 h-5" />
                  </button>
                  <button className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors">
                    <MessageSquare className="w-5 h-5" />
                  </button>
                  <button className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors">
                    <Gift className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className='flex justify-between gap-10'>

              <div>
                <h3 className="font-semibold mb-4">Features</h3>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="/" className="hover:text-white transition-colors">Price Tracking</a></li>
                  <li><a href="/compare" className="hover:text-white transition-colors">Product Comparison</a></li>
                  <li><a href="/deals" className="hover:text-white transition-colors">Deal Alerts</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Discount Stacking</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">AI Recommendations</a></li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-4">Support</h3>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                  <li><a href="/community" className="hover:text-white transition-colors">Community</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                </ul>
              </div>

              </div>
            </div>

            <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between">
              <p className="text-gray-400 text-sm">
                © 2024 Tech Deal Radar. All rights reserved.
              </p>
              <div className="flex items-center text-center space-x-4 mt-4 md:mt-0">
                <span className="text-gray-400 text-sm"> Made with ❤️ by Himesh — for devs who dream in terminal.</span>
              </div>
            </div>
          </div>
        </footer>
  )
}

export default Footer