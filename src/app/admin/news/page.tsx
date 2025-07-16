import { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { 
  Plus, 
  Edit, 
  Eye, 
  Trash2, 
  Newspaper,
  Calendar,
  User,
  Tag
} from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import { verifyJWT, AUTH_COOKIE_NAME, mockAdminUser } from "@/lib/auth";
import { sampleNews } from "@/data/sample";

export const metadata: Metadata = {
  title: "Admin - News",
  description: "Manage news articles in the Nextarch Studio admin panel.",
};

export default async function AdminNewsPage() {
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
            <h1 className="text-2xl font-bold mb-2">News Management</h1>
            <p className="text-gray-400">
              Manage your studio's news articles and announcements.
            </p>
          </div>
          <Link
            href="/admin/news/new"
            className="btn-primary inline-flex items-center space-x-2"
          >
            <Plus className="h-4 w-4" />
            <span>Add New Article</span>
          </Link>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sampleNews.map((article) => (
            <div key={article.id} className="card p-6 hover:bg-white/10 transition-colors">
              {/* Article Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-blue-700 rounded-lg flex items-center justify-center">
                    <Newspaper className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold line-clamp-2">{article.title}</h3>
                    <div className="flex items-center space-x-2 text-sm text-gray-400 mt-1">
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-600/20 text-green-400">
                        Published
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Article Excerpt */}
              <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                {article.excerpt}
              </p>

              {/* Article Details */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center space-x-2 text-sm text-gray-400">
                  <Calendar className="h-4 w-4" />
                  <span>
                    {new Date(article.publishedAt).toLocaleDateString()}
                  </span>
                </div>
                
                <div className="flex items-center space-x-2 text-sm text-gray-400">
                  <User className="h-4 w-4" />
                  <span>{article.author}</span>
                </div>

                <div className="flex flex-wrap gap-1">
                  {article.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-gray-800 rounded-full text-xs text-gray-300"
                    >
                      {tag}
                    </span>
                  ))}
                  {article.tags.length > 3 && (
                    <span className="px-2 py-1 bg-gray-800 rounded-full text-xs text-gray-400">
                      +{article.tags.length - 3}
                    </span>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-800">
                <div className="flex items-center space-x-2">
                  <Link
                    href={`/news/${article.slug}`}
                    target="_blank"
                    className="text-gray-400 hover:text-white transition-colors"
                    title="View on site"
                  >
                    <Eye className="h-4 w-4" />
                  </Link>
                  <Link
                    href={`/admin/news/${article.slug}/edit`}
                    className="text-blue-400 hover:text-blue-300 transition-colors"
                    title="Edit article"
                  >
                    <Edit className="h-4 w-4" />
                  </Link>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button
                    className="text-red-400 hover:text-red-300 transition-colors"
                    title="Delete article"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {sampleNews.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-800 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Newspaper className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No articles yet</h3>
            <p className="text-gray-400 mb-6">
              Get started by writing your first news article.
            </p>
            <Link
              href="/admin/news/new"
              className="btn-primary inline-flex items-center space-x-2"
            >
              <Plus className="h-4 w-4" />
              <span>Write Your First Article</span>
            </Link>
          </div>
        )}
      </div>
    </AdminLayout>
  );
} 