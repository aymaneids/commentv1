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

const DashboardAnalytics: React.FC = () => {
  const [dateRange, setDateRange] = useState('last-30-days');
  const { testimonials } = useTestimonials();

  // Extended mock data for analytics
  const monthlyData = [
    { month: 'Jul', testimonials: 45, views: 1200, conversions: 89, widgets: 3 },
    { month: 'Aug', testimonials: 52, views: 1450, conversions: 102, widgets: 4 },
    { month: 'Sep', testimonials: 38, views: 1100, conversions: 76, widgets: 3 },
    { month: 'Oct', testimonials: 67, views: 1800, conversions: 134, widgets: 5 },
    { month: 'Nov', testimonials: 74, views: 2100, conversions: 156, widgets: 6 },
    { month: 'Dec', testimonials: 89, views: 2500, conversions: 189, widgets: 7 },
  ];

  const sourceBreakdown = [
    { name: 'Direct Links', value: 45, color: '#3B82F6', growth: '+12%' },
    { name: 'Instagram', value: 25, color: '#E1306C', growth: '+8%' },
    { name: 'Facebook', value: 15, color: '#1877F2', growth: '+5%' },
    { name: 'X (Twitter)', value: 10, color: '#000000', growth: '+3%' },
    { name: 'YouTube', value: 5, color: '#FF0000', growth: '+2%' },
  ];

  // Widget Performance Data
  const widgetPerformanceData = [
    { name: 'Homepage Wall of Love', views: 2847, clicks: 234, ctr: 8.2, conversions: 45 },
    { name: 'Product Page Carousel', views: 1456, clicks: 189, ctr: 13.0, conversions: 28 },
    { name: 'Landing Page Single', views: 892, clicks: 67, ctr: 7.5, conversions: 12 },
    { name: 'Pricing Page Widget', views: 634, clicks: 89, ctr: 14.0, conversions: 18 },
  ];

  // Source Performance Data
  const sourcePerformanceData = [
    { name: 'Direct Links', found: 127, approved: 98, rate: 77.2 },
    { name: 'Instagram', found: 89, approved: 71, rate: 79.8 },
    { name: 'Facebook', found: 56, approved: 42, rate: 75.0 },
    { name: 'X (Twitter)', found: 34, approved: 28, rate: 82.4 },
    { name: 'YouTube', found: 23, approved: 19, rate: 82.6 },
  ];

  const dateRangeOptions = [
    { value: 'last-7-days', label: 'Last 7 Days' },
    { value: 'last-30-days', label: 'Last 30 Days' },
    { value: 'last-90-days', label: 'Last 90 Days' },
    { value: 'all-time', label: 'All Time' },
    { value: 'custom', label: 'Custom Range' },
  ];

  const exportData = () => {
    // This would generate and download a CSV file
    console.log('Exporting analytics data...');
  };

  const widgetPerformance = [
    { name: 'Homepage Wall', views: 2847, clicks: 234, ctr: 8.2 },
    { name: 'Product Carousel', views: 1234, clicks: 156, ctr: 12.6 },
    { name: 'Landing Single', views: 567, clicks: 89, ctr: 15.7 },
  ];

  const topTestimonials = [
    { id: '1', author: 'Sarah Chen', content: 'Credo saved me hours every week...', views: 456, clicks: 67 },
    { id: '2', author: 'Marcus Rodriguez', content: 'As a solo founder, I don\'t have time...', views: 389, clicks: 52 },
    { id: '3', author: 'Emily Parker', content: 'The video testimonial feature is incredible...', views: 334, clicks: 48 },
  ];

  const stats = [
    {
      title: 'Total Testimonials',
      value: '365',
      change: '+23%',
      changeType: 'positive',
      icon: MessageSquare,
      color: 'blue',
      gradient: 'from-blue-500 to-blue-600',
      period: 'vs last month'
    },
    {
      title: 'Widget Views',
      value: '12.4K',
      change: '+18%',
      changeType: 'positive',
      icon: Eye,
      color: 'emerald',
      gradient: 'from-emerald-500 to-green-600',
      period: 'this month'
    },
    {
      title: 'Click-through Rate',
      value: '11.2%',
      change: '+2.1%',
      changeType: 'positive',
      icon: Target,
      color: 'purple',
      gradient: 'from-purple-500 to-indigo-600',
      period: 'average'
    },
    {
      title: 'Conversion Rate',
      value: '4.8%',
      change: '+0.7%',
      changeType: 'positive',
      icon: TrendingUp,
      color: 'amber',
      gradient: 'from-amber-500 to-orange-500',
      period: 'from widgets'
    }
  ];

  return (
    <div className="p-6 space-y-8 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 min-h-screen">
      {/* Header */}
      <div className="animate-fade-in">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-3xl font-bold text-gray-900 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            Intelligence Hub
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
            <button 
              onClick={exportData}
              className="bg-white/70 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-2 text-sm font-medium hover:bg-white/80 transition-colors flex items-center space-x-2"
            >
              <Download className="w-4 h-4" />
              <span>Export</span>
            </button>
          </div>
        </div>
        <p className="text-gray-600 text-lg">How are things performing over time and why?</p>
      </div>

      {/* Enhanced Stats Grid */}
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
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${stat.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <IconComponent className="w-7 h-7 text-white" />
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <ArrowUpRight className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-semibold text-green-600">{stat.change}</span>
                </div>
                <span className="text-sm text-gray-500">{stat.period}</span>
              </div>
              
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
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
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-bold text-gray-900">{source.value}%</span>
                  <span className="text-xs text-green-600 font-medium">{source.growth}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Performance Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Widget Performance Table */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 animate-slide-up" style={{ animationDelay: '600ms' }}>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">Widget Performance</h3>
            <span className="text-sm text-gray-500">Which displays work best?</span>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-2 text-sm font-semibold text-gray-700">Widget Name</th>
                  <th className="text-right py-3 px-2 text-sm font-semibold text-gray-700">Views</th>
                  <th className="text-right py-3 px-2 text-sm font-semibold text-gray-700">CTR</th>
                  <th className="text-right py-3 px-2 text-sm font-semibold text-gray-700">Conversions</th>
                </tr>
              </thead>
              <tbody>
                {widgetPerformanceData.map((widget, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors">
                    <td className="py-3 px-2">
                      <div className="font-medium text-gray-900">{widget.name}</div>
                    </td>
                    <td className="py-3 px-2 text-right text-gray-700">{widget.views.toLocaleString()}</td>
                    <td className="py-3 px-2 text-right">
                      <span className={`font-semibold ${
                        widget.ctr > 10 ? 'text-green-600' : 
                        widget.ctr > 7 ? 'text-amber-600' : 'text-red-600'
                      }`}>
                        {widget.ctr}%
                      </span>
                    </td>
                    <td className="py-3 px-2 text-right font-semibold text-gray-900">{widget.conversions}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-sm text-blue-800">
              <strong>Insight:</strong> Your Product Page Carousel has the highest CTR at 13.0%. Consider using this format on more pages.
            </p>
          </div>
        </div>

        {/* Source Performance Table */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 animate-slide-up" style={{ animationDelay: '700ms' }}>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">Source Performance</h3>
            <span className="text-sm text-gray-500">Which channels provide quality?</span>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-2 text-sm font-semibold text-gray-700">Source</th>
                  <th className="text-right py-3 px-2 text-sm font-semibold text-gray-700">Found</th>
                  <th className="text-right py-3 px-2 text-sm font-semibold text-gray-700">Approved</th>
                  <th className="text-right py-3 px-2 text-sm font-semibold text-gray-700">Rate</th>
                </tr>
              </thead>
              <tbody>
                {sourcePerformanceData.map((source, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors">
                    <td className="py-3 px-2">
                      <div className="flex items-center space-x-2">
                        <div className={`w-3 h-3 rounded-full ${
                          source.name === 'Direct Links' ? 'bg-blue-500' :
                          source.name === 'Instagram' ? 'bg-pink-500' :
                          source.name === 'Facebook' ? 'bg-blue-600' :
                          source.name === 'X (Twitter)' ? 'bg-gray-800' :
                          'bg-red-500'
                        }`}></div>
                        <span className="font-medium text-gray-900">{source.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-2 text-right text-gray-700">{source.found}</td>
                    <td className="py-3 px-2 text-right text-gray-700">{source.approved}</td>
                    <td className="py-3 px-2 text-right">
                      <span className={`font-semibold ${
                        source.rate > 80 ? 'text-green-600' : 
                        source.rate > 75 ? 'text-amber-600' : 'text-red-600'
                      }`}>
                        {source.rate}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
            <p className="text-sm text-green-800">
              <strong>Insight:</strong> YouTube and X have the highest approval rates (82%+). These platforms provide the highest quality testimonials.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Conversion Funnel */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 animate-slide-up" style={{ animationDelay: '800ms' }}>
          <h3 className="text-xl font-bold text-gray-900 mb-6">Conversion Funnel</h3>
          <div className="space-y-4">
            {[
              { stage: 'Widget Views', value: 12400, percentage: 100, color: 'bg-blue-500' },
              { stage: 'Link Clicks', value: 1240, percentage: 10, color: 'bg-green-500' },
              { stage: 'Form Started', value: 620, percentage: 5, color: 'bg-amber-500' },
              { stage: 'Testimonials Submitted', value: 365, percentage: 2.9, color: 'bg-purple-500' },
            ].map((stage, index) => (
              <div key={index} className="relative">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-900">{stage.stage}</span>
                  <div className="text-right">
                    <span className="font-bold text-gray-900">{stage.value.toLocaleString()}</span>
                    <span className="text-sm text-gray-500 ml-2">({stage.percentage}%)</span>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className={`${stage.color} h-3 rounded-full transition-all duration-1000`}
                    style={{ width: `${stage.percentage * 10}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Performance Trends */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 animate-slide-up" style={{ animationDelay: '900ms' }}>
          <h3 className="text-xl font-bold text-gray-900 mb-6">Top Performing Testimonials</h3>
          <div className="space-y-4">
            {topTestimonials.map((testimonial, index) => (
              <div key={testimonial.id} className="p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl border border-green-200">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">{testimonial.author}</h4>
                    <p className="text-sm text-gray-600 line-clamp-2">{testimonial.content}</p>
                  </div>
                  <div className="text-right ml-4">
                    <div className="text-sm font-bold text-green-600">{testimonial.views} views</div>
                    <div className="text-xs text-gray-500">{testimonial.clicks} clicks</div>
                  </div>
                </div>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>#{index + 1} most viewed</span>
                  <span>{((testimonial.clicks / testimonial.views) * 100).toFixed(1)}% CTR</span>
                </div>
              </div>
            ))}
          </div>
          
          <button className="w-full mt-4 bg-gradient-to-r from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 text-blue-700 px-4 py-3 rounded-xl font-semibold transition-all duration-200 border border-blue-200">
            View All Testimonials
          </button>
        </div>
      </div>

      {/* Insights Section */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 border border-blue-200 animate-slide-up" style={{ animationDelay: '1000ms' }}>
        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900 mb-2">AI-Powered Insights</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="bg-white/50 rounded-lg p-4">
                <h4 className="font-semibold text-purple-900 mb-1">🎯 Best Performing Widget</h4>
                <p className="text-gray-700">Your Product Page Carousel converts 13% better than average. Consider replicating this design.</p>
              </div>
              <div className="bg-white/50 rounded-lg p-4">
                <h4 className="font-semibold text-blue-900 mb-1">📈 Growth Opportunity</h4>
                <p className="text-gray-700">YouTube testimonials have 82% approval rate. Consider importing more from this platform.</p>
              </div>
              <div className="bg-white/50 rounded-lg p-4">
                <h4 className="font-semibold text-amber-900 mb-1">⚡ Quick Win</h4>
                <p className="text-gray-700">Your conversion rate drops 50% at form start. Consider simplifying your collection form.</p>
              </div>
              <div className="bg-white/50 rounded-lg p-4">
                <h4 className="font-semibold text-green-900 mb-1">📊 Trend Alert</h4>
                <p className="text-gray-700">Testimonial submissions are up 23% this month. Your recent marketing efforts are working!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardAnalytics;