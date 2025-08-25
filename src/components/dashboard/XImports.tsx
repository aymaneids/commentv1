import React, { useState } from 'react';
import { Twitter, Plus, Download, Filter, Eye, MessageSquare, ExternalLink, Trash2, Hash, BarChart3, TrendingUp, Users, Heart, ChevronDown, ChevronUp } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';

const XImports: React.FC = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [urlInput, setUrlInput] = useState('');
  const [expandedUrl, setExpandedUrl] = useState<string | null>(null);
  const [savedUrls, setSavedUrls] = useState([
    {
      id: '1',
      url: 'https://x.com/yourhandle/status/1234567890',
      title: 'Product Launch Tweet',
      status: 'processed',
      testimonialsFound: 12,
      dateAdded: '2024-01-15',
      lastScanned: '2024-01-15',
      engagement: { likes: 245, retweets: 34, replies: 18 },
      analytics: {
        engagementRate: 16.8,
        testimonialsConverted: 8,
        sentimentBreakdown: { positive: 82, neutral: 15, negative: 3 },
        performanceData: [
          { hour: '6AM', engagement: 8 },
          { hour: '12PM', engagement: 25 },
          { hour: '6PM', engagement: 35 },
          { hour: '9PM', engagement: 28 },
          { hour: '12AM', engagement: 12 }
        ]
      }
    },
    {
      id: '2',
      url: 'https://x.com/yourhandle/status/0987654321',
      title: 'Feature Announcement',
      status: 'processing',
      testimonialsFound: 0,
      dateAdded: '2024-01-14',
      lastScanned: null,
      engagement: { likes: 89, retweets: 12, replies: 7 },
      analytics: {
        engagementRate: 0,
        testimonialsConverted: 0,
        sentimentBreakdown: { positive: 0, neutral: 0, negative: 0 },
        performanceData: [
          { hour: '6AM', engagement: 0 },
          { hour: '12PM', engagement: 0 },
          { hour: '6PM', engagement: 0 },
          { hour: '9PM', engagement: 0 },
          { hour: '12AM', engagement: 0 }
        ]
      }
    }
  ]);

  const handleAddUrl = () => {
    if (urlInput.trim()) {
      const newUrl = {
        id: Date.now().toString(),
        url: urlInput,
        title: 'X Post',
        status: 'pending',
        testimonialsFound: 0,
        dateAdded: new Date().toISOString().split('T')[0],
        lastScanned: null,
        engagement: { likes: 0, retweets: 0, replies: 0 }
      };
      setSavedUrls([newUrl, ...savedUrls]);
      setUrlInput('');
      setShowAddForm(false);
    }
  };

  const removeUrl = (id: string) => {
    setSavedUrls(savedUrls.filter(url => url.id !== id));
  };

  const getStatusBadge = (status: string) => {
    const configs = {
      processed: { color: 'bg-green-100 text-green-800 border-green-200', label: 'Processed' },
      processing: { color: 'bg-blue-100 text-blue-800 border-blue-200', label: 'Processing' },
      pending: { color: 'bg-amber-100 text-amber-800 border-amber-200', label: 'Pending' },
      error: { color: 'bg-red-100 text-red-800 border-red-200', label: 'Error' }
    };
    return configs[status as keyof typeof configs] || configs.pending;
  };

  const toggleUrlAnalytics = (urlId: string) => {
    setExpandedUrl(expandedUrl === urlId ? null : urlId);
  };

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between animate-fade-in">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            X (Twitter) Imports
          </h1>
          <p className="text-gray-600 text-lg">Import testimonials from X posts by adding URLs</p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-gradient-to-r from-gray-800 to-black hover:from-black hover:to-gray-900 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 hover:scale-105 shadow-lg flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>Add X URL</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 animate-slide-up" style={{ animationDelay: '100ms' }}>
        {[
          { label: 'Total URLs', value: savedUrls.length.toString(), icon: Twitter, color: 'gray' },
          { label: 'Testimonials Found', value: savedUrls.reduce((sum, url) => sum + url.testimonialsFound, 0).toString(), icon: MessageSquare, color: 'green' },
          { label: 'Processing', value: savedUrls.filter(url => url.status === 'processing').length.toString(), icon: Eye, color: 'amber' },
          { label: 'This Month', value: savedUrls.filter(url => url.dateAdded.startsWith('2024-01')).length.toString(), icon: Download, color: 'purple' }
        ].map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <div key={index} className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-sm border border-white/20 hover:shadow-md transition-all duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`w-10 h-10 rounded-lg bg-${stat.color}-100 flex items-center justify-center`}>
                  <IconComponent className={`w-5 h-5 text-${stat.color}-600`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add URL Form */}
      {showAddForm && (
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 animate-slide-up">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Add X Post URL</h3>
          <div className="flex space-x-4">
            <input
              type="url"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              placeholder="https://x.com/username/status/1234567890"
              className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
            <button
              onClick={handleAddUrl}
              className="bg-gray-800 hover:bg-black text-white px-6 py-3 rounded-xl font-semibold transition-colors"
            >
              Add URL
            </button>
            <button
              onClick={() => setShowAddForm(false)}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-xl font-semibold transition-colors"
            >
              Cancel
            </button>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            Paste the URL of any X post to scan for testimonials in the replies
          </p>
        </div>
      )}

      {/* URLs List */}
      <div className="space-y-4">
        {savedUrls.map((urlData, index) => {
          const statusBadge = getStatusBadge(urlData.status);
          return (
            <div 
              key={urlData.id} 
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 animate-slide-up"
              style={{ animationDelay: `${200 + index * 100}ms` }}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <Twitter className="w-5 h-5 text-gray-800" />
                    <h3 className="font-semibold text-gray-900">{urlData.title}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${statusBadge.color}`}>
                      {statusBadge.label}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-2 text-sm text-gray-600 mb-4">
                    <span className="font-mono bg-gray-100 px-2 py-1 rounded">{urlData.url}</span>
                    <button
                      onClick={() => window.open(urlData.url, '_blank')}
                      className="text-blue-600 hover:text-blue-700"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-4">
                    <div>
                      <span className="text-gray-500">Testimonials:</span>
                      <span className="ml-2 font-semibold text-green-600">{urlData.testimonialsFound}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Likes:</span>
                      <span className="ml-2 font-semibold">{urlData.engagement.likes}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Retweets:</span>
                      <span className="ml-2 font-semibold">{urlData.engagement.retweets}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Replies:</span>
                      <span className="ml-2 font-semibold">{urlData.engagement.replies}</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span>Added: {new Date(urlData.dateAdded).toLocaleDateString()}</span>
                    <span>
                      Last Scanned: {urlData.lastScanned ? new Date(urlData.lastScanned).toLocaleDateString() : 'Never'}
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-2 ml-4">
                  <button className="bg-gray-50 hover:bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm font-semibold transition-colors border border-gray-200">
                    Scan Now
                  </button>
                  <button 
                    onClick={() => toggleUrlAnalytics(urlData.id)}
                    className="bg-gray-50 hover:bg-gray-100 text-gray-700 px-3 py-2 rounded-lg text-sm font-semibold transition-colors border border-gray-200 flex items-center space-x-1"
                  >
                    <BarChart3 className="w-4 h-4" />
                    {expandedUrl === urlData.id ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                  </button>
                  <button
                    onClick={() => removeUrl(urlData.id)}
                    className="p-2 text-gray-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-all duration-200"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Expanded Analytics */}
              {expandedUrl === urlData.id && urlData.status === 'processed' && (
                <div className="mt-4 pt-4 border-t border-gray-200 animate-slide-up">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                    <div className="bg-gray-50 rounded-lg p-3 text-center border border-gray-200">
                      <TrendingUp className="w-5 h-5 text-gray-600 mx-auto mb-1" />
                      <div className="text-lg font-bold text-gray-900">{urlData.analytics.engagementRate}%</div>
                      <div className="text-xs text-gray-700">Engagement</div>
                    </div>
                    
                    <div className="bg-green-50 rounded-lg p-3 text-center border border-green-200">
                      <MessageSquare className="w-5 h-5 text-green-600 mx-auto mb-1" />
                      <div className="text-lg font-bold text-green-900">{urlData.analytics.testimonialsConverted}</div>
                      <div className="text-xs text-green-700">Converted</div>
                    </div>
                    
                    <div className="bg-purple-50 rounded-lg p-3 text-center border border-purple-200">
                      <Heart className="w-5 h-5 text-purple-600 mx-auto mb-1" />
                      <div className="text-lg font-bold text-purple-900">{urlData.analytics.sentimentBreakdown.positive}%</div>
                      <div className="text-xs text-purple-700">Positive</div>
                    </div>
                    
                    <div className="bg-amber-50 rounded-lg p-3 text-center border border-amber-200">
                      <Users className="w-5 h-5 text-amber-600 mx-auto mb-1" />
                      <div className="text-lg font-bold text-amber-900">{urlData.analytics.testimonialsConverted > 0 ? ((urlData.analytics.testimonialsConverted / urlData.testimonialsFound) * 100).toFixed(0) : 0}%</div>
                      <div className="text-xs text-amber-700">Conversion</div>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <h6 className="font-semibold text-gray-900 mb-3">Engagement Throughout Day</h6>
                    <ResponsiveContainer width="100%" height={150}>
                      <LineChart data={urlData.analytics.performanceData}>
                        <XAxis dataKey="hour" stroke="#64748b" fontSize={12} />
                        <YAxis stroke="#64748b" fontSize={12} />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                            border: 'none', 
                            borderRadius: '8px', 
                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' 
                          }} 
                        />
                        <Line type="monotone" dataKey="engagement" stroke="#000000" strokeWidth={3} dot={{ fill: '#000000', strokeWidth: 2, r: 4 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {savedUrls.length === 0 && (
        <div className="text-center py-16 animate-fade-in">
          <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
            <Twitter className="w-12 h-12 text-gray-800" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">No X URLs added yet</h3>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            Add X post URLs to start importing testimonials from replies.
          </p>
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-gradient-to-r from-gray-800 to-black hover:from-black hover:to-gray-900 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 hover:scale-105 shadow-lg"
          >
            Add Your First URL
          </button>
        </div>
      )}
    </div>
  );
};

export default XImports;