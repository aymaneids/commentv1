import React, { useState } from 'react';
import { User, CreditCard, Key, Bell, Shield, Download, Trash2, CheckCircle, XCircle, Loader } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { supabase, checkUsernameAvailability, validateUsernameFormat } from '../../lib/supabase';
const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const { user } = useAuth();
  const [userProfile, setUserProfile] = useState<any>(null);
  const [usernameStatus, setUsernameStatus] = useState<{
    checking: boolean;
    available: boolean | null;
    message: string;
  }>({ checking: false, available: null, message: '' });
  const [loading, setLoading] = useState(false);

  // Load user profile data
  React.useEffect(() => {
    const loadUserProfile = async () => {
      if (!user) return;
      
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single();
        
      if (!error && data) {
        setUserProfile(data);
      }
    };
    
    loadUserProfile();
  }, [user]);

  const handleUsernameChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const username = e.target.value.toLowerCase();
    setUserProfile(prev => ({ ...prev, username }));
    
    if (username && username !== userProfile?.username) {
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
            message: available ? `✅ ${username} is available!` : `❌ ${username} is already taken`
          });
        }
      } catch (error) {
        setUsernameStatus({
          checking: false,
          available: false,
          message: 'Error checking availability'
        });
      }
    } else {
      setUsernameStatus({ checking: false, available: null, message: '' });
    }
  };

  const handleSaveProfile = async () => {
    if (!user || !userProfile) return;
    
    setLoading(true);
    try {
      const { error } = await supabase
        .from('users')
        .update({
          first_name: userProfile.first_name,
          last_name: userProfile.last_name,
          company: userProfile.company,
          username: userProfile.username
        })
        .eq('id', user.id);
        
      if (error) throw error;
      
      // Show success message or handle success
      console.log('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setLoading(false);
    }
  };
  const tabs = [
    { id: 'profile', name: 'Profile', icon: User },
    { id: 'billing', name: 'Billing', icon: CreditCard },
    { id: 'api', name: 'API Keys', icon: Key },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'security', name: 'Security', icon: Shield },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Profile Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                  <input
                    type="text"
                    value={userProfile?.first_name || ''}
                    onChange={(e) => setUserProfile(prev => ({ ...prev, first_name: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                  <input
                    type="text"
                    value={userProfile?.last_name || ''}
                    onChange={(e) => setUserProfile(prev => ({ ...prev, last_name: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={user?.email || ''}
                    disabled
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                  <p className="text-xs text-gray-500 mb-2">
                    This will be your unique URL. Use only lowercase letters, numbers, and hyphens.
                  </p>
                  <div className="relative">
                    <input
                      type="text"
                      value={userProfile?.username || ''}
                      onChange={handleUsernameChange}
                      placeholder="your-username"
                      className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                  {userProfile?.username && (
                    <p className="text-xs text-blue-600 mt-1">
                      Your links will be: <span className="font-mono">credo.app/c/{userProfile.username}/link-name</span>
                    </p>
                  )}
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                  <input
                    type="text"
                    value={userProfile?.company || ''}
                    onChange={(e) => setUserProfile(prev => ({ ...prev, company: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              <button 
                onClick={handleSaveProfile}
                disabled={loading}
                className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        );

      case 'billing':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Plan</h3>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-blue-900">Founder Plan</h4>
                    <p className="text-blue-700">$9/month • Unlimited testimonials</p>
                  </div>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                    Manage Plan
                  </button>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Method</h3>
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center">
                      <CreditCard className="w-4 h-4 text-gray-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">•••• •••• •••• 4242</p>
                      <p className="text-sm text-gray-600">Expires 12/25</p>
                    </div>
                  </div>
                  <button className="text-blue-600 hover:text-blue-700 font-medium">
                    Update
                  </button>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Billing History</h3>
              <div className="space-y-2">
                {[
                  { date: '2024-01-01', amount: '$9.00', status: 'Paid' },
                  { date: '2023-12-01', amount: '$9.00', status: 'Paid' },
                  { date: '2023-11-01', amount: '$9.00', status: 'Paid' },
                ].map((invoice, index) => (
                  <div key={index} className="flex items-center justify-between py-2 border-b border-gray-200">
                    <div>
                      <span className="text-gray-900">{invoice.date}</span>
                      <span className="text-gray-600 ml-4">{invoice.amount}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-green-600 text-sm">{invoice.status}</span>
                      <button className="text-blue-600 hover:text-blue-700 text-sm">
                        Download
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'api':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">API Keys</h3>
              <p className="text-gray-600 mb-4">
                Use these keys to integrate Credo with your applications or third-party services.
              </p>
              
              <div className="space-y-4">
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900">Production Key</h4>
                    <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                      Regenerate
                    </button>
                  </div>
                  <div className="flex items-center space-x-2">
                    <code className="flex-1 bg-gray-50 px-3 py-2 rounded text-sm font-mono">
                      credo_live_sk_1234567890abcdef...
                    </code>
                    <button className="text-gray-600 hover:text-gray-900">
                      <Key className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900">Test Key</h4>
                    <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                      Regenerate
                    </button>
                  </div>
                  <div className="flex items-center space-x-2">
                    <code className="flex-1 bg-gray-50 px-3 py-2 rounded text-sm font-mono">
                      credo_test_sk_abcdef1234567890...
                    </code>
                    <button className="text-gray-600 hover:text-gray-900">
                      <Key className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                Generate New Key
              </button>
            </div>
          </div>
        );

      case 'notifications':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Email Notifications</h3>
              <div className="space-y-4">
                {[
                  { name: 'New testimonial submissions', description: 'Get notified when someone submits a new testimonial' },
                  { name: 'Weekly summary', description: 'Receive a weekly summary of your testimonial activity' },
                  { name: 'Import completions', description: 'Get notified when social media imports are complete' },
                  { name: 'Account updates', description: 'Important updates about your account and billing' },
                ].map((notification, index) => (
                  <div key={index} className="flex items-center justify-between py-3 border-b border-gray-200">
                    <div>
                      <h4 className="font-medium text-gray-900">{notification.name}</h4>
                      <p className="text-sm text-gray-600">{notification.description}</p>
                    </div>
                    <input type="checkbox" defaultChecked className="rounded" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'security':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Password</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                  <input
                    type="password"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                  <input
                    type="password"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                  <input
                    type="password"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                  Update Password
                </button>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Data Export</h3>
              <p className="text-gray-600 mb-4">
                Export all your testimonials and data in JSON format.
              </p>
              <button className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2">
                <Download className="w-4 h-4" />
                <span>Export Data</span>
              </button>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-red-900 mb-4">Danger Zone</h3>
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <h4 className="font-medium text-red-900 mb-2">Delete Account</h4>
                <p className="text-red-700 text-sm mb-4">
                  Once you delete your account, there is no going back. Please be certain.
                </p>
                <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2">
                  <Trash2 className="w-4 h-4" />
                  <span>Delete Account</span>
                </button>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">Settings</h1>
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full md:w-64">
            <nav className="space-y-1">
              {tabs.map((tab) => {
                const IconComponent = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      activeTab === tab.id
                        ? 'bg-blue-50 text-blue-700'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    <IconComponent className="w-5 h-5" />
                    <span>{tab.name}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Content */}
          <div className="flex-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              {renderTabContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;