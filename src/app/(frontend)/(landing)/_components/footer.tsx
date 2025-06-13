import { CarIcon } from "lucide-react";
import React from "react";

export function Footer() {
  return (
    <footer className="bg-gradient-to-r from-slate-900 to-teal-900 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <CarIcon className="h-6 w-6" />
              <div className="text-2xl font-bold text-white">Rathagala.lk</div>
            </div>
            <p className="text-slate-300 leading-relaxed">
              {`Sri Lanka's most trusted vehicle marketplace connecting buyers
                and sellers nationwide.`}
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-6 text-lg">Quick Links</h4>
            <ul className="space-y-3 text-slate-300">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Browse Cars
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Sell Your Car
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Car Loans
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Insurance
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-6 text-lg">Support</h4>
            <ul className="space-y-3 text-slate-300">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-6 text-lg">Connect</h4>
            <ul className="space-y-3 text-slate-300">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Facebook
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Instagram
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Twitter
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  YouTube
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-800 mt-10 pt-8 text-center text-slate-400">
          <p>&copy; 2025 Rathagala.lk. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
