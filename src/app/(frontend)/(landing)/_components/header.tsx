"use client";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ArrowRight, CarIcon, Menu, XIcon } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export function Header() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);

  // Add scroll event listener
  useEffect(() => {
    const handleScroll = () => {
      // You can adjust this threshold value as needed
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Initial check in case page is loaded at a scrolled position
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-gradient-to-r from-teal-900 to-teal-800 text-white shadow-md"
          : "bg-gradient-to-r from-teal-900 via-teal-800 to-teal-700 text-white"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          <Link href="/" className="flex items-center space-x-2 hover:opacity-90 transition-opacity">
            <CarIcon className="h-6 w-6" />
            <div className="text-xl md:text-2xl font-bold text-white font-heading">
              Rathagala<span className="text-teal-600">.lk</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="hover:text-teal-200 transition-colors font-medium"
            >
              Home
            </Link>
            <Link
              href="/sell"
              className="hover:text-teal-200 transition-colors font-medium"
            >
              Sell
            </Link>
            <Link
              href="/about"
              className="hover:text-teal-200 transition-colors font-medium"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="hover:text-teal-200 transition-colors font-medium"
            >
              Contact
            </Link>
            <Link
              href="/profile"
              className="hover:text-teal-200 transition-colors font-medium"
            >
              Profile
            </Link>
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/signin">
              <Button 
                variant="ghost" 
                className="text-white hover:bg-teal-600/20 hover:text-white transition-colors duration-200 cursor-pointer"
              >
                Login
              </Button>
            </Link>

            <Link href="/sell/new">
              <Button 
                className="bg-white text-teal-900 hover:bg-teal-50 hover:shadow-md font-medium transition-all duration-200 cursor-pointer"
              >
                Post Free Ad <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-white">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-[85%] sm:w-[350px] bg-gradient-to-r from-teal-900 to-teal-800 text-white border-teal-900"
              >
                <div className="flex items-center justify-between mb-8">
                  <div className="text-xl font-bold text-white flex items-center gap-2">
                    <CarIcon className="h-5 w-5" />
                    Rathagala.lk
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsOpen(false)}
                    className="hover:bg-teal-800"
                  >
                    <XIcon className="h-5 w-5" />
                  </Button>
                </div>
                <nav className="flex flex-col space-y-5">
                  <a
                    href="#"
                    className="text-lg hover:text-teal-200 transition-colors"
                  >
                    Home
                  </a>
                  <a
                    href="#"
                    className="text-lg hover:text-teal-200 transition-colors"
                  >
                    Sell
                  </a>
                  <a
                    href="#"
                    className="text-lg hover:text-teal-200 transition-colors"
                  >
                    About
                  </a>
                  <a
                    href="#"
                    className="text-lg hover:text-teal-200 transition-colors"
                  >
                    Contact
                  </a>
                  <a
                    href="#"
                    className="text-lg hover:text-teal-200 transition-colors"
                  >
                    Profile
                  </a>
                  <div className="pt-5 space-y-3">
                    <Button
                      asChild
                      variant="outline"
                      className="w-full text-white border-white hover:bg-white hover:text-teal-900"
                    >
                      <Link href="/login">Login</Link>
                    </Button>
                    <Button
                      asChild
                      className="w-full bg-white text-teal-900 hover:bg-teal-50"
                    >
                      <Link href="/dashboard">Post Free Ad</Link>
                    </Button>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
