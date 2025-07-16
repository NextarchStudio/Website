"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { 
  Save, 
  X, 
  Plus, 
  Trash2,
  Newspaper,
  Calendar,
  User,
  Tag,
  FileText,
  Loader2
} from "lucide-react";
import Link from "next/link";
import AdminLayout from "@/components/admin/AdminLayout";
import { mockAdminUser } from "@/lib/auth";

interface FormData {
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  coverImage: string;
  tags: string[];
  author: string;
  publishedAt: string;
  status: string;
}

export default function EditNewsPage() {
  const router = useRouter();
  const params = useParams();
  const slug = params.slug as string;
  
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [formData, setFormData] = useState<FormData>({
    title: "",
    slug: "",
    content: "",
    excerpt: "",
    coverImage: "",
    tags: [""],
    author: "",
    publishedAt: new Date().toISOString().split('T')[0],
    status: "draft"
  });

  // Fetch news article data
  useEffect(() => {
    const fetchNewsArticle = async () => {
      try {
        const response = await fetch(`/api/news/${slug}`);
        if (!response.ok) {
          throw new Error('Failed to fetch news article');
        }
        const article = await response.json();
        
        setFormData({
          title: article.title || "",
          slug: article.slug || "",
          content: article.content || "",
          excerpt: article.excerpt || "",
          coverImage: article.cover_image || "",
          tags: article.tags && article.tags.length > 0 ? article.tags : [""],
          author: article.author || "",
          publishedAt: article.published_at ? new Date(article.published_at).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
          status: article.status || "draft"
        });
      } catch (error) {
        console.error("Error fetching news article:", error);
        alert('Failed to load news article. Please try again.');
      } finally {
        setIsFetching(false);
      }
    };

    if (slug) {
      fetchNewsArticle();
    }
  }, [slug]);

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
      const newsData = {
        title: formData.title,
        slug: formData.slug,
        content: formData.content,
        excerpt: formData.excerpt,
        cover_image: formData.coverImage || null,
        tags: formData.tags.filter(t => t.trim()),
        author: formData.author,
        published_at: formData.publishedAt || null,
        status: formData.status
      };

      const response = await fetch(`/api/news/${slug}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newsData),
      });

      if (!response.ok) {
        throw new Error('Failed to update news article');
      }

      // Redirect to news list
      router.push("/admin/news");
    } catch (error) {
      console.error("Error updating news article:", error);
      alert('Failed to update news article. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching) {
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

  return (
    <AdminLayout user={mockAdminUser}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">Edit Article</h1>
            <p className="text-gray-400">
              Update the news article: {formData.title}
            </p>
          </div>
          <Link
            href="/admin/news"
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
            <Newspaper className="h-5 w-5 text-blue-400" />
            <span>Article Information</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Article Title *</label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter article title"
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
                placeholder="article-slug"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Author *</label>
              <input
                type="text"
                required
                value={formData.author}
                onChange={(e) => handleInputChange("author", e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter author name"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Publish Date</label>
              <input
                type="date"
                value={formData.publishedAt}
                onChange={(e) => handleInputChange("publishedAt", e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Status</label>
              <select
                value={formData.status}
                onChange={(e) => handleInputChange("status", e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="archived">Archived</option>
              </select>
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2">Excerpt *</label>
              <textarea
                required
                rows={3}
                value={formData.excerpt}
                onChange={(e) => handleInputChange("excerpt", e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter article excerpt"
              />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="card p-6">
          <h2 className="text-lg font-semibold mb-6 flex items-center space-x-2">
            <FileText className="h-5 w-5 text-green-400" />
            <span>Article Content</span>
          </h2>
          
          <div>
            <label className="block text-sm font-medium mb-2">Content *</label>
            <textarea
              required
              rows={12}
              value={formData.content}
              onChange={(e) => handleInputChange("content", e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Write your article content here..."
            />
          </div>
        </div>

        {/* Media */}
        <div className="card p-6">
          <h2 className="text-lg font-semibold mb-6 flex items-center space-x-2">
            <Tag className="h-5 w-5 text-purple-400" />
            <span>Media & Tags</span>
          </h2>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Cover Image URL</label>
              <input
                type="url"
                value={formData.coverImage}
                onChange={(e) => handleInputChange("coverImage", e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="https://example.com/image.jpg"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Tags</label>
              <div className="space-y-2">
                {formData.tags.map((tag, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={tag}
                      onChange={(e) => handleArrayChange("tags", index, e.target.value)}
                      className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter tag"
                    />
                    {formData.tags.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeArrayItem("tags", index)}
                        className="p-2 text-red-400 hover:text-red-300"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addArrayItem("tags")}
                  className="btn-secondary inline-flex items-center space-x-2"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add Tag</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end space-x-4">
          <Link
            href="/admin/news"
            className="btn-secondary"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={isLoading}
            className="btn-primary inline-flex items-center space-x-2"
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Save className="h-4 w-4" />
            )}
            <span>{isLoading ? "Saving..." : "Save Changes"}</span>
          </button>
        </div>
      </form>
    </div>
    </AdminLayout>
  );
} 