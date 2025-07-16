import { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { 
  Plus, 
  Edit, 
  Eye, 
  Trash2, 
  GamepadIcon,
  ExternalLink,
  Calendar,
  Tag
} from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import { verifyJWT, AUTH_COOKIE_NAME, mockAdminUser } from "@/lib/auth";
import { sampleGames } from "@/data/sample";

export const metadata: Metadata = {
  title: "Admin - Games",
  description: "Manage games in the Nextarch Studio admin panel.",
};

export default async function AdminGamesPage() {
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
          <div>
            <h1 className="text-2xl font-bold mb-2">Games Management</h1>
            <p className="text-gray-400">
              Manage your studio's game portfolio and content.
            </p>
          </div>
          <Link
            href="/admin/games/new"
            className="btn-primary inline-flex items-center space-x-2"
          >
            <Plus className="h-4 w-4" />
            <span>Add New Game</span>
          </Link>
        </div>

        {/* Games Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sampleGames.map((game) => (
            <div key={game.id} className="card p-6 hover:bg-white/10 transition-colors">
              {/* Game Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-700 rounded-lg flex items-center justify-center">
                    <GamepadIcon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{game.title}</h3>
                    <div className="flex items-center space-x-2 text-sm text-gray-400">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        game.status === 'development' ? 'bg-yellow-600/20 text-yellow-400' :
                        game.status === 'released' ? 'bg-green-600/20 text-green-400' :
                        game.status === 'beta' ? 'bg-blue-600/20 text-blue-400' :
                        'bg-gray-600/20 text-gray-400'
                      }`}>
                        {game.status}
                      </span>
                      {game.isFeatured && (
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-purple-600/20 text-purple-400">
                          Featured
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Game Description */}
              <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                {game.description}
              </p>

              {/* Game Details */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center space-x-2 text-sm text-gray-400">
                  <Calendar className="h-4 w-4" />
                  <span>
                    {game.releaseDate ? new Date(game.releaseDate).toLocaleDateString() : 'TBA'}
                  </span>
                </div>
                
                <div className="flex items-center space-x-2 text-sm text-gray-400">
                  <Tag className="h-4 w-4" />
                  <span>{game.platforms.length} platforms</span>
                </div>

                <div className="flex flex-wrap gap-1">
                  {game.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-gray-800 rounded-full text-xs text-gray-300"
                    >
                      {tag}
                    </span>
                  ))}
                  {game.tags.length > 3 && (
                    <span className="px-2 py-1 bg-gray-800 rounded-full text-xs text-gray-400">
                      +{game.tags.length - 3}
                    </span>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-800">
                <div className="flex items-center space-x-2">
                  <Link
                    href={`/games/${game.slug}`}
                    target="_blank"
                    className="text-gray-400 hover:text-white transition-colors"
                    title="View on site"
                  >
                    <Eye className="h-4 w-4" />
                  </Link>
                  <Link
                    href={`/admin/games/${game.slug}/edit`}
                    className="text-blue-400 hover:text-blue-300 transition-colors"
                    title="Edit game"
                  >
                    <Edit className="h-4 w-4" />
                  </Link>
                </div>
                
                <div className="flex items-center space-x-2">
                  {game.youtubeTrailer && (
                    <Link
                      href={game.youtubeTrailer}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-red-400 hover:text-red-300 transition-colors"
                      title="View trailer"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Link>
                  )}
                  <button
                    className="text-red-400 hover:text-red-300 transition-colors"
                    title="Delete game"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {sampleGames.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-800 rounded-lg flex items-center justify-center mx-auto mb-4">
              <GamepadIcon className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No games yet</h3>
            <p className="text-gray-400 mb-6">
              Get started by adding your first game to the portfolio.
            </p>
            <Link
              href="/admin/games/new"
              className="btn-primary inline-flex items-center space-x-2"
            >
              <Plus className="h-4 w-4" />
              <span>Add Your First Game</span>
            </Link>
          </div>
        )}
      </div>
    </AdminLayout>
  );
} 