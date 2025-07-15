import { Metadata } from "next";
import Link from "next/link";
import { Calendar, Users, MapPin, ExternalLink, Github, Twitter, Linkedin } from "lucide-react";
import { studioInfo, teamMembers, milestones } from "@/data/sample";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "About",
  description: "Learn about Nextarch Studio, our mission, team, and journey in creating innovative gaming experiences.",
};

const socialIcons = {
  twitter: Twitter,
  github: Github,
  linkedin: Linkedin,
};

function TeamMemberCard({ member }: { member: typeof teamMembers[0] }) {
  return (
    <div className="card p-6 text-center group">
      {/* Avatar */}
      <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-purple-700 rounded-full mx-auto mb-4 flex items-center justify-center group-hover:scale-105 transition-transform">
        <span className="text-white text-2xl font-bold">
          {member.name.split(' ').map(n => n[0]).join('')}
        </span>
      </div>
      
      {/* Info */}
      <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
      <p className="text-blue-400 text-sm font-medium mb-4">{member.role}</p>
      <p className="text-gray-400 text-sm leading-relaxed mb-6">{member.bio}</p>
      
      {/* Social Links */}
      {member.socialLinks.length > 0 && (
        <div className="flex justify-center space-x-3">
          {member.socialLinks.map((social) => {
            const IconComponent = socialIcons[social.icon as keyof typeof socialIcons];
            if (!IconComponent) return null;
            
            return (
              <Link
                key={social.platform}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label={`${member.name} on ${social.platform}`}
              >
                <IconComponent className="h-5 w-5" />
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

function TimelineItem({ milestone, index }: { milestone: typeof milestones[0]; index: number }) {
  const isEven = index % 2 === 0;
  
  return (
    <div className={`flex items-center ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} mb-12`}>
      {/* Content */}
      <div className={`flex-1 ${isEven ? 'md:pr-12' : 'md:pl-12'}`}>
        <div className="card p-6">
          <div className="flex items-center space-x-2 mb-3">
            <Calendar className="h-4 w-4 text-blue-400" />
            <span className="text-sm text-blue-400 font-medium">
              {formatDate(milestone.date)}
            </span>
          </div>
          <h3 className="text-xl font-semibold mb-3">{milestone.title}</h3>
          <p className="text-gray-400 leading-relaxed">{milestone.description}</p>
        </div>
      </div>
      
      {/* Timeline Line & Dot */}
      <div className="flex flex-col items-center flex-shrink-0 mx-6">
        <div className="w-4 h-4 bg-blue-600 rounded-full border-4 border-black shadow-lg"></div>
        {index < milestones.length - 1 && (
          <div className="w-0.5 h-20 bg-gradient-to-b from-blue-600 to-transparent mt-2"></div>
        )}
      </div>
      
      {/* Spacer for alignment */}
      <div className="flex-1 hidden md:block"></div>
    </div>
  );
}

function StatsGrid() {
  const stats = [
    { label: "Years Active", value: "3+", icon: Calendar },
    { label: "Team Members", value: "25", icon: Users },
    { label: "Games Released", value: "2", icon: Users },
    { label: "Community Members", value: "10K+", icon: Users },
  ];
  
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <div key={index} className="text-center">
          <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center mx-auto mb-3">
            <stat.icon className="h-6 w-6 text-blue-400" />
          </div>
          <div className="text-2xl font-bold mb-1">{stat.value}</div>
          <div className="text-sm text-gray-400">{stat.label}</div>
        </div>
      ))}
    </div>
  );
}

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-10"></div>
        <div className="relative max-w-4xl mx-auto text-center">
          <h1 className="heading-xl mb-6">About Nextarch Studio</h1>
          <p className="text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
            {studioInfo.mission}
          </p>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-20 px-4 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Mission Content */}
            <div className="space-y-6">
              <h2 className="heading-lg">Our Mission</h2>
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>
                  At Nextarch Studio, we believe that games are more than entertainment—they&apos;re 
                  experiences that bring people together, challenge perspectives, and create lasting memories.
                </p>
                <p>
                  Founded in 2021, we&apos;re a passionate team of developers, artists, and storytellers 
                  dedicated to pushing the boundaries of what&apos;s possible in interactive entertainment.
                </p>
                <p>
                  Our games combine cutting-edge technology with innovative gameplay mechanics and 
                  compelling narratives, creating worlds that players want to explore and stories 
                  they&apos;ll never forget.
                </p>
              </div>
              
              {/* Values */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Our Values</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    { title: "Innovation", desc: "Pushing creative boundaries" },
                    { title: "Quality", desc: "Crafting polished experiences" },
                    { title: "Community", desc: "Building lasting relationships" },
                    { title: "Integrity", desc: "Honest and transparent practices" },
                  ].map((value, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <div className="font-medium text-white">{value.title}</div>
                        <div className="text-sm text-gray-400">{value.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="space-y-8">
              <div className="text-center">
                <h3 className="heading-md mb-8">Studio By Numbers</h3>
                <StatsGrid />
              </div>
              
              {/* Location */}
              <div className="card p-6 text-center">
                <MapPin className="h-8 w-8 text-blue-400 mx-auto mb-4" />
                <h4 className="text-lg font-semibold mb-2">Global Team</h4>
                <p className="text-gray-400">
                  Remote-first company with team members across North America, Europe, and Asia
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 px-4 bg-gray-900">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="heading-lg mb-4">Our Journey</h2>
            <p className="text-xl text-gray-400">
              Key milestones in our growth and development as a studio
            </p>
          </div>
          
          <div className="space-y-8">
            {milestones.map((milestone, index) => (
              <TimelineItem key={milestone.id} milestone={milestone} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-4 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="heading-lg mb-4">Meet Our Team</h2>
            <p className="text-xl text-gray-400">
              The passionate individuals behind our games
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <TeamMemberCard key={member.id} member={member} />
            ))}
            
            {/* Join Team CTA */}
            <div className="card p-6 text-center flex flex-col justify-center border-2 border-dashed border-gray-700 hover:border-blue-500 transition-colors group">
              <Users className="h-12 w-12 text-gray-600 group-hover:text-blue-400 mx-auto mb-4 transition-colors" />
              <h3 className="text-xl font-semibold mb-4">Join Our Team</h3>
              <p className="text-gray-400 mb-6">
                We&apos;re always looking for talented individuals to join our growing team.
              </p>
              <Link
                href="/careers"
                className="btn-primary inline-flex items-center space-x-2"
              >
                <span>View Openings</span>
                <ExternalLink className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-900 to-purple-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="heading-lg mb-6">Want to Work With Us?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Whether you&apos;re interested in partnerships, collaborations, or just want to say hello, 
            we&apos;d love to hear from you.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="btn-primary inline-flex items-center space-x-2"
            >
              <span>Get in Touch</span>
              <ExternalLink className="h-4 w-4" />
            </Link>
            <Link
              href="https://discord.gg/nextarch"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary inline-flex items-center space-x-2"
            >
              <span>Join Community</span>
              <ExternalLink className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}