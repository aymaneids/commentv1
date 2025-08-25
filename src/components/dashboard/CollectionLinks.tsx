import React, { useState } from 'react';
import { useCollectionLinks } from '../../hooks/useTestimonials';
import { supabase } from '../../lib/supabase';
import { Plus, Link as LinkIcon, Copy, Eye, BarChart3, Settings, Trash2, ExternalLink, TrendingUp, Users, CheckCircle, ChevronDown, ChevronUp, Calendar, Clock, Target } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, AreaChart, Area } from 'recharts';

const CollectionLinks: React.FC = () => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [expandedAnalytics, setExpandedAnalytics] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [slugPreview, setSlugPreview] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    slug: '',
    custom_message: '',
    allow_video: false,
    require_rating: true,
    collect_email: true,
    is_active: true
  });

  const { links, loading, createLink, updateLink, deleteLink } = useCollectionLinks();

  // Get current user data on component mount
  React.useEffect(() => {
    const getCurrentUserData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: userData } = await supabase
          .from('users')
          .select('username')
          .eq('id', user.id)
          .single();
        setCurrentUser(userData);
      }
    };
    getCurrentUserData();
  }, []);

  // Update slug preview when slug changes
  React.useEffect(() => {
    if (currentUser?.username && formData.slug) {
      setSlugPreview(`${window.location.origin}/c/${currentUser.username}/${formData.slug}`);
    } else {
      setSlugPreview('');
    }
  }, [formData.slug, currentUser]);

  const copyToClipboard = async (url: string, id: string) => {
    try {
      await navigator.clipboard.writeText(url);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const toggleAnalytics = (linkId: string) => {
    setExpandedAnalytics(expandedAnalytics === linkId ? null : linkId);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleCreateLink = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createLink(formData);
      setShowCreateForm(false);
      setFormData({
        name: '',
        description: '',
        slug: '',
        slug: '',
        custom_message: '',
        allow_video: false,
        require_rating: true,
        collect_email: true,
        is_active: true
      });
      setSlugPreview('');
      setSlugPreview('');
    } catch (error) {
      console.error('Error creating link:', error);
    }
  };

  if (loading) {
    return (
      <div className="p-6 space-y-6 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 min-h-screen">
        <div className="flex items-center justify-center py-16">
          <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between animate-fade-in">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            Collection Links
          </h1>
          <p className="text-gray-600 text-lg">Create and manage shareable testimonial collection links</p>
        </div>
        <button
          onClick={() => setShowCreateForm(true)}
          className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 hover:scale-105 shadow-lg flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>Create Link</span>
        </button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 animate-slide-up" style={{ animationDelay: '100ms' }}>
        {[
          { label: 'Total Links', value: links.length.toString(), icon: LinkIcon, color: 'blue' },
          { label: 'Total Views', value: links.reduce((sum, link) => sum + (link.views_count || 0), 0).toString(), icon: Eye, color: 'green' },
          { label: 'Total Submissions', value: links.reduce((sum, link) => sum + (link.submissions_count || 0), 0).toString(), icon: Users, color: 'purple' },
          { label: 'Active Links', value: links.filter(link => link.is_active).length.toString(), icon: TrendingUp, color: 'amber' }
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

      {/* Create Form Modal */}
      {showCreateForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
          <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl border border-white/20 animate-scale-in">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900">Create Collection Link</h3>
              <button
                onClick={() => setShowCreateForm(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                ✕
              </button>
            </div>
            
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Link Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g., Product Launch Feedback"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Custom Link Name</label>
                <p className="text-xs text-gray-500 mb-2">
                  This will be part of your public URL. Use only lowercase letters, numbers, and hyphens.
                </p>
                <div className="relative">
                  <LinkIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    name="slug"
                    value={formData.slug}
                    onChange={handleInputChange}
                    placeholder="q3-feedback"
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    required
                  />
                </div>
                {slugPreview && (
                  <div className="mt-2 p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="text-sm text-blue-800">
                      <strong>Your public link will be:</strong>
                    </p>
                    <p className="text-sm font-mono text-blue-900 break-all">{slugPreview}</p>
                  </div>
                )}
                {!currentUser?.username && (
                  <div className="mt-2 p-3 bg-amber-50 rounded-lg border border-amber-200">
                    <p className="text-sm text-amber-800">
                      <strong>Note:</strong> You need to set a username in your profile to use custom URLs. For now, a standard link will be created.
                    </p>
                  </div>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Custom Link Name</label>
                <p className="text-xs text-gray-500 mb-2">
                  This will be part of your public URL. Use only lowercase letters, numbers, and hyphens.
                </p>
                <div className="relative">
                  <LinkIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    name="slug"
                    value={formData.slug}
                    onChange={handleInputChange}
                    placeholder="q3-feedback"
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  />
                </div>
                {slugPreview && (
                  <div className="mt-2 p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="text-sm text-blue-800">
                      <strong>Your public link will be:</strong>
                    </p>
                    <p className="text-sm font-mono text-blue-900 break-all">{slugPreview}</p>
                  </div>
                )}
                {!currentUser?.username && (
                  <div className="mt-2 p-3 bg-amber-50 rounded-lg border border-amber-200">
                    <p className="text-sm text-amber-800">
                      <strong>Note:</strong> You need to set a username in your profile to use custom URLs. For now, a standard link will be created.
                    </p>
                  </div>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Description (Optional)</label>
                <input
                  type="text"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Brief description of this collection link"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Custom Message (Optional)</label>
                <textarea
                  name="custom_message"
                  value={formData.custom_message}
                  onChange={handleInputChange}
                  placeholder="Thank you for using our product! We'd love to hear your feedback..."
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                />
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <input 
                    type="checkbox" 
                    id="video" 
                    name="allow_video"
                    checked={formData.allow_video}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-blue-600 rounded" 
                  />
                  <label htmlFor="video" className="text-sm text-gray-700">Allow video testimonials</label>
                </div>
                <div className="flex items-center space-x-3">
                  <input 
                    type="checkbox" 
                    id="rating" 
                    name="require_rating"
                    checked={formData.require_rating}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-blue-600 rounded" 
                  />
                  <label htmlFor="rating" className="text-sm text-gray-700">Require star rating</label>
                </div>
                <div className="flex items-center space-x-3">
                  <input 
                    type="checkbox" 
                    id="email" 
                    name="collect_email"
                    checked={formData.collect_email}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-blue-600 rounded" 
                  />
                  <label htmlFor="email" className="text-sm text-gray-700">Collect email addresses</label>
                </div>
              </div>
            
            <div className="flex space-x-3 mt-8">
              <button
                type="button"
                onClick={() => setShowCreateForm(false)}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-xl font-semibold transition-all duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateLink}
                className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 hover:scale-105"
              >
                Create Link
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Links Grid */}
      <div className="grid gap-6">
        {links.map((link, index) => (
          <div 
            key={link.id} 
            className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-slide-up"
            style={{ animationDelay: `${200 + index * 100}ms` }}
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-6">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-xl font-bold text-gray-900">{link.name}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    link.is_active 
                      ? 'bg-green-100 text-green-700 border border-green-200' 
                      : 'bg-gray-100 text-gray-700 border border-gray-200'
                  }`}>
                    {link.is_active ? 'Active' : 'Inactive'}
                  </span>
                </div>
                
                <p className="text-gray-600 mb-4">{link.description}</p>
                
                <div className="flex items-center space-x-2 bg-gray-50 rounded-xl p-3 group-hover:bg-gray-100 transition-colors duration-200">
                  <LinkIcon className="w-4 h-4 text-gray-500" />
                  <span className="font-mono text-sm text-gray-700 flex-1">{link.url}</span>
                  <button
                    onClick={() => copyToClipboard(link.url, link.id)}
                    className="p-2 hover:bg-white rounded-lg transition-all duration-200 hover:scale-110"
                    title="Copy link"
                  >
                    {copiedId === link.id ? (
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    ) : (
                      <Copy className="w-4 h-4 text-gray-500 hover:text-blue-600" />
                    )}
                  </button>
                  <button
                    onClick={() => window.open(link.url, '_blank')}
                    className="p-2 hover:bg-white rounded-lg transition-all duration-200 hover:scale-110"
                    title="Open link"
                  >
                    <ExternalLink className="w-4 h-4 text-gray-500 hover:text-blue-600" />
                  </button>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 ml-4">
                <button className="p-2 text-gray-400 hover:text-blue-600 rounded-lg hover:bg-blue-50 transition-all duration-200">
                  <Settings className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => deleteLink(link.id)}
                  className="p-2 text-gray-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-all duration-200"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200">
                <div className="flex items-center justify-center mb-2">
                  <Eye className="w-5 h-5 text-blue-600" />
                </div>
                <div className="text-2xl font-bold text-blue-900">{link.views_count || 0}</div>
                <div className="text-sm text-blue-700 font-medium">Views</div>
              </div>
              
              <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-xl border border-green-200">
                <div className="flex items-center justify-center mb-2">
                  <Users className="w-5 h-5 text-green-600" />
                </div>
                <div className="text-2xl font-bold text-green-900">{link.submissions_count || 0}</div>
                <div className="text-sm text-green-700 font-medium">Submissions</div>
              </div>
              
              <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border border-purple-200">
                <div className="flex items-center justify-center mb-2">
                  <BarChart3 className="w-5 h-5 text-purple-600" />
                </div>
                <div className="text-2xl font-bold text-purple-900">
                  {link.views_count && link.submissions_count 
                    ? ((link.submissions_count / link.views_count) * 100).toFixed(1)
                    : '0'
                  }%
                </div>
                <div className="text-sm text-purple-700 font-medium">Conversion</div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <span className="text-sm text-gray-500">
                Created {new Date(link.created_at).toLocaleDateString()}
              </span>
              <div className="flex space-x-2">
                <button 
                  onClick={() => toggleAnalytics(link.id)}
                  className="bg-blue-50 hover:bg-blue-100 text-blue-700 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 hover:scale-105 border border-blue-200 flex items-center space-x-2"
                >
                  <BarChart3 className="w-4 h-4" />
                  <span>Analytics</span>
                  {expandedAnalytics === link.id ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                <button className="bg-blue-50 hover:bg-blue-100 text-blue-700 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 hover:scale-105 border border-blue-200">
                  Customize
                </button>
              </div>
            </div>

            {/* Expanded Analytics */}
            {expandedAnalytics === link.id && link.submissions_count && link.submissions_count > 0 && (
              <div className="mt-6 pt-6 border-t border-gray-200 animate-slide-up">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Detailed Analytics</h4>
                
                {/* Mini Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-3 border border-blue-200">
                    <div className="flex items-center space-x-2 mb-1">
                      <Clock className="w-4 h-4 text-blue-600" />
                      <span className="text-xs font-medium text-blue-700">Avg Response</span>
                    </div>
                    <div className="text-lg font-bold text-blue-900">2.3 min</div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-3 border border-green-200">
                    <div className="flex items-center space-x-2 mb-1">
                      <TrendingUp className="w-4 h-4 text-green-600" />
                      <span className="text-xs font-medium text-green-700">Peak Hours</span>
                    </div>
                    <div className="text-lg font-bold text-green-900">2-4 PM</div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-3 border border-purple-200">
                    <div className="flex items-center space-x-2 mb-1">
                      <Target className="w-4 h-4 text-purple-600" />
                      <span className="text-xs font-medium text-purple-700">Mobile</span>
                    </div>
                    <div className="text-lg font-bold text-purple-900">65%</div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-lg p-3 border border-amber-200">
                    <div className="flex items-center space-x-2 mb-1">
                      <Calendar className="w-4 h-4 text-amber-600" />
                      <span className="text-xs font-medium text-amber-700">Desktop</span>
                    </div>
                    <div className="text-lg font-bold text-amber-900">35%</div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-4 border border-gray-200 text-center">
                  <p className="text-gray-600">Analytics data will appear here as you collect more testimonials.</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Empty State */}
      {links.length === 0 && (
        <div className="text-center py-16 animate-fade-in">
          <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <LinkIcon className="w-12 h-12 text-blue-500" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">No collection links yet</h3>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            Create your first collection link to start gathering testimonials from your customers.
          </p>
          <button
            onClick={() => setShowCreateForm(true)}
            className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 hover:scale-105 shadow-lg"
          >
            Create Your First Link
          </button>
        </div>
      )}
    </div>
  );
};

export default CollectionLinks;