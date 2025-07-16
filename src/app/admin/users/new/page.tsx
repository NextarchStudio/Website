import { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { 
  ArrowLeft,
  UserPlus,
  Shield,
  Mail,
  User,
  Lock,
  CheckCircle,
  XCircle
} from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import { verifyJWT, AUTH_COOKIE_NAME, mockAdminUser } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Admin - Add New User",
  description: "Add a new user to the Nextarch Studio team.",
};

// Mock data for demonstration
const mockRoles = [
  {
    id: 1,
    name: "admin",
    displayName: "Administrator",
    description: "Full access to all features and settings",
    permissions: ["manage_users", "manage_content", "manage_games", "manage_news", "manage_jobs", "view_analytics", "manage_settings"]
  },
  {
    id: 2,
    name: "editor",
    displayName: "Editor",
    description: "Can manage content, news, and jobs",
    permissions: ["manage_content", "manage_news", "manage_jobs"]
  },
  {
    id: 3,
    name: "writer",
    displayName: "Writer",
    description: "Can create and edit news articles",
    permissions: ["manage_news"]
  },
  {
    id: 4,
    name: "moderator",
    displayName: "Moderator",
    description: "Can moderate content and view analytics",
    permissions: ["manage_content", "view_analytics"]
  }
];

const availablePermissions = [
  { key: "manage_users", label: "Manage Users", description: "Create, edit, and delete users" },
  { key: "manage_content", label: "Manage Content", description: "Edit pages and content" },
  { key: "manage_games", label: "Manage Games", description: "Add, edit, and delete games" },
  { key: "manage_news", label: "Manage News", description: "Create and edit news articles" },
  { key: "manage_jobs", label: "Manage Jobs", description: "Post and manage job listings" },
  { key: "view_analytics", label: "View Analytics", description: "Access to analytics and reports" },
  { key: "manage_settings", label: "Manage Settings", description: "Change system settings" }
];

export default async function AddUserPage() {
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
          <div className="flex items-center space-x-4">
            <Link
              href="/admin/users"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold mb-2">Add New User</h1>
              <p className="text-gray-400">
                Invite a new team member to your studio.
              </p>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="card">
          <div className="p-6">
            <form className="space-y-6">
              {/* Basic Information */}
              <div>
                <h2 className="text-lg font-semibold mb-4 flex items-center space-x-2">
                  <User className="h-5 w-5" />
                  <span>Basic Information</span>
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter first name"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter last name"
                      required
                    />
                  </div>
                </div>
                
                <div className="mt-4">
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="w-full pl-10 pr-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="user@nextarch.com"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Role Assignment */}
              <div>
                <h2 className="text-lg font-semibold mb-4 flex items-center space-x-2">
                  <Shield className="h-5 w-5" />
                  <span>Role Assignment</span>
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {mockRoles.map((role) => (
                    <div key={role.id} className="border border-gray-800 rounded-lg p-4 hover:bg-gray-900/50 transition-colors cursor-pointer">
                      <div className="flex items-start space-x-3">
                        <input
                          type="radio"
                          id={`role-${role.id}`}
                          name="role"
                          value={role.name}
                          className="mt-1"
                        />
                        <div className="flex-1">
                          <label htmlFor={`role-${role.id}`} className="font-medium cursor-pointer">
                            {role.displayName}
                          </label>
                          <p className="text-sm text-gray-400 mt-1">{role.description}</p>
                          
                          <div className="mt-3">
                            <p className="text-xs text-gray-500 mb-2">Permissions:</p>
                            <div className="flex flex-wrap gap-1">
                              {role.permissions.slice(0, 2).map((permission) => (
                                <span
                                  key={permission}
                                  className="px-2 py-1 bg-blue-600/20 text-blue-400 rounded-full text-xs"
                                >
                                  {permission}
                                </span>
                              ))}
                              {role.permissions.length > 2 && (
                                <span className="px-2 py-1 bg-gray-800 rounded-full text-xs text-gray-400">
                                  +{role.permissions.length - 2}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Custom Permissions */}
              <div>
                <h2 className="text-lg font-semibold mb-4">Custom Permissions</h2>
                <p className="text-sm text-gray-400 mb-4">
                  Override role permissions with custom settings (optional)
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {availablePermissions.map((permission) => (
                    <div key={permission.key} className="flex items-center space-x-3 p-3 border border-gray-800 rounded-lg">
                      <input
                        type="checkbox"
                        id={`permission-${permission.key}`}
                        name="permissions"
                        value={permission.key}
                        className="rounded"
                      />
                      <div className="flex-1">
                        <label htmlFor={`permission-${permission.key}`} className="font-medium cursor-pointer">
                          {permission.label}
                        </label>
                        <p className="text-sm text-gray-400">{permission.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Account Settings */}
              <div>
                <h2 className="text-lg font-semibold mb-4 flex items-center space-x-2">
                  <Lock className="h-5 w-5" />
                  <span>Account Settings</span>
                </h2>
                
                <div className="space-y-4">
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium mb-2">
                      Initial Password *
                    </label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Set initial password"
                      required
                    />
                    <p className="text-xs text-gray-400 mt-1">
                      User will be prompted to change this on first login
                    </p>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="sendInvite"
                        name="sendInvite"
                        defaultChecked
                        className="rounded"
                      />
                      <label htmlFor="sendInvite" className="text-sm">
                        Send welcome email with login instructions
                      </label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="requirePasswordChange"
                        name="requirePasswordChange"
                        defaultChecked
                        className="rounded"
                      />
                      <label htmlFor="requirePasswordChange" className="text-sm">
                        Require password change on first login
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-6 border-t border-gray-800">
                <Link
                  href="/admin/users"
                  className="btn-secondary"
                >
                  Cancel
                </Link>
                
                <div className="flex items-center space-x-3">
                  <button
                    type="button"
                    className="btn-secondary"
                  >
                    Save as Draft
                  </button>
                  <button
                    type="submit"
                    className="btn-primary inline-flex items-center space-x-2"
                  >
                    <UserPlus className="h-4 w-4" />
                    <span>Create User</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
} 