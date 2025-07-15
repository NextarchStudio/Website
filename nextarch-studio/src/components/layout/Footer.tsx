import Link from "next/link";
import { Github, Twitter, Youtube, MessageCircle } from "lucide-react";
import { studioInfo } from "@/data/sample";

const socialIcons = {
  discord: MessageCircle,
  twitter: Twitter,
  youtube: Youtube,
  github: Github,
  twitch: MessageCircle, // Using MessageCircle as fallback for Twitch
};

const footerNavigation = {
  games: [
    { name: "All Games", href: "/games" },
    { name: "Cyber Legends", href: "/games/cyber-legends" },
    { name: "Mystic Realms", href: "/games/mystic-realms" },
  ],
  company: [
    { name: "About", href: "/about" },
    { name: "News", href: "/news" },
    { name: "Careers", href: "/careers" },
    { name: "Contact", href: "/contact" },
  ],
  community: [
    { name: "Discord", href: "https://discord.gg/nextarch" },
    { name: "Community Hub", href: "/community" },
    { name: "Support", href: "/contact" },
  ],
  legal: [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Cookie Policy", href: "/cookies" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/10">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Studio Info */}
          <div className="md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="h-8 w-8 rounded bg-blue-600 flex items-center justify-center">
                <span className="text-white font-bold text-sm">N</span>
              </div>
              <span className="text-white text-xl font-bold">
                {studioInfo.name}
              </span>
            </div>
            <p className="text-gray-400 text-sm mb-6">
              {studioInfo.mission}
            </p>
            {/* Social Links */}
            <div className="flex space-x-4">
              {studioInfo.socialLinks.map((social) => {
                const IconComponent = socialIcons[social.icon as keyof typeof socialIcons] || MessageCircle;
                return (
                  <Link
                    key={social.platform}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors"
                    aria-label={`Follow us on ${social.platform}`}
                  >
                    <IconComponent className="h-5 w-5" />
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Navigation Columns */}
          <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-8">
            {/* Games */}
            <div>
              <h3 className="text-white font-semibold mb-4">Games</h3>
              <ul className="space-y-2">
                {footerNavigation.games.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-gray-400 hover:text-white transition-colors text-sm"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="text-white font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                {footerNavigation.company.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-gray-400 hover:text-white transition-colors text-sm"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Community */}
            <div>
              <h3 className="text-white font-semibold mb-4">Community</h3>
              <ul className="space-y-2">
                {footerNavigation.community.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-gray-400 hover:text-white transition-colors text-sm"
                      target={item.href.startsWith("http") ? "_blank" : undefined}
                      rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center">
            {/* Copyright */}
            <div className="text-gray-400 text-sm">
              © {new Date().getFullYear()} {studioInfo.name}. All rights reserved.
            </div>

            {/* Legal Links */}
            <div className="flex space-x-6 mt-4 md:mt-0">
              {footerNavigation.legal.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}