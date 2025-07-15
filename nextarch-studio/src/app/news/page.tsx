import { Metadata } from "next";
import Link from "next/link";
import { Calendar, User, ArrowRight, Tag, Clock, Search } from "lucide-react";
import { sampleNews } from "@/data/sample";
import { formatDate, formatRelativeDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "News",
  description: "Stay updated with the latest news, development updates, and announcements from Nextarch Studio.",
};

// Get unique tags for filtering
const allTags = Array.from(new Set(sampleNews.flatMap(article => article.tags))).sort();

function ArticleCard({ article, featured = false }: { article: typeof sampleNews[0]; featured?: boolean }) {
  return (
    <article className={`card card-hover group ${featured ? 'md:col-span-2 lg:col-span-2' : ''}`}>
      {/* Featured Article Layout */}
      {featured ? (
        <div className="md:flex">
          {/* Image */}
          <div className="md:w-1/2 aspect-video md:aspect-auto bg-gradient-to-br from-blue-600 to-purple-700 flex items-center justify-center">
            <div className="text-center">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-white font-bold">N</span>
              </div>
              <p className="text-white/90 text-sm">Featured Article</p>
            </div>
          </div>
          
          {/* Content */}
          <div className="md:w-1/2 p-6 md:p-8 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
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
                <span className="text-xs bg-yellow-600/20 text-yellow-400 px-2 py-1 rounded-full font-medium">
                  FEATURED
                </span>
              </div>
            </div>
            
            <h2 className="text-2xl font-bold mb-4 group-hover:text-blue-400 transition-colors">
              <Link href={`/news/${article.slug}`}>
                {article.title}
              </Link>
            </h2>
            
            <p className="text-gray-400 mb-6 line-clamp-3 flex-1">
              {article.excerpt}
            </p>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                  <User className="h-4 w-4" />
                  <span>{article.author}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <span>{formatDate(article.publishedAt)}</span>
                </div>
              </div>
              
              <Link
                href={`/news/${article.slug}`}
                className="inline-flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors font-medium"
              >
                <span>Read More</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      ) : (
        /* Regular Article Layout */
        <div className="p-6">
          {/* Image */}
          <div className="aspect-video bg-gradient-to-br from-blue-600 to-purple-700 rounded-lg mb-4 flex items-center justify-center">
            <div className="text-center">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-white text-sm font-bold">N</span>
              </div>
              <p className="text-white/90 text-xs">Article</p>
            </div>
          </div>
          
          {/* Content */}
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
              <span className="text-xs text-gray-500">
                {formatRelativeDate(article.publishedAt)}
              </span>
            </div>
            
            <h3 className="text-xl font-semibold group-hover:text-blue-400 transition-colors">
              <Link href={`/news/${article.slug}`}>
                {article.title}
              </Link>
            </h3>
            
            <p className="text-gray-400 text-sm line-clamp-3">
              {article.excerpt}
            </p>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-1 text-xs text-gray-500">
                <User className="h-3 w-3" />
                <span>{article.author}</span>
              </div>
              
              <Link
                href={`/news/${article.slug}`}
                className="inline-flex items-center space-x-1 text-blue-400 hover:text-blue-300 transition-colors text-sm"
              >
                <span>Read</span>
                <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </article>
  );
}

function NewsletterSignup() {
  return (
    <div className="card p-8 text-center bg-gradient-to-br from-blue-900/20 to-purple-900/20 border-blue-500/30">
      <div className="w-16 h-16 bg-blue-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
        <Tag className="h-8 w-8 text-blue-400" />
      </div>
      <h3 className="text-xl font-semibold mb-4">Stay Updated</h3>
      <p className="text-gray-400 mb-6">
        Get the latest news, development updates, and exclusive content delivered to your inbox.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
        <input
          type="email"
          placeholder="Enter your email"
          className="flex-1 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button className="btn-primary px-6 py-2">
          Subscribe
        </button>
      </div>
    </div>
  );
}

export default function NewsPage() {
  const featuredArticle = sampleNews[0]; // First article is featured
  const regularArticles = sampleNews.slice(1);

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="heading-xl mb-6">Latest News</h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Stay up to date with development progress, game announcements, 
            and behind-the-scenes insights from our team.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-12 space-y-6">
          {/* Search Bar */}
          <div className="max-w-md mx-auto relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search articles..."
              className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Tags Filter */}
          <div className="flex flex-wrap justify-center gap-2">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium">
              All
            </button>
            {allTags.map((tag) => (
              <button
                key={tag}
                className="px-4 py-2 bg-gray-800 text-gray-300 hover:bg-gray-700 rounded-lg text-sm font-medium transition-colors"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Article */}
        {featuredArticle && (
          <div className="mb-16">
            <div className="flex items-center space-x-2 mb-6">
              <Tag className="h-5 w-5 text-blue-400" />
              <span className="text-sm font-medium text-blue-400">FEATURED</span>
            </div>
            <ArticleCard article={featuredArticle} featured />
          </div>
        )}

        {/* Regular Articles Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {regularArticles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>

        {/* Newsletter Signup */}
        <div className="mb-16">
          <NewsletterSignup />
        </div>

        {/* Load More */}
        <div className="text-center">
          <button className="btn-secondary inline-flex items-center space-x-2">
            <span>Load More Articles</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        {/* Recent Activity */}
        <div className="mt-20">
          <h2 className="heading-md mb-8">Recent Activity</h2>
          <div className="space-y-4">
            {sampleNews.slice(0, 5).map((article) => (
              <div key={article.id} className="flex items-center space-x-4 p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors group">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-700 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Clock className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium group-hover:text-blue-400 transition-colors truncate">
                    <Link href={`/news/${article.slug}`}>
                      {article.title}
                    </Link>
                  </h3>
                  <div className="flex items-center space-x-2 text-sm text-gray-400">
                    <span>{article.author}</span>
                    <span>•</span>
                    <span>{formatRelativeDate(article.publishedAt)}</span>
                  </div>
                </div>
                <div className="flex space-x-1">
                  {article.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="text-xs bg-blue-600/20 text-blue-400 px-2 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}