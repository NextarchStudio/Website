"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { 
  Edit, 
  Trash2, 
  ArrowLeft,
  Newspaper,
  Calendar,
  User,
  Tag,
  FileText,
  Loader2,
  Eye,
  EyeOff
} from "lucide-react";
import Link from "next/link";
import AdminLayout from "@/components/admin/AdminLayout";
import { mockAdminUser } from "@/lib/auth";

interface NewsArticle {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  cover_image: string | null;
  tags: string[];
  author: string;
  published_at: string | null;
  status: string;
  created_at: string;
  updated_at: string;
}

export default function NewsDetailPage() {
  const router = useRouter();
  const params = useParams();
  const slug = params.slug as string;
  
  const [article, setArticle] = useState<NewsArticle | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);

  // Fetch news article data
  useEffect(() => {
    const fetchNewsArticle = async () => {
      try {
        const response = await fetch(`/api/news/${slug}`);
        if (!response.ok) {
          throw new Error('Failed to fetch news article');
        }
        const data = await response.json();
        setArticle(data);
      } catch (error) {
        console.error("Error fetching news article:", error);
        alert('Failed to load news article. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    if (slug) {
      fetchNewsArticle();
    }
  }, [slug]);

  const handleDelete = async () => {
    if (!article || !confirm('Are you sure you want to delete this article? This action cannot be undone.')) {
      return;
    }

    setIsDeleting(true);
    try {
      const response = await fetch(`/api/news/${slug}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete news article');
      }

      router.push("/admin/news");
    } catch (error) {
      console.error("Error deleting news article:", error);
      alert('Failed to delete news article. Please try again.');
    } finally {
      setIsDeleting(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      draft: { color: "bg-gray-500", text: "Draft" },
      published: { color: "bg-green-500", text: "Published" },
      archived: { color: "bg-yellow-500", text: "Archived" }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.draft;
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color} text-white`}>
        {config.text}
      </span>
    );
  };

  if (isLoading) {
    return (
      <AdminLayout user={mockAdminUser}>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="flex items-center space-x-2">
            <Loader2 className="h-6 w-6 animate-spin" />
            <span>Loading article...</span>
          </div>
        </div>
      </AdminLayout>
    );
  }

  if (!article) {
    return (
      <AdminLayout user={mockAdminUser}>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <h2 className="text-xl font-semibold mb-2">Article Not Found</h2>
            <p className="text-gray-400 mb-4">The article you're looking for doesn't exist.</p>
            <Link href="/admin/news" className="btn-primary">
              Back to News
            </Link>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout user={mockAdminUser}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link
              href="/admin/news"
              className="btn-secondary inline-flex items-center space-x-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to News</span>
            </Link>
            <div>
              <h1 className="text-2xl font-bold mb-2">{article.title}</h1>
              <div className="flex items-center space-x-4 text-sm text-gray-400">
                <span>By {article.author}</span>
                {article.published_at && (
                  <span>• {new Date(article.published_at).toLocaleDateString()}</span>
                )}
                <span>• {getStatusBadge(article.status)}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Link
              href={`/admin/news/${slug}/edit`}
              className="btn-primary inline-flex items-center space-x-2"
            >
              <Edit className="h-4 w-4" />
              <span>Edit</span>
            </Link>
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="btn-danger inline-flex items-center space-x-2"
            >
              {isDeleting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Trash2 className="h-4 w-4" />
              )}
              <span>{isDeleting ? "Deleting..." : "Delete"}</span>
            </button>
          </div>
        </div>

        {/* Article Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Cover Image */}
            {article.cover_image && (
              <div className="card p-0 overflow-hidden">
                <img
                  src={article.cover_image}
                  alt={article.title}
                  className="w-full h-64 object-cover"
                />
              </div>
            )}

            {/* Article Information */}
            <div className="card p-6">
              <h2 className="text-lg font-semibold mb-6 flex items-center space-x-2">
                <Newspaper className="h-5 w-5 text-blue-400" />
                <span>Article Information</span>
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Title</label>
                  <p className="text-white">{article.title}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Slug</label>
                  <p className="text-white font-mono">{article.slug}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Author</label>
                  <p className="text-white">{article.author}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Status</label>
                  <div>{getStatusBadge(article.status)}</div>
                </div>
                
                {article.published_at && (
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Published Date</label>
                    <p className="text-white">{new Date(article.published_at).toLocaleDateString()}</p>
                  </div>
                )}
                
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Excerpt</label>
                  <p className="text-white">{article.excerpt}</p>
                </div>
              </div>
            </div>

            {/* Article Content */}
            <div className="card p-6">
              <h2 className="text-lg font-semibold mb-6 flex items-center space-x-2">
                <FileText className="h-5 w-5 text-green-400" />
                <span>Content</span>
              </h2>
              
              <div className="prose prose-invert max-w-none">
                <div className="whitespace-pre-wrap text-white">{article.content}</div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Tags */}
            {article.tags && article.tags.length > 0 && (
              <div className="card p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
                  <Tag className="h-5 w-5 text-purple-400" />
                  <span>Tags</span>
                </h3>
                <div className="flex flex-wrap gap-2">
                  {article.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-purple-500/20 text-purple-300 border border-purple-500/30"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Metadata */}
            <div className="card p-6">
              <h3 className="text-lg font-semibold mb-4">Metadata</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <span className="text-gray-400">Created:</span>
                  <p className="text-white">{new Date(article.created_at).toLocaleDateString()}</p>
                </div>
                <div>
                  <span className="text-gray-400">Last Updated:</span>
                  <p className="text-white">{new Date(article.updated_at).toLocaleDateString()}</p>
                </div>
                <div>
                  <span className="text-gray-400">ID:</span>
                  <p className="text-white font-mono">{article.id}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
} 