"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { 
  Edit, 
  Trash2, 
  ArrowLeft,
  Briefcase,
  MapPin,
  Users,
  FileText,
  Loader2,
  Globe,
  Building
} from "lucide-react";
import Link from "next/link";
import AdminLayout from "@/components/admin/AdminLayout";
import { mockAdminUser } from "@/lib/auth";

interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  is_remote: boolean;
  status: string;
  created_at: string;
  updated_at: string;
}

export default function JobDetailPage() {
  const router = useRouter();
  const params = useParams();
  const slug = params.slug as string;
  
  const [job, setJob] = useState<Job | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);

  // Fetch job data
  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await fetch(`/api/jobs/${slug}`);
        if (!response.ok) {
          throw new Error('Failed to fetch job');
        }
        const data = await response.json();
        setJob(data);
      } catch (error) {
        console.error("Error fetching job:", error);
        alert('Failed to load job. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    if (slug) {
      fetchJob();
    }
  }, [slug]);

  const handleDelete = async () => {
    if (!job || !confirm('Are you sure you want to delete this job posting? This action cannot be undone.')) {
      return;
    }

    setIsDeleting(true);
    try {
      const response = await fetch(`/api/jobs/${slug}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete job');
      }

      router.push("/admin/jobs");
    } catch (error) {
      console.error("Error deleting job:", error);
      alert('Failed to delete job. Please try again.');
    } finally {
      setIsDeleting(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      active: { color: "bg-green-500", text: "Active" },
      closed: { color: "bg-red-500", text: "Closed" },
      draft: { color: "bg-gray-500", text: "Draft" }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.draft;
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color} text-white`}>
        {config.text}
      </span>
    );
  };

  const getTypeBadge = (type: string) => {
    const typeConfig = {
      "full-time": { color: "bg-blue-500", text: "Full Time" },
      "part-time": { color: "bg-purple-500", text: "Part Time" },
      "contract": { color: "bg-orange-500", text: "Contract" },
      "internship": { color: "bg-green-500", text: "Internship" }
    };
    
    const config = typeConfig[type as keyof typeof typeConfig] || typeConfig["full-time"];
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
            <span>Loading job...</span>
          </div>
        </div>
      </AdminLayout>
    );
  }

  if (!job) {
    return (
      <AdminLayout user={mockAdminUser}>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <h2 className="text-xl font-semibold mb-2">Job Not Found</h2>
            <p className="text-gray-400 mb-4">The job posting you're looking for doesn't exist.</p>
            <Link href="/admin/jobs" className="btn-primary">
              Back to Jobs
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
              href="/admin/jobs"
              className="btn-secondary inline-flex items-center space-x-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Jobs</span>
            </Link>
            <div>
              <h1 className="text-2xl font-bold mb-2">{job.title}</h1>
              <div className="flex items-center space-x-4 text-sm text-gray-400">
                <span className="flex items-center space-x-1">
                  <Building className="h-4 w-4" />
                  <span>{job.department}</span>
                </span>
                <span className="flex items-center space-x-1">
                  <MapPin className="h-4 w-4" />
                  <span>{job.location}</span>
                </span>
                {job.is_remote && (
                  <span className="flex items-center space-x-1">
                    <Globe className="h-4 w-4" />
                    <span>Remote</span>
                  </span>
                )}
                <span>• {getTypeBadge(job.type)}</span>
                <span>• {getStatusBadge(job.status)}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Link
              href={`/admin/jobs/${slug}/edit`}
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

        {/* Job Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Job Information */}
            <div className="card p-6">
              <h2 className="text-lg font-semibold mb-6 flex items-center space-x-2">
                <Briefcase className="h-5 w-5 text-blue-400" />
                <span>Job Information</span>
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Title</label>
                  <p className="text-white">{job.title}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Department</label>
                  <p className="text-white">{job.department}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Location</label>
                  <p className="text-white">{job.location}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Job Type</label>
                  <div>{getTypeBadge(job.type)}</div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Status</label>
                  <div>{getStatusBadge(job.status)}</div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Remote</label>
                  <p className="text-white">{job.is_remote ? "Yes" : "No"}</p>
                </div>
              </div>
            </div>

            {/* Job Description */}
            <div className="card p-6">
              <h2 className="text-lg font-semibold mb-6 flex items-center space-x-2">
                <FileText className="h-5 w-5 text-green-400" />
                <span>Job Description</span>
              </h2>
              
              <div className="prose prose-invert max-w-none">
                <div className="whitespace-pre-wrap text-white">{job.description}</div>
              </div>
            </div>

            {/* Requirements */}
            {job.requirements && job.requirements.length > 0 && (
              <div className="card p-6">
                <h2 className="text-lg font-semibold mb-6 flex items-center space-x-2">
                  <Users className="h-5 w-5 text-purple-400" />
                  <span>Requirements</span>
                </h2>
                
                <ul className="space-y-2">
                  {job.requirements.map((requirement, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <span className="text-purple-400 mt-1">•</span>
                      <span className="text-white">{requirement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Responsibilities */}
            {job.responsibilities && job.responsibilities.length > 0 && (
              <div className="card p-6">
                <h2 className="text-lg font-semibold mb-6 flex items-center space-x-2">
                  <MapPin className="h-5 w-5 text-orange-400" />
                  <span>Responsibilities</span>
                </h2>
                
                <ul className="space-y-2">
                  {job.responsibilities.map((responsibility, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <span className="text-orange-400 mt-1">•</span>
                      <span className="text-white">{responsibility}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="card p-6">
              <h3 className="text-lg font-semibold mb-4">Quick Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Requirements:</span>
                  <span className="text-white">{job.requirements?.length || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Responsibilities:</span>
                  <span className="text-white">{job.responsibilities?.length || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Remote:</span>
                  <span className="text-white">{job.is_remote ? "Yes" : "No"}</span>
                </div>
              </div>
            </div>

            {/* Metadata */}
            <div className="card p-6">
              <h3 className="text-lg font-semibold mb-4">Metadata</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <span className="text-gray-400">Created:</span>
                  <p className="text-white">{new Date(job.created_at).toLocaleDateString()}</p>
                </div>
                <div>
                  <span className="text-gray-400">Last Updated:</span>
                  <p className="text-white">{new Date(job.updated_at).toLocaleDateString()}</p>
                </div>
                <div>
                  <span className="text-gray-400">ID:</span>
                  <p className="text-white font-mono">{job.id}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
} 