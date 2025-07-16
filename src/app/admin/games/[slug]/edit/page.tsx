import { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { 
  ArrowLeft,
  Save,
  GamepadIcon,
  Upload,
  Youtube,
  Tag,
  Calendar,
  Star,
  Monitor,
  Smartphone,
  Globe
} from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import { verifyJWT, AUTH_COOKIE_NAME, mockAdminUser } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Admin - Edit Game",
  description: "Edit game information in the Nextarch Studio admin panel.",
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
  }
};

const availablePlatforms = [
  { name: "PC", icon: Monitor },
  { name: "PlayStation 5", icon: Monitor },
  { name: "PlayStation 4", icon: Monitor },
  { name: "Xbox Series X", icon: Monitor },
  { name: "Xbox One", icon: Monitor },
  { name: "Nintendo Switch", icon: Smartphone },
  { name: "Mobile", icon: Smartphone },
  { name: "Web", icon: Globe }
];

const gameStatuses = [
  { value: "concept", label: "Concept" },
  { value: "development", label: "Development" },
  { value: "alpha", label: "Alpha" },
  { value: "beta", label: "Beta" },
  { value: "released", label: "Released" },
  { value: "discontinued", label: "Discontinued" }
];

export default async function EditGamePage({ params }: { params: { slug: string } }) {
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
              <h1 className="text-2xl font-bold mb-2">Edit Game</h1>
              <p className="text-gray-400">
                Update game information and content.
              </p>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="card">
          <div className="p-6">
            <form className="space-y-6">
              {/* Basic Information */}
              <div>
                <h2 className="text-lg font-semibold mb-4 flex items-center space-x-2">
                  <GamepadIcon className="h-5 w-5" />
                  <span>Basic Information</span>
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="title" className="block text-sm font-medium mb-2">
                      Game Title *
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      defaultValue={mockGame.title}
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="slug" className="block text-sm font-medium mb-2">
                      URL Slug *
                    </label>
                    <input
                      type="text"
                      id="slug"
                      name="slug"
                      defaultValue={mockGame.slug}
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="game-title"
                      required
                    />
                  </div>
                </div>
                
                <div className="mt-4">
                  <label htmlFor="description" className="block text-sm font-medium mb-2">
                    Description *
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    rows={4}
                    defaultValue={mockGame.description}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              {/* Media */}
              <div>
                <h2 className="text-lg font-semibold mb-4 flex items-center space-x-2">
                  <Upload className="h-5 w-5" />
                  <span>Media & Assets</span>
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="coverImage" className="block text-sm font-medium mb-2">
                      Cover Image URL
                    </label>
                    <input
                      type="url"
                      id="coverImage"
                      name="coverImage"
                      defaultValue={mockGame.coverImage}
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="https://example.com/cover.jpg"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="bannerImage" className="block text-sm font-medium mb-2">
                      Banner Image URL
                    </label>
                    <input
                      type="url"
                      id="bannerImage"
                      name="bannerImage"
                      defaultValue={mockGame.bannerImage}
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="https://example.com/banner.jpg"
                    />
                  </div>
                </div>
                
                <div className="mt-4">
                  <label htmlFor="youtubeTrailer" className="block text-sm font-medium mb-2">
                    YouTube Trailer URL
                  </label>
                  <div className="relative">
                    <Youtube className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="url"
                      id="youtubeTrailer"
                      name="youtubeTrailer"
                      defaultValue={mockGame.youtubeTrailer}
                      className="w-full pl-10 pr-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="https://www.youtube.com/watch?v=..."
                    />
                  </div>
                </div>
              </div>

              {/* Game Details */}
              <div>
                <h2 className="text-lg font-semibold mb-4 flex items-center space-x-2">
                  <Tag className="h-5 w-5" />
                  <span>Game Details</span>
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="status" className="block text-sm font-medium mb-2">
                      Development Status
                    </label>
                    <select
                      id="status"
                      name="status"
                      defaultValue={mockGame.status}
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      {gameStatuses.map((status) => (
                        <option key={status.value} value={status.value}>
                          {status.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="releaseDate" className="block text-sm font-medium mb-2">
                      Release Date
                    </label>
                    <input
                      type="date"
                      id="releaseDate"
                      name="releaseDate"
                      defaultValue={mockGame.releaseDate}
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
                
                <div className="mt-4">
                  <label className="block text-sm font-medium mb-2">
                    Platforms
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {availablePlatforms.map((platform) => (
                      <div key={platform.name} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id={`platform-${platform.name}`}
                          name="platforms"
                          value={platform.name}
                          defaultChecked={mockGame.platforms.some(p => p.name === platform.name)}
                          className="rounded"
                        />
                        <label htmlFor={`platform-${platform.name}`} className="text-sm cursor-pointer">
                          {platform.name}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="mt-4">
                  <label htmlFor="tags" className="block text-sm font-medium mb-2">
                    Tags (comma-separated)
                  </label>
                  <input
                    type="text"
                    id="tags"
                    name="tags"
                    defaultValue={mockGame.tags.join(', ')}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="multiplayer, arena, combat"
                  />
                </div>
              </div>

              {/* Features */}
              <div>
                <h2 className="text-lg font-semibold mb-4">Game Features</h2>
                <div className="space-y-3">
                  {mockGame.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <input
                        type="text"
                        name={`features[${index}]`}
                        defaultValue={feature}
                        className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter feature"
                      />
                      <button
                        type="button"
                        className="text-red-400 hover:text-red-300"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    className="text-blue-400 hover:text-blue-300 text-sm"
                  >
                    + Add Feature
                  </button>
                </div>
              </div>

              {/* Game Modes */}
              <div>
                <h2 className="text-lg font-semibold mb-4">Game Modes</h2>
                <div className="space-y-3">
                  {mockGame.gameModes.map((mode, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <input
                        type="text"
                        name={`gameModes[${index}]`}
                        defaultValue={mode}
                        className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter game mode"
                      />
                      <button
                        type="button"
                        className="text-red-400 hover:text-red-300"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    className="text-blue-400 hover:text-blue-300 text-sm"
                  >
                    + Add Game Mode
                  </button>
                </div>
              </div>

              {/* Settings */}
              <div>
                <h2 className="text-lg font-semibold mb-4 flex items-center space-x-2">
                  <Star className="h-5 w-5" />
                  <span>Settings</span>
                </h2>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="isFeatured"
                      name="isFeatured"
                      defaultChecked={mockGame.isFeatured}
                      className="rounded"
                    />
                    <label htmlFor="isFeatured" className="text-sm">
                      Featured Game
                    </label>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-6 border-t border-gray-800">
                <Link
                  href="/admin/games"
                  className="btn-secondary"
                >
                  Cancel
                </Link>
                
                <div className="flex items-center space-x-3">
                  <button
                    type="button"
                    className="btn-secondary"
                  >
                    Reset Changes
                  </button>
                  <button
                    type="submit"
                    className="btn-primary inline-flex items-center space-x-2"
                  >
                    <Save className="h-4 w-4" />
                    <span>Save Changes</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
} 