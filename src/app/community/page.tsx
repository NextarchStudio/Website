import { Metadata } from "next";
import Link from "next/link";
import { MessageCircle, Users, Calendar, Trophy, Star, ExternalLink, Heart, Gamepad2, Video, Mic } from "lucide-react";
import { studioInfo } from "@/data/sample";

export const metadata: Metadata = {
  title: "Community",
  description: "Join the Nextarch Studio community. Connect with fellow gamers, participate in events, and be part of our growing gaming family.",
};

function CommunityStats() {
  const stats = [
    { icon: Users, label: "Community Members", value: "10,247", color: "text-blue-400" },
    { icon: MessageCircle, label: "Discord Members", value: "8,932", color: "text-purple-400" },
    { icon: Gamepad2, label: "Active Players", value: "5,681", color: "text-green-400" },
    { icon: Trophy, label: "Events Hosted", value: "127", color: "text-yellow-400" },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <div key={index} className="card p-6 text-center group hover:scale-105 transition-transform">
          <div className={`w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-gray-700 transition-colors`}>
            <stat.icon className={`h-6 w-6 ${stat.color}`} />
          </div>
          <div className="text-2xl font-bold mb-1">{stat.value}</div>
          <div className="text-sm text-gray-400">{stat.label}</div>
        </div>
      ))}
    </div>
  );
}

