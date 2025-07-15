import { 
  StudioInfo, 
  Game, 
  NewsArticle, 
  Job, 
  TeamMember, 
  Milestone, 
  HeroSection, 
  NewsletterModal,
  PatchNote 
} from "@/types";

export const studioInfo: StudioInfo = {
  name: "Nextarch Studio",
  logo: "/logo.png",
  domain: "https://nextarch.studio",
  mission: "Creating immersive gaming experiences that push the boundaries of interactive entertainment.",
  socialLinks: [
    { platform: "Discord", url: "https://discord.gg/nextarch", icon: "discord" },
    { platform: "Twitter", url: "https://twitter.com/nextarchstudio", icon: "twitter" },
    { platform: "YouTube", url: "https://youtube.com/nextarchstudio", icon: "youtube" },
    { platform: "Twitch", url: "https://twitch.tv/nextarchstudio", icon: "twitch" },
  ],
  theme: {
    mode: "dark",
    accentColor: "#3b82f6",
  },
};

export const heroSection: HeroSection = {
  headline: "Crafting Tomorrow's Games Today",
  tagline: "Experience the next generation of interactive entertainment with cutting-edge technology and immersive storytelling.",
  backgroundMedia: {
    type: "video",
    url: "/hero-video.mp4",
  },
  ctaButtons: [
    { text: "Join Discord", url: "https://discord.gg/nextarch", variant: "primary" },
    { text: "View Games", url: "/games", variant: "secondary" },
  ],
};

export const newsletterModal: NewsletterModal = {
  title: "Stay Updated",
  description: "Get the latest news, updates, and exclusive content delivered to your inbox.",
  isEnabled: true,
};

export const sampleGames: Game[] = [
  {
    id: "1",
    slug: "cyber-legends",
    title: "Cyber Legends",
    description: "A futuristic battle royale set in a cyberpunk world where technology meets magic.",
    coverImage: "/games/cyber-legends-cover.jpg",
    bannerImage: "/games/cyber-legends-banner.jpg",
    features: [
      "100-player battle royale",
      "Unique cyberpunk aesthetic",
      "Tech-magic hybrid combat system",
      "Dynamic weather and day/night cycle",
    ],
    platforms: [
      { name: "Steam", icon: "steam", url: "https://store.steampowered.com" },
      { name: "Epic Games", icon: "epic", url: "https://epicgames.com" },
      { name: "PlayStation 5", icon: "playstation" },
      { name: "Xbox Series X", icon: "xbox" },
    ],
    tags: ["Battle Royale", "Cyberpunk", "Multiplayer", "Action"],
    youtubeTrailer: "https://youtube.com/watch?v=dQw4w9WgXcQ",
    screenshots: [
      "/games/cyber-legends-1.jpg",
      "/games/cyber-legends-2.jpg",
      "/games/cyber-legends-3.jpg",
    ],
    isFeatured: true,
    releaseDate: "2024-12-15",
    status: "development",
  },
  {
    id: "2",
    slug: "mystic-realms",
    title: "Mystic Realms",
    description: "An open-world fantasy RPG with deep character customization and branching storylines.",
    coverImage: "/games/mystic-realms-cover.jpg",
    bannerImage: "/games/mystic-realms-banner.jpg",
    features: [
      "Vast open world to explore",
      "Deep character progression",
      "Multiple story paths",
      "Cooperative multiplayer",
    ],
    platforms: [
      { name: "Steam", icon: "steam", url: "https://store.steampowered.com" },
      { name: "Nintendo Switch", icon: "nintendo" },
    ],
    tags: ["RPG", "Fantasy", "Open World", "Co-op"],
    screenshots: [
      "/games/mystic-realms-1.jpg",
      "/games/mystic-realms-2.jpg",
    ],
    isFeatured: false,
    status: "beta",
  },
];

export const sampleNews: NewsArticle[] = [
  {
    id: "1",
    slug: "cyber-legends-alpha-announcement",
    title: "Cyber Legends Alpha Test Begins Next Month",
    content: `We're thrilled to announce that the alpha test for Cyber Legends will begin next month! 

This is a major milestone for our team, and we can't wait to get the game into the hands of our community. The alpha will feature:

- Core battle royale gameplay with 50 players
- 3 unique maps to test
- Basic customization options
- Early feedback systems

Players who have signed up for our newsletter will receive priority access to alpha invitations. If you haven't signed up yet, there's still time!

## What to Expect

The alpha build represents about 60% of our planned features for the final release. You'll be able to experience the core gameplay loop, test our unique tech-magic combat system, and explore our cyberpunk world.

We're particularly excited to get feedback on our weapon customization system and the dynamic environmental effects that change based on player actions.

## How to Participate

Alpha invitations will be sent out via email starting December 1st. The test will run for two weeks, with daily feedback sessions and community discussions on our Discord server.

Thank you for your continued support as we build something truly special together!`,
    excerpt: "The alpha test for Cyber Legends will begin next month with core battle royale gameplay, 3 unique maps, and priority access for newsletter subscribers.",
    coverImage: "/news/cyber-legends-alpha.jpg",
    tags: ["Cyber Legends", "Alpha Test", "Update"],
    author: "Alex Chen",
    publishedAt: "2024-11-15T10:00:00Z",
    updatedAt: "2024-11-15T10:00:00Z",
  },
  {
    id: "2",
    slug: "studio-anniversary",
    title: "Celebrating 3 Years of Nextarch Studio",
    content: `Today marks three incredible years since we founded Nextarch Studio. It's been an amazing journey filled with challenges, growth, and most importantly, an incredible community that has supported us every step of the way.

## Our Journey So Far

When we started Nextarch Studio in 2021, we were just a small team of passionate developers with big dreams. Today, we've grown to a team of 25 talented individuals working on multiple exciting projects.

## Looking Forward

As we enter our fourth year, we're more excited than ever about what's ahead. With Cyber Legends approaching its release and several other projects in development, 2025 is shaping up to be our biggest year yet.

Thank you to everyone who has been part of this journey. Here's to many more years of creating amazing games together!`,
    excerpt: "Celebrating three years of Nextarch Studio with a look back at our journey and exciting plans for the future.",
    coverImage: "/news/anniversary.jpg",
    tags: ["Anniversary", "Studio News"],
    author: "Maya Rodriguez",
    publishedAt: "2024-11-01T14:30:00Z",
    updatedAt: "2024-11-01T14:30:00Z",
  },
];

export const sampleJobs: Job[] = [
  {
    id: "1",
    title: "Senior Game Developer",
    department: "Engineering",
    location: "Remote",
    type: "full-time",
    description: "We're looking for an experienced game developer to join our core team and help build the next generation of gaming experiences.",
    requirements: [
      "5+ years of game development experience",
      "Proficiency in C# and Unity",
      "Experience with multiplayer networking",
      "Strong problem-solving skills",
    ],
    responsibilities: [
      "Develop core gameplay systems",
      "Collaborate with designers and artists",
      "Optimize performance for multiple platforms",
      "Mentor junior developers",
    ],
    isRemote: true,
    postedAt: "2024-11-10T09:00:00Z",
  },
  {
    id: "2",
    title: "3D Environment Artist",
    department: "Art",
    location: "Los Angeles, CA",
    type: "full-time",
    description: "Join our art team to create stunning game environments that bring our worlds to life.",
    requirements: [
      "3+ years of 3D environment art experience",
      "Proficiency in Blender or Maya",
      "Experience with PBR workflows",
      "Strong understanding of composition and lighting",
    ],
    responsibilities: [
      "Create high-quality 3D environments",
      "Work closely with level designers",
      "Maintain visual consistency across projects",
      "Optimize assets for real-time rendering",
    ],
    isRemote: false,
    postedAt: "2024-11-08T11:00:00Z",
  },
];

export const teamMembers: TeamMember[] = [
  {
    id: "1",
    name: "Alex Chen",
    role: "CEO & Creative Director",
    bio: "Former AAA game director with 15 years of experience. Passionate about creating immersive worlds and memorable experiences.",
    avatar: "/team/alex-chen.jpg",
    socialLinks: [
      { platform: "Twitter", url: "https://twitter.com/alexchen", icon: "twitter" },
      { platform: "LinkedIn", url: "https://linkedin.com/in/alexchen", icon: "linkedin" },
    ],
  },
  {
    id: "2",
    name: "Maya Rodriguez",
    role: "Lead Developer",
    bio: "Full-stack developer turned game programmer. Loves optimizing code and building scalable game systems.",
    avatar: "/team/maya-rodriguez.jpg",
    socialLinks: [
      { platform: "GitHub", url: "https://github.com/mayarod", icon: "github" },
      { platform: "Twitter", url: "https://twitter.com/mayarod", icon: "twitter" },
    ],
  },
];

export const milestones: Milestone[] = [
  {
    id: "1",
    title: "Studio Founded",
    description: "Nextarch Studio was established with a vision to create innovative gaming experiences.",
    date: "2021-11-01",
    image: "/milestones/founding.jpg",
  },
  {
    id: "2",
    title: "First Game Prototype",
    description: "Completed our first game prototype and began pre-production on Cyber Legends.",
    date: "2022-03-15",
    image: "/milestones/prototype.jpg",
  },
  {
    id: "3",
    title: "Team Expansion",
    description: "Grew our team to 15 developers and established our core development processes.",
    date: "2023-01-20",
  },
  {
    id: "4",
    title: "Alpha Release",
    description: "Released the first alpha build of Cyber Legends to select community members.",
    date: "2024-06-10",
    image: "/milestones/alpha.jpg",
  },
];

export const samplePatchNotes: PatchNote[] = [
  {
    id: "1",
    version: "0.8.2",
    gameId: "1",
    date: "2024-11-14T16:00:00Z",
    changes: [
      { type: "added", description: "New weapon: Plasma Rifle with energy-based ammunition" },
      { type: "added", description: "Environmental destruction system for urban areas" },
      { type: "changed", description: "Reduced respawn time from 10 seconds to 8 seconds" },
      { type: "changed", description: "Updated UI for inventory management" },
      { type: "fixed", description: "Fixed issue where players could clip through certain walls" },
      { type: "fixed", description: "Resolved audio desync during intense combat scenarios" },
    ],
  },
  {
    id: "2",
    version: "0.8.1",
    gameId: "1",
    date: "2024-11-07T14:30:00Z",
    changes: [
      { type: "added", description: "New map: Neon District with vertical gameplay elements" },
      { type: "changed", description: "Rebalanced weapon damage across all categories" },
      { type: "fixed", description: "Fixed crash when using certain ability combinations" },
      { type: "removed", description: "Temporarily removed explosive barrels due to performance issues" },
    ],
  },
];