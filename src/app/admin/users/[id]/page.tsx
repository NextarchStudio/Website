import { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { 
  ArrowLeft,
  Edit,
  User,
  Mail,
  Shield,
  Calendar,
  CheckCircle,
  XCircle,
  Crown,
  Settings,
  Activity
} from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import { verifyJWT, AUTH_COOKIE_NAME, mockAdminUser } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Admin - User Details",
  description: "View and manage user details in the Nextarch Studio admin panel.",
};

// Mock data for demonstration
const mockUser = {
  id: 1,
  first_name: "John",
  last_name: "Doe",
  email: "john@nextarch.com",
  role: {
    id: 1,
    name: "admin",
    display_name: "Administrator",
    permissions: ["manage_users", "manage_content", "manage_games", "manage_news", "manage_jobs", "view_analytics", "manage_settings"]
  },
  status: "active",
  last_login: "2024-01-15T10:30:00Z",
  permissions: ["manage_users", "manage_content", "manage_games", "manage_news", "manage_jobs", "view_analytics"],
  require_password_change: false,
  created_at: "2024-01-01T00:00:00Z",
  updated_at: "2024-01-15T10:30:00Z"
};

const mockActivity = [
  {
    id: 1,
    action: "Created news article",
    details: "Nextarch Studio Announces Scrap Siege: Arena",
    timestamp: "2024-01-15T10:30:00Z"
  },
  {
    id: 2,
    action: "Updated game",
    details: "Scrap Siege: Arena - Updated description",
    timestamp: "2024-01-14T15:45:00Z"
  },
  {
    id: 3,
    action: "Logged in",
    details: "Successful login from 192.168.1.100",
    timestamp: "2024-01-14T09:20:00Z"
  }
];

export default async function UserDetailPage({ params }: { params: { id: string } }) {
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
              <h1 className="text-2xl font-bold mb-2">User Details</h1>
              <p className="text-gray-400">
                View and manage user information.
              </p>
            </div>
          </div>
          <Link
            href={`/admin/users/${params.id}/edit`}
            className="btn-primary inline-flex items-center space-x-2"
          >
            <Edit className="h-4 w-4" />
            <span>Edit User</span>
          </Link>
        </div>

        {/* User Information */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <div className="card">
              <div className="p-6">
                <h2 className="text-lg font-semibold mb-4 flex items-center space-x-2">
                  <User className="h-5 w-5" />
                  <span>Basic Information</span>
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">
                      First Name
                    </label>
                    <p className="text-white">{mockUser.first_name}</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">
                      Last Name
                    </label>
                    <p className="text-white">{mockUser.last_name}</p>
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-400 mb-1">
                      Email Address
                    </label>
                    <div className="flex items-center space-x-2">
                      <Mail className="h-4 w-4 text-gray-400" />
                      <p className="text-white">{mockUser.email}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Role & Permissions */}
            <div className="card">
              <div className="p-6">
                <h2 className="text-lg font-semibold mb-4 flex items-center space-x-2">
                  <Shield className="h-5 w-5" />
                  <span>Role & Permissions</span>
                </h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Assigned Role
                    </label>
                    <div className="flex items-center space-x-2">
                      {mockUser.role.name === 'admin' && <Crown className="h-4 w-4 text-yellow-500" />}
                      <span className="px-3 py-1 bg-blue-600/20 text-blue-400 rounded-full text-sm font-medium">
                        {mockUser.role.display_name}
                      </span>
                    </div>
                    <p className="text-sm text-gray-400 mt-1">
                      {mockUser.role.name}
                    </p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Custom Permissions
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {mockUser.permissions.map((permission) => (
                        <span
                          key={permission}
                          className="px-2 py-1 bg-gray-800 rounded-full text-xs text-gray-300"
                        >
                          {permission}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="card">
              <div className="p-6">
                <h2 className="text-lg font-semibold mb-4 flex items-center space-x-2">
                  <Activity className="h-5 w-5" />
                  <span>Recent Activity</span>
                </h2>
                
                <div className="space-y-3">
                  {mockActivity.map((activity) => (
                    <div key={activity.id} className="flex items-start space-x-3 p-3 border border-gray-800 rounded-lg">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                      <div className="flex-1">
                        <p className="font-medium text-sm">{activity.action}</p>
                        <p className="text-sm text-gray-400">{activity.details}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(activity.timestamp).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Status Card */}
            <div className="card">
              <div className="p-6">
                <h3 className="font-semibold mb-4">Account Status</h3>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">Status</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      mockUser.status === 'active' 
                        ? 'bg-green-600/20 text-green-400' 
                        : 'bg-red-600/20 text-red-400'
                    }`}>
                      {mockUser.status}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">Last Login</span>
                    <span className="text-sm text-gray-300">
                      {new Date(mockUser.last_login).toLocaleDateString()}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">Password Change</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      mockUser.require_password_change 
                        ? 'bg-orange-600/20 text-orange-400' 
                        : 'bg-green-600/20 text-green-400'
                    }`}>
                      {mockUser.require_password_change ? 'Required' : 'Not Required'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Account Info */}
            <div className="card">
              <div className="p-6">
                <h3 className="font-semibold mb-4">Account Information</h3>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">Member Since</span>
                    <span className="text-sm text-gray-300">
                      {new Date(mockUser.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">Last Updated</span>
                    <span className="text-sm text-gray-300">
                      {new Date(mockUser.updated_at).toLocaleDateString()}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">User ID</span>
                    <span className="text-sm text-gray-300 font-mono">
                      {mockUser.id}
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
                    Send Password Reset
                  </button>
                  <button className="w-full text-left px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors">
                    {mockUser.status === 'active' ? 'Suspend User' : 'Activate User'}
                  </button>
                  <button className="w-full text-left px-3 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-600/10 rounded-lg transition-colors">
                    Delete User
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
} 