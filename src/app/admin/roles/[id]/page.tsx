import { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { 
  ArrowLeft,
  Edit,
  Shield,
  Users,
  Settings,
  Crown,
  CheckCircle,
  XCircle,
  User
} from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import { verifyJWT, AUTH_COOKIE_NAME, mockAdminUser } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Admin - Role Details",
  description: "View and manage role details in the Nextarch Studio admin panel.",
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
  requires_approval: false,
  created_at: "2024-01-01T00:00:00Z",
  updated_at: "2024-01-15T10:30:00Z",
  users: [
    {
      id: 1,
      first_name: "John",
      last_name: "Doe",
      email: "john@nextarch.com",
      status: "active"
    }
  ]
};

const permissionCategories = [
  { name: "Administration", permissions: ["manage_users", "manage_settings"] },
  { name: "Content", permissions: ["manage_content", "manage_games", "manage_news", "manage_jobs"] },
  { name: "Analytics", permissions: ["view_analytics"] }
];

export default async function RoleDetailPage({ params }: { params: { id: string } }) {
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
              <h1 className="text-2xl font-bold mb-2">Role Details</h1>
              <p className="text-gray-400">
                View and manage role information.
              </p>
            </div>
          </div>
          <Link
            href={`/admin/roles/${params.id}/edit`}
            className="btn-primary inline-flex items-center space-x-2"
          >
            <Edit className="h-4 w-4" />
            <span>Edit Role</span>
          </Link>
        </div>

        {/* Role Information */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <div className="card">
              <div className="p-6">
                <h2 className="text-lg font-semibold mb-4 flex items-center space-x-2">
                  <Shield className="h-5 w-5" />
                  <span>Role Information</span>
                </h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">
                      Role Name
                    </label>
                    <div className="flex items-center space-x-2">
                      {mockRole.name === 'admin' && <Crown className="h-4 w-4 text-yellow-500" />}
                      <p className="text-white font-medium">{mockRole.display_name}</p>
                    </div>
                    <p className="text-sm text-gray-400 mt-1">
                      {mockRole.name}
                    </p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">
                      Description
                    </label>
                    <p className="text-white">{mockRole.description}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Permissions */}
            <div className="card">
              <div className="p-6">
                <h2 className="text-lg font-semibold mb-4 flex items-center space-x-2">
                  <Settings className="h-5 w-5" />
                  <span>Permissions</span>
                </h2>
                
                <div className="space-y-4">
                  {permissionCategories.map((category) => {
                    const categoryPermissions = mockRole.permissions.filter(
                      p => category.permissions.includes(p)
                    );
                    
                    if (categoryPermissions.length === 0) return null;
                    
                    return (
                      <div key={category.name}>
                        <h3 className="font-medium mb-2 text-gray-300">{category.name}</h3>
                        <div className="flex flex-wrap gap-2">
                          {categoryPermissions.map((permission) => (
                            <span
                              key={permission}
                              className="px-3 py-1 bg-blue-600/20 text-blue-400 rounded-full text-sm"
                            >
                              {permission}
                            </span>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Assigned Users */}
            <div className="card">
              <div className="p-6">
                <h2 className="text-lg font-semibold mb-4 flex items-center space-x-2">
                  <Users className="h-5 w-5" />
                  <span>Users with this Role</span>
                  <span className="px-2 py-1 bg-gray-800 rounded-full text-xs">
                    {mockRole.users.length}
                  </span>
                </h2>
                
                {mockRole.users.length > 0 ? (
                  <div className="space-y-3">
                    {mockRole.users.map((user) => (
                      <div key={user.id} className="flex items-center justify-between p-3 border border-gray-800 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                            <User className="h-4 w-4 text-white" />
                          </div>
                          <div>
                            <p className="font-medium">{user.first_name} {user.last_name}</p>
                            <p className="text-sm text-gray-400">{user.email}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            user.status === 'active' 
                              ? 'bg-green-600/20 text-green-400' 
                              : 'bg-red-600/20 text-red-400'
                          }`}>
                            {user.status}
                          </span>
                          <Link
                            href={`/admin/users/${user.id}`}
                            className="text-blue-400 hover:text-blue-300 transition-colors"
                          >
                            View
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-400">No users assigned to this role</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Role Settings */}
            <div className="card">
              <div className="p-6">
                <h3 className="font-semibold mb-4">Role Settings</h3>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">Default Role</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      mockRole.is_default 
                        ? 'bg-green-600/20 text-green-400' 
                        : 'bg-gray-600/20 text-gray-400'
                    }`}>
                      {mockRole.is_default ? 'Yes' : 'No'}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">Can Invite Users</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      mockRole.can_invite_users 
                        ? 'bg-green-600/20 text-green-400' 
                        : 'bg-gray-600/20 text-gray-400'
                    }`}>
                      {mockRole.can_invite_users ? 'Yes' : 'No'}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">Requires Approval</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      mockRole.requires_approval 
                        ? 'bg-orange-600/20 text-orange-400' 
                        : 'bg-gray-600/20 text-gray-400'
                    }`}>
                      {mockRole.requires_approval ? 'Yes' : 'No'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Role Info */}
            <div className="card">
              <div className="p-6">
                <h3 className="font-semibold mb-4">Role Information</h3>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">Created</span>
                    <span className="text-sm text-gray-300">
                      {new Date(mockRole.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">Last Updated</span>
                    <span className="text-sm text-gray-300">
                      {new Date(mockRole.updated_at).toLocaleDateString()}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">Role ID</span>
                    <span className="text-sm text-gray-300 font-mono">
                      {mockRole.id}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="card">
              <div className="p-6">
                <h3 className="font-semibold mb-4">Quick Actions</h3>
                
                <div className="space-y-2">
                  <button className="w-full text-left px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors">
                    Duplicate Role
                  </button>
                  <button className="w-full text-left px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors">
                    {mockRole.is_default ? 'Remove as Default' : 'Set as Default'}
                  </button>
                  {mockRole.users.length === 0 && (
                    <button className="w-full text-left px-3 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-600/10 rounded-lg transition-colors">
                      Delete Role
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
} 