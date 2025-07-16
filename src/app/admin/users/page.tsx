"use client";

import { useState, useEffect } from "react";
import { 
  Plus, 
  Edit, 
  Eye, 
  Trash2, 
  Users,
  Shield,
  UserPlus,
  Settings,
  Crown,
  User,
  CheckCircle,
  XCircle,
  Loader2
} from "lucide-react";
import Link from "next/link";
import AdminLayout from "@/components/admin/AdminLayout";

interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  role_id: string;
  status: string;
  last_login: string | null;
  permissions: string[];
  roles?: {
    id: string;
    name: string;
    display_name: string;
    permissions: string[];
  };
}

interface Role {
  id: string;
  name: string;
  display_name: string;
  description: string;
  permissions: string[];
  is_default: boolean;
  can_invite_users: boolean;
  requires_approval: boolean;
  created_at: string;
  updated_at: string;
}

const availablePermissions = [
  { key: "manage_users", label: "Manage Users", description: "Create, edit, and delete users" },
  { key: "manage_content", label: "Manage Content", description: "Edit pages and content" },
  { key: "manage_games", label: "Manage Games", description: "Add, edit, and delete games" },
  { key: "manage_news", label: "Manage News", description: "Create and edit news articles" },
  { key: "manage_jobs", label: "Manage Jobs", description: "Post and manage job listings" },
  { key: "view_analytics", label: "View Analytics", description: "Access to analytics and reports" },
  { key: "manage_settings", label: "Manage Settings", description: "Change system settings" }
];

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);

  // Fetch current user and data
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Fetching users and roles...');
        
        // Fetch current user
        const userResponse = await fetch('/api/auth/me');
        if (userResponse.ok) {
          const userData = await userResponse.json();
          setCurrentUser(userData);
        }
        
        // Fetch users
        const usersResponse = await fetch('/api/users');
        if (!usersResponse.ok) {
          throw new Error('Failed to fetch users');
        }
        const usersData = await usersResponse.json();
        console.log('Fetched users:', usersData);
        
        // Fetch roles
        const rolesResponse = await fetch('/api/roles');
        if (!rolesResponse.ok) {
          throw new Error('Failed to fetch roles');
        }
        const rolesData = await rolesResponse.json();
        console.log('Fetched roles:', rolesData);
        
        setUsers(usersData);
        setRoles(rolesData);
      } catch (error) {
        console.error("Error fetching data:", error);
        alert('Failed to load users and roles. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDeleteUser = async (userId: string) => {
    if (!confirm("Are you sure you want to delete this user? This action cannot be undone.")) {
      return;
    }

    setIsDeleting(true);
    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete user');
      }

      // Remove user from the list
      setUsers(prev => prev.filter(user => user.id !== userId));
    } catch (error) {
      console.error("Error deleting user:", error);
      alert('Failed to delete user. Please try again.');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleDeleteRole = async (roleId: string) => {
    if (!confirm("Are you sure you want to delete this role? This action cannot be undone.")) {
      return;
    }

    setIsDeleting(true);
    try {
      const response = await fetch(`/api/roles/${roleId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete role');
      }

      // Remove role from the list
      setRoles(prev => prev.filter(role => role.id !== roleId));
    } catch (error) {
      console.error("Error deleting role:", error);
      alert('Failed to delete role. Please try again.');
    } finally {
      setIsDeleting(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-600/20 text-green-400';
      case 'inactive':
        return 'bg-gray-600/20 text-gray-400';
      case 'suspended':
        return 'bg-red-600/20 text-red-400';
      default:
        return 'bg-gray-600/20 text-gray-400';
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Loading users and roles...</span>
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
            <h1 className="text-2xl font-bold mb-2">Users & Roles Management</h1>
            <p className="text-gray-400">
              Manage team members, roles, and permissions.
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <Link
              href="/admin/users/new"
              className="btn-primary inline-flex items-center space-x-2"
            >
              <UserPlus className="h-4 w-4" />
              <span>Add User</span>
            </Link>
            <Link
              href="/admin/roles/new"
              className="btn-secondary inline-flex items-center space-x-2"
            >
              <Shield className="h-4 w-4" />
              <span>Create Role</span>
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="card p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <Users className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Total Users</p>
                <p className="text-xl font-semibold">{users.length}</p>
              </div>
            </div>
          </div>
          
          <div className="card p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                <CheckCircle className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Active Users</p>
                <p className="text-xl font-semibold">{users.filter(u => u.status === 'active').length}</p>
              </div>
            </div>
          </div>
          
          <div className="card p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
                <Shield className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Roles</p>
                <p className="text-xl font-semibold">{roles.length}</p>
              </div>
            </div>
          </div>
          
          <div className="card p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center">
                <Settings className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Permissions</p>
                <p className="text-xl font-semibold">{availablePermissions.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Users Table */}
        <div className="card">
          <div className="p-6">
            <h2 className="text-lg font-semibold mb-4">Team Members</h2>
            {users.length === 0 ? (
              <div className="text-center py-8">
                <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No users yet</h3>
                <p className="text-gray-400 mb-4">Start building your team by adding the first user.</p>
                <Link
                  href="/admin/users/new"
                  className="btn-primary inline-flex items-center space-x-2"
                >
                  <UserPlus className="h-4 w-4" />
                  <span>Add First User</span>
                </Link>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-800">
                      <th className="text-left py-3 px-4 font-medium text-gray-400">User</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-400">Role</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-400">Status</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-400">Last Login</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-400">Permissions</th>
                      <th className="text-right py-3 px-4 font-medium text-gray-400">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id} className="border-b border-gray-800 hover:bg-gray-900/50">
                        <td className="py-4 px-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                              <User className="h-4 w-4 text-white" />
                            </div>
                            <div>
                              <p className="font-medium">{user.first_name} {user.last_name}</p>
                              <p className="text-sm text-gray-400">{user.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center space-x-2">
                            {user.roles?.name === 'admin' && <Crown className="h-4 w-4 text-yellow-500" />}
                            <span className="px-2 py-1 bg-gray-800 rounded-full text-xs font-medium">
                              {user.roles?.display_name || 'No Role'}
                            </span>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                            {user.status}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-sm text-gray-400">
                          {user.last_login ? new Date(user.last_login).toLocaleDateString() : 'Never'}
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex flex-wrap gap-1">
                            {(user.permissions || []).slice(0, 2).map((permission) => (
                              <span
                                key={permission}
                                className="px-2 py-1 bg-gray-800 rounded-full text-xs text-gray-300"
                              >
                                {permission}
                              </span>
                            ))}
                            {(user.permissions || []).length > 2 && (
                              <span className="px-2 py-1 bg-gray-800 rounded-full text-xs text-gray-400">
                                +{(user.permissions || []).length - 2}
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center justify-end space-x-2">
                            <Link
                              href={`/admin/users/${user.id}`}
                              className="text-gray-400 hover:text-white transition-colors"
                              title="View user"
                            >
                              <Eye className="h-4 w-4" />
                            </Link>
                            <Link
                              href={`/admin/users/${user.id}/edit`}
                              className="text-blue-400 hover:text-blue-300 transition-colors"
                              title="Edit user"
                            >
                              <Edit className="h-4 w-4" />
                            </Link>
                            <button
                              onClick={() => handleDeleteUser(user.id)}
                              disabled={isDeleting}
                              className="text-red-400 hover:text-red-300 transition-colors disabled:opacity-50"
                              title="Delete user"
                            >
                              {isDeleting ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                              ) : (
                                <Trash2 className="h-4 w-4" />
                              )}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* Roles Grid */}
        <div className="card">
          <div className="p-6">
            <h2 className="text-lg font-semibold mb-4">Roles & Permissions</h2>
            {roles.length === 0 ? (
              <div className="text-center py-8">
                <Shield className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No roles yet</h3>
                <p className="text-gray-400 mb-4">Create roles to organize your team's permissions.</p>
                <Link
                  href="/admin/roles/new"
                  className="btn-primary inline-flex items-center space-x-2"
                >
                  <Shield className="h-4 w-4" />
                  <span>Create First Role</span>
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {roles.map((role) => (
                  <div key={role.id} className="border border-gray-800 rounded-lg p-4 hover:bg-gray-900/50 transition-colors">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold flex items-center space-x-2">
                          {role.name === 'admin' && <Crown className="h-4 w-4 text-yellow-500" />}
                          <span>{role.display_name}</span>
                        </h3>
                        <p className="text-sm text-gray-400 mt-1">{role.description}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Link
                          href={`/admin/roles/${role.id}/edit`}
                          className="text-blue-400 hover:text-blue-300 transition-colors"
                          title="Edit role"
                        >
                          <Edit className="h-4 w-4" />
                        </Link>
                        <button
                          onClick={() => handleDeleteRole(role.id)}
                          disabled={isDeleting}
                          className="text-red-400 hover:text-red-300 transition-colors disabled:opacity-50"
                          title="Delete role"
                        >
                          {isDeleting ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <Trash2 className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">Users with this role:</span>
                        <span className="font-medium">
                          {users.filter(u => u.role_id === role.id).length}
                        </span>
                      </div>
                      
                      <div className="flex flex-wrap gap-1">
                        {(role.permissions || []).slice(0, 3).map((permission) => (
                          <span
                            key={permission}
                            className="px-2 py-1 bg-blue-600/20 text-blue-400 rounded-full text-xs"
                          >
                            {permission}
                          </span>
                        ))}
                        {(role.permissions || []).length > 3 && (
                          <span className="px-2 py-1 bg-gray-800 rounded-full text-xs text-gray-400">
                            +{(role.permissions || []).length - 3}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
} 