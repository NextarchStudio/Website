import { Metadata } from "next";
import { cookies } from "next/headers";
import Link from "next/link";
import { 
  GamepadIcon, 
  Newspaper, 
  Users, 
  Mail, 
  TrendingUp, 
  Eye, 
  Plus,
  BarChart3,
  Activity,
  Clock,
  ExternalLink,
  Briefcase
} from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import { verifyJWT, AUTH_COOKIE_NAME } from "@/lib/auth";
import type { User } from "@/types";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Nextarch Studio admin panel dashboard with overview and quick actions.",
};

// Mock data for dashboard
const dashboardStats = {
  totalGames: 2,
  totalNews: 2,
  totalUsers: 1247,
  monthlyViews: 15843,
  recentActivity: [
    {
      id: 1,
      type: "game_update",
      title: "Scrap Siege: Arena alpha test announced",
      time: "2 hours ago",
      user: "Alex Chen",
    },
    {
      id: 2,
      type: "news_created",
      title: "Nextarch AI NPC system milestone reached",
      time: "4 hours ago", 
      user: "Maya Rodriguez",
    },
    {
      id: 3,
      type: "user_signup",
      title: "15 new community members joined",
      time: "6 hours ago",
      user: "System",
    },
    {
      id: 4,
      type: "contact_received",
      title: "Partnership inquiry received",
      time: "1 day ago",
      user: "Contact Form",
    },
  ],
};

function DashboardCard({ 
  title, 
  value, 
  change, 
  icon: Icon, 
  href 
}: { 
  title: string; 
  value: string | number; 
  change?: string; 
  icon: React.ComponentType<{ className?: string }>; 
  href?: string; 
}) {
  const CardContent = (
    <div className="card p-6 hover:bg-white/10 transition-colors">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-400 text-sm font-medium">{title}</p>
          <p className="text-2xl font-bold mt-1">{value}</p>
          {change && (
            <p className="text-green-400 text-sm mt-1 flex items-center space-x-1">
              <TrendingUp className="h-3 w-3" />
              <span>{change}</span>
            </p>
          )}
        </div>
        <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center">
          <Icon className="h-6 w-6 text-blue-400" />
        </div>
      </div>
    </div>
  );

  return href ? <Link href={href}>{CardContent}</Link> : CardContent;
}

function QuickActionCard({ 
  title, 
  description, 
  icon: Icon, 
  href, 
  color = "blue" 
}: { 
  title: string; 
  description: string; 
  icon: React.ComponentType<{ className?: string }>; 
  href: string; 
  color?: string; 
}) {
  const colorClasses = {
    blue: "from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800",
    green: "from-green-600 to-green-700 hover:from-green-700 hover:to-green-800",
    purple: "from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800",
    orange: "from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800",
  };

  return (
    <Link 
      href={href}
      className={`block p-6 bg-gradient-to-br ${colorClasses[color as keyof typeof colorClasses]} rounded-lg hover:scale-105 transition-transform text-white`}
    >
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
          <Icon className="h-6 w-6" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold mb-1">{title}</h3>
          <p className="text-sm opacity-90">{description}</p>
        </div>
        <ExternalLink className="h-4 w-4 opacity-70" />
      </div>
    </Link>
  );
}

function RecentActivity() {
  const activityIcons = {
    game_update: GamepadIcon,
    news_created: Newspaper,
    user_signup: Users,
    contact_received: Mail,
  };

  return (
    <div className="card p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Activity className="h-5 w-5 text-blue-400" />
        <h2 className="text-lg font-semibold">Recent Activity</h2>
      </div>
      
      <div className="space-y-4">
        {dashboardStats.recentActivity.map((activity) => {
          const Icon = activityIcons[activity.type as keyof typeof activityIcons];
          return (
            <div key={activity.id} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-white/5 transition-colors">
              <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center">
                <Icon className="h-5 w-5 text-gray-400" />
              </div>
              <div className="flex-1">
                <p className="font-medium">{activity.title}</p>
                <div className="flex items-center space-x-2 text-sm text-gray-400">
                  <Clock className="h-3 w-3" />
                  <span>{activity.time}</span>
                  <span>•</span>
                  <span>{activity.user}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="mt-6 pt-4 border-t border-gray-800">
        <Link
          href="/admin/analytics"
          className="text-blue-400 hover:text-blue-300 text-sm inline-flex items-center space-x-1"
        >
          <span>View all activity</span>
          <ExternalLink className="h-3 w-3" />
        </Link>
      </div>
    </div>
  );
}

export default async function AdminDashboard() {
  // Get authenticated user from middleware
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_COOKIE_NAME)?.value;
  
  let user = null;
  if (token) {
    try {
      user = verifyJWT(token);
    } catch (error) {
      console.error('Error verifying JWT:', error);
    }
  }

  // If no valid user, redirect to login
  if (!user || !user.isAdmin) {
    // Instead of throwing an error, redirect to login
    const { redirect } = await import('next/navigation');
    redirect('/admin/login');
  }

  // At this point, user is guaranteed to be non-null and isAdmin is true
  const authenticatedUser = user as User;

  return (
    <AdminLayout user={authenticatedUser}>
      <div className="space-y-8">
        {/* Welcome Section */}
        <div>
          <h1 className="text-2xl font-bold mb-2">
            Welcome back, {authenticatedUser.username}!
          </h1>
          <p className="text-gray-400">
            Here&apos;s what&apos;s happening with your studio today.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <DashboardCard
            title="Total Games"
            value={dashboardStats.totalGames}
            change="+1 this month"
            icon={GamepadIcon}
            href="/admin/games"
          />
          <DashboardCard
            title="News Articles"
            value={dashboardStats.totalNews}
            change="+2 this week"
            icon={Newspaper}
            href="/admin/news"
          />
          <DashboardCard
            title="Community Members"
            value={dashboardStats.totalUsers.toLocaleString()}
            change="+12% this month"
            icon={Users}
          />
          <DashboardCard
            title="Monthly Views"
            value={dashboardStats.monthlyViews.toLocaleString()}
            change="+23% vs last month"
            icon={Eye}
          />
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <QuickActionCard
              title="Add Game"
              description="Create a new game entry"
              icon={GamepadIcon}
              href="/admin/games/new"
              color="blue"
            />
            <QuickActionCard
              title="Write News"
              description="Publish a news article"
              icon={Newspaper}
              href="/admin/news/new"
              color="green"
            />
            <QuickActionCard
              title="Post Job"
              description="Create a job listing"
              icon={Briefcase}
              href="/admin/jobs/new"
              color="purple"
            />
            <QuickActionCard
              title="View Analytics"
              description="Check performance metrics"
              icon={BarChart3}
              href="/admin/analytics"
              color="orange"
            />
          </div>
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <RecentActivity />
          </div>
          
          {/* Quick Stats */}
          <div className="space-y-6">
            <div className="card p-6">
              <h3 className="text-lg font-semibold mb-4">Today&apos;s Overview</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">New Games</span>
                  <span className="font-semibold">0</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">News Published</span>
                  <span className="font-semibold">1</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Contact Messages</span>
                  <span className="font-semibold">3</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Active Users</span>
                  <span className="font-semibold">847</span>
                </div>
              </div>
            </div>
            
            <div className="card p-6">
              <h3 className="text-lg font-semibold mb-4">System Status</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Database</span>
                  <span className="text-green-400 text-sm">Online</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">API</span>
                  <span className="text-green-400 text-sm">Healthy</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">CDN</span>
                  <span className="text-green-400 text-sm">Fast</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Uptime</span>
                  <span className="text-green-400 text-sm">99.9%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}