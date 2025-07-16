export interface StudioInfo {
  name: string;
  logo: string;
  domain: string;
  mission: string;
  socialLinks: SocialLink[];
  theme: ThemeConfig;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

export interface ThemeConfig {
  mode: 'light' | 'dark';
  accentColor: string;
}

export interface Game {
  id: string;
  slug: string;
  title: string;
  description: string;
  coverImage: string;
  bannerImage: string;
  features: string[];
  platforms: Platform[];
  tags: string[];
  youtubeTrailer?: string;
  screenshots: string[];
  isFeatured: boolean;
  releaseDate?: string;
  status: 'development' | 'released' | 'beta' | 'alpha';
  gameModes?: GameMode[];
  progressionSystem?: ProgressionSystem;
  systemRequirements?: SystemRequirements;
  technicalArchitecture?: TechnicalArchitecture;
  coreSystems?: CoreSystem[];
  realmTypes?: string[];
  monetizationModel?: MonetizationModel;
}

export interface Platform {
  name: string;
  icon: string;
  url?: string;
}

export interface GameMode {
  name: string;
  description: string;
}

export interface ProgressionSystem {
  tiers: string[];
  features: string[];
}

export interface SystemRequirements {
  minimum: SystemSpec;
  recommended: SystemSpec;
}

export interface SystemSpec {
  os: string;
  processor: string;
  memory: string;
  graphics: string;
  directX: string;
  storage: string;
  network: string;
}

export interface TechnicalArchitecture {
  engine: string;
  platforms: string[];
  keyTechnologies: string[];
}

export interface CoreSystem {
  name: string;
  description: string;
}

export interface MonetizationModel {
  subscriptionTiers: SubscriptionTier[];
  cosmeticPurchases: string[];
}

export interface SubscriptionTier {
  name: string;
  price: string;
  features: string[];
}

export interface NewsArticle {
  id: string;
  slug: string;
  title: string;
  content: string;
  excerpt: string;
  coverImage: string;
  tags: string[];
  author: string;
  publishedAt: string;
  updatedAt: string;
}

export interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  type: 'full-time' | 'part-time' | 'contract' | 'internship';
  description: string;
  requirements: string[];
  responsibilities: string[];
  isRemote: boolean;
  postedAt: string;
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  message: string;
  submittedAt: string;
  status: 'new' | 'read' | 'replied';
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  avatar: string;
  socialLinks: SocialLink[];
}

export interface Milestone {
  id: string;
  title: string;
  description: string;
  date: string;
  image?: string;
}

export interface PatchNote {
  id: string;
  version: string;
  gameId: string;
  date: string;
  changes: PatchChange[];
}

export interface PatchChange {
  type: 'added' | 'changed' | 'fixed' | 'removed';
  description: string;
}

export interface User {
  id: string;
  discordId: string;
  username: string;
  discriminator: string;
  avatar: string;
  roles: string[];
  isAdmin: boolean;
}

export interface HeroSection {
  headline: string;
  tagline: string;
  backgroundMedia: {
    type: 'image' | 'video';
    url: string;
  };
  ctaButtons: CTAButton[];
}

export interface CTAButton {
  text: string;
  url: string;
  variant: 'primary' | 'secondary';
}

export interface NewsletterModal {
  title: string;
  description: string;
  isEnabled: boolean;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}