function SocialPlatforms() {
  const platforms = [
    {
      name: "Discord",
      description: "Join our main community hub for real-time chat, game discussions, and exclusive events.",
      members: "8.9K members",
      icon: MessageCircle,
      url: "https://discord.gg/nextarch",
      color: "from-purple-600 to-indigo-600",
      features: ["Voice Channels", "Game Events", "Beta Access", "Developer Q&A"],
    },
    {
      name: "Twitter",
      description: "Follow us for the latest updates, development insights, and community highlights.",
      members: "12.4K followers",
      icon: MessageCircle,
      url: "https://twitter.com/nextarchstudio",
      color: "from-blue-500 to-blue-600",
      features: ["Dev Updates", "Community Highlights", "Live Tweets", "Announcements"],
    },
    {
      name: "YouTube",
      description: "Watch development documentaries, game trailers, and behind-the-scenes content.",
      members: "6.2K subscribers",
      icon: Video,
      url: "https://youtube.com/nextarchstudio",
      color: "from-red-500 to-red-600",
      features: ["Dev Documentaries", "Trailers", "Livestreams", "Tutorials"],
    },
    {
      name: "Twitch",
      description: "Watch live development streams and community game sessions.",
      members: "3.8K followers",
      icon: Video,
      url: "https://twitch.tv/nextarchstudio",
      color: "from-purple-500 to-purple-600",
      features: ["Live Dev Streams", "Community Games", "Q&A Sessions", "Special Events"],
    },
  ];

  return (
    <div className="grid md:grid-cols-2 gap-8">
      {platforms.map((platform, index) => (
        <div key={index} className="card p-8 group relative overflow-hidden">
          {/* Background Gradient */}
          <div className={`absolute inset-0 bg-gradient-to-br ${platform.color} opacity-10 group-hover:opacity-20 transition-opacity`}></div>
          
          <div className="relative">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <div className={`w-12 h-12 bg-gradient-to-br ${platform.color} rounded-lg flex items-center justify-center`}>
                  <platform.icon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">{platform.name}</h3>
                  <p className="text-sm text-gray-400">{platform.members}</p>
                </div>
              </div>
              <ExternalLink className="h-5 w-5 text-gray-400 group-hover:text-white transition-colors" />
            </div>

            {/* Description */}
            <p className="text-gray-300 mb-6 leading-relaxed">
              {platform.description}
            </p>

            {/* Features */}
            <div className="mb-6">
              <h4 className="font-medium mb-3">What you&apos;ll find:</h4>
              <div className="flex flex-wrap gap-2">
                {platform.features.map((feature, featureIndex) => (
                  <span
                    key={featureIndex}
                    className="text-xs bg-white/10 text-gray-300 px-2 py-1 rounded-full"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>

            {/* Join Button */}
            <Link
              href={platform.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary w-full inline-flex items-center justify-center space-x-2"
            >
              <span>Join {platform.name}</span>
              <ExternalLink className="h-4 w-4" />
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}

function CommunityEvents() {
  const events = [
    {
      title: "Weekly Dev Stream",
      description: "Join our developers as they showcase new features and answer community questions.",
      time: "Every Friday, 3 PM PST",
      platform: "Twitch",
      type: "Recurring",
      icon: Video,
    },
    {
      title: "Community Game Night",
      description: "Play together with fellow community members in organized multiplayer sessions.",
      time: "Saturdays, 7 PM PST",
      platform: "Discord",
      type: "Recurring",
      icon: Gamepad2,
    },
    {
      title: "Alpha Testing Weekend",
      description: "Exclusive early access to test new game features and provide feedback.",
      time: "Monthly",
      platform: "Private Channels",
      type: "Special",
      icon: Star,
    },
    {
      title: "Developer AMA",
      description: "Ask our team anything about game development, our studio, or upcoming projects.",
      time: "Bi-weekly",
      platform: "Discord",
      type: "Live",
      icon: Mic,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="heading-md mb-4">Community Events</h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Join our regular events and special occasions. There&apos;s always something happening in our community!
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {events.map((event, index) => (
          <div key={index} className="card p-6 group">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-blue-600/30 transition-colors">
                <event.icon className="h-6 w-6 text-blue-400" />
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <h3 className="font-semibold">{event.title}</h3>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    event.type === 'Special' ? 'bg-yellow-600/20 text-yellow-400' :
                    event.type === 'Live' ? 'bg-red-600/20 text-red-400' :
                    'bg-green-600/20 text-green-400'
                  }`}>
                    {event.type}
                  </span>
                </div>
                <p className="text-gray-400 text-sm mb-3">{event.description}</p>
                <div className="space-y-1 text-xs text-gray-500">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-3 w-3" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MessageCircle className="h-3 w-3" />
                    <span>{event.platform}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CommunityGuidelines() {
  const guidelines = [
    {
      icon: Heart,
      title: "Be Respectful",
      description: "Treat all community members with kindness and respect.",
    },
    {
      icon: Users,
      title: "Help Others",
      description: "Share knowledge and help fellow gamers when you can.",
    },
    {
      icon: MessageCircle,
      title: "Stay On Topic",
      description: "Keep discussions relevant to games and development.",
    },
    {
      icon: Star,
      title: "Have Fun",
      description: "Remember, we&apos;re here to enjoy games and learn together!",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="heading-md mb-4">Community Guidelines</h2>
        <p className="text-gray-400">
          Simple rules to keep our community welcoming and fun for everyone.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {guidelines.map((guideline, index) => (
          <div key={index} className="card p-6 text-center">
            <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center mx-auto mb-4">
              <guideline.icon className="h-6 w-6 text-blue-400" />
            </div>
            <h3 className="font-semibold mb-2">{guideline.title}</h3>
            <p className="text-sm text-gray-400">{guideline.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function FeaturedContent() {
  const content = [
    {
      type: "Stream Highlight",
      title: "Behind the Scenes: Cyber Legends Combat System",
      description: "Watch our lead developer explain the tech-magic combat mechanics in our latest game.",
      thumbnail: "🎮",
      url: "#",
      duration: "12:34",
    },
    {
      type: "Community Spotlight",
      title: "Player Creates Amazing Fan Art",
      description: "Community member @ArtisticGamer created stunning artwork of our game characters.",
      thumbnail: "🎨",
      url: "#",
      likes: "847",
    },
    {
      type: "Dev Blog",
      title: "The Making of Mystic Realms' Open World",
      description: "Deep dive into our approach to creating an immersive fantasy world.",
      thumbnail: "📝",
      url: "#",
      readTime: "8 min",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="heading-md mb-4">Featured Content</h2>
        <p className="text-gray-400">
          Check out the latest highlights from our community and development team.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {content.map((item, index) => (
          <Link key={index} href={item.url} className="card p-6 group block">
            <div className="space-y-4">
              {/* Thumbnail */}
              <div className="aspect-video bg-gradient-to-br from-blue-600 to-purple-700 rounded-lg flex items-center justify-center text-4xl group-hover:scale-105 transition-transform">
                {item.thumbnail}
              </div>
              
              {/* Content */}
              <div>
                <div className="text-xs text-blue-400 font-medium mb-2">{item.type}</div>
                <h3 className="font-semibold mb-2 group-hover:text-blue-400 transition-colors">
                  {item.title}
                </h3>
                <p className="text-gray-400 text-sm mb-3">{item.description}</p>
                
                {/* Meta */}
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>
                    {item.duration && `${item.duration} duration`}
                    {item.likes && `${item.likes} likes`}
                    {item.readTime && `${item.readTime} read`}
                  </span>
                  <ExternalLink className="h-3 w-3" />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default function CommunityPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-10"></div>
        <div className="relative max-w-4xl mx-auto text-center">
          <h1 className="heading-xl mb-6">Join Our Community</h1>
          <p className="text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto mb-8">
            Connect with fellow gamers, share experiences, and be part of our growing community. 
            Whether you&apos;re a casual player or hardcore gamer, there&apos;s a place for you here.
          </p>
          
          <Link
            href="https://discord.gg/nextarch"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex items-center space-x-2 text-lg px-8 py-4"
          >
            <MessageCircle className="h-5 w-5" />
            <span>Join Discord Now</span>
          </Link>
        </div>
      </section>

      {/* Community Stats */}
      <section className="py-20 px-4 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="heading-lg mb-4">Our Growing Community</h2>
            <p className="text-xl text-gray-400">
              Join thousands of players from around the world
            </p>
          </div>
          <CommunityStats />
        </div>
      </section>

      {/* Social Platforms */}
      <section className="py-20 px-4 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="heading-lg mb-4">Where to Find Us</h2>
            <p className="text-xl text-gray-400">
              Choose your platform and connect with the community
            </p>
          </div>
          <SocialPlatforms />
        </div>
      </section>

      {/* Community Events */}
      <section className="py-20 px-4 bg-black">
        <div className="max-w-7xl mx-auto">
          <CommunityEvents />
        </div>
      </section>

      {/* Featured Content */}
      <section className="py-20 px-4 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <FeaturedContent />
        </div>
      </section>

      {/* Community Guidelines */}
      <section className="py-20 px-4 bg-black">
        <div className="max-w-7xl mx-auto">
          <CommunityGuidelines />
        </div>
      </section>

      {/* Join CTA */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-900 to-purple-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="heading-lg mb-6">Ready to Join?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Become part of our amazing community today. Share your passion for gaming, 
            make new friends, and help shape the future of our games.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="https://discord.gg/nextarch"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center space-x-2"
            >
              <MessageCircle className="h-4 w-4" />
              <span>Join Discord</span>
            </Link>
            <Link
              href="/contact"
              className="btn-secondary inline-flex items-center space-x-2"
            >
              <span>Contact Us</span>
              <ExternalLink className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}