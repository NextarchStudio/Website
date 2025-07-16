import { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Eye, 
  MousePointer,
  Clock,
  Globe,
  BarChart3,
  Activity
} from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import { verifyJWT, AUTH_COOKIE_NAME, mockAdminUser } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Admin - Analytics",
  description: "View analytics and performance metrics in the Nextarch Studio admin panel.",
};

// Mock analytics data
const mockAnalytics = {
  overview: {
    totalVisitors: 15843,
    uniqueVisitors: 1247,
    pageViews: 45231,
    avgSessionDuration: "2m 34s",
    bounceRate: "34.2%",
  },
  topPages: [
    { path: "/", views: 12450, change: "+12%" },
    { path: "/games", views: 8234, change: "+8%" },
    { path: "/games/scrap-siege-arena", views: 5678, change: "+23%" },
    { path: "/news", views: 3456, change: "+5%" },
    { path: "/about", views: 2345, change: "+3%" },
  ],
  trafficSources: [
    { source: "Direct", percentage: 45, visitors: 7121 },
    { source: "Google", percentage: 32, visitors: 5069 },
    { source: "Discord", percentage: 15, visitors: 2376 },
    { source: "Twitter", percentage: 8, visitors: 1267 },
  ],
  recentActivity: [
    { time: "2 hours ago", event: "New visitor from Discord", user: "User123" },
    { time: "4 hours ago", event: "Page view: Scrap Siege: Arena", user: "Anonymous" },
    { time: "6 hours ago", event: "Contact form submission", user: "john.smith@example.com" },
    { time: "1 day ago", event: "Newsletter signup", user: "sarah.j@studio.com" },
  ],
};

export default async function AdminAnalyticsPage() {
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
        <div>
          <h1 className="text-2xl font-bold mb-2">Analytics Dashboard</h1>
          <p className="text-gray-400">
            Monitor your site's performance and visitor engagement.
          </p>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm font-medium">Total Visitors</p>
                <p className="text-2xl font-bold mt-1">{mockAnalytics.overview.totalVisitors.toLocaleString()}</p>
                <p className="text-green-400 text-sm mt-1 flex items-center space-x-1">
                  <TrendingUp className="h-3 w-3" />
                  <span>+12% this month</span>
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center">
                <Users className="h-6 w-6 text-blue-400" />
              </div>
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm font-medium">Unique Visitors</p>
                <p className="text-2xl font-bold mt-1">{mockAnalytics.overview.uniqueVisitors.toLocaleString()}</p>
                <p className="text-green-400 text-sm mt-1 flex items-center space-x-1">
                  <TrendingUp className="h-3 w-3" />
                  <span>+8% this month</span>
                </p>
              </div>
              <div className="w-12 h-12 bg-green-600/20 rounded-lg flex items-center justify-center">
                <Eye className="h-6 w-6 text-green-400" />
              </div>
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm font-medium">Page Views</p>
                <p className="text-2xl font-bold mt-1">{mockAnalytics.overview.pageViews.toLocaleString()}</p>
                <p className="text-green-400 text-sm mt-1 flex items-center space-x-1">
                  <TrendingUp className="h-3 w-3" />
                  <span>+15% this month</span>
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-600/20 rounded-lg flex items-center justify-center">
                <MousePointer className="h-6 w-6 text-purple-400" />
              </div>
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm font-medium">Avg. Session</p>
                <p className="text-2xl font-bold mt-1">{mockAnalytics.overview.avgSessionDuration}</p>
                <p className="text-green-400 text-sm mt-1 flex items-center space-x-1">
                  <TrendingUp className="h-3 w-3" />
                  <span>+5% this month</span>
                </p>
              </div>
              <div className="w-12 h-12 bg-orange-600/20 rounded-lg flex items-center justify-center">
                <Clock className="h-6 w-6 text-orange-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Charts and Data */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Top Pages */}
          <div className="card p-6">
            <div className="flex items-center space-x-2 mb-6">
              <BarChart3 className="h-5 w-5 text-blue-400" />
              <h2 className="text-lg font-semibold">Top Pages</h2>
            </div>
            
            <div className="space-y-4">
              {mockAnalytics.topPages.map((page, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition-colors">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center">
                      <span className="text-sm font-bold">{index + 1}</span>
                    </div>
                    <div>
                      <p className="font-medium">{page.path}</p>
                      <p className="text-sm text-gray-400">{page.views.toLocaleString()} views</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-green-400 text-sm">{page.change}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Traffic Sources */}
          <div className="card p-6">
            <div className="flex items-center space-x-2 mb-6">
              <Globe className="h-5 w-5 text-green-400" />
              <h2 className="text-lg font-semibold">Traffic Sources</h2>
            </div>
            
            <div className="space-y-4">
              {mockAnalytics.trafficSources.map((source, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition-colors">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-700 rounded-lg flex items-center justify-center">
                      <span className="text-sm font-bold text-white">{source.percentage}%</span>
                    </div>
                    <div>
                      <p className="font-medium">{source.source}</p>
                      <p className="text-sm text-gray-400">{source.visitors.toLocaleString()} visitors</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="card p-6">
          <div className="flex items-center space-x-2 mb-6">
            <Activity className="h-5 w-5 text-purple-400" />
            <h2 className="text-lg font-semibold">Recent Activity</h2>
          </div>
          
          <div className="space-y-4">
            {mockAnalytics.recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-white/5 transition-colors">
                <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center">
                  <Activity className="h-5 w-5 text-gray-400" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">{activity.event}</p>
                  <div className="flex items-center space-x-2 text-sm text-gray-400">
                    <Clock className="h-3 w-3" />
                    <span>{activity.time}</span>
                    <span>•</span>
                    <span>{activity.user}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
} 