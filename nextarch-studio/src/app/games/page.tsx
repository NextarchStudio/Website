import { Metadata } from "next";
import Link from "next/link";
import { Calendar, ExternalLink, Play, Star, Users } from "lucide-react";
import { sampleGames } from "@/data/sample";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Games",
  description: "Explore our collection of innovative games that push the boundaries of interactive entertainment.",
};

// Get unique tags and statuses for filtering
const allTags = Array.from(new Set(sampleGames.flatMap(game => game.tags))).sort();
const allStatuses = Array.from(new Set(sampleGames.map(game => game.status))).sort();

const statusColors = {
  development: "bg-orange-600/20 text-orange-400",
  beta: "bg-blue-600/20 text-blue-400", 
  alpha: "bg-purple-600/20 text-purple-400",
  released: "bg-green-600/20 text-green-400",
};

const statusLabels = {
  development: "In Development",
  beta: "Beta",
  alpha: "Alpha", 
  released: "Released",
};

function GameCard({ game }: { game: typeof sampleGames[0] }) {
  return (
    <div className="card card-hover group overflow-hidden">
      {/* Game Cover */}
      <div className="relative aspect-video bg-gradient-to-br from-blue-600 to-purple-700 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2">
              <Play className="h-6 w-6 text-white ml-0.5" />
            </div>
            <p className="text-white/90 text-sm">{game.title}</p>
          </div>
        </div>
        
        {/* Status Badge */}
        <div className="absolute top-4 left-4">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[game.status]}`}>
            {statusLabels[game.status]}
          </span>
        </div>
        
        {/* Featured Badge */}
        {game.isFeatured && (
          <div className="absolute top-4 right-4">
            <div className="flex items-center space-x-1 bg-yellow-600/20 text-yellow-400 px-2 py-1 rounded-full text-xs font-medium">
              <Star className="h-3 w-3 fill-current" />
              <span>Featured</span>
            </div>
          </div>
        )}
        
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="flex justify-center space-x-2">
              <Link
                href={`/games/${game.slug}`}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
              >
                Learn More
              </Link>
              {game.youtubeTrailer && (
                <Link
                  href={game.youtubeTrailer}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/20 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-white/30 transition-colors"
                >
                  <Play className="h-4 w-4" />
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Game Info */}
      <div className="p-6 space-y-4">
        <div>
          <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-400 transition-colors">
            <Link href={`/games/${game.slug}`}>
              {game.title}
            </Link>
          </h3>
          <p className="text-gray-400 text-sm line-clamp-2">
            {game.description}
          </p>
        </div>
        
        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {game.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
          {game.tags.length > 3 && (
            <span className="text-xs text-gray-500">
              +{game.tags.length - 3} more
            </span>
          )}
        </div>
        
        {/* Platforms */}
        <div className="flex items-center justify-between">
          <div className="flex space-x-1">
            {game.platforms.slice(0, 4).map((platform) => (
              <div
                key={platform.name}
                className="w-6 h-6 bg-gray-700 rounded flex items-center justify-center text-xs font-bold text-gray-300"
                title={platform.name}
              >
                {platform.name.charAt(0)}
              </div>
            ))}
            {game.platforms.length > 4 && (
              <div className="w-6 h-6 bg-gray-700 rounded flex items-center justify-center text-xs text-gray-500">
                +{game.platforms.length - 4}
              </div>
            )}
          </div>
          
          {game.releaseDate && (
            <div className="flex items-center space-x-1 text-xs text-gray-400">
              <Calendar className="h-3 w-3" />
              <span>{formatDate(game.releaseDate)}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function GamesPage() {
  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="heading-xl mb-6">Our Games</h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Discover our collection of innovative games that combine cutting-edge technology 
            with immersive storytelling and engaging gameplay mechanics.
          </p>
        </div>
        
        {/* Filter Section */}
        <div className="mb-12 p-6 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl">
          <div className="space-y-6">
            {/* Status Filter */}
            <div>
              <h3 className="text-sm font-medium text-gray-300 mb-3">Status</h3>
              <div className="flex flex-wrap gap-2">
                <button className="btn-ghost px-3 py-1 text-sm">All</button>
                {allStatuses.map((status) => (
                  <button
                    key={status}
                    className="px-3 py-1 text-sm rounded-lg bg-gray-800 text-gray-300 hover:bg-gray-700 transition-colors"
                  >
                    {statusLabels[status as keyof typeof statusLabels]}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Tags Filter */}
            <div>
              <h3 className="text-sm font-medium text-gray-300 mb-3">Tags</h3>
              <div className="flex flex-wrap gap-2">
                <button className="btn-ghost px-3 py-1 text-sm">All Tags</button>
                {allTags.slice(0, 8).map((tag) => (
                  <button
                    key={tag}
                    className="px-3 py-1 text-sm rounded-lg bg-gray-800 text-gray-300 hover:bg-gray-700 transition-colors"
                  >
                    {tag}
                  </button>
                ))}
                {allTags.length > 8 && (
                  <span className="text-sm text-gray-500 px-3 py-1">
                    +{allTags.length - 8} more
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Games Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sampleGames.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
        
        {/* Empty State (when filters are applied and no games match) */}
        {sampleGames.length === 0 && (
          <div className="text-center py-20">
            <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="h-8 w-8 text-gray-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No games found</h3>
            <p className="text-gray-400 mb-6">
              Try adjusting your filters or check back later for new releases.
            </p>
            <button className="btn-primary">
              Clear Filters
            </button>
          </div>
        )}
        
        {/* Call to Action */}
        <div className="mt-20 text-center">
          <h2 className="heading-md mb-6">Stay Updated</h2>
          <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">
            Be the first to know about new game announcements, beta releases, and exclusive content.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="https://discord.gg/nextarch"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center space-x-2"
            >
              <span>Join Discord</span>
              <ExternalLink className="h-4 w-4" />
            </Link>
            <Link
              href="/news"
              className="btn-secondary inline-flex items-center space-x-2"
            >
              <span>Read News</span>
              <ExternalLink className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}