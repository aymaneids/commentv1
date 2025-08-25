import React from 'react';
import { useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Area,
  AreaChart
} from 'recharts';
import {
  TrendingUp,
  Users,
  MessageSquare,
  Eye,
  Clock,
  CheckCircle,
  AlertCircle,
  Star,
  ArrowUpRight,
  ArrowDownRight,
  Zap,
  Target,
  Globe,
  Calendar,
  Filter,
  Download
} from 'lucide-react';
import { useTestimonials } from '../../hooks/useTestimonials';

const Analytics: React.FC = () => {
  const [dateRange, setDateRange] = useState('last-30-days');
  const { testimonials } = useTestimonials();

  // Mock data for analytics
  const monthlyData = [
    { month: 'Jul', testimonials: 45, views: 1200, conversions: 89 },
    { month: 'Aug', testimonials: 52, views: 1450, conversions: 102 },
    { month: 'Sep', testimonials: 38, views: 1100, conversions: 76 },
    { month: 'Oct', testimonials: 67, views: 1800, conversions: 134 },
    { month: 'Nov', testimonials: 74, views: 2100, conversions: 156 },
    { month: 'Dec', testimonials: 89, views: 2500, conversions: 189 },
  ];

  const sourceBreakdown = [
    { name: 'Direct Links', value: 45, color: '#3B82F6' },
    { name: 'Instagram', value: 25, color: '#E1306C' },
    { name: 'Facebook', value: 15, color: '#1877F2' },
    { name: 'X (Twitter)', value: 10, color: '#000000' },
    { name: 'YouTube', value: 5, color: '#FF0000' },
  ];

  const dateRangeOptions = [
    { value: 'last-7-days', label: 'Last 7 Days' },
    { value: 'last-30-days', label: 'Last 30 Days' },
    { value: 'last-90-days', label: 'Last 90 Days' },
    { value: 'all-time', label: 'All Time' },
  ];

  const stats = [
    {
      title: 'Total Testimonials',
      value: testimonials.length.toString(),
      change: '+23%',
      changeType: 'positive',
      icon: MessageSquare,
      color: 'blue',
    },
    {
      title: 'Widget Views',
      value: '12.4K',
      change: '+18%',
      changeType: 'positive',
      icon: Eye,
      color: 'emerald',
    },
    {
      title: 'Click-through Rate',
      value: '11.2%',
      change: '+2.1%',
      changeType: 'positive',
      icon: Target,
      color: 'purple',
    },
    {
      title: 'Conversion Rate',
      value: '4.8%',
      change: '+0.7%',
      changeType: 'positive',
      icon: TrendingUp,
      color: 'amber',
    }
  ];

  return (
    <div className="p-6 space-y-8 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 min-h-screen">
      {/* Header */}
      <div className="animate-fade-in">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-3xl font-bold text-gray-900 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            Analytics Overview
          </h1>
          <div className="flex items-center space-x-3">
            <select 
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="bg-white/70 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {dateRangeOptions.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
            <button className="bg-white/70 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-2 text-sm font-medium hover:bg-white/80 transition-colors flex items-center space-x-2">
              <Download className="w-4 h-4" />
              <span>Export</span>
            </button>
          </div>
        </div>
        <p className="text-gray-600 text-lg">Track your testimonial performance and engagement metrics</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <div
              key={index}
              className="group relative bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`w-14 h-14 rounded-xl bg-${stat.color}-100 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <IconComponent className={`w-7 h-7 text-${stat.color}-600`} />
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <ArrowUpRight className="w-4 h-4 text-green-600" />
                <span className="text-sm font-semibold text-green-600">{stat.change}</span>
                <span className="text-sm text-gray-500">vs last month</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Monthly Trends */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 animate-slide-up" style={{ animationDelay: '400ms' }}>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">Monthly Trends</h3>
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-gray-600">Testimonials</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-gray-600">Views</span>
              </div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={320}>
            <AreaChart data={monthlyData}>
              <defs>
                <linearGradient id="testimonialsGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="viewsGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" stroke="#64748b" fontSize={12} />
              <YAxis stroke="#64748b" fontSize={12} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                  border: 'none', 
                  borderRadius: '12px', 
                  boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)' 
                }} 
              />
              <Area type="monotone" dataKey="testimonials" stroke="#3B82F6" strokeWidth={3} fill="url(#testimonialsGradient)" />
              <Area type="monotone" dataKey="views" stroke="#10B981" strokeWidth={3} fill="url(#viewsGradient)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Source Distribution */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 animate-slide-up" style={{ animationDelay: '500ms' }}>
          <h3 className="text-xl font-bold text-gray-900 mb-6">Testimonial Sources</h3>
          <div className="flex items-center justify-center mb-6">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={sourceBreakdown}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  innerRadius={40}
                  fill="#8884d8"
                  dataKey="value"
                  stroke="none"
                >
                  {sourceBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                    border: 'none', 
                    borderRadius: '12px', 
                    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)' 
                  }} 
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-3">
            {sourceBreakdown.map((source, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: source.color }}></div>
                  <span className="text-sm font-medium text-gray-700">{source.name}</span>
                </div>
                <span className="text-sm font-bold text-gray-900">{source.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 animate-slide-up" style={{ animationDelay: '600ms' }}>
        <h3 className="text-xl font-bold text-gray-900 mb-6">Recent Activity</h3>
        <div className="space-y-4">
          {[
            { type: 'submission', description: 'New testimonial from Sarah Chen', time: '2 hours ago', icon: MessageSquare, color: 'blue' },
            { type: 'approval', description: 'Approved testimonial from Marcus Rodriguez', time: '4 hours ago', icon: CheckCircle, color: 'green' },
            { type: 'view', description: 'Widget viewed 45 times on homepage', time: '6 hours ago', icon: Eye, color: 'purple' },
            { type: 'submission', description: 'New testimonial from Emily Parker', time: '1 day ago', icon: MessageSquare, color: 'blue' },
          ].map((activity, index) => {
            const IconComponent = activity.icon;
            return (
              <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className={`w-10 h-10 rounded-full bg-${activity.color}-100 flex items-center justify-center`}>
                  <IconComponent className={`w-5 h-5 text-${activity.color}-600`} />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{activity.description}</p>
                  <p className="text-sm text-gray-500">{activity.time}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Insights Section */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 border border-blue-200 animate-slide-up" style={{ animationDelay: '700ms' }}>
        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Key Insights</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="bg-white/50 rounded-lg p-4">
                <h4 className="font-semibold text-blue-900 mb-1">📈 Growth Trend</h4>
                <p className="text-gray-700">Your testimonial collection is up 23% this month compared to last month.</p>
              </div>
              <div className="bg-white/50 rounded-lg p-4">
                <h4 className="font-semibold text-green-900 mb-1">🎯 Best Source</h4>
                <p className="text-gray-700">Direct links are your top performing source with 45% of all testimonials.</p>
              </div>
              <div className="bg-white/50 rounded-lg p-4">
                <h4 className="font-semibold text-purple-900 mb-1">⚡ Engagement</h4>
                <p className="text-gray-700">Your widgets have an 11.2% click-through rate, which is above average.</p>
              </div>
              <div className="bg-white/50 rounded-lg p-4">
                <h4 className="font-semibold text-amber-900 mb-1">🚀 Opportunity</h4>
                <p className="text-gray-700">Consider expanding your Instagram imports - they show high engagement potential.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;