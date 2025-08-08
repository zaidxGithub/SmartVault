import React, { useState } from 'react';
import { Eye, EyeOff, Shield, Lock, Mail, User, Building2 } from 'lucide-react';

export default function SmartVaultAuth() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    company: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Authentication request:', formData);
    // Handle authentication logic here
  };

  const handleGoogleAuth = () => {
    console.log('Google SSO authentication initiated');
    // Handle Google authentication
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        {/* Professional Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-slate-900 p-4 rounded-2xl shadow-lg">
              <Shield className="w-10 h-10 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">SmartVault</h1>
          <p className="text-slate-600 font-medium">Enterprise Secure Storage Platform</p>
        </div>

        {/* Main Authentication Card */}
        <div className="bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden">
          {/* Tab Navigation */}
          <div className="border-b border-gray-200 bg-gray-50">
            <div className="flex">
              <button
                onClick={() => setIsLogin(true)}
                className={`flex-1 py-4 px-6 text-sm font-semibold transition-colors border-b-2 ${
                  isLogin
                    ? 'text-slate-900 border-slate-900 bg-white'
                    : 'text-slate-500 border-transparent hover:text-slate-700'
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => setIsLogin(false)}
                className={`flex-1 py-4 px-6 text-sm font-semibold transition-colors border-b-2 ${
                  !isLogin
                    ? 'text-slate-900 border-slate-900 bg-white'
                    : 'text-slate-500 border-transparent hover:text-slate-700'
                }`}
              >
                Create Account
              </button>
            </div>
          </div>

          <div className="p-8">
            {/* Form Fields */}
            <div className="space-y-5">
              {/* Full Name - Sign Up Only */}
              {!isLogin && (
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type="text"
                      id="name"
                      name="name"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-slate-900 transition-colors bg-white text-slate-900 placeholder-slate-400"
                      required
                    />
                  </div>
                </div>
              )}

             

              {/* Email Address */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter your email address"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-slate-900 transition-colors bg-white text-slate-900 placeholder-slate-400"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-2">
                  Password *
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-12 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-slate-900 transition-colors bg-white text-slate-900 placeholder-slate-400"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Confirm Password - Sign Up Only */}
              {!isLogin && (
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-700 mb-2">
                    Confirm Password *
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      id="confirmPassword"
                      name="confirmPassword"
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-12 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-slate-900 transition-colors bg-white text-slate-900 placeholder-slate-400"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                    >
                      {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
              )}

              {/* Password Requirements - Sign Up Only */}
              {!isLogin && (
                <div className="text-xs text-slate-500 bg-slate-50 p-3 rounded-lg">
                  <p className="font-medium mb-1">Password requirements:</p>
                  <ul className="space-y-1">
                    <li>• Minimum 8 characters</li>
                    <li>• At least one uppercase letter</li>
                    <li>• At least one number</li>
                    <li>• At least one special character</li>
                  </ul>
                </div>
              )}

              {/* Forgot Password - Login Only */}
              {isLogin && (
                <div className="text-right">
                  <button
                    type="button"
                    className="text-sm text-slate-900 hover:text-slate-700 font-medium transition-colors"
                  >
                    Forgot your password?
                  </button>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              className="w-full mt-6 bg-slate-900 hover:bg-slate-800 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 focus:ring-2 focus:ring-slate-900 focus:ring-offset-2"
            >
              {isLogin ? 'Sign In to SmartVault' : 'Create SmartVault Account'}
            </button>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-slate-500 font-medium">
                  Or continue with
                </span>
              </div>
            </div>

            {/* Google SSO Button */}
            <button
              onClick={handleGoogleAuth}
              className="w-full bg-white border border-slate-300 hover:border-slate-400 text-slate-700 font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-3 hover:bg-slate-50"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              <span>Sign in with Google Workspace</span>
            </button>
          </div>
        </div>

        {/* Legal and Security Footer */}
        <div className="mt-6 space-y-4">
          {/* Terms Agreement - Sign Up Only */}
          {!isLogin && (
            <div className="text-center px-4">
              <p className="text-xs text-slate-500 leading-relaxed">
                By creating an account, you acknowledge that you have read and agree to our{' '}
                <button className="text-slate-900 hover:text-slate-700 font-medium underline transition-colors">
                  Terms of Service
                </button>{' '}
                and{' '}
                <button className="text-slate-900 hover:text-slate-700 font-medium underline transition-colors">
                  Privacy Policy
                </button>
                .
              </p>
            </div>
          )}

          {/* Security Information */}
          <div className="bg-white border border-slate-200 rounded-lg p-4">
            <div className="flex items-center justify-center space-x-6 text-xs text-slate-500">
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4" />
                <span>AES-256 Encryption</span>
              </div>
              <div className="flex items-center space-x-2">
                <Lock className="w-4 h-4" />
                <span>SOC 2 Compliant</span>
              </div>
            </div>
            <div className="text-center mt-2">
              <p className="text-xs text-slate-400">
                © 2024 SmartVault. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}