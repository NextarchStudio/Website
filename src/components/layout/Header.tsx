"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, GamepadIcon, Users, Newspaper, Briefcase, Mail, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { studioInfo } from "@/data/sample";

const navigation = [
  { name: "Games", href: "/games", icon: GamepadIcon },
  { name: "About", href: "/about", icon: Users },
  { name: "News", href: "/news", icon: Newspaper },
  { name: "Careers", href: "/careers", icon: Briefcase },
  { name: "Contact", href: "/contact", icon: Mail },
  { name: "Community", href: "/community", icon: MessageCircle },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        isScrolled
          ? "bg-black/80 backdrop-blur-md border-b border-white/10"
          : "bg-transparent"
      )}
    >
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded bg-blue-600 flex items-center justify-center">
                <span className="text-white font-bold text-sm">N</span>
              </div>
              <span className="text-white text-xl font-bold">
                {studioInfo.name}
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navigation.map((item) => {
                const isActive = pathname === item.href || 
                  (item.href !== "/" && pathname.startsWith(item.href));
                
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "px-3 py-2 text-sm font-medium transition-colors rounded-md flex items-center space-x-1",
                      isActive
                        ? "text-blue-400 bg-blue-400/10"
                        : "text-gray-300 hover:text-white hover:bg-white/10"
                    )}
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Link
              href="https://discord.gg/nextarch"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              Join Discord
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white p-2"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-black/90 backdrop-blur-md rounded-b-lg border-b border-white/10">
              {navigation.map((item) => {
                const isActive = pathname === item.href || 
                  (item.href !== "/" && pathname.startsWith(item.href));
                
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "block px-3 py-2 text-base font-medium transition-colors rounded-md flex items-center space-x-2",
                      isActive
                        ? "text-blue-400 bg-blue-400/10"
                        : "text-gray-300 hover:text-white hover:bg-white/10"
                    )}
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
              <div className="pt-4 pb-2">
                <Link
                  href="https://discord.gg/nextarch"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsOpen(false)}
                  className="block w-full bg-blue-600 text-white px-3 py-2 rounded-md text-center text-base font-medium hover:bg-blue-700 transition-colors"
                >
                  Join Discord
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}