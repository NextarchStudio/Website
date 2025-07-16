"use client";

import { useState } from "react";
import { 
  Settings, 
  Save,
  Upload,
  Globe,
  Palette,
  Shield,
  Bell,
  X,
  CheckCircle
} from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import { mockAdminUser } from "@/lib/auth";

interface SettingsForm {
  general: {
    siteName: string;
    siteDescription: string;
    contactEmail: string;
    socialLinks: {
      twitter: string;
      discord: string;
      linkedin: string;
    };
  };
  appearance: {
    primaryColor: string;
    logoUrl: string;
    faviconUrl: string;
    theme: "dark" | "light" | "auto";
  };
  security: {
    enableTwoFactor: boolean;
    sessionTimeout: number;
    maxLoginAttempts: number;
  };
  notifications: {
    emailNotifications: boolean;
    adminAlerts: boolean;
    contactFormAlerts: boolean;
  };
}

export default function AdminSettingsPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [settings, setSettings] = useState<SettingsForm>({
    general: {
      siteName: "Nextarch Studio",
      siteDescription: "Crafting Tomorrow's Games Today",
      contactEmail: "contact@nextarch.studio",
      socialLinks: {
        twitter: "https://twitter.com/nextarchstudio",
        discord: "https://discord.gg/nextarch",
        linkedin: "https://linkedin.com/company/nextarch-studio",
      },
    },
    appearance: {
      primaryColor: "#3B82F6",
      logoUrl: "/logo.png",
      faviconUrl: "/favicon.ico",
      theme: "dark",
    },
    security: {
      enableTwoFactor: true,
      sessionTimeout: 24,
      maxLoginAttempts: 5,
    },
    notifications: {
      emailNotifications: true,
      adminAlerts: true,
      contactFormAlerts: true,
    },
  });

  const handleInputChange = (section: keyof SettingsForm, field: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const handleNestedInputChange = (section: keyof SettingsForm, parent: string, field: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [parent]: {
          ...(prev[section] as any)[parent],
          [field]: value,
        },
      },
    }));
  };

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Here you would typically upload to your file storage service
      console.log("Uploading logo:", file.name);
      
      // Simulate upload and get URL
      const logoUrl = URL.createObjectURL(file);
      handleInputChange("appearance", "logoUrl", logoUrl);
    }
  };

  const handleFaviconUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Here you would typically upload to your file storage service
      console.log("Uploading favicon:", file.name);
      
      // Simulate upload and get URL
      const faviconUrl = URL.createObjectURL(file);
      handleInputChange("appearance", "faviconUrl", faviconUrl);
    }
  };

  const handleSaveSettings = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(settings),
      });

      if (!response.ok) {
        throw new Error('Failed to save settings');
      }
      
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      console.error("Error saving settings:", error);
      alert('Failed to save settings. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AdminLayout user={mockAdminUser}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">Site Settings</h1>
            <p className="text-gray-400">
              Configure your website settings and preferences.
            </p>
          </div>
          <button
            onClick={handleSaveSettings}
            disabled={isLoading}
            className="btn-primary inline-flex items-center space-x-2"
          >
            <Save className="h-4 w-4" />
            <span>{isLoading ? "Saving..." : "Save Settings"}</span>
          </button>
        </div>

      {/* Success Message */}
      {showSuccess && (
        <div className="card p-4 bg-green-600/20 border border-green-600/30">
          <div className="flex items-center space-x-2">
            <CheckCircle className="h-5 w-5 text-green-400" />
            <span className="text-green-400">Settings saved successfully!</span>
          </div>
        </div>
      )}

      {/* Settings Sections */}
      <div className="space-y-8">
        {/* General Settings */}
        <div className="card p-6">
          <div className="flex items-center space-x-2 mb-6">
            <Globe className="h-5 w-5 text-blue-400" />
            <h2 className="text-lg font-semibold">General Settings</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Site Name</label>
              <input
                type="text"
                value={settings.general.siteName}
                onChange={(e) => handleInputChange("general", "siteName", e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Contact Email</label>
              <input
                type="email"
                value={settings.general.contactEmail}
                onChange={(e) => handleInputChange("general", "contactEmail", e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2">Site Description</label>
              <textarea
                rows={3}
                value={settings.general.siteDescription}
                onChange={(e) => handleInputChange("general", "siteDescription", e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Twitter URL</label>
              <input
                type="url"
                value={settings.general.socialLinks.twitter}
                onChange={(e) => handleNestedInputChange("general", "socialLinks", "twitter", e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Discord URL</label>
              <input
                type="url"
                value={settings.general.socialLinks.discord}
                onChange={(e) => handleNestedInputChange("general", "socialLinks", "discord", e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">LinkedIn URL</label>
              <input
                type="url"
                value={settings.general.socialLinks.linkedin}
                onChange={(e) => handleNestedInputChange("general", "socialLinks", "linkedin", e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Appearance Settings */}
        <div className="card p-6">
          <div className="flex items-center space-x-2 mb-6">
            <Palette className="h-5 w-5 text-purple-400" />
            <h2 className="text-lg font-semibold">Appearance</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Primary Color</label>
              <input
                type="color"
                value={settings.appearance.primaryColor}
                onChange={(e) => handleInputChange("appearance", "primaryColor", e.target.value)}
                className="w-full h-10 bg-gray-800 border border-gray-700 rounded-lg cursor-pointer"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Theme</label>
              <select
                value={settings.appearance.theme}
                onChange={(e) => handleInputChange("appearance", "theme", e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="dark">Dark</option>
                <option value="light">Light</option>
                <option value="auto">Auto</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Logo</label>
              <div className="flex items-center space-x-3">
                {settings.appearance.logoUrl && (
                  <img
                    src={settings.appearance.logoUrl}
                    alt="Logo"
                    className="w-12 h-12 object-contain bg-gray-800 rounded"
                  />
                )}
                <label className="btn-secondary cursor-pointer inline-flex items-center space-x-2">
                  <Upload className="h-4 w-4" />
                  <span>Upload Logo</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleLogoUpload}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Favicon</label>
              <div className="flex items-center space-x-3">
                {settings.appearance.faviconUrl && (
                  <img
                    src={settings.appearance.faviconUrl}
                    alt="Favicon"
                    className="w-8 h-8 object-contain bg-gray-800 rounded"
                  />
                )}
                <label className="btn-secondary cursor-pointer inline-flex items-center space-x-2">
                  <Upload className="h-4 w-4" />
                  <span>Upload Favicon</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFaviconUpload}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Security Settings */}
        <div className="card p-6">
          <div className="flex items-center space-x-2 mb-6">
            <Shield className="h-5 w-5 text-red-400" />
            <h2 className="text-lg font-semibold">Security</h2>
          </div>
          
          <div className="space-y-4">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={settings.security.enableTwoFactor}
                onChange={(e) => handleInputChange("security", "enableTwoFactor", e.target.checked)}
                className="rounded border-gray-600 bg-gray-800 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm">Enable Two-Factor Authentication</span>
            </label>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Session Timeout (hours)</label>
                <input
                  type="number"
                  min="1"
                  max="168"
                  value={settings.security.sessionTimeout}
                  onChange={(e) => handleInputChange("security", "sessionTimeout", parseInt(e.target.value))}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Max Login Attempts</label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={settings.security.maxLoginAttempts}
                  onChange={(e) => handleInputChange("security", "maxLoginAttempts", parseInt(e.target.value))}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="card p-6">
          <div className="flex items-center space-x-2 mb-6">
            <Bell className="h-5 w-5 text-yellow-400" />
            <h2 className="text-lg font-semibold">Notifications</h2>
          </div>
          
          <div className="space-y-4">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={settings.notifications.emailNotifications}
                onChange={(e) => handleInputChange("notifications", "emailNotifications", e.target.checked)}
                className="rounded border-gray-600 bg-gray-800 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm">Email Notifications</span>
            </label>
            
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={settings.notifications.adminAlerts}
                onChange={(e) => handleInputChange("notifications", "adminAlerts", e.target.checked)}
                className="rounded border-gray-600 bg-gray-800 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm">Admin Alerts</span>
            </label>
            
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={settings.notifications.contactFormAlerts}
                onChange={(e) => handleInputChange("notifications", "contactFormAlerts", e.target.checked)}
                className="rounded border-gray-600 bg-gray-800 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm">Contact Form Alerts</span>
            </label>
          </div>
        </div>
      </div>
    </div>
    </AdminLayout>
  );
} 