import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Eye, EyeOff, Mail, Lock, User, Building, ArrowRight, Sparkles, Loader, CheckCircle, XCircle } from 'lucide-react';
import { checkUsernameAvailability, validateUsernameFormat } from '../../lib/supabase';

const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [usernameStatus, setUsernameStatus] = useState<{
    checking: boolean;
    available: boolean | null;
    message: string;
  }>({ checking: false, available: null, message: '' });
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    company: '',
    username: ''
  });
  const [error, setError] = useState('');

  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();

  const handleUsernameChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const username = e.target.value.toLowerCase();
    setFormData(prev => ({ ...prev, username }));
    
    // Clear previous status
    setUsernameStatus({ checking: false, available: null, message: '' });
    
    if (!username) {
      return;
    }
    
    if (username.length < 3) {
      setUsernameStatus({
        checking: false,
        available: false,
        message: 'Username must be at least 3 characters'
      });
      return;
    }
    
    if (username.length >= 3) {
      const formatValidation = validateUsernameFormat(username);
      if (!formatValidation.valid) {
        setUsernameStatus({
          checking: false,
          available: false,
          message: formatValidation.message || 'Invalid format'
        });
        return;
      }
      
      setUsernameStatus({ checking: true, available: null, message: 'Checking availability...' });
      
      try {
        const { available, error } = await checkUsernameAvailability(username);
        if (error) {
          setUsernameStatus({
            checking: false,
            available: false,
            message: 'Error checking availability'
          });
        } else {
          setUsernameStatus({
            checking: false,
            available,
            message: available ? `${username} is available!` : `${username} is already taken`
          });
        }
      } catch (error) {
        setUsernameStatus({
          checking: false,
          available: false,
          message: 'Error checking availability'
        });
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isLogin) {
        const { error } = await signIn(formData.email, formData.password);
        if (error) throw error;
        navigate('/dashboard');
      } else {
        // Validate username before signup if provided
        if (formData.username && !usernameStatus.available) {
          throw new Error('Please choose an available username');
        }
        
        const { error } = await signUp(formData.email, formData.password, {
          first_name: formData.firstName,
          last_name: formData.lastName,
          company: formData.company,
          username: formData.username
        });
        if (error) throw error;
        navigate('/dashboard');
      }
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-slate-900/[0.04] bg-[length:75px_75px]"></div>
      
      <div className="relative w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="inline-flex items-center space-x-2 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">C</span>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">Credo</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {isLogin ? 'Welcome back' : 'Get started'}
          </h1>
          <p className="text-gray-600">
            {isLogin ? 'Sign in to your account' : 'Create your account and start collecting testimonials'}
          </p>
        </div>

        {/* Auth Form */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20 animate-slide-up">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Sign Up Fields */}
            {!isLogin && (
              <div className="grid grid-cols-2 gap-4 animate-slide-in">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    First Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="John"
                      required={!isLogin}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Last Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="Doe"
                      required={!isLogin}
                    />
                  </div>
                </div>
              </div>
            )}

            {!isLogin && (
              <div className="animate-slide-in" style={{ animationDelay: '200ms' }}>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Username
                </label>
                <p className="text-xs text-gray-500 mb-2">
                  This will be your unique URL. Use only lowercase letters, numbers, and hyphens (e.g., acme-corp).
                </p>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleUsernameChange}
                    className="w-full pl-10 pr-12 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="your-username"
                    required={!isLogin}
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    {usernameStatus.checking && <Loader className="w-4 h-4 text-gray-400 animate-spin" />}
                    {!usernameStatus.checking && usernameStatus.available === true && <CheckCircle className="w-4 h-4 text-green-500" />}
                    {!usernameStatus.checking && usernameStatus.available === false && <XCircle className="w-4 h-4 text-red-500" />}
                  </div>
                </div>
                {usernameStatus.message && (
                  <p className={`text-xs mt-1 ${
                    usernameStatus.available === true ? 'text-green-600' : 
                    usernameStatus.available === false ? 'text-red-600' : 'text-gray-500'
                  }`}>
                    {usernameStatus.message}
                  </p>
                )}
                {formData.username && (
                  <p className="text-xs text-blue-600 mt-1">
                    Your links will be: <span className="font-mono">credo.app/c/{formData.username}/link-name</span>
                  </p>
                )}
              </div>
            )}

            {!isLogin && (
              <div className="animate-slide-in" style={{ animationDelay: '100ms' }}>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Company (Optional)
                </label>
                <div className="relative">
                  <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Acme Inc."
                  />
                </div>
              </div>
            )}

            {/* Email */}
            <div className="animate-slide-in" style={{ animationDelay: isLogin ? '0ms' : '200ms' }}>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="john@example.com"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="animate-slide-in" style={{ animationDelay: isLogin ? '100ms' : '300ms' }}>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-12 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 animate-slide-in">
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}

            {/* Submit Button */}
            {/* Submit Button */}
<button
    disabled={loading}
    className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-3 px-6 rounded-xl font-semibold transition-all duration-200 hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center space-x-2 animate-slide-in"
    style={{ animationDelay: isLogin ? '200ms' : '400ms' }}
>
    {loading ? (
        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
    ) : (
        <>
            <span>{isLogin ? 'Sign In' : 'Create Account'}</span>
            <ArrowRight className="w-5 h-5" />
        </>
    )}
</button>

            {/* Toggle Auth Mode */}
            <div className="text-center animate-slide-in" style={{ animationDelay: isLogin ? '300ms' : '500ms' }}>
              <p className="text-gray-600">
                {isLogin ? "Don't have an account?" : "Already have an account?"}
                <button
    type="button"
    onClick={() => {
        setIsLogin(!isLogin);
        setError('');
        setFormData({
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            company: '',
            username: '' // <-- Add this to clear the username
        });
        // Add this to clear the username availability message
        setUsernameStatus({ checking: false, available: null, message: '' });
    }}
    className="ml-2 text-blue-600 hover:text-blue-700 font-semibold transition-colors"
>
    {isLogin ? 'Sign up' : 'Sign in'}
</button>
              </p>
            </div>
          </form>
        </div>

        {/* Features Preview */}
        <div className="mt-8 text-center animate-fade-in" style={{ animationDelay: '600ms' }}>
          <div className="flex items-center justify-center space-x-6 text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-blue-500" />
              <span>Easy Setup</span>
            </div>
            <div className="flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-green-500" />
              <span>Auto Collection</span>
            </div>
            <div className="flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-purple-500" />
              <span>Beautiful Widgets</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;