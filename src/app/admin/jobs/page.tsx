import { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { 
  Plus, 
  Edit, 
  Eye, 
  Trash2, 
  Briefcase,
  Calendar,
  MapPin,
  Users
} from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import { verifyJWT, AUTH_COOKIE_NAME, mockAdminUser } from "@/lib/auth";
import { sampleJobs } from "@/data/sample";

export const metadata: Metadata = {
  title: "Admin - Jobs",
  description: "Manage job openings in the Nextarch Studio admin panel.",
};

export default async function AdminJobsPage() {
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
            <h1 className="text-2xl font-bold mb-2">Jobs Management</h1>
            <p className="text-gray-400">
              Manage your studio's job openings and career opportunities.
            </p>
          </div>
          <Link
            href="/admin/jobs/new"
            className="btn-primary inline-flex items-center space-x-2"
          >
            <Plus className="h-4 w-4" />
            <span>Post New Job</span>
          </Link>
        </div>

        {/* Jobs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sampleJobs.map((job) => (
            <div key={job.id} className="card p-6 hover:bg-white/10 transition-colors">
              {/* Job Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-700 rounded-lg flex items-center justify-center">
                    <Briefcase className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold line-clamp-2">{job.title}</h3>
                    <div className="flex items-center space-x-2 text-sm text-gray-400 mt-1">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        job.type === 'full-time' ? 'bg-green-600/20 text-green-400' :
                        job.type === 'part-time' ? 'bg-blue-600/20 text-blue-400' :
                        job.type === 'contract' ? 'bg-orange-600/20 text-orange-400' :
                        'bg-gray-600/20 text-gray-400'
                      }`}>
                        {job.type}
                      </span>
                      {job.isRemote && (
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-purple-600/20 text-purple-400">
                          Remote
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Job Description */}
              <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                {job.description}
              </p>

              {/* Job Details */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center space-x-2 text-sm text-gray-400">
                  <MapPin className="h-4 w-4" />
                  <span>{job.location}</span>
                </div>
                
                <div className="flex items-center space-x-2 text-sm text-gray-400">
                  <Users className="h-4 w-4" />
                  <span>{job.department}</span>
                </div>

                <div className="flex items-center space-x-2 text-sm text-gray-400">
                  <Calendar className="h-4 w-4" />
                  <span>
                    Posted {new Date(job.postedAt).toLocaleDateString()}
                  </span>
                </div>

                <div className="flex flex-wrap gap-1">
                  <span className="px-2 py-1 bg-gray-800 rounded-full text-xs text-gray-300">
                    {job.requirements.length} requirements
                  </span>
                  <span className="px-2 py-1 bg-gray-800 rounded-full text-xs text-gray-300">
                    {job.responsibilities.length} responsibilities
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-800">
                <div className="flex items-center space-x-2">
                  <Link
                    href={`/careers`}
                    target="_blank"
                    className="text-gray-400 hover:text-white transition-colors"
                    title="View on site"
                  >
                    <Eye className="h-4 w-4" />
                  </Link>
                  <Link
                    href={`/admin/jobs/${job.id}/edit`}
                    className="text-blue-400 hover:text-blue-300 transition-colors"
                    title="Edit job"
                  >
                    <Edit className="h-4 w-4" />
                  </Link>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button
                    className="text-red-400 hover:text-red-300 transition-colors"
                    title="Delete job"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {sampleJobs.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-800 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Briefcase className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No job openings yet</h3>
            <p className="text-gray-400 mb-6">
              Get started by posting your first job opening.
            </p>
            <Link
              href="/admin/jobs/new"
              className="btn-primary inline-flex items-center space-x-2"
            >
              <Plus className="h-4 w-4" />
              <span>Post Your First Job</span>
            </Link>
          </div>
        )}
      </div>
    </AdminLayout>
  );
} 