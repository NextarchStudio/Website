import { Metadata } from "next";
import Link from "next/link";
import { Mail, MapPin, Clock, MessageCircle, ExternalLink, Send, HelpCircle } from "lucide-react";
import { studioInfo } from "@/data/sample";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Nextarch Studio. We'd love to hear from you about partnerships, press inquiries, or general questions.",
};

function ContactForm() {
  return (
    <div className="card p-8">
      <h2 className="heading-sm mb-6">Send us a message</h2>
      
      <form className="space-y-6">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Name *</label>
            <input
              type="text"
              required
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Your full name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Email *</label>
            <input
              type="email"
              required
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="your@email.com"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Subject *</label>
          <select
            required
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select a subject</option>
            <option value="general">General Inquiry</option>
            <option value="partnership">Partnership</option>
            <option value="press">Press Inquiry</option>
            <option value="support">Customer Support</option>
            <option value="careers">Careers</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Company (Optional)</label>
          <input
            type="text"
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Your company name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Message *</label>
          <textarea
            required
            rows={6}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            placeholder="Tell us how we can help you..."
          ></textarea>
        </div>

        <div className="flex items-start space-x-3">
          <input
            type="checkbox"
            id="newsletter"
            className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <label htmlFor="newsletter" className="text-sm text-gray-400">
            I&apos;d like to receive updates about new games and company news
          </label>
        </div>

        <button
          type="submit"
          className="btn-primary w-full inline-flex items-center justify-center space-x-2"
        >
          <Send className="h-4 w-4" />
          <span>Send Message</span>
        </button>
      </form>
    </div>
  );
}

