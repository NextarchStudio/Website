"use client";

import { useState, useEffect } from "react";
import { 
  FileText, 
  Edit, 
  Eye, 
  Save,
  Plus,
  Trash2,
  X,
  CheckCircle,
  Clock,
  Globe,
  Settings,
  Loader2
} from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";

interface Page {
  id: string;
  title: string;
  slug: string;
  content: string;
  status: "draft" | "published";
  last_modified: string;
  created_at: string;
  updated_at: string;
}

export default function AdminContentPage() {
  const [pages, setPages] = useState<Page[]>([]);
  const [selectedPage, setSelectedPage] = useState<Page | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [editForm, setEditForm] = useState({
    title: "",
    slug: "",
    content: "",
    status: "draft" as "draft" | "published",
  });

  // Fetch current user and pages
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Fetching pages...');
        
        // Fetch current user
        const userResponse = await fetch('/api/auth/me');
        if (userResponse.ok) {
          const userData = await userResponse.json();
          setCurrentUser(userData);
        }
        
        // Fetch pages
        const response = await fetch('/api/pages');
        if (!response.ok) {
          throw new Error('Failed to fetch pages');
        }
        const data = await response.json();
        console.log('Fetched pages:', data);
        setPages(data);
      } catch (error) {
        console.error("Error fetching pages:", error);
        alert('Failed to load pages. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
        return 'bg-green-600/20 text-green-400';
      case 'draft':
        return 'bg-yellow-600/20 text-yellow-400';
      default:
        return 'bg-gray-600/20 text-gray-400';
    }
  };

  const handleEditPage = (page: Page) => {
    setSelectedPage(page);
    setEditForm({
      title: page.title,
      slug: page.slug,
      content: page.content,
      status: page.status,
    });
    setShowEditModal(true);
  };

  const handleSavePage = async () => {
    if (!selectedPage || !editForm.title.trim() || !editForm.slug.trim()) return;
    
    setIsSubmitting(true);
    try {
      const pageData = {
        title: editForm.title,
        slug: editForm.slug,
        content: editForm.content,
        status: editForm.status
      };

      const response = await fetch(`/api/pages/${selectedPage.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(pageData),
      });

      if (!response.ok) {
        throw new Error('Failed to update page');
      }
      
      // Update the page in the list
      setPages(prev => 
        prev.map(p => p.id === selectedPage.id ? {
          ...p,
          ...editForm,
          last_modified: new Date().toISOString(),
        } : p)
      );
      
      setShowEditModal(false);
      setSelectedPage(null);
    } catch (error) {
      console.error("Error saving page:", error);
      alert('Failed to save page. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePreviewPage = (page: Page) => {
    setSelectedPage(page);
    setShowPreviewModal(true);
  };

  const handleDeletePage = async (pageId: string) => {
    if (!confirm("Are you sure you want to delete this page? This action cannot be undone.")) return;
    
    setIsSubmitting(true);
    try {
      const response = await fetch(`/api/pages/${pageId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete page');
      }
      
      // Remove from list
      setPages(prev => prev.filter(p => p.id !== pageId));
    } catch (error) {
      console.error("Error deleting page:", error);
      alert('Failed to delete page. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCreatePage = () => {
    setSelectedPage(null);
    setEditForm({
      title: "",
      slug: "",
      content: "",
      status: "draft",
    });
    setShowEditModal(true);
  };

  const handleSaveNewPage = async () => {
    if (!editForm.title.trim() || !editForm.slug.trim()) return;
    
    setIsSubmitting(true);
    try {
      const pageData = {
        title: editForm.title,
        slug: editForm.slug,
        content: editForm.content,
        status: editForm.status
      };

      const response = await fetch('/api/pages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(pageData),
      });

      if (!response.ok) {
        throw new Error('Failed to create page');
      }

      const newPage = await response.json();
      setPages(prev => [...prev, newPage]);
      setShowEditModal(false);
    } catch (error) {
      console.error("Error creating page:", error);
      alert('Failed to create page. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Loading pages...</span>
        </div>
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <p className="text-gray-400">Loading user information...</p>
        </div>
      </div>
    );
  }

  return (
    <AdminLayout user={currentUser}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">Content Management</h1>
            <p className="text-gray-400">
              Manage website pages and content structure.
            </p>
          </div>
          <button
            onClick={handleCreatePage}
            className="btn-primary inline-flex items-center space-x-2"
          >
            <Plus className="h-4 w-4" />
            <span>Add Page</span>
          </button>
        </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card p-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center">
              <FileText className="h-6 w-6 text-blue-400" />
            </div>
            <div>
              <p className="text-2xl font-bold">{pages.length}</p>
              <p className="text-sm text-gray-400">Total Pages</p>
            </div>
          </div>
        </div>
        
        <div className="card p-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-green-600/20 rounded-lg flex items-center justify-center">
              <CheckCircle className="h-6 w-6 text-green-400" />
            </div>
            <div>
              <p className="text-2xl font-bold">
                {pages.filter(p => p.status === 'published').length}
              </p>
              <p className="text-sm text-gray-400">Published</p>
            </div>
          </div>
        </div>
        
        <div className="card p-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-yellow-600/20 rounded-lg flex items-center justify-center">
              <Clock className="h-6 w-6 text-yellow-400" />
            </div>
            <div>
              <p className="text-2xl font-bold">
                {pages.filter(p => p.status === 'draft').length}
              </p>
              <p className="text-sm text-gray-400">Drafts</p>
            </div>
          </div>
        </div>
      </div>

      {/* Pages List */}
      {pages.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-800 rounded-lg flex items-center justify-center mx-auto mb-4">
            <FileText className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold mb-2">No pages yet</h3>
          <p className="text-gray-400 mb-6">
            Create your first page to get started.
          </p>
          <button
            onClick={handleCreatePage}
            className="btn-primary inline-flex items-center space-x-2"
          >
            <Plus className="h-4 w-4" />
            <span>Add Page</span>
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {pages.map((page) => (
            <div key={page.id} className="card p-6 hover:bg-white/10 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-700 rounded-lg flex items-center justify-center">
                      <FileText className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h3 className="font-semibold">{page.title}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(page.status)}`}>
                          {page.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-400">{page.slug}</p>
                    </div>
                  </div>
                  
                  <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                    {page.content.substring(0, 150)}...
                  </p>
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-400">
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>Modified {new Date(page.last_modified || page.updated_at).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <FileText className="h-4 w-4" />
                      <span>{page.content.length} characters</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 ml-4">
                  <button
                    onClick={() => handlePreviewPage(page)}
                    className="text-blue-400 hover:text-blue-300 transition-colors"
                    title="Preview page"
                  >
                    <Eye className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleEditPage(page)}
                    className="text-green-400 hover:text-green-300 transition-colors"
                    title="Edit page"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDeletePage(page.id)}
                    disabled={isSubmitting}
                    className="text-red-400 hover:text-red-300 transition-colors disabled:opacity-50"
                    title="Delete page"
                  >
                    {isSubmitting ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Trash2 className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit/Add Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gray-900 rounded-lg p-6 w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">
                {selectedPage ? "Edit Page" : "Add New Page"}
              </h3>
              <button
                onClick={() => setShowEditModal(false)}
                className="text-gray-400 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Page Title *</label>
                  <input
                    type="text"
                    value={editForm.title}
                    onChange={(e) => setEditForm(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter page title"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Slug *</label>
                  <input
                    type="text"
                    value={editForm.slug}
                    onChange={(e) => setEditForm(prev => ({ ...prev, slug: e.target.value }))}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="/page-slug"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Status</label>
                <select
                  value={editForm.status}
                  onChange={(e) => setEditForm(prev => ({ ...prev, status: e.target.value as "draft" | "published" }))}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Content *</label>
                <textarea
                  value={editForm.content}
                  onChange={(e) => setEditForm(prev => ({ ...prev, content: e.target.value }))}
                  rows={12}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Write your page content here..."
                />
              </div>
            </div>
            
            <div className="flex items-center justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowEditModal(false)}
                className="btn-secondary"
              >
                Cancel
              </button>
              <button
                onClick={selectedPage ? handleSavePage : handleSaveNewPage}
                disabled={isSubmitting || !editForm.title.trim() || !editForm.slug.trim()}
                className="btn-primary inline-flex items-center space-x-2"
              >
                {isSubmitting ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Save className="h-4 w-4" />
                )}
                <span>{isSubmitting ? "Saving..." : (selectedPage ? "Save Changes" : "Create Page")}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Preview Modal */}
      {showPreviewModal && selectedPage && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gray-900 rounded-lg p-6 w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Preview: {selectedPage.title}</h3>
              <button
                onClick={() => setShowPreviewModal(false)}
                className="text-gray-400 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="prose prose-invert max-w-none">
              <div className="whitespace-pre-wrap">{selectedPage.content}</div>
            </div>
          </div>
        </div>
      )}
    </div>
    </AdminLayout>
  );
} 