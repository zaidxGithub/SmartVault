

import React, { useState } from 'react';
import { Eye, EyeOff, Shield, Lock, Mail, User, MoonIcon, BotOffIcon } from 'lucide-react';
import{Await, useNavigate} from"react-router-dom"

import { loginWithEmail, registerWithEmail ,loginWithGoogle} from '../services/authService';

export default function SmartVaultAuth() {
  const [isRegistered, setisRegistered] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [theme, setTheme] = useState('light'); // 'light' or 'dark'
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: ''

  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  const navigate=useNavigate();
  const handleSubmit =async (e) => {
    e.preventDefault();
    console.log('Authentication request:', formData);
    try {
       if(isRegistered){
        loginWithEmail(formData.email,formData.password,formData.name)
        navigate("/");
       
       }else{
         registerWithEmail(formData.email,formData.password)
       }
      
    } catch (error) {
      console.log("Error while login/register: ",e)
      
    }

   


  };

  const handleGoogleAuth = () => {

    console.log('Google SSO authentication initiated');
    loginWithGoogle();
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const inputClass = `w-full pl-10 pr-12 py-3 rounded-lg transition-colors duration-300 ${
    theme === 'dark'
      ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-400 focus:ring-white focus:border-white'
      : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400 focus:ring-slate-900 focus:border-slate-900'
  }`;

  const cardClass = `rounded-lg shadow-xl overflow-hidden transition-colors duration-300 ${
    theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'
  }`;

  const tabActiveClass = (active) =>
    `flex-1 py-4 px-6 text-sm font-semibold transition-colors border-b-2 ${
      active
        ? theme === 'dark'
          ? 'text-white border-white bg-slate-800'
          : 'text-slate-900 border-slate-900 bg-white'
        : 'text-slate-500 border-transparent hover:text-slate-700'
    }`;

  const themeText = theme === 'dark' ? 'text-white' : 'text-slate-900';
  const themeBg = theme === 'dark' ? 'bg-slate-900' : 'bg-gray-50';


  return (
    <div className={`${themeBg} ${themeText} min-h-screen flex items-center justify-center px-4 py-8 transition-colors duration-300`}>
      <div className="w-full max-w-md">
        {/* Theme Toggle */}
        <div className="flex justify-end mb-4">
          <button
            onClick={toggleTheme}
            className="px-3 py-1 border rounded-lg hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors"
          >
            {theme === 'light' ? <MoonIcon/> :< MoonIcon/>}
          </button>
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-6">
            <div className={`${theme === 'dark' ? 'bg-slate-700' : 'bg-slate-900'} p-4 rounded-2xl shadow-lg`}>
              <Shield className="w-10 h-10 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-2">SmartVault</h1>
          <p className="font-medium">{isRegistered ? 'Enterprise Secure Storage Platform' : 'Create Your Account Securely'}</p>
        </div>

        {/* Authentication Card */}
        <div className={cardClass}>
          {/* Tabs */}
          <div className={`${theme === 'dark' ? 'bg-slate-700 border-slate-600' : 'bg-gray-50 border-gray-200'} border-b`}>
            <div className="flex">
              <button onClick={() => setisRegistered(true)} className={tabActiveClass(isRegistered)}>Sign In</button>
              <button onClick={() => setisRegistered(false)} className={tabActiveClass(!isRegistered)}>Create Account</button>
            </div>
          </div>

          <div className="p-8 space-y-5">
            {/* Full Name - Sign Up Only */}
            {!isRegistered && (
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">Username*</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={inputClass}
                    required
                  />
                </div>
              </div>
            )}

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">Email Address *</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email address"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={inputClass}
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-2">Password *</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={inputClass}
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

            {/* Confirm Password - Sign Up */}
            {!isRegistered && (
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium mb-2">Confirm Password *</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className={inputClass}
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

                {/* Password Requirements */}
                <div className={`${theme === 'dark' ? 'bg-slate-700 text-slate-200' : 'bg-gray-50 text-slate-700'} text-xs p-3 rounded-lg mt-2`}>
                  <p className="font-medium mb-1">Password requirements:</p>
                  <ul className="space-y-1">
                    <li>• Minimum 8 characters</li>
                    <li>• At least one uppercase letter</li>
                    <li>• At least one number</li>
                    <li>• At least one special character</li>
                  </ul>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              className={`${theme === 'dark' ? 'bg-white text-slate-900 hover:bg-slate-200' : 'bg-slate-900 text-white hover:bg-slate-800'} w-full mt-6 font-semibold py-3 px-4 rounded-lg transition-colors duration-200`}
            >
              {isRegistered ? 'Sign In to SmartVault' : 'Create SmartVault Account'}
            </button>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className={`w-full border-t ${theme === 'dark' ? 'border-slate-600' : 'border-slate-200'}`}></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className={`${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'} px-4 font-medium bg-${theme === 'dark' ? 'slate-800' : 'white'}`}>
                  Or continue with
                </span>
              </div>
            </div>

            {/* Google SSO */}
            <button
              onClick={handleGoogleAuth}
              className={`${theme === 'dark' ? 'bg-slate-700 border-slate-600 hover:bg-slate-600 text-white' : 'bg-white border-slate-300 hover:bg-gray-50 text-slate-700'} w-full font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-3`}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span>Sign in with Google Workspace</span>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 space-y-4">
          {!isRegistered && (
            <div className="text-center px-4">
              <p className={`${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'} text-xs leading-relaxed`}>
                By creating an account, you agree to our{' '}
                <button className="underline font-medium hover:text-slate-300">Terms of Service</button> and{' '}
                <button className="underline font-medium hover:text-slate-300">Privacy Policy</button>.
              </p>
            </div>
          )}
          <div className={`${theme === 'dark' ? 'bg-slate-700 border-slate-600 text-slate-200' : 'bg-white border-slate-200 text-slate-500'} border rounded-lg p-4`}>
            <div className="flex items-center justify-center space-x-6 text-xs">
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4" />
                <span>AES-256 Encryption</span>
              </div>
              <div className="flex items-center space-x-2">
                <Lock className="w-4 h-4" />
                <span>SOC 2 Compliant</span>
              </div>
            </div>
            <div className="text-center mt-2 text-xs">
              © 2024 SmartVault. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