function ContactInfo() {
  const contactMethods = [
    {
      icon: Mail,
      title: "Email",
      description: "General inquiries",
      value: "hello@nextarch.studio",
      link: "mailto:hello@nextarch.studio",
    },
    {
      icon: Mail,
      title: "Press",
      description: "Media and press inquiries",
      value: "press@nextarch.studio", 
      link: "mailto:press@nextarch.studio",
    },
    {
      icon: Mail,
      title: "Partnerships",
      description: "Business partnerships",
      value: "partnerships@nextarch.studio",
      link: "mailto:partnerships@nextarch.studio",
    },
    {
      icon: MessageCircle,
      title: "Discord",
      description: "Join our community",
      value: "nextarch.studio",
      link: "https://discord.gg/nextarch",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="card p-8 bg-gradient-to-br from-blue-900/20 to-purple-900/20 border-blue-500/30">
        <div className="flex items-center space-x-3 mb-6">
          <MapPin className="h-6 w-6 text-blue-400" />
          <h3 className="text-xl font-semibold">Studio Location</h3>
        </div>
        <div className="space-y-2">
          <p className="text-gray-300">Remote-First Company</p>
          <p className="text-gray-400 text-sm">
            Distributed team across North America, Europe, and Asia
          </p>
          <div className="flex items-center space-x-2 text-sm text-gray-400 mt-4">
            <Clock className="h-4 w-4" />
            <span>Response time: 24-48 hours</span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {contactMethods.map((method, index) => (
          <div key={index} className="card p-6 group hover:bg-white/10 transition-colors">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center group-hover:bg-blue-600/30 transition-colors">
                <method.icon className="h-6 w-6 text-blue-400" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold">{method.title}</h4>
                <p className="text-sm text-gray-400 mb-1">{method.description}</p>
                <Link
                  href={method.link}
                  className="text-blue-400 hover:text-blue-300 transition-colors text-sm"
                  target={method.link.startsWith("http") ? "_blank" : undefined}
                  rel={method.link.startsWith("http") ? "noopener noreferrer" : undefined}
                >
                  {method.value}
                </Link>
              </div>
              <ExternalLink className="h-4 w-4 text-gray-600 group-hover:text-gray-400 transition-colors" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function FAQSection() {
  const faqs = [
    {
      question: "How can I apply for a job at Nextarch Studio?",
      answer: "Check out our careers page for current openings and application instructions. We&apos;re always interested in hearing from talented individuals, even if there aren&apos;t current openings that match your skills.",
    },
    {
      question: "Do you accept game pitches or ideas?",
      answer: "While we appreciate your enthusiasm, we don&apos;t accept unsolicited game pitches or ideas. We focus on developing our own original concepts in-house.",
    },
    {
      question: "Can I visit your studio?",
      answer: "We&apos;re a remote-first company without a traditional office space. However, we occasionally host community events and developer meetups. Follow our social media for announcements.",
    },
    {
      question: "How can I become a beta tester?",
      answer: "Beta testing opportunities are announced through our Discord community and newsletter. Make sure to join both to get early access to testing opportunities.",
    },
    {
      question: "Do you offer internships?",
      answer: "Yes! We offer remote internships in various departments. Check our careers page for current opportunities or reach out to careers@nextarch.studio with your resume.",
    },
    {
      question: "How can I report a bug or technical issue?",
      answer: "For game-related bugs and technical issues, please use our Discord support channels or email support@nextarch.studio with detailed information about the issue.",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="heading-md mb-4">Frequently Asked Questions</h2>
        <p className="text-gray-400">
          Find answers to common questions. Don&apos;t see what you&apos;re looking for? Contact us directly.
        </p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <details key={index} className="card p-6 group">
            <summary className="cursor-pointer flex items-center justify-between">
              <h3 className="font-medium group-hover:text-blue-400 transition-colors">
                {faq.question}
              </h3>
              <HelpCircle className="h-5 w-5 text-gray-400 group-hover:text-blue-400 transition-colors" />
            </summary>
            <div className="mt-4 pt-4 border-t border-white/10">
              <p className="text-gray-400 leading-relaxed">{faq.answer}</p>
            </div>
          </details>
        ))}
      </div>
    </div>
  );
}

function TeamContact() {
  const teamContacts = [
    {
      name: "Alex Chen",
      role: "CEO & Creative Director",
      email: "alex@nextarch.studio",
      areas: ["Partnerships", "Press Inquiries", "Creative Direction"],
      avatar: "AC",
    },
    {
      name: "Maya Rodriguez", 
      role: "Lead Developer",
      email: "maya@nextarch.studio",
      areas: ["Technical Questions", "Developer Relations", "Open Source"],
      avatar: "MR",
    },
    {
      name: "Community Team",
      role: "Community Management",
      email: "community@nextarch.studio",
      areas: ["Discord Support", "Player Feedback", "Events"],
      avatar: "CT",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="heading-md mb-4">Meet Our Team</h2>
        <p className="text-gray-400">
          Get in touch with specific team members for specialized inquiries.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {teamContacts.map((contact, index) => (
          <div key={index} className="card p-6 text-center group">
            {/* Avatar */}
            <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-700 rounded-full mx-auto mb-4 flex items-center justify-center group-hover:scale-105 transition-transform">
              <span className="text-white font-bold">{contact.avatar}</span>
            </div>
            
            {/* Info */}
            <h3 className="font-semibold mb-2">{contact.name}</h3>
            <p className="text-blue-400 text-sm font-medium mb-4">{contact.role}</p>
            
            {/* Areas */}
            <div className="space-y-2 mb-6">
              <p className="text-xs text-gray-500 uppercase tracking-wide">Areas of Focus</p>
              <div className="flex flex-wrap gap-1 justify-center">
                {contact.areas.map((area, areaIndex) => (
                  <span
                    key={areaIndex}
                    className="text-xs bg-blue-600/20 text-blue-400 px-2 py-1 rounded-full"
                  >
                    {area}
                  </span>
                ))}
              </div>
            </div>
            
            {/* Contact */}
            <Link
              href={`mailto:${contact.email}`}
              className="btn-secondary w-full inline-flex items-center justify-center space-x-2 text-sm"
            >
              <Mail className="h-4 w-4" />
              <span>Contact</span>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-10"></div>
        <div className="relative max-w-4xl mx-auto text-center">
          <h1 className="heading-xl mb-6">Get in Touch</h1>
          <p className="text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
            We&apos;d love to hear from you. Whether you have questions about our games, 
            want to explore partnerships, or just want to say hello, we&apos;re here to help.
          </p>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <ContactForm />
            </div>
            
            {/* Contact Info */}
            <div>
              <ContactInfo />
            </div>
          </div>
        </div>
      </section>

      {/* Team Contact Section */}
      <section className="py-20 px-4 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <TeamContact />
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 bg-black">
        <div className="max-w-4xl mx-auto">
          <FAQSection />
        </div>
      </section>

      {/* Social Media CTA */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-900 to-purple-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="heading-lg mb-6">Join Our Community</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Connect with fellow gamers, get the latest updates, and be part of our growing community.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            {studioInfo.socialLinks.map((social) => (
              <Link
                key={social.platform}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary inline-flex items-center space-x-2"
              >
                <MessageCircle className="h-4 w-4" />
                <span>Join {social.platform}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}