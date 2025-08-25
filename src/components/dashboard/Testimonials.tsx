import React, { useState } from 'react';
import { useTestimonials } from '../../hooks/useTestimonials';
import { Search, Filter, Star, Eye, EyeOff, Edit, Trash2, Video, MessageSquare, MoreHorizontal, Heart, Share2, Clock, CheckCircle, XCircle, AlertTriangle, Import, RefreshCw } from 'lucide-react';

const Testimonials: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterSource, setFilterSource] = useState('all');
  const [selectedTestimonials, setSelectedTestimonials] = useState<string[]>([]);
  const [showBulkActions, setShowBulkActions] = useState(false);

  const { testimonials, loading, updateTestimonialStatus, deleteTestimonial } = useTestimonials();

  const getSourceBadge = (source: string) => {
    const configs = {
      direct: { color: 'bg-blue-100 text-blue-800 border-blue-200', label: 'Direct Link', icon: '🔗' },
      instagram: { color: 'bg-pink-100 text-pink-800 border-pink-200', label: 'Instagram', icon: '📷' },
      facebook: { color: 'bg-blue-100 text-blue-800 border-blue-200', label: 'Facebook', icon: '👥' },
      x: { color: 'bg-gray-100 text-gray-800 border-gray-200', label: 'X (Twitter)', icon: '🐦' },
      youtube: { color: 'bg-red-100 text-red-800 border-red-200', label: 'YouTube', icon: '📺' }
    };
    const config = configs[source as keyof typeof configs] || configs.direct;
    return { ...config };
  };

  const getStatusBadge = (status: string) => {
    const configs = {
      approved: { color: 'bg-green-100 text-green-800 border-green-200', label: 'Approved', icon: CheckCircle },
      pending: { color: 'bg-amber-100 text-amber-800 border-amber-200', label: 'Pending Review', icon: Clock },
      hidden: { color: 'bg-gray-100 text-gray-800 border-gray-200', label: 'Hidden', icon: XCircle }
    };
    return configs[status as keyof typeof configs] || configs.pending;
  };

  const filteredTestimonials = testimonials.filter(testimonial => {
    const matchesSearch = testimonial.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         testimonial.client_name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || testimonial.status === filterStatus;
    const matchesSource = filterSource === 'all' || testimonial.source === filterSource;
    
    return matchesSearch && matchesStatus && matchesSource;
  });

  const toggleSelection = (id: string) => {
    setSelectedTestimonials(prev => 
      prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]
    );
  };

  const selectAll = () => {
    if (selectedTestimonials.length === filteredTestimonials.length) {
      setSelectedTestimonials([]);
    } else {
      setSelectedTestimonials(filteredTestimonials.map(t => t.id));
    }
  };

  const handleBulkAction = async (action: 'approve' | 'hide' | 'delete') => {
    for (const id of selectedTestimonials) {
      if (action === 'delete') {
        await deleteTestimonial(id);
      } else {
        await updateTestimonialStatus(id, action === 'approve' ? 'approved' : 'hidden');
      }
    }
    setSelectedTestimonials([]);
    setShowBulkActions(false);
  };

  const pendingCount = testimonials.filter(t => t.status === 'pending').length;
  const approvedCount = testimonials.filter(t => t.status === 'approved').length;
  const hiddenCount = testimonials.filter(t => t.status === 'hidden').length;

  if (loading) {
    return (
      <div className="p-6 space-y-6 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 min-h-screen">
        <div className="flex items-center justify-center py-16">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading testimonials...</p>
          </div>
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
            Testimonials Hub
          </h1>
          <p className="text-gray-600 text-lg">Central database for all testimonials - review, moderate, and manage</p>
          {pendingCount > 0 && (
            <div className="flex items-center space-x-2 mt-2">
              <AlertTriangle className="w-4 h-4 text-amber-500" />
              <span className="text-amber-700 font-medium">{pendingCount} testimonials awaiting review</span>
            </div>
          )}
        </div>
        <div className="flex items-center space-x-3">
          {selectedTestimonials.length > 0 && (
            <div className="flex items-center space-x-2 bg-blue-50 px-4 py-2 rounded-full border border-blue-200 animate-slide-in">
              <span className="text-sm font-medium text-blue-700">{selectedTestimonials.length} selected</span>
              <button 
                onClick={() => setShowBulkActions(!showBulkActions)}
                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                Actions
              </button>
            </div>
          )}
          <button className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 hover:scale-105 shadow-lg flex items-center space-x-2">
            <Import className="w-5 h-5" />
            <span>Import from Sources</span>
          </button>
        </div>
      </div>

      {/* Bulk Actions Dropdown */}
      {showBulkActions && selectedTestimonials.length > 0 && (
        <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-white/20 animate-slide-up">
          <h3 className="font-semibold text-gray-900 mb-3">Bulk Actions ({selectedTestimonials.length} selected)</h3>
          <div className="flex space-x-3">
            <button
              onClick={() => handleBulkAction('approve')}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
            >
              <CheckCircle className="w-4 h-4" />
              <span>Approve All</span>
            </button>
            <button
              onClick={() => handleBulkAction('hide')}
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
            >
              <XCircle className="w-4 h-4" />
              <span>Hide All</span>
            </button>
            <button
              onClick={() => handleBulkAction('delete')}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
            >
              <Trash2 className="w-4 h-4" />
              <span>Delete All</span>
            </button>
            <button
              onClick={() => setShowBulkActions(false)}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Enhanced Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 animate-slide-up" style={{ animationDelay: '100ms' }}>
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-sm border border-white/20 hover:shadow-md transition-all duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total</p>
              <p className="text-2xl font-bold text-gray-900">{testimonials.length}</p>
            </div>
            <MessageSquare className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-sm border border-white/20 hover:shadow-md transition-all duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Pending Review</p>
              <p className="text-2xl font-bold text-amber-600">{pendingCount}</p>
            </div>
            <Clock className="w-8 h-8 text-amber-500" />
          </div>
          {pendingCount > 0 && (
            <div className="mt-2">
              <div className="w-full bg-amber-100 rounded-full h-1">
                <div 
                  className="bg-amber-500 h-1 rounded-full transition-all duration-500"
                  style={{ width: `${(pendingCount / testimonials.length) * 100}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>
        
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-sm border border-white/20 hover:shadow-md transition-all duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Approved</p>
              <p className="text-2xl font-bold text-green-600">{approvedCount}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
        </div>
        
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-sm border border-white/20 hover:shadow-md transition-all duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Hidden</p>
              <p className="text-2xl font-bold text-gray-600">{hiddenCount}</p>
            </div>
            <XCircle className="w-8 h-8 text-gray-500" />
          </div>
        </div>
        
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-sm border border-white/20 hover:shadow-md transition-all duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Approval Rate</p>
              <p className="text-2xl font-bold text-purple-600">
                {testimonials.length > 0 ? Math.round((approvedCount / testimonials.length) * 100) : 0}%
              </p>
            </div>
            <Star className="w-8 h-8 text-purple-500" />
          </div>
        </div>
      </div>

      {/* Enhanced Filters */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 animate-slide-up" style={{ animationDelay: '200ms' }}>
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search testimonials, authors, or content..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/50 backdrop-blur-sm transition-all duration-200"
            />
          </div>

          {/* Filters */}
          <div className="flex space-x-3">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/50 backdrop-blur-sm transition-all duration-200"
            >
              <option value="all">All Status ({testimonials.length})</option>
              <option value="pending">Pending ({pendingCount})</option>
              <option value="approved">Approved ({approvedCount})</option>
              <option value="hidden">Hidden ({hiddenCount})</option>
            </select>

            <select
              value={filterSource}
              onChange={(e) => setFilterSource(e.target.value)}
              className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/50 backdrop-blur-sm transition-all duration-200"
            >
              <option value="all">All Sources</option>
              <option value="direct">Direct Links</option>
              <option value="instagram">Instagram</option>
              <option value="facebook">Facebook</option>
              <option value="x">X (Twitter)</option>
              <option value="youtube">YouTube</option>
            </select>

            <button
              onClick={selectAll}
              className="px-4 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors bg-white/50 backdrop-blur-sm font-medium text-gray-700"
            >
              {selectedTestimonials.length === filteredTestimonials.length ? 'Deselect All' : 'Select All'}
            </button>
          </div>
        </div>
      </div>

      {/* Quick Actions for Pending */}
      {pendingCount > 0 && filterStatus === 'pending' && (
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-200 animate-slide-up" style={{ animationDelay: '250ms' }}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <AlertTriangle className="w-6 h-6 text-amber-600" />
              <div>
                <h3 className="font-semibold text-amber-900">Moderation Required</h3>
                <p className="text-amber-700 text-sm">You have {pendingCount} testimonials waiting for review</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <button className="bg-amber-100 hover:bg-amber-200 text-amber-800 px-4 py-2 rounded-lg font-medium transition-colors">
                Review All Pending
              </button>
              <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                Quick Approve All
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Testimonials Grid */}
      <div className="grid gap-6">
        {filteredTestimonials.map((testimonial, index) => {
          const sourceBadge = getSourceBadge(testimonial.source);
          const statusBadge = getStatusBadge(testimonial.status);
          const StatusIcon = statusBadge.icon;
          
          return (
            <div 
              key={testimonial.id} 
              className={`group bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-slide-up ${
                testimonial.status === 'pending' ? 'ring-2 ring-amber-200 bg-amber-50/50' : ''
              }`}
              style={{ animationDelay: `${300 + index * 50}ms` }}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={selectedTestimonials.includes(testimonial.id)}
                      onChange={() => toggleSelection(testimonial.id)}
                      className="w-5 h-5 text-blue-600 rounded border-2 border-gray-300 focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-200">
                    <span className="text-white font-bold text-sm">
                      {testimonial.client_name.split(' ').map(n => n[0]).join('').toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="font-bold text-gray-900">{testimonial.client_name}</h3>
                      {testimonial.client_email && (
                        <div className="flex items-center space-x-1 bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
                          <span className="text-xs font-medium">✉</span>
                        </div>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">{testimonial.client_email}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${sourceBadge.color} flex items-center space-x-1`}>
                    <span>{sourceBadge.icon}</span>
                    <span>{sourceBadge.label}</span>
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${statusBadge.color} flex items-center space-x-1`}>
                    <StatusIcon className="w-3 h-3" />
                    <span>{statusBadge.label}</span>
                  </span>
                  <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-all duration-200">
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
                {[...Array(5 - testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-gray-300" />
                ))}
                <span className="ml-2 text-sm text-gray-600">({testimonial.rating}/5)</span>
              </div>

              {/* Content */}
              <blockquote className="text-gray-700 mb-6 leading-relaxed text-lg italic border-l-4 border-blue-200 pl-4 bg-blue-50/50 py-3 rounded-r-lg">
                "{testimonial.content}"
              </blockquote>

              {/* Footer */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span>Submitted {new Date(testimonial.created_at).toLocaleDateString()}</span>
                  <span>•</span>
                  <span>{testimonial.content.length} characters</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  {/* Moderation Actions for Pending */}
                  {testimonial.status === 'pending' && (
                    <div className="flex space-x-2 animate-pulse">
                      <button 
                        onClick={() => updateTestimonialStatus(testimonial.id, 'approved')}
                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105 flex items-center space-x-1"
                      >
                        <CheckCircle className="w-4 h-4" />
                        <span>Approve</span>
                      </button>
                      <button 
                        onClick={() => updateTestimonialStatus(testimonial.id, 'hidden')}
                        className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105 flex items-center space-x-1"
                      >
                        <XCircle className="w-4 h-4" />
                        <span>Hide</span>
                      </button>
                    </div>
                  )}
                  
                  {/* Standard Actions */}
                  <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <button className="p-2 text-gray-400 hover:text-blue-600 rounded-lg hover:bg-blue-50 transition-all duration-200" title="Edit">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-green-600 rounded-lg hover:bg-green-50 transition-all duration-200" title="Share">
                      <Share2 className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => updateTestimonialStatus(testimonial.id, testimonial.status === 'approved' ? 'hidden' : 'approved')}
                      className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-50 transition-all duration-200"
                      title={testimonial.status === 'approved' ? 'Hide' : 'Show'}
                    >
                      {testimonial.status === 'approved' ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                    <button 
                      onClick={() => deleteTestimonial(testimonial.id)}
                      className="p-2 text-gray-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-all duration-200"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredTestimonials.length === 0 && (
        <div className="text-center py-16 animate-fade-in">
          <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <MessageSquare className="w-12 h-12 text-blue-500" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            {searchTerm || filterStatus !== 'all' || filterSource !== 'all' 
              ? 'No testimonials match your filters' 
              : 'No testimonials yet'
            }
          </h3>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            {searchTerm || filterStatus !== 'all' || filterSource !== 'all'
              ? 'Try adjusting your search terms or filters to find what you\'re looking for.'
              : 'Start by importing testimonials from your social media accounts or sharing collection links with customers.'
            }
          </p>
          {!searchTerm && filterStatus === 'all' && filterSource === 'all' && (
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4">
              <button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 hover:scale-105 shadow-lg flex items-center space-x-2">
                <Import className="w-5 h-5" />
                <span>Import from Social Media</span>
              </button>
              <button className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 hover:scale-105 shadow-lg">
                Create Collection Link
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Testimonials;