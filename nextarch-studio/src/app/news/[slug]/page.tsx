import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, User, Tag, Clock } from "lucide-react";
import { sampleNews } from "@/data/sample";
import { formatDate, formatRelativeDate } from "@/lib/utils";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = sampleNews.find(a => a.slug === slug);
  
  if (!article) {
    return {
      title: "Article Not Found",
    };
  }

  return {
    title: article.title,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: [article.coverImage],
    },
  };
}

export async function generateStaticParams() {
  return sampleNews.map((article) => ({
    slug: article.slug,
  }));
}

function ShareButtons({ article }: { article: typeof sampleNews[0] }) {
  const shareUrl = `https://nextarch.studio/news/${article.slug}`;
  const shareText = `Check out "${article.title}" by ${article.author}`;

  const shareButtons = [
    {
      name: "Twitter",
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
      icon: "🐦",
    },
    {
      name: "Facebook", 
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      icon: "📘",
    },
    {
      name: "LinkedIn",
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
      icon: "💼",
    },
  ];

  return (
    <div className="flex items-center space-x-3">
      <span className="text-sm font-medium text-gray-400">Share:</span>
      <div className="flex space-x-2">
        {shareButtons.map((button) => (
          <Link
            key={button.name}
            href={button.url}
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 bg-gray-800 hover:bg-gray-700 rounded-lg flex items-center justify-center transition-colors"
            title={`Share on ${button.name}`}
          >
            <span className="text-sm">{button.icon}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

function ArticleContent({ content }: { content: string }) {
  // Split content by paragraphs and headers
  const sections = content.split('\n\n');
  
  return (
    <div className="prose prose-invert max-w-none">
      {sections.map((section, index) => {
        // Check if it's a header (starts with ##)
        if (section.startsWith('## ')) {
          return (
            <h2 key={index} className="text-2xl font-bold mt-8 mb-4 text-white">
              {section.replace('## ', '')}
            </h2>
          );
        }
        
        // Check if it's a subheader (starts with ###)
        if (section.startsWith('### ')) {
          return (
            <h3 key={index} className="text-xl font-semibold mt-6 mb-3 text-white">
              {section.replace('### ', '')}
            </h3>
          );
        }
        
        // Check if it's a list item (starts with -)
        if (section.includes('\n- ')) {
          const items = section.split('\n- ').filter(item => item.trim());
          return (
            <ul key={index} className="list-disc list-inside space-y-2 my-4 text-gray-300">
              {items.map((item, itemIndex) => (
                <li key={itemIndex} className="leading-relaxed">
                  {item.replace(/^- /, '')}
                </li>
              ))}
            </ul>
          );
        }
        
        // Regular paragraph
        return (
          <p key={index} className="text-gray-300 leading-relaxed mb-6">
            {section}
          </p>
        );
      })}
    </div>
  );
}

function RelatedArticles({ currentSlug }: { currentSlug: string }) {
  const relatedArticles = sampleNews.filter(article => article.slug !== currentSlug).slice(0, 3);
  
  return (
    <div className="space-y-6">
      {relatedArticles.map((article) => (
        <Link
          key={article.id}
          href={`/news/${article.slug}`}
          className="flex space-x-4 p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors group"
        >
          <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-700 rounded-lg flex items-center justify-center flex-shrink-0">
            <span className="text-white text-sm font-bold">N</span>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-medium group-hover:text-blue-400 transition-colors line-clamp-2">
              {article.title}
            </h3>
            <div className="flex items-center space-x-2 mt-2 text-sm text-gray-400">
              <span>{article.author}</span>
              <span>•</span>
              <span>{formatRelativeDate(article.publishedAt)}</span>
            </div>
            <div className="flex space-x-1 mt-2">
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
        </Link>
      ))}
    </div>
  );
}

export default async function NewsArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = sampleNews.find(a => a.slug === slug);
  
  if (!article) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-10"></div>
        <div className="relative max-w-4xl mx-auto">
          {/* Back Button */}
          <div className="mb-8">
            <Link
              href="/news"
              className="inline-flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to News</span>
            </Link>
          </div>

          {/* Article Header */}
          <div className="space-y-6">
            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-sm bg-blue-600/20 text-blue-400 px-3 py-1 rounded-full border border-blue-600/30"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Title */}
            <h1 className="heading-xl text-shadow-lg">
              {article.title}
            </h1>

            {/* Excerpt */}
            <p className="text-xl text-gray-300 leading-relaxed">
              {article.excerpt}
            </p>

            {/* Meta Information */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-6 border-t border-white/10">
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <User className="h-5 w-5 text-gray-400" />
                  <span className="font-medium">{article.author}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5 text-gray-400" />
                  <span className="text-gray-400">{formatDate(article.publishedAt)}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-gray-400" />
                  <span className="text-gray-400">5 min read</span>
                </div>
              </div>
              
              <ShareButtons article={article} />
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Featured Image */}
          <div className="aspect-video bg-gradient-to-br from-blue-600 to-purple-700 rounded-xl mb-12 overflow-hidden">
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl font-bold">N</span>
                </div>
                <p className="text-white font-medium">Article Cover</p>
                <p className="text-white/70 text-sm">{article.title}</p>
              </div>
            </div>
          </div>

          {/* Article Body */}
          <ArticleContent content={article.content} />

          {/* Article Footer */}
          <div className="mt-16 pt-8 border-t border-white/10">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="text-sm text-gray-400">
                Last updated: {formatDate(article.updatedAt)}
              </div>
              <ShareButtons article={article} />
            </div>
          </div>
        </div>
      </section>

      {/* Related Articles */}
      <section className="py-20 px-4 bg-gray-900">
        <div className="max-w-4xl mx-auto">
          <h2 className="heading-md mb-8">Related Articles</h2>
          <RelatedArticles currentSlug={article.slug} />
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-900 to-purple-900">
        <div className="max-w-4xl mx-auto text-center">
          <Tag className="h-12 w-12 text-blue-400 mx-auto mb-6" />
          <h2 className="heading-lg mb-6">Stay in the Loop</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Get the latest news and updates delivered straight to your inbox. 
            No spam, just quality content about our games and development process.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button className="btn-primary px-6 py-3 whitespace-nowrap">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}