import { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { 
  ArrowLeft,
  Save,
  Shield,
  Settings,
  Crown,
  CheckCircle,
  XCircle
} from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import { verifyJWT, AUTH_COOKIE_NAME, mockAdminUser } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Admin - Edit Role",
  description: "Edit role information and permissions in the Nextarch Studio admin panel.",
};

// Mock data for demonstration
const mockRole = {
  id: 1,
  name: "admin",
  display_name: "Administrator",
  description: "Full access to all features and settings",
  permissions: ["manage_users", "manage_content", "manage_games", "manage_news", "manage_jobs", "view_analytics", "manage_settings"],
  is_default: false,
  can_invite_users: true,
  requires_approval: false
};

const availablePermissions = [
  { 
    key: "manage_users", 
    label: "Manage Users", 
    description: "Create, edit, and delete users",
    category: "Administration"
  },
  { 
    key: "manage_content", 
    label: "Manage Content", 
    description: "Edit pages and content",
    category: "Content"
  },
  { 
    key: "manage_games", 
    label: "Manage Games", 
    description: "Add, edit, and delete games",
    category: "Content"
  },
  { 
    key: "manage_news", 
    label: "Manage News", 
    description: "Create and edit news articles",
    category: "Content"
  },
  { 
    key: "manage_jobs", 
    label: "Manage Jobs", 
    description: "Post and manage job listings",
    category: "Content"
  },
  { 
    key: "view_analytics", 
    label: "View Analytics", 
    description: "Access to analytics and reports",
    category: "Analytics"
  },
  { 
    key: "manage_settings", 
    label: "Manage Settings", 
    description: "Change system settings",
    category: "Administration"
  },
  { 
    key: "moderate_comments", 
    label: "Moderate Comments", 
    description: "Approve and delete user comments",
    category: "Content"
  },
  { 
    key: "manage_media", 
    label: "Manage Media", 
    description: "Upload and manage media files",
    category: "Content"
  },
  { 
    key: "view_logs", 
    label: "View Logs", 
    description: "Access to system logs and activity",
    category: "Administration"
  }
];

const permissionCategories = [
  { name: "Administration", color: "bg-red-600/20 text-red-400" },
  { name: "Content", color: "bg-blue-600/20 text-blue-400" },
  { name: "Analytics", color: "bg-green-600/20 text-green-400" }
];

