"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Shield, Users, Lock, AlertCircle, X } from "lucide-react";

export default function AdminLoginPage() {
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Get error from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const errorParam = urlParams.get('error');
    
    if (errorParam) {
      const errorMessages: Record<string, string> = {
        'auth_failed': 'Authentication failed. Please try again.',
        'oauth_denied': 'Discord authentication was cancelled.',
        'no_code': 'No authorization code received from Discord.',
        'token_failed': 'Failed to exchange authorization code for token.',
        'user_failed': 'Failed to retrieve user information from Discord.',
        'not_member': 'You must be a member of the Nextarch Studio Discord server to access the admin panel.',
        'config_error': 'Server configuration error. Please contact an administrator.',
        'callback_failed': 'Authentication callback failed. Please try again.',
      };
      
      setError(errorMessages[errorParam] || 'An unknown error occurred.');
    }
  }, []);

  const handleDiscordLogin = () => {
    // Clear any existing errors
    setError(null);
    // Redirect to Discord OAuth
    window.location.href = '/api/auth/discord';
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Shield className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Admin Access</h1>
          <p className="text-gray-400">
            Secure access to Nextarch Studio content management system
          </p>
        </div>

        {/* Login Card */}
        <div className="card p-8 space-y-6">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-center">
              Authentication Required
            </h2>
            <div className="text-center text-gray-400 text-sm">
              Only members of the Nextarch Studio Discord server can access this panel.
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-600/10 border border-red-600/20 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <AlertCircle className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-red-400 mb-1">
                    Authentication Error
                  </h3>
                  <p className="text-sm text-red-300">{error}</p>
                </div>
                <button
                  onClick={() => setError(null)}
                  className="text-red-400 hover:text-red-300 transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}

          {/* Discord Login */}
          <div className="space-y-4">
            <button
              onClick={handleDiscordLogin}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
            >
              <Users className="h-5 w-5" />
              <span>Login with Discord</span>
            </button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-700" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-gray-800 px-2 text-gray-400">
                  Development Mode
                </span>
              </div>
            </div>

            {/* Development Mode Button */}
            <Link
              href="/api/auth/dev-login"
              className="w-full bg-gray-700 hover:bg-gray-600 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2 text-sm"
            >
              <Lock className="h-4 w-4" />
              <span>Dev Mode Login (Testing Only)</span>
            </Link>
          </div>

          {/* Info */}
          <div className="space-y-3">
            <div className="bg-blue-600/10 border border-blue-600/20 rounded-lg p-4">
              <h3 className="text-sm font-medium text-blue-400 mb-2">
                Access Requirements:
              </h3>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>• Must be a member of Nextarch Studio Discord</li>
                <li>• Valid Discord account</li>
                <li>• Active Discord membership</li>
              </ul>
            </div>

            <div className="text-center">
              <Link
                href="/"
                className="text-blue-400 hover:text-blue-300 text-sm inline-flex items-center space-x-1"
              >
                <span>← Back to Main Site</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-gray-500 text-sm">
          <p>
            Need access? Contact{" "}
            <Link
              href="mailto:admin@nextarch.studio"
              className="text-blue-400 hover:text-blue-300"
            >
              admin@nextarch.studio
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}