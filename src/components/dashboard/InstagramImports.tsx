import React, { useState } from 'react';
import { Instagram, Plus, Download, Filter, Eye, MessageSquare, BarChart3, TrendingUp, Users, Heart, ChevronDown, ChevronUp } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';

const InstagramImports: React.FC = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [selectedPosts, setSelectedPosts] = useState<string[]>([]);
  const [expandedPost, setExpandedPost] = useState<string | null>(null);

  // Mock Instagram posts data
  const instagramPosts = [
    {
      id: '1',
      type: 'reel',
      thumbnail: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=300',
      caption: 'Just launched our new feature! 🚀',
      likes: 245,
      comments: 23,
      date: '2024-01-15',
      potentialTestimonials: 5,
      analytics: {
        engagementRate: 12.3,
        testimonialsConverted: 3,
        sentimentBreakdown: { positive: 80, neutral: 15, negative: 5 },
        performanceData: [
          { hour: '9AM', engagement: 12 },
          { hour: '12PM', engagement: 25 },
          { hour: '3PM', engagement: 18 },
          { hour: '6PM', engagement: 35 },
          { hour: '9PM', engagement: 28 }
        ]
      }
    },
    {
      id: '2',
      type: 'post',
      thumbnail: 'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=300',
      caption: 'Behind the scenes of building our SaaS',
      likes: 189,
      comments: 34,
      date: '2024-01-12',
      potentialTestimonials: 8,
      analytics: {
        engagementRate: 15.7,
        testimonialsConverted: 5,
        sentimentBreakdown: { positive: 75, neutral: 20, negative: 5 },
        performanceData: [
          { hour: '9AM', engagement: 8 },
          { hour: '12PM', engagement: 20 },
          { hour: '3PM', engagement: 15 },
          { hour: '6PM', engagement: 30 },
          { hour: '9PM', engagement: 22 }
        ]
      }
    },
    {
      id: '3',
      type: 'reel',
      thumbnail: 'https://images.pexels.com/photos/1181354/pexels-photo-1181354.jpeg?auto=compress&cs=tinysrgb&w=300',
      caption: 'Customer success story 💪',
      likes: 312,
      comments: 45,
      date: '2024-01-10',
      potentialTestimonials: 12,
      analytics: {
        engagementRate: 18.9,
        testimonialsConverted: 8,
        sentimentBreakdown: { positive: 85, neutral: 12, negative: 3 },
        performanceData: [
          { hour: '9AM', engagement: 15 },
          { hour: '12PM', engagement: 30 },
          { hour: '3PM', engagement: 25 },
          { hour: '6PM', engagement: 42 },
          { hour: '9PM', engagement: 35 }
        ]
      }
    }
  ];

  const mockComments = [
    {
      id: '1',
      author: 'sarah_founder',
      content: 'This is exactly what I needed for my startup! Amazing work 🔥',
      sentiment: 'positive',
      isTestimonial: true
    },
    {
      id: '2',
      author: 'tech_mike',
      content: 'Game changer! Been using this for weeks now',
      sentiment: 'positive',
      isTestimonial: true
    },
    {
      id: '3',
      author: 'random_user',
      content: 'First! 🎉',
      sentiment: 'neutral',
      isTestimonial: false
    }
  ];

  const handleConnect = () => {
    setIsConnected(true);
  };

  const togglePostSelection = (postId: string) => {
    setSelectedPosts(prev => 
      prev.includes(postId) 
        ? prev.filter(id => id !== postId)
        : [...prev, postId]
    );
  };

  const togglePostAnalytics = (postId: string) => {
    setExpandedPost(expandedPost === postId ? null : postId);
  };

  if (!isConnected) {
    return (
      <div className="p-6">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Instagram className="w-8 h-8 text-pink-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Connect Your Instagram Account</h1>
          <p className="text-gray-600 mb-8">
            Import testimonials from your Instagram posts and reels automatically. 
            We'll analyze comments and identify potential testimonials for you.
          </p>
          
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 mb-8">
            <h3 className="font-semibold text-gray-900 mb-4">What we'll do:</h3>
            <div className="space-y-3 text-left">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                <span className="text-gray-700">Scan your recent posts and reels</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                <span className="text-gray-700">Analyze comments for testimonial content</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                <span className="text-gray-700">Filter out spam and irrelevant comments</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                <span className="text-gray-700">Let you review and approve before importing</span>
              </div>
            </div>
          </div>

          <button
            onClick={handleConnect}
            className="bg-pink-600 hover:bg-pink-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors flex items-center space-x-2 mx-auto"
          >
            <Instagram className="w-5 h-5" />
            <span>Connect Instagram Account</span>
          </button>
          
          <p className="text-sm text-gray-500 mt-4">
            We only read public comments. Your account credentials are never stored.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Instagram Imports</h1>
          <p className="text-gray-600">Import testimonials from your Instagram posts and reels</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>Connected as @your_account</span>
          </div>
          <button className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
            Refresh Posts
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
          <div className="text-2xl font-bold text-gray-900">127</div>
          <div className="text-sm text-gray-600">Total Posts Scanned</div>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
          <div className="text-2xl font-bold text-gray-900">45</div>
          <div className="text-sm text-gray-600">Potential Testimonials</div>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
          <div className="text-2xl font-bold text-gray-900">23</div>
          <div className="text-sm text-gray-600">Imported This Month</div>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
          <div className="text-2xl font-bold text-gray-900">89%</div>
          <div className="text-sm text-gray-600">Accuracy Rate</div>
        </div>
      </div>

      {/* Posts Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Recent Posts</h2>
          <div className="flex items-center space-x-2">
            <button className="flex items-center space-x-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Filter className="w-4 h-4" />
              <span>Filter</span>
            </button>
            {selectedPosts.length > 0 && (
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2">
                <Download className="w-4 h-4" />
                <span>Import Selected ({selectedPosts.length})</span>
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {instagramPosts.map((post) => (
            <div key={post.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="relative">
                <img
                  src={post.thumbnail}
                  alt="Instagram post"
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-2 left-2">
                  <span className="bg-pink-600 text-white px-2 py-1 rounded text-xs font-medium">
                    {post.type}
                  </span>
                </div>
                <div className="absolute top-2 right-2">
                  <input
                    type="checkbox"
                    checked={selectedPosts.includes(post.id)}
                    onChange={() => togglePostSelection(post.id)}
                    className="w-4 h-4 text-blue-600 rounded"
                  />
                </div>
              </div>
              
              <div className="p-4">
                <p className="text-gray-700 text-sm mb-3 line-clamp-2">{post.caption}</p>
                
                <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                  <div className="flex items-center space-x-4">
                    <span>{post.likes} likes</span>
                    <span>{post.comments} comments</span>
                  </div>
                  <span>{new Date(post.date).toLocaleDateString()}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <MessageSquare className="w-4 h-4 text-green-600" />
                    <span className="text-sm font-medium text-green-600">
                      {post.potentialTestimonials} potential testimonials
                    </span>
                  </div>
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => togglePostAnalytics(post.id)}
                      className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center space-x-1"
                    >
                      <BarChart3 className="w-4 h-4" />
                      <span>Analytics</span>
                      {expandedPost === post.id ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                    </button>
                  </div>
                </div>

                {/* Expanded Analytics */}
                {expandedPost === post.id && (
                  <div className="mt-4 pt-4 border-t border-gray-200 animate-slide-up">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                      <div className="bg-blue-50 rounded-lg p-3 text-center">
                        <TrendingUp className="w-5 h-5 text-blue-600 mx-auto mb-1" />
                        <div className="text-lg font-bold text-blue-900">{post.analytics.engagementRate}%</div>
                        <div className="text-xs text-blue-700">Engagement</div>
                      </div>
                      
                      <div className="bg-green-50 rounded-lg p-3 text-center">
                        <MessageSquare className="w-5 h-5 text-green-600 mx-auto mb-1" />
                        <div className="text-lg font-bold text-green-900">{post.analytics.testimonialsConverted}</div>
                        <div className="text-xs text-green-700">Converted</div>
                      </div>
                      
                      <div className="bg-purple-50 rounded-lg p-3 text-center">
                        <Heart className="w-5 h-5 text-purple-600 mx-auto mb-1" />
                        <div className="text-lg font-bold text-purple-900">{post.analytics.sentimentBreakdown.positive}%</div>
                        <div className="text-xs text-purple-700">Positive</div>
                      </div>
                      
                      <div className="bg-amber-50 rounded-lg p-3 text-center">
                        <Users className="w-5 h-5 text-amber-600 mx-auto mb-1" />
                        <div className="text-lg font-bold text-amber-900">{((post.analytics.testimonialsConverted / post.potentialTestimonials) * 100).toFixed(0)}%</div>
                        <div className="text-xs text-amber-700">Conversion</div>
                      </div>
                    </div>

                    <div className="bg-white rounded-lg p-4 border border-gray-200">
                      <h6 className="font-semibold text-gray-900 mb-3">Engagement Throughout Day</h6>
                      <ResponsiveContainer width="100%" height={150}>
                        <LineChart data={post.analytics.performanceData}>
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
                          <Line type="monotone" dataKey="engagement" stroke="#E1306C" strokeWidth={3} dot={{ fill: '#E1306C', strokeWidth: 2, r: 4 }} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Preview Modal would go here */}
    </div>
  );
};

export default InstagramImports;