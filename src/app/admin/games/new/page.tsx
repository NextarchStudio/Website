"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  Save, 
  X, 
  Plus, 
  Trash2,
  GamepadIcon,
  Calendar,
  Tag,
  Link as LinkIcon,
  Upload
} from "lucide-react";
import Link from "next/link";
import AdminLayout from "@/components/admin/AdminLayout";
import { mockAdminUser } from "@/lib/auth";

interface Platform {
  name: string;
  icon: string;
  url?: string;
}

interface FormData {
  title: string;
  slug: string;
  description: string;
  coverImage: string;
  bannerImage: string;
  features: string[];
  platforms: Platform[];
  tags: string[];
  youtubeTrailer: string;
  screenshots: string[];
  isFeatured: boolean;
  releaseDate: string;
  status: string;
  gameModes: { name: string; description: string }[];
  progressionSystem: {
    tiers: string[];
    features: string[];
  };
  systemRequirements: {
    minimum: {
      os: string;
      processor: string;
      memory: string;
      graphics: string;
      directX: string;
      storage: string;
      network: string;
    };
    recommended: {
      os: string;
      processor: string;
      memory: string;
      graphics: string;
      directX: string;
      storage: string;
      network: string;
    };
  };
}

export default function NewGamePage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    title: "",
    slug: "",
    description: "",
    coverImage: "",
    bannerImage: "",
    features: [""],
    platforms: [],
    tags: [""],
    youtubeTrailer: "",
    screenshots: [""],
    isFeatured: false,
    releaseDate: "",
    status: "development",
    gameModes: [{ name: "", description: "" }],
    progressionSystem: {
      tiers: [""],
      features: [""]
    },
    systemRequirements: {
      minimum: {
        os: "",
        processor: "",
        memory: "",
        graphics: "",
        directX: "",
        storage: "",
        network: ""
      },
      recommended: {
        os: "",
        processor: "",
        memory: "",
        graphics: "",
        directX: "",
        storage: "",
        network: ""
      }
    }
  });

  const platformOptions: Platform[] = [
    { name: "Steam", icon: "steam", url: "https://store.steampowered.com" },
    { name: "Epic Games", icon: "epic", url: "https://epicgames.com" },
    { name: "PlayStation 5", icon: "playstation" },
    { name: "Xbox Series X", icon: "xbox" },
    { name: "Nintendo Switch", icon: "nintendo" },
    { name: "macOS", icon: "mac" },
  ];

  const handleInputChange = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleArrayChange = (field: keyof FormData, index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: (prev[field] as string[]).map((item: string, i: number) => 
        i === index ? value : item
      )
    }));
  };

  const addArrayItem = (field: keyof FormData) => {
    setFormData(prev => ({
      ...prev,
      [field]: [...(prev[field] as string[]), ""]
    }));
  };

  const removeArrayItem = (field: keyof FormData, index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: (prev[field] as string[]).filter((_: string, i: number) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Transform form data to match database schema
      const gameData = {
        title: formData.title,
        slug: formData.slug,
        description: formData.description,
        cover_image: formData.coverImage || null,
        banner_image: formData.bannerImage || null,
        features: formData.features.filter(f => f.trim()),
        platforms: formData.platforms,
        tags: formData.tags.filter(t => t.trim()),
        youtube_trailer: formData.youtubeTrailer || null,
        screenshots: formData.screenshots.filter(s => s.trim()),
        is_featured: formData.isFeatured,
        release_date: formData.releaseDate || null,
        status: formData.status,
        game_modes: formData.gameModes,
        progression_system: formData.progressionSystem,
        system_requirements: formData.systemRequirements
      };

      const response = await fetch('/api/games', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(gameData),
      });

      if (!response.ok) {
        throw new Error('Failed to create game');
      }

      // Redirect to games list
      router.push("/admin/games");
    } catch (error) {
      console.error("Error saving game:", error);
      alert('Failed to save game. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AdminLayout user={mockAdminUser}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">Add New Game</h1>
            <p className="text-gray-400">
              Create a new game entry for your portfolio.
            </p>
          </div>
          <Link
            href="/admin/games"
            className="btn-secondary inline-flex items-center space-x-2"
          >
            <X className="h-4 w-4" />
            <span>Cancel</span>
          </Link>
        </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Information */}
        <div className="card p-6">
          <h2 className="text-lg font-semibold mb-6 flex items-center space-x-2">
            <GamepadIcon className="h-5 w-5 text-blue-400" />
            <span>Basic Information</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Game Title *</label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter game title"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Slug *</label>
              <input
                type="text"
                required
                value={formData.slug}
                onChange={(e) => handleInputChange("slug", e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="game-slug"
              />
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2">Description *</label>
              <textarea
                required
                rows={4}
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter game description"
              />
            </div>
          </div>
        </div>

        {/* Media */}
        <div className="card p-6">
          <h2 className="text-lg font-semibold mb-6 flex items-center space-x-2">
            <Upload className="h-5 w-5 text-green-400" />
            <span>Media</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Cover Image URL</label>
              <input
                type="url"
                value={formData.coverImage}
                onChange={(e) => handleInputChange("coverImage", e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="https://example.com/cover.jpg"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Banner Image URL</label>
              <input
                type="url"
                value={formData.bannerImage}
                onChange={(e) => handleInputChange("bannerImage", e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="https://example.com/banner.jpg"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">YouTube Trailer URL</label>
              <input
                type="url"
                value={formData.youtubeTrailer}
                onChange={(e) => handleInputChange("youtubeTrailer", e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="https://youtube.com/watch?v=..."
              />
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="card p-6">
          <h2 className="text-lg font-semibold mb-6 flex items-center space-x-2">
            <Tag className="h-5 w-5 text-purple-400" />
            <span>Features & Tags</span>
          </h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Features</label>
              {formData.features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-2 mb-2">
                  <input
                    type="text"
                    value={feature}
                    onChange={(e) => handleArrayChange("features", index, e.target.value)}
                    className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter feature"
                  />
                  <button
                    type="button"
                    onClick={() => removeArrayItem("features", index)}
                    className="text-red-400 hover:text-red-300"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => addArrayItem("features")}
                className="btn-secondary text-sm inline-flex items-center space-x-2"
              >
                <Plus className="h-4 w-4" />
                <span>Add Feature</span>
              </button>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Tags</label>
              {formData.tags.map((tag, index) => (
                <div key={index} className="flex items-center space-x-2 mb-2">
                  <input
                    type="text"
                    value={tag}
                    onChange={(e) => handleArrayChange("tags", index, e.target.value)}
                    className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter tag"
                  />
                  <button
                    type="button"
                    onClick={() => removeArrayItem("tags", index)}
                    className="text-red-400 hover:text-red-300"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => addArrayItem("tags")}
                className="btn-secondary text-sm inline-flex items-center space-x-2"
              >
                <Plus className="h-4 w-4" />
                <span>Add Tag</span>
              </button>
            </div>
          </div>
        </div>

        {/* Platforms & Status */}
        <div className="card p-6">
          <h2 className="text-lg font-semibold mb-6 flex items-center space-x-2">
            <LinkIcon className="h-5 w-5 text-orange-400" />
            <span>Platforms & Status</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Platforms</label>
              <div className="space-y-2">
                {platformOptions.map((platform) => (
                  <label key={platform.name} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={formData.platforms.some(p => p.name === platform.name)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setFormData(prev => ({
                            ...prev,
                            platforms: [...prev.platforms, platform]
                          }));
                        } else {
                          setFormData(prev => ({
                            ...prev,
                            platforms: prev.platforms.filter(p => p.name !== platform.name)
                          }));
                        }
                      }}
                      className="rounded border-gray-600 bg-gray-800 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm">{platform.name}</span>
                  </label>
                ))}
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => handleInputChange("status", e.target.value)}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="development">Development</option>
                  <option value="alpha">Alpha</option>
                  <option value="beta">Beta</option>
                  <option value="released">Released</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Release Date</label>
                <input
                  type="date"
                  value={formData.releaseDate}
                  onChange={(e) => handleInputChange("releaseDate", e.target.value)}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={formData.isFeatured}
                  onChange={(e) => handleInputChange("isFeatured", e.target.checked)}
                  className="rounded border-gray-600 bg-gray-800 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm">Featured Game</span>
              </label>
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end space-x-4">
          <Link
            href="/admin/games"
            className="btn-secondary inline-flex items-center space-x-2"
          >
            <X className="h-4 w-4" />
            <span>Cancel</span>
          </Link>
          <button
            type="submit"
            disabled={isLoading}
            className="btn-primary inline-flex items-center space-x-2"
          >
            <Save className="h-4 w-4" />
            <span>{isLoading ? "Saving..." : "Save Game"}</span>
          </button>
        </div>
      </form>
    </div>
    </AdminLayout>
  );
} 