export default async function EditRolePage({ params }: { params: { id: string } }) {
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
              href={`/admin/roles/${params.id}`}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold mb-2">Edit Role</h1>
              <p className="text-gray-400">
                Update role information and permissions.
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
                  <Shield className="h-5 w-5" />
                  <span>Role Information</span>
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="roleName" className="block text-sm font-medium mb-2">
                      Role Name *
                    </label>
                    <input
                      type="text"
                      id="roleName"
                      name="roleName"
                      defaultValue={mockRole.name}
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., senior-editor, moderator"
                      required
                    />
                    <p className="text-xs text-gray-400 mt-1">
                      Use lowercase with hyphens (e.g., senior-editor)
                    </p>
                  </div>
                  
                  <div>
                    <label htmlFor="displayName" className="block text-sm font-medium mb-2">
                      Display Name *
                    </label>
                    <input
                      type="text"
                      id="displayName"
                      name="displayName"
                      defaultValue={mockRole.display_name}
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., Senior Editor"
                      required
                    />
                  </div>
                </div>
                
                <div className="mt-4">
                  <label htmlFor="description" className="block text-sm font-medium mb-2">
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    rows={3}
                    defaultValue={mockRole.description}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Describe what this role can do..."
                  />
                </div>
              </div>

              {/* Permission Selection */}
              <div>
                <h2 className="text-lg font-semibold mb-4 flex items-center space-x-2">
                  <Settings className="h-5 w-5" />
                  <span>Permissions</span>
                </h2>
                
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-sm text-gray-400">
                      Select the permissions this role should have
                    </p>
                    <div className="flex items-center space-x-2">
                      <button
                        type="button"
                        className="text-xs text-blue-400 hover:text-blue-300"
                      >
                        Select All
                      </button>
                      <span className="text-gray-400">|</span>
                      <button
                        type="button"
                        className="text-xs text-blue-400 hover:text-blue-300"
                      >
                        Clear All
                      </button>
                    </div>
                  </div>
                </div>

                {/* Permission Categories */}
                {permissionCategories.map((category) => {
                  const categoryPermissions = availablePermissions.filter(
                    p => p.category === category.name
                  );
                  
                  return (
                    <div key={category.name} className="mb-6">
                      <h3 className="font-medium mb-3 flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded-full text-xs ${category.color}`}>
                          {category.name}
                        </span>
                        <span className="text-sm text-gray-400">
                          ({categoryPermissions.length} permissions)
                        </span>
                      </h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {categoryPermissions.map((permission) => (
                          <div key={permission.key} className="flex items-start space-x-3 p-3 border border-gray-800 rounded-lg hover:bg-gray-900/50 transition-colors">
                            <input
                              type="checkbox"
                              id={`permission-${permission.key}`}
                              name="permissions"
                              value={permission.key}
                              defaultChecked={mockRole.permissions.includes(permission.key)}
                              className="mt-1 rounded"
                            />
                            <div className="flex-1">
                              <label htmlFor={`permission-${permission.key}`} className="font-medium cursor-pointer">
                                {permission.label}
                              </label>
                              <p className="text-sm text-gray-400 mt-1">{permission.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Role Settings */}
              <div>
                <h2 className="text-lg font-semibold mb-4 flex items-center space-x-2">
                  <Crown className="h-5 w-5" />
                  <span>Role Settings</span>
                </h2>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="isDefault"
                        name="isDefault"
                        defaultChecked={mockRole.is_default}
                        className="rounded"
                      />
                      <label htmlFor="isDefault" className="text-sm">
                        Set as default role for new users
                      </label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="canInviteUsers"
                        name="canInviteUsers"
                        defaultChecked={mockRole.can_invite_users}
                        className="rounded"
                      />
                      <label htmlFor="canInviteUsers" className="text-sm">
                        Allow users with this role to invite others
                      </label>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="requiresApproval"
                      name="requiresApproval"
                      defaultChecked={mockRole.requires_approval}
                      className="rounded"
                    />
                    <label htmlFor="requiresApproval" className="text-sm">
                      Require admin approval for actions by users with this role
                    </label>
                  </div>
                </div>
              </div>

              {/* Preview */}
              <div>
                <h2 className="text-lg font-semibold mb-4">Role Preview</h2>
                <div className="border border-gray-800 rounded-lg p-4 bg-gray-900/50">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold flex items-center space-x-2">
                      {mockRole.name === 'admin' && <Crown className="h-4 w-4 text-yellow-500" />}
                      <span>{mockRole.display_name}</span>
                    </h3>
                    <span className="px-2 py-1 bg-blue-600/20 text-blue-400 rounded-full text-xs">
                      Custom Role
                    </span>
                  </div>
                  <p className="text-sm text-gray-400 mb-3">
                    {mockRole.description}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {mockRole.permissions.slice(0, 4).map((permission) => (
                      <span
                        key={permission}
                        className="px-2 py-1 bg-blue-600/20 text-blue-400 rounded-full text-xs"
                      >
                        {permission}
                      </span>
                    ))}
                    {mockRole.permissions.length > 4 && (
                      <span className="px-2 py-1 bg-gray-800 rounded-full text-xs text-gray-400">
                        +{mockRole.permissions.length - 4}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-6 border-t border-gray-800">
                <Link
                  href={`/admin/roles/${params.id}`}
                  className="btn-secondary"
                >
                  Cancel
                </Link>
                
                <div className="flex items-center space-x-3">
                  <button
                    type="button"
                    className="btn-secondary"
                  >
                    Reset Changes
                  </button>
                  <button
                    type="submit"
                    className="btn-primary inline-flex items-center space-x-2"
                  >
                    <Save className="h-4 w-4" />
                    <span>Save Changes</span>
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