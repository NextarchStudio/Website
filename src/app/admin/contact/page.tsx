"use client";

import { useState, useEffect } from "react";
import { 
  Mail, 
  Eye, 
  Trash2, 
  Reply,
  Calendar,
  User,
  MessageSquare,
  CheckCircle,
  Clock,
  X,
  Send
} from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import { mockAdminUser } from "@/lib/auth";

interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  message: string;
  submitted_at: string;
  status: "new" | "read" | "replied";
}

export default function AdminContactPage() {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedSubmission, setSelectedSubmission] = useState<ContactSubmission | null>(null);
  const [showReplyModal, setShowReplyModal] = useState(false);
  const [replyMessage, setReplyMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch contact submissions
  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        console.log('Fetching contact submissions...');
        const response = await fetch('/api/contact');
        console.log('Response status:', response.status);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch contact submissions: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Fetched data:', data);
        
        if (Array.isArray(data)) {
          setSubmissions(data);
        } else {
          console.error('Expected array but got:', typeof data);
          setSubmissions([]);
        }
      } catch (error) {
        console.error("Error fetching contact submissions:", error);
        alert('Failed to load contact submissions. Please try again.');
        setSubmissions([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSubmissions();
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'new':
        return <Clock className="h-4 w-4 text-yellow-400" />;
      case 'read':
        return <Eye className="h-4 w-4 text-blue-400" />;
      case 'replied':
        return <CheckCircle className="h-4 w-4 text-green-400" />;
      default:
        return <Mail className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new':
        return 'bg-yellow-600/20 text-yellow-400';
      case 'read':
        return 'bg-blue-600/20 text-blue-400';
      case 'replied':
        return 'bg-green-600/20 text-green-400';
      default:
        return 'bg-gray-600/20 text-gray-400';
    }
  };

  const handleViewMessage = (submission: ContactSubmission) => {
    setSelectedSubmission(submission);
    // Mark as read if it's new
    if (submission.status === "new") {
      setSubmissions(prev => 
        prev.map(s => s.id === submission.id ? { ...s, status: "read" as const } : s)
      );
    }
  };

  const handleReply = (submission: ContactSubmission) => {
    setSelectedSubmission(submission);
    setShowReplyModal(true);
  };

  const handleSendReply = async () => {
    if (!selectedSubmission || !replyMessage.trim()) return;
    
    setIsSubmitting(true);
    try {
      // Here you would typically send the reply via email API
      console.log("Sending reply to:", selectedSubmission.email);
      console.log("Reply message:", replyMessage);
      
      // Update status to replied in database
      const response = await fetch(`/api/contact/${selectedSubmission.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'replied' }),
      });

      if (!response.ok) {
        throw new Error('Failed to update submission status');
      }
      
      // Update status to replied
      setSubmissions(prev => 
        prev.map(s => s.id === selectedSubmission.id ? { ...s, status: "replied" as const } : s)
      );
      
      setShowReplyModal(false);
      setReplyMessage("");
      setSelectedSubmission(null);
    } catch (error) {
      console.error("Error sending reply:", error);
      alert('Failed to send reply. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteMessage = async (submissionId: string) => {
    if (!confirm("Are you sure you want to delete this message?")) return;
    
    setIsSubmitting(true);
    try {
      const response = await fetch(`/api/contact/${submissionId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete message');
      }
      
      // Remove from list
      setSubmissions(prev => prev.filter(s => s.id !== submissionId));
    } catch (error) {
      console.error("Error deleting message:", error);
      alert('Failed to delete message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <AdminLayout user={mockAdminUser}>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="flex items-center space-x-2">
            <Clock className="h-6 w-6 animate-spin" />
            <span>Loading contact submissions...</span>
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
            <h1 className="text-2xl font-bold mb-2">Contact Management</h1>
            <p className="text-gray-400">
              Manage contact form submissions and inquiries.
            </p>
          </div>
        </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card p-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-yellow-600/20 rounded-lg flex items-center justify-center">
              <Clock className="h-6 w-6 text-yellow-400" />
            </div>
            <div>
              <p className="text-2xl font-bold">
                {submissions.filter(s => s.status === 'new').length}
              </p>
              <p className="text-sm text-gray-400">New Messages</p>
            </div>
          </div>
        </div>
        
        <div className="card p-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center">
              <Eye className="h-6 w-6 text-blue-400" />
            </div>
            <div>
              <p className="text-2xl font-bold">
                {submissions.filter(s => s.status === 'read').length}
              </p>
              <p className="text-sm text-gray-400">Read Messages</p>
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
                {submissions.filter(s => s.status === 'replied').length}
              </p>
              <p className="text-sm text-gray-400">Replied</p>
            </div>
          </div>
        </div>
      </div>

      {/* Messages List */}
      <div className="card p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold">Contact Submissions</h2>
          <p className="text-sm text-gray-400">
            {submissions.length} total messages
          </p>
        </div>

        {submissions.length === 0 ? (
          <div className="text-center py-12">
            <Mail className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No Messages</h3>
            <p className="text-gray-400">No contact submissions yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {submissions.map((submission) => (
              <div
                key={submission.id}
                className="border border-gray-700 rounded-lg p-4 hover:bg-gray-800/50 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(submission.status)}
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(submission.status)}`}>
                          {submission.status}
                        </span>
                      </div>
                      <span className="text-sm text-gray-400">
                        {new Date(submission.submitted_at).toLocaleDateString()}
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-4 mb-2">
                      <div className="flex items-center space-x-2">
                        <User className="h-4 w-4 text-gray-400" />
                        <span className="font-medium">{submission.name}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Mail className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-400">{submission.email}</span>
                      </div>
                    </div>
                    
                    <p className="text-gray-300 line-clamp-2">
                      {submission.message}
                    </p>
                  </div>
                  
                  <div className="flex items-center space-x-2 ml-4">
                    <button
                      onClick={() => handleViewMessage(submission)}
                      className="btn-secondary p-2"
                      title="View message"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleReply(submission)}
                      className="btn-primary p-2"
                      title="Reply"
                    >
                      <Reply className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteMessage(submission.id)}
                      className="btn-danger p-2"
                      title="Delete message"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Reply Modal */}
      {showReplyModal && selectedSubmission && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gray-900 rounded-lg p-6 w-full max-w-2xl mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Reply to {selectedSubmission.name}</h3>
              <button
                onClick={() => setShowReplyModal(false)}
                className="text-gray-400 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Original Message</label>
                <div className="bg-gray-800 rounded-lg p-3 text-sm">
                  {selectedSubmission.message}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Your Reply</label>
                <textarea
                  value={replyMessage}
                  onChange={(e) => setReplyMessage(e.target.value)}
                  rows={6}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Type your reply here..."
                />
              </div>
            </div>
            
            <div className="flex items-center justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowReplyModal(false)}
                className="btn-secondary"
              >
                Cancel
              </button>
              <button
                onClick={handleSendReply}
                disabled={isSubmitting || !replyMessage.trim()}
                className="btn-primary inline-flex items-center space-x-2"
              >
                <Send className="h-4 w-4" />
                <span>{isSubmitting ? "Sending..." : "Send Reply"}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Message Detail Modal */}
      {selectedSubmission && !showReplyModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gray-900 rounded-lg p-6 w-full max-w-2xl mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Message from {selectedSubmission.name}</h3>
              <button
                onClick={() => setSelectedSubmission(null)}
                className="text-gray-400 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Name</label>
                  <p className="text-white">{selectedSubmission.name}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Email</label>
                  <p className="text-white">{selectedSubmission.email}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Date</label>
                  <p className="text-white">{new Date(selectedSubmission.submitted_at).toLocaleString()}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Status</label>
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(selectedSubmission.status)}
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(selectedSubmission.status)}`}>
                      {selectedSubmission.status}
                    </span>
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Message</label>
                <div className="bg-gray-800 rounded-lg p-4 whitespace-pre-wrap">
                  {selectedSubmission.message}
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-end space-x-3 mt-6">
              <button
                onClick={() => setSelectedSubmission(null)}
                className="btn-secondary"
              >
                Close
              </button>
              <button
                onClick={() => handleReply(selectedSubmission)}
                className="btn-primary inline-flex items-center space-x-2"
              >
                <Reply className="h-4 w-4" />
                <span>Reply</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    </AdminLayout>
  );
} 