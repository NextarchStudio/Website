import { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { 
  ArrowLeft,
  Edit,
  GamepadIcon,
  ExternalLink,
  Calendar,
  Tag,
  Star,
  Monitor,
  Youtube,
  Image,
  Activity
} from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import { verifyJWT, AUTH_COOKIE_NAME, mockAdminUser } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Admin - Game Details",
  description: "View game details in the Nextarch Studio admin panel.",
};

// Mock data for demonstration
const mockGame = {
  id: 1,
  title: "Scrap Siege: Arena",
  slug: "scrap-siege-arena",
  description: "A fast-paced multiplayer arena combat game where players battle in destructible environments using scrap-built weapons and vehicles.",
  coverImage: "/images/games/scrap-siege-cover.jpg",
  bannerImage: "/images/games/scrap-siege-banner.jpg",
  features: ["Destructible Environments", "Vehicle Combat", "Weapon Crafting", "Multiplayer Battles"],
  platforms: [
    { name: "PC", icon: Monitor },
    { name: "PlayStation 5", icon: Monitor },
    { name: "Xbox Series X", icon: Monitor }
  ],
  tags: ["multiplayer", "arena", "combat", "destruction"],
  youtubeTrailer: "https://www.youtube.com/watch?v=example",
  screenshots: [
    "/images/games/scrap-siege-1.jpg",
    "/images/games/scrap-siege-2.jpg",
    "/images/games/scrap-siege-3.jpg"
  ],
  isFeatured: true,
  releaseDate: "2024-06-15",
  status: "development",
  gameModes: ["Deathmatch", "Team Deathmatch", "Capture the Flag"],
  progressionSystem: {
    leveling: true,
    unlockables: true,
    customization: true
  },
  systemRequirements: {
    minimum: {
      os: "Windows 10",
      processor: "Intel Core i5-4460",
      memory: "8 GB RAM",
      graphics: "NVIDIA GTX 760",
      storage: "50 GB"
    },
    recommended: {
      os: "Windows 10",
      processor: "Intel Core i7-8700K",
      memory: "16 GB RAM",
      graphics: "NVIDIA GTX 1070",
      storage: "50 GB"
    }
  },
  created_at: "2024-01-01T00:00:00Z",
  updated_at: "2024-01-15T10:30:00Z"
};

const mockActivity = [
  {
    id: 1,
    action: "Game updated",
    details: "Updated description and features",
    timestamp: "2024-01-15T10:30:00Z"
  },
  {
    id: 2,
    action: "Screenshots added",
    details: "Added 3 new screenshots",
    timestamp: "2024-01-14T15:45:00Z"
  },
  {
    id: 3,
    action: "Game created",
    details: "Initial game entry created",
    timestamp: "2024-01-01T00:00:00Z"
  }
];

export default async function GameDetailPage({ params }: { params: { slug: string } }) {
  // Check authentication
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_COOKIE_NAME)?.value;
  
  let user = null;
  if (token) {
    user = verifyJWT(token);
  }

  // For development, use mock user if no token
  if (!user) {
    user = mockAdminUser;
  }

  if (!user || !user.isAdmin) {
    redirect('/admin/login');
  }

  return (
    <AdminLayout user={user}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link
              href="/admin/games"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold mb-2">Game Details</h1>
              <p className="text-gray-400">
                View and manage game information.
              </p>
            </div>
          </div>
          <Link
            href={`/admin/games/${params.slug}/edit`}
            className="btn-primary inline-flex items-center space-x-2"
          >
            <Edit className="h-4 w-4" />
            <span>Edit Game</span>
          </Link>
        </div>

        {/* Game Information */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <div className="card">
              <div className="p-6">
                <h2 className="text-lg font-semibold mb-4 flex items-center space-x-2">
                  <GamepadIcon className="h-5 w-5" />
                  <span>Game Information</span>
                </h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">
                      Game Title
                    </label>
                    <p className="text-white font-medium">{mockGame.title}</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">
                      Description
                    </label>
                    <p className="text-white">{mockGame.description}</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1">
                        Status
                      </label>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        mockGame.status === 'development' ? 'bg-yellow-600/20 text-yellow-400' :
                        mockGame.status === 'released' ? 'bg-green-600/20 text-green-400' :
                        mockGame.status === 'beta' ? 'bg-blue-600/20 text-blue-400' :
                        'bg-gray-600/20 text-gray-400'
                      }`}>
                        {mockGame.status}
                      </span>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1">
                        Release Date
                      </label>
                      <p className="text-white">
                        {mockGame.releaseDate ? new Date(mockGame.releaseDate).toLocaleDateString() : 'TBA'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="card">
              <div className="p-6">
                <h2 className="text-lg font-semibold mb-4">Game Features</h2>
                <div className="flex flex-wrap gap-2">
                  {mockGame.features.map((feature) => (
                    <span
                      key={feature}
                      className="px-3 py-1 bg-blue-600/20 text-blue-400 rounded-full text-sm"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Game Modes */}
            <div className="card">
              <div className="p-6">
                <h2 className="text-lg font-semibold mb-4">Game Modes</h2>
                <div className="flex flex-wrap gap-2">
                  {mockGame.gameModes.map((mode) => (
                    <span
                      key={mode}
                      className="px-3 py-1 bg-green-600/20 text-green-400 rounded-full text-sm"
                    >
                      {mode}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="card">
              <div className="p-6">
                <h2 className="text-lg font-semibold mb-4 flex items-center space-x-2">
                  <Activity className="h-5 w-5" />
                  <span>Recent Activity</span>
                </h2>
                
                <div className="space-y-3">
                  {mockActivity.map((activity) => (
                    <div key={activity.id} className="flex items-start space-x-3 p-3 border border-gray-800 rounded-lg">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                      <div className="flex-1">
                        <p className="font-medium text-sm">{activity.action}</p>
                        <p className="text-sm text-gray-400">{activity.details}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(activity.timestamp).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Game Status */}
            <div className="card">
              <div className="p-6">
                <h3 className="font-semibold mb-4">Game Status</h3>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">Featured</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      mockGame.isFeatured 
                        ? 'bg-purple-600/20 text-purple-400' 
                        : 'bg-gray-600/20 text-gray-400'
                    }`}>
                      {mockGame.isFeatured ? 'Yes' : 'No'}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">Platforms</span>
                    <span className="text-sm text-gray-300">
                      {mockGame.platforms.length}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">Screenshots</span>
                    <span className="text-sm text-gray-300">
                      {mockGame.screenshots.length}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Platforms */}
            <div className="card">
              <div className="p-6">
                <h3 className="font-semibold mb-4">Platforms</h3>
                <div className="space-y-2">
                  {mockGame.platforms.map((platform) => (
                    <div key={platform.name} className="flex items-center space-x-2">
                      <platform.icon className="h-4 w-4 text-gray-400" />
                      <span className="text-sm">{platform.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Tags */}
            <div className="card">
              <div className="p-6">
                <h3 className="font-semibold mb-4">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {mockGame.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-gray-800 rounded-full text-xs text-gray-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="card">
              <div className="p-6">
                <h3 className="font-semibold mb-4">Quick Actions</h3>
                
                <div className="space-y-2">
                  <Link
                    href={`/games/${mockGame.slug}`}
                    target="_blank"
                    className="w-full text-left px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors flex items-center space-x-2"
                  >
                    <ExternalLink className="h-4 w-4" />
                    <span>View on Site</span>
                  </Link>
                  
                  {mockGame.youtubeTrailer && (
                    <Link
                      href={mockGame.youtubeTrailer}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full text-left px-3 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-600/10 rounded-lg transition-colors flex items-center space-x-2"
                    >
                      <Youtube className="h-4 w-4" />
                      <span>View Trailer</span>
                    </Link>
                  )}
                  
                  <button className="w-full text-left px-3 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-600/10 rounded-lg transition-colors">
                    Delete Game
                  </button>
                </div>
              </div>
            </div>

            {/* Game Info */}
            <div className="card">
              <div className="p-6">
                <h3 className="font-semibold mb-4">Game Information</h3>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">Created</span>
                    <span className="text-sm text-gray-300">
                      {new Date(mockGame.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">Last Updated</span>
                    <span className="text-sm text-gray-300">
                      {new Date(mockGame.updated_at).toLocaleDateString()}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">Game ID</span>
                    <span className="text-sm text-gray-300 font-mono">
                      {mockGame.id}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
} 