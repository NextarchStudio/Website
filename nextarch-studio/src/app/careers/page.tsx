import { Metadata } from "next";
import Link from "next/link";
import { MapPin, Clock, DollarSign, Users, Coffee, Heart, Zap, Globe, Mail, ExternalLink } from "lucide-react";
import { sampleJobs } from "@/data/sample";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Careers",
  description: "Join the Nextarch Studio team and help us create the next generation of gaming experiences. Remote-first company with competitive benefits.",
};

const jobTypeColors = {
  "full-time": "bg-green-600/20 text-green-400",
  "part-time": "bg-blue-600/20 text-blue-400", 
  "contract": "bg-purple-600/20 text-purple-400",
  "internship": "bg-orange-600/20 text-orange-400",
};

const jobTypeLabels = {
  "full-time": "Full Time",
  "part-time": "Part Time",
  "contract": "Contract",
  "internship": "Internship",
};

function JobCard({ job }: { job: typeof sampleJobs[0] }) {
  return (
    <div className="card card-hover p-6 group">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <h3 className="text-xl font-semibold group-hover:text-blue-400 transition-colors">
              {job.title}
            </h3>
            <div className="text-blue-400 font-medium">{job.department}</div>
          </div>
          <div className="flex flex-col items-end space-y-2">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${jobTypeColors[job.type]}`}>
              {jobTypeLabels[job.type]}
            </span>
            {job.isRemote && (
              <span className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded-full">
                Remote
              </span>
            )}
          </div>
        </div>

        {/* Job Info */}
        <div className="flex items-center space-x-4 text-sm text-gray-400">
          <div className="flex items-center space-x-1">
            <MapPin className="h-4 w-4" />
            <span>{job.location}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="h-4 w-4" />
            <span>Posted {formatDate(job.postedAt)}</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-300 leading-relaxed line-clamp-3">
          {job.description}
        </p>

        {/* Key Requirements Preview */}
        <div className="space-y-2">
          <h4 className="font-medium text-white">Key Requirements:</h4>
          <ul className="space-y-1">
            {job.requirements.slice(0, 3).map((req, index) => (
              <li key={index} className="flex items-start space-x-2 text-sm text-gray-400">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <span>{req}</span>
              </li>
            ))}
            {job.requirements.length > 3 && (
              <li className="text-sm text-gray-500">
                +{job.requirements.length - 3} more requirements
              </li>
            )}
          </ul>
        </div>

        {/* Apply Button */}
        <div className="pt-4 border-t border-white/10">
          <button className="btn-primary w-full">
            Apply Now
          </button>
        </div>
      </div>
    </div>
  );
}

function BenefitsGrid() {
  const benefits = [
    {
      icon: Heart,
      title: "Health & Wellness",
      description: "Comprehensive health, dental, and vision insurance",
    },
    {
      icon: Globe,
      title: "Remote First",
      description: "Work from anywhere with flexible hours",
    },
    {
      icon: Zap,
      title: "Growth & Learning",
      description: "Professional development budget and conference attendance",
    },
    {
      icon: Coffee,
      title: "Work-Life Balance",
      description: "Unlimited PTO and mental health support",
    },
    {
      icon: Users,
      title: "Great Team",
      description: "Collaborative culture with talented individuals",
    },
    {
      icon: DollarSign,
      title: "Competitive Pay",
      description: "Market-rate salaries with equity options",
    },
  ];

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {benefits.map((benefit, index) => (
        <div key={index} className="card p-6 text-center group hover:scale-105 transition-transform">
          <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-600/30 transition-colors">
            <benefit.icon className="h-6 w-6 text-blue-400" />
          </div>
          <h3 className="font-semibold mb-2">{benefit.title}</h3>
          <p className="text-sm text-gray-400">{benefit.description}</p>
        </div>
      ))}
    </div>
  );
}

// ApplicationModal component moved to separate file for future use

export default function CareersPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-10"></div>
        <div className="relative max-w-4xl mx-auto text-center">
          <h1 className="heading-xl mb-6">Join Our Team</h1>
          <p className="text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto mb-8">
            Help us create the next generation of gaming experiences. We&apos;re looking for passionate, 
            talented individuals to join our remote-first team.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="#open-positions"
              className="btn-primary inline-flex items-center space-x-2"
            >
              <span>View Open Positions</span>
              <ExternalLink className="h-4 w-4" />
            </Link>
            <Link
              href="mailto:careers@nextarch.studio"
              className="btn-secondary inline-flex items-center space-x-2"
            >
              <Mail className="h-4 w-4" />
              <span>General Inquiry</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Company Culture */}
      <section className="py-20 px-4 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="heading-lg mb-4">Why Work With Us?</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              We believe great games come from great teams. Join a culture that values creativity, 
              collaboration, and work-life balance.
            </p>
          </div>

          <BenefitsGrid />
        </div>
      </section>

      {/* Open Positions */}
      <section id="open-positions" className="py-20 px-4 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="heading-lg mb-4">Open Positions</h2>
            <p className="text-xl text-gray-400">
              Ready to make an impact? Check out our current openings.
            </p>
          </div>

          {sampleJobs.length > 0 ? (
            <div className="grid lg:grid-cols-2 gap-8">
              {sampleJobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="h-8 w-8 text-gray-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">No Open Positions</h3>
              <p className="text-gray-400 mb-8 max-w-md mx-auto">
                We don&apos;t have any open positions at the moment, but we&apos;re always interested 
                in hearing from talented individuals.
              </p>
              <Link
                href="mailto:careers@nextarch.studio"
                className="btn-primary inline-flex items-center space-x-2"
              >
                <Mail className="h-4 w-4" />
                <span>Send Us Your Resume</span>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Application Process */}
      <section className="py-20 px-4 bg-black">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="heading-lg mb-4">Our Hiring Process</h2>
            <p className="text-xl text-gray-400">
              We believe in a fair, transparent hiring process that respects your time.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: "1",
                title: "Application",
                description: "Submit your application with resume and cover letter",
              },
              {
                step: "2", 
                title: "Initial Review",
                description: "Our team reviews your application (1-2 business days)",
              },
              {
                step: "3",
                title: "Interview",
                description: "Video call with the hiring manager and team members",
              },
              {
                step: "4",
                title: "Decision",
                description: "Final decision and offer (if successful)",
              },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold">
                  {item.step}
                </div>
                <h3 className="font-semibold mb-3">{item.title}</h3>
                <p className="text-sm text-gray-400">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-900 to-purple-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="heading-lg mb-6">Ready to Join Us?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Don&apos;t see a position that fits? We&apos;re always open to connecting with 
            talented individuals who share our passion for gaming.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="mailto:careers@nextarch.studio"
              className="btn-primary inline-flex items-center space-x-2"
            >
              <Mail className="h-4 w-4" />
              <span>Get in Touch</span>
            </Link>
            <Link
              href="/about"
              className="btn-secondary inline-flex items-center space-x-2"
            >
              <span>Learn About Us</span>
              <ExternalLink className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}