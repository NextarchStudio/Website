import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, ExternalLink, Play, Star, Users, Clock, Gamepad2 } from "lucide-react";
import { sampleGames, samplePatchNotes } from "@/data/sample";
import { formatDate } from "@/lib/utils";
import type { Platform } from "@/types";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const game = sampleGames.find(g => g.slug === slug);
  
  if (!game) {
    return {
      title: "Game Not Found",
    };
  }

  return {
    title: game.title,
    description: game.description,
    openGraph: {
      title: game.title,
      description: game.description,
      images: [game.coverImage],
    },
  };
}

export async function generateStaticParams() {
  return sampleGames.map((game) => ({
    slug: game.slug,
  }));
}

const statusColors = {
  development: "bg-orange-600/20 text-orange-400 border-orange-600/30",
  beta: "bg-blue-600/20 text-blue-400 border-blue-600/30", 
  alpha: "bg-purple-600/20 text-purple-400 border-purple-600/30",
  released: "bg-green-600/20 text-green-400 border-green-600/30",
};

const statusLabels = {
  development: "In Development",
  beta: "Beta",
  alpha: "Alpha", 
  released: "Released",
};

function PlatformCard({ platform }: { platform: Platform }) {
  return (
    <div className="card p-4 text-center group hover:scale-105 transition-transform">
      <div className="w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:bg-gray-600 transition-colors">
        <span className="text-lg font-bold text-white">
          {platform.name.charAt(0)}
        </span>
      </div>
      <div className="text-sm font-medium mb-2">{platform.name}</div>
      {platform.url ? (
        <Link
          href={platform.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-blue-400 hover:text-blue-300 inline-flex items-center space-x-1"
        >
          <span>Visit Store</span>
          <ExternalLink className="h-3 w-3" />
        </Link>
      ) : (
        <span className="text-xs text-gray-500">Coming Soon</span>
      )}
    </div>
  );
}

function ScreenshotGallery({ screenshots }: { screenshots: string[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {screenshots.map((screenshot, index) => (
        <div key={index} className="aspect-video bg-gradient-to-br from-blue-600 to-purple-700 rounded-lg overflow-hidden group cursor-pointer">
          <div className="w-full h-full flex items-center justify-center group-hover:scale-105 transition-transform">
            <div className="text-center">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-white text-xs font-bold">{index + 1}</span>
              </div>
              <p className="text-white/90 text-sm">Screenshot {index + 1}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function PatchNotesList({ gameId }: { gameId: string }) {
  const patchNotes = samplePatchNotes.filter(patch => patch.gameId === gameId);
  
  if (patchNotes.length === 0) {
    return (
      <div className="text-center py-8">
        <Clock className="h-12 w-12 text-gray-600 mx-auto mb-4" />
        <p className="text-gray-400">No patch notes available yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {patchNotes.map((patch) => (
        <div key={patch.id} className="card p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h4 className="text-lg font-semibold">Version {patch.version}</h4>
              <p className="text-sm text-gray-400">{formatDate(patch.date)}</p>
            </div>
          </div>
          
          <div className="space-y-3">
            {patch.changes.map((change, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                  change.type === 'added' ? 'bg-green-500' :
                  change.type === 'changed' ? 'bg-blue-500' :
                  change.type === 'fixed' ? 'bg-yellow-500' :
                  'bg-red-500'
                }`} />
                <div className="flex-1">
                  <span className={`text-xs font-medium uppercase tracking-wide mr-2 ${
                    change.type === 'added' ? 'text-green-400' :
                    change.type === 'changed' ? 'text-blue-400' :
                    change.type === 'fixed' ? 'text-yellow-400' :
                    'text-red-400'
                  }`}>
                    {change.type}
                  </span>
                  <span className="text-gray-300">{change.description}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default async function GameDetailPage({ params }: Props) {
  const { slug } = await params;
  const game = sampleGames.find(g => g.slug === slug);
  
  if (!game) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-end overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/20 z-10" />
          <div className="w-full h-full bg-gradient-to-br from-blue-900 via-purple-900 to-black" />
        </div>

        {/* Hero Content */}
        <div className="relative z-20 w-full max-w-7xl mx-auto px-4 pb-20">
          {/* Back Button */}
          <div className="mb-8">
            <Link
              href="/games"
              className="inline-flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Games</span>
            </Link>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-end">
            {/* Game Info */}
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium border ${statusColors[game.status]}`}>
                  {statusLabels[game.status]}
                </span>
                {game.isFeatured && (
                  <div className="flex items-center space-x-1 bg-yellow-600/20 text-yellow-400 px-3 py-1 rounded-full text-sm font-medium border border-yellow-600/30">
                    <Star className="h-4 w-4 fill-current" />
                    <span>Featured</span>
                  </div>
                )}
              </div>
              
              <h1 className="heading-xl text-shadow-lg">{game.title}</h1>
              <p className="text-xl text-gray-300 leading-relaxed max-w-2xl">
                {game.description}
              </p>
              
              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {game.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-sm bg-white/10 text-white px-3 py-1 rounded-full border border-white/20"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                {game.youtubeTrailer && (
                  <Link
                    href={game.youtubeTrailer}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary inline-flex items-center space-x-2"
                  >
                    <Play className="h-5 w-5" />
                    <span>Watch Trailer</span>
                  </Link>
                )}
                <Link
                  href="https://discord.gg/nextarch"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary inline-flex items-center space-x-2"
                >
                  <Users className="h-5 w-5" />
                  <span>Join Community</span>
                </Link>
              </div>
            </div>

            {/* Game Stats */}
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center">
                <Calendar className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                <div className="text-sm text-gray-400">Release Date</div>
                <div className="font-semibold">
                  {game.releaseDate ? formatDate(game.releaseDate) : "TBA"}
                </div>
              </div>
              <div className="text-center">
                <Gamepad2 className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                <div className="text-sm text-gray-400">Platforms</div>
                <div className="font-semibold">{game.platforms.length} Platforms</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <div className="max-w-7xl mx-auto px-4 py-20 space-y-20">
        {/* Features Section */}
        <section>
          <h2 className="heading-md mb-8">Key Features</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {game.features.map((feature, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-sm font-bold">{index + 1}</span>
                </div>
                <div>
                  <p className="text-gray-300 leading-relaxed">{feature}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Platforms Section */}
        <section>
          <h2 className="heading-md mb-8">Available Platforms</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {game.platforms.map((platform) => (
              <PlatformCard key={platform.name} platform={platform} />
            ))}
          </div>
        </section>

        {/* Screenshots Section */}
        {game.screenshots.length > 0 && (
          <section>
            <h2 className="heading-md mb-8">Screenshots</h2>
            <ScreenshotGallery screenshots={game.screenshots} />
          </section>
        )}

        {/* YouTube Trailer Section */}
        {game.youtubeTrailer && (
          <section>
            <h2 className="heading-md mb-8">Trailer</h2>
            <div className="aspect-video bg-gray-900 rounded-xl overflow-hidden">
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Play className="h-8 w-8 text-white ml-1" />
                  </div>
                  <p className="text-white font-medium">Video Trailer</p>
                  <p className="text-white/70 text-sm">Click to watch on YouTube</p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Patch Notes Section */}
        <section>
          <h2 className="heading-md mb-8">Patch Notes</h2>
          <PatchNotesList gameId={game.id} />
        </section>

        {/* Related Games Section */}
        <section>
          <h2 className="heading-md mb-8">More Games</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sampleGames
              .filter(g => g.id !== game.id)
              .slice(0, 3)
              .map((relatedGame) => (
                <Link
                  key={relatedGame.id}
                  href={`/games/${relatedGame.slug}`}
                  className="card card-hover p-6 group"
                >
                  <div className="aspect-video bg-gradient-to-br from-blue-600 to-purple-700 rounded-lg mb-4 overflow-hidden">
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                        <Play className="h-4 w-4 text-white ml-0.5" />
                      </div>
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-blue-400 transition-colors">
                    {relatedGame.title}
                  </h3>
                  <p className="text-gray-400 text-sm line-clamp-2">
                    {relatedGame.description}
                  </p>
                </Link>
              ))}
          </div>
        </section>
      </div>
    </div>
  );
}