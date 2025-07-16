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
    slug: "scrap-siege-arena",
    title: "Scrap Siege: Arena",
    description: "A thrilling multiplayer physics-based bot combat game where players control customizable scrap robots in intense arena battles. Team up with friends, climb the competitive ladder, and become the ultimate champion!",
    coverImage: "/games/scrap-siege-cover.jpg",
    bannerImage: "/games/scrap-siege-banner.jpg",
    features: [
      "Multiple Game Modes: Battle Royale, Scrapball, King of the Core",
      "Party System: Invite friends and form teams before matches",
      "Competitive Progression: Tier-based matchmaking with MMR system",
      "Customizable Bots: Modular gear system with gameplay tradeoffs",
      "Unlockable Cosmetics: Paint jobs, scrap trails, win poses, emotes",
      "Steam Integration: Achievements, leaderboards, and friend invites",
      "Cross-Platform: Windows PC with Steam integration"
    ],
    platforms: [
      { name: "Steam", icon: "steam", url: "https://store.steampowered.com" },
    ],
    tags: ["Multiplayer", "Physics", "Combat", "Arena", "Steam"],
    youtubeTrailer: "https://youtube.com/watch?v=scrap-siege-trailer",
    screenshots: [
      "/games/scrap-siege-1.jpg",
      "/games/scrap-siege-2.jpg",
      "/games/scrap-siege-3.jpg",
    ],
    isFeatured: true,
    releaseDate: "2024-12-15",
    status: "development",
    gameModes: [
      {
        name: "Battle Royale",
        description: "Last Bot Standing: Free-for-all combat up to 10 players with dynamic arenas and power-ups"
      },
      {
        name: "Scrapball",
        description: "Team Objective: 2v2, 3v3, 4v4, or 5v5 team battles with magnetic ball mechanics"
      },
      {
        name: "King of the Core",
        description: "Control Points: Capture and hold strategic zones with team coordination"
      }
    ],
    progressionSystem: {
      tiers: ["Rust V → Rust I", "Bronze V → Bronze I", "Silver V → Silver I", "Gold V → Gold I", "Platinum V → Platinum I", "Diamond V → Diamond I", "Champion"],
      features: ["Experience & Levels", "Talents & Gear", "Modular Gear System", "Cosmetics & Customization"]
    },
    systemRequirements: {
      minimum: {
        os: "Windows 10 64-bit",
        processor: "Intel Core i5-4590 / AMD FX 8350",
        memory: "8 GB RAM",
        graphics: "NVIDIA GTX 970 / AMD R9 280",
        directX: "Version 12",
        storage: "50 GB available space",
        network: "Broadband Internet connection"
      },
      recommended: {
        os: "Windows 10/11 64-bit",
        processor: "Intel Core i7-8700K / AMD Ryzen 5 3600X",
        memory: "16 GB RAM",
        graphics: "NVIDIA RTX 3070 / AMD RX 6700 XT",
        directX: "Version 12",
        storage: "50 GB available space (SSD recommended)",
        network: "Broadband Internet connection"
      }
    }
  },
  {
    id: "2",
    slug: "nextarch",
    title: "Nextarch",
    description: "A revolutionary cross-platform, open-world MMORPG life simulator that places unprecedented power in the hands of players. Set in a fully fictional universe, players shape politics, economy, infrastructure, and societal morality through their actions in persistent, realm-based worlds populated by advanced AI NPCs.",
    coverImage: "/games/nextarch-cover.jpg",
    bannerImage: "/games/nextarch-banner.jpg",
    features: [
      "True Player Agency: Shape entire civilizations through individual and collective actions",
      "Living Worlds: AI NPCs with persistent memory and evolving personalities",
      "Cross-Platform Unity: Seamless gameplay across PC, Mac, PlayStation, and Xbox",
      "Multilingual Immersion: Real-time localized experiences in 11 languages",
      "Economic Realism: Player-owned businesses, property, and underground economies",
      "Persistent Consequences: Every action ripples through time in your realm"
    ],
    platforms: [
      { name: "Steam", icon: "steam", url: "https://store.steampowered.com" },
      { name: "PlayStation 5", icon: "playstation" },
      { name: "Xbox Series X", icon: "xbox" },
      { name: "macOS", icon: "mac" },
    ],
    tags: ["MMORPG", "Life Simulation", "Open World", "Cross-Platform", "AI NPCs"],
    screenshots: [
      "/games/nextarch-1.jpg",
      "/games/nextarch-2.jpg",
      "/games/nextarch-3.jpg",
    ],
    isFeatured: false,
    status: "development",
    technicalArchitecture: {
      engine: "Unreal Engine 5.6 (Nanite, Lumen, Chaos Physics, World Partition)",
      platforms: ["Windows", "macOS", "PlayStation 5", "Xbox Series X|S"],
      keyTechnologies: [
        "Cross-Platform Accounts: Unified Nextarch ID system",
        "Dynamic World State: Real-time morality, stability, and economy tracking",
        "Multilingual Engine: Per-player language isolation",
        "AI Memory System: Persistent NPC relationships and personality evolution",
        "Property System: Full ownership, inheritance, and transfer mechanics"
      ]
    },
    coreSystems: [
      {
        name: "World State Engine",
        description: "Every realm maintains dynamic indices that respond to player actions: Morality Index, Stability Index, Economy Index, Environmental Index"
      },
      {
        name: "AI NPC System",
        description: "Memory Persistence, Personality Evolution, Multilingual Support, Dynamic Relationships"
      },
      {
        name: "Economy & Ownership",
        description: "Property Ownership, Business Operations, Underground Economy, Inheritance System"
      },
      {
        name: "Multilingual System",
        description: "Supported Languages: English, Spanish, French, Italian, German, Norwegian, Swedish, Danish, Polish, Russian, Chinese"
      }
    ],
    realmTypes: [
      "Lawful Realms: Strong governance, high stability",
      "Anarchist Realms: Player-driven chaos, emergent order",
      "Corporate Realms: Business-dominated societies",
      "Theocratic Realms: Religion-based governance"
    ],
    monetizationModel: {
      subscriptionTiers: [
        { name: "Basic", price: "$14.99/month", features: ["Full game access"] },
        { name: "Premium", price: "$24.99/month", features: ["Priority support", "Early access"] },
        { name: "Guild", price: "$39.99/month", features: ["Enhanced guild features"] }
      ],
      cosmeticPurchases: ["Character customization", "Property decoration", "Vehicle skins", "Emotes and animations"]
    }
  },
];

export const sampleNews: NewsArticle[] = [
  {
    id: "1",
    slug: "scrap-siege-arena-alpha-announcement",
    title: "Scrap Siege: Arena Alpha Test Begins Next Month",
    content: `We're thrilled to announce that the alpha test for Scrap Siege: Arena will begin next month! 

This is a major milestone for our team, and we can't wait to get the game into the hands of our community. The alpha will feature:

- Core arena combat gameplay with up to 10 players
- 3 unique game modes: Battle Royale, Scrapball, and King of the Core
- Basic bot customization and gear system
- Early feedback systems for balancing

Players who have signed up for our newsletter will receive priority access to alpha invitations. If you haven't signed up yet, there's still time!

## What to Expect

The alpha build represents about 60% of our planned features for the final release. You'll be able to experience the core physics-based combat system, test our modular bot customization, and explore our dynamic arenas.

We're particularly excited to get feedback on our unique Scrapball mode and the competitive progression system that will drive long-term engagement.

## How to Participate

Alpha invitations will be sent out via email starting December 1st. The test will run for two weeks, with daily feedback sessions and community discussions on our Discord server.

Thank you for your continued support as we build something truly special together!`,
    excerpt: "The alpha test for Scrap Siege: Arena will begin next month with core arena combat gameplay, 3 unique game modes, and priority access for newsletter subscribers.",
    coverImage: "/news/scrap-siege-alpha.jpg",
    tags: ["Scrap Siege: Arena", "Alpha Test", "Update"],
    author: "Alex Chen",
    publishedAt: "2024-11-15T10:00:00Z",
    updatedAt: "2024-11-15T10:00:00Z",
  },
  {
    id: "2",
    slug: "nextarch-development-update",
    title: "Nextarch Development Update: AI NPC System Milestone",
    content: `We're excited to share a major development milestone for Nextarch! Our AI NPC system has reached a significant breakthrough that brings us closer to our vision of truly living worlds.

## AI NPC Breakthrough

Our team has successfully implemented the core AI memory system that allows NPCs to remember every interaction across sessions. This means:

- NPCs develop persistent relationships with players
- Characters evolve based on their experiences
- The world remembers your actions and responds accordingly
- Multi-language support for all 11 supported languages

## Technical Achievement

This milestone represents over 18 months of development work on our proprietary AI system. The technology allows for:

- Real-time personality evolution
- Cross-session memory persistence
- Dynamic relationship building
- Cultural adaptation beyond simple translation

## What's Next

With the AI foundation in place, we're now focusing on:

- Economic system implementation
- Property ownership mechanics
- Cross-platform account unification
- First realm deployment

We're on track for our Phase 2 goals and can't wait to show you more of what makes Nextarch truly revolutionary.`,
    excerpt: "Major breakthrough in AI NPC system development brings Nextarch closer to its vision of truly living worlds with persistent memory and evolving personalities.",
    coverImage: "/news/nextarch-ai-update.jpg",
    tags: ["Nextarch", "AI Development", "Technical Update"],
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