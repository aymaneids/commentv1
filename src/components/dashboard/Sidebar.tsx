import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import {
  Home,
  MessageSquare,
  Link as LinkIcon,
  Instagram,
  Facebook,
  Twitter,
  Youtube,
  Code,
  BarChart3,
  Settings,
  LogOut
} from 'lucide-react';

const Sidebar: React.FC = () => {
  const location = useLocation();
  const { user, signOut } = useAuth();

  const navigationItems = [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'Testimonials', href: '/dashboard/testimonials', icon: MessageSquare },
    { name: 'Collection Links', href: '/dashboard/links', icon: LinkIcon },
    { name: 'Instagram Imports', href: '/dashboard/instagram', icon: Instagram, brandColor: 'from-pink-500 to-purple-600', hoverBg: 'hover:bg-gradient-to-r hover:from-pink-500/10 hover:to-purple-600/10' },
    { name: 'Facebook Imports', href: '/dashboard/facebook', icon: Facebook, brandColor: 'from-blue-500 to-blue-600', hoverBg: 'hover:bg-gradient-to-r hover:from-blue-500/10 hover:to-blue-600/10' },
    { name: 'X Imports', href: '/dashboard/x', icon: Twitter, brandColor: 'from-gray-800 to-black', hoverBg: 'hover:bg-gradient-to-r hover:from-gray-800/10 hover:to-black/10' },
    { name: 'YouTube Imports', href: '/dashboard/youtube', icon: Youtube, brandColor: 'from-red-500 to-red-600', hoverBg: 'hover:bg-gradient-to-r hover:from-red-500/10 hover:to-red-600/10' },
    { name: 'Widgets', href: '/dashboard/widgets', icon: Code },
    { name: 'Intelligence Hub', href: '/dashboard/analytics', icon: BarChart3 },
    { name: 'Settings', href: '/dashboard/settings', icon: Settings },
  ];

  const getBrandColorClasses = (item: any, isActive: boolean) => {
    if (isActive) {
      return 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg';
    }
    
    if (item.brandColor) {
      return `text-gray-600 hover:text-white hover:bg-gradient-to-r hover:${item.brandColor} hover:shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 ${item.hoverBg}`;
    }
    
    return 'text-gray-600 hover:text-gray-900 hover:bg-gray-50/80 transition-all duration-200 hover:scale-105';
  };
  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <div className="w-64 bg-white/80 backdrop-blur-sm border-r border-gray-200/50 h-screen flex flex-col shadow-lg">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200/50">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-sm">C</span>
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">Credo</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navigationItems.map((item) => {
          const IconComponent = item.icon;
          const isActive = location.pathname === item.href;
          
          return (
            <NavLink
              key={item.name}
              to={item.href}
              className={`group flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium ${getBrandColorClasses(item, isActive)}`}
            >
              <IconComponent className="w-5 h-5 transition-all duration-300 group-hover:scale-110" />
              <span>{item.name}</span>
              
              {/* Animated brand color indicator */}
              {item.brandColor && !isActive && (
                <div className={`absolute left-0 w-1 h-0 bg-gradient-to-b ${item.brandColor} rounded-r-full transition-all duration-300 group-hover:h-8 opacity-0 group-hover:opacity-100`}></div>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* User Section */}
      <div className="p-4 border-t border-gray-200/50">
        <div className="flex items-center space-x-3 mb-4 p-3 rounded-xl bg-gray-50/50 hover:bg-gray-100/50 transition-colors duration-200">
          <div className="w-10 h-10 bg-gradient-to-br from-gray-400 to-gray-500 rounded-full flex items-center justify-center shadow-md">
            <span className="text-white font-semibold text-sm">
              {user?.user_metadata?.first_name?.[0] || user?.email?.[0]?.toUpperCase() || 'U'}
              {user?.user_metadata?.last_name?.[0] || ''}
            </span>
          </div>
          <div>
            <div className="text-sm font-semibold text-gray-900">
              {user?.user_metadata?.first_name && user?.user_metadata?.last_name 
                ? `${user.user_metadata.first_name} ${user.user_metadata.last_name}`
                : user?.email?.split('@')[0] || 'User'
              }
            </div>
            <div className="text-xs text-blue-600 font-medium">Founder Plan</div>
          </div>
        </div>
        <button 
          onClick={handleSignOut}
          className="flex items-center space-x-2 text-gray-600 hover:text-red-600 text-sm font-medium transition-all duration-300 w-full p-2 rounded-lg hover:bg-red-50 hover:scale-105 group"
        >
          <LogOut className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
          <span>Sign out</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;