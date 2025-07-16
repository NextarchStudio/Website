import Link from "next/link";
import { ArrowRight, Play, ExternalLink, Star, Calendar, Users } from "lucide-react";
import { heroSection, sampleGames, sampleNews, studioInfo } from "@/data/sample";

// Get featured game
const featuredGame = sampleGames.find(game => game.isFeatured) || sampleGames[0];

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Video/Image */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/80 z-10" />
          <div className="absolute inset-0 bg-grid opacity-20" />
          {/* Placeholder for video - in production this would be the actual video */}
          <div className="w-full h-full bg-gradient-to-br from-blue-900 via-purple-900 to-black" />
        </div>

        {/* Hero Content */}
        <div className="relative z-20 text-center max-w-5xl mx-auto px-4">
          <h1 className="heading-xl mb-6 text-shadow-lg animate-fade-in">
            {heroSection.headline}
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed animate-slide-up">
            {heroSection.tagline}
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up">
            {heroSection.ctaButtons.map((button, index) => (
              <Link
                key={index}
                href={button.url}
                target={button.url.startsWith("http") ? "_blank" : undefined}
                rel={button.url.startsWith("http") ? "noopener noreferrer" : undefined}
                className={`${
                  button.variant === "primary" ? "btn-primary" : "btn-secondary"
                } inline-flex items-center space-x-2 text-lg px-8 py-4`}
              >
                <span>{button.text}</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
            ))}
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full animate-pulse mt-2" />
          </div>
        </div>
      </section>

      {/* Featured Game Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="heading-lg mb-4">Featured Game</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Experience our latest creation combining cutting-edge technology with immersive gameplay.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Game Info */}
            <div className="space-y-8">
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <span className="text-sm text-yellow-400 font-medium">FEATURED</span>
                </div>
                <h3 className="heading-md mb-4">{featuredGame.title}</h3>
                <p className="text-lg text-gray-300 leading-relaxed mb-6">
                  {featuredGame.description}
                </p>
              </div>

              {/* Game Features */}
              <div>
                <h4 className="text-xl font-semibold mb-4">Key Features</h4>
                <ul className="space-y-2">
                  {featuredGame.features.map((feature, index) => (
                    <li key={index} className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full" />
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Game Stats */}
              <div className="flex space-x-8">
                <div className="text-center">
                  <Calendar className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                  <div className="text-sm text-gray-400">Release</div>
                  <div className="font-semibold">Dec 2024</div>
                </div>
                <div className="text-center">
                  <Users className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                  <div className="text-sm text-gray-400">Players</div>
                  <div className="font-semibold">100+</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href={`/games/${featuredGame.slug}`}
                  className="btn-primary inline-flex items-center space-x-2"
                >
                  <span>Learn More</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
                {featuredGame.youtubeTrailer && (
                  <Link
                    href={featuredGame.youtubeTrailer}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary inline-flex items-center space-x-2"
                  >
                    <Play className="h-4 w-4" />
                    <span>Watch Trailer</span>
                  </Link>
                )}
              </div>
            </div>

            {/* Game Visual */}
            <div className="relative">
              <div className="aspect-video bg-gradient-to-br from-blue-600 to-purple-700 rounded-xl overflow-hidden shadow-2xl">
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Play className="h-8 w-8 text-white ml-1" />
                    </div>
                    <p className="text-white font-medium">Game Preview</p>
                    <p className="text-white/70 text-sm">{featuredGame.title}</p>
                  </div>
                </div>
              </div>
              
              {/* Floating Tags */}
              <div className="absolute -top-4 -right-4 space-y-2">
                {featuredGame.tags.slice(0, 2).map((tag, index) => (
                  <div
                    key={index}
                    className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {tag}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest News Section */}
      <section className="py-20 px-4 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="heading-lg mb-4">Latest News</h2>
              <p className="text-gray-400">Stay updated with our latest developments and announcements.</p>
            </div>
            <Link
              href="/news"
              className="btn-ghost inline-flex items-center space-x-2"
            >
              <span>View All</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {sampleNews.slice(0, 2).map((article) => (
              <article key={article.id} className="card card-hover p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex space-x-2">
                      {article.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="text-xs bg-blue-600/20 text-blue-400 px-2 py-1 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <span className="text-sm text-gray-400">
                      {new Date(article.publishedAt).toLocaleDateString()}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-semibold hover:text-blue-400 transition-colors">
                    <Link href={`/news/${article.slug}`}>
                      {article.title}
                    </Link>
                  </h3>
                  
                  <p className="text-gray-400 line-clamp-3">
                    {article.excerpt}
                  </p>
                  
                  <Link
                    href={`/news/${article.slug}`}
                    className="inline-flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    <span>Read more</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Community CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-900 to-purple-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="heading-lg mb-6">Join Our Community</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Connect with fellow gamers, get exclusive updates, and be part of shaping the future of our games.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {studioInfo.socialLinks.slice(0, 2).map((social) => (
              <Link
                key={social.platform}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center space-x-2"
              >
                <span>Join {social.platform}</span>
                <ExternalLink className="h-4 w-4" />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
