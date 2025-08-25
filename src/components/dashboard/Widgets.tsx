import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Code, Eye, Settings, Trash2, Layout, Play, Quote, BarChart3, Copy, ExternalLink, Sparkles, Zap, TrendingUp, Edit, Grid3X3, List, Heart, Trophy } from 'lucide-react';
import { useWidgets, useTestimonials, useWidgetPreviews } from '../../hooks/useTestimonials';

const Widgets: React.FC = () => {
  const navigate = useNavigate();
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const { widgets, loading, deleteWidget } = useWidgets();
  const { testimonials } = useTestimonials();
  const { createPreview } = useWidgetPreviews();

  const handleCreateWidget = () => {
    navigate('/dashboard/widgets/create');
  };

  const copyEmbedCode = async (code: string, id: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const getWidgetIcon = (type: string) => {
    switch (type) {
      case 'wall': return Layout;
      case 'carousel': return Play;
      case 'single': return Quote;
      case 'masonry': return Grid3X3;
      case 'list': return List;
      case 'floating': return Zap;
      case 'featured': return Heart;
      case 'awards': return Trophy;
      default: return Layout;
    }
  };

  const getWidgetTypeLabel = (type: string) => {
    switch (type) {
      case 'wall': return 'Wall of Love';
      case 'carousel': return 'Carousel';
      case 'single': return 'Single Testimonial';
      case 'masonry': return 'Masonry Grid';
      case 'list': return 'List View';
      case 'floating': return 'Floating Bubbles';
      case 'featured': return 'Featured Spotlight';
      case 'awards': return 'Top Review';
      default: return 'Widget';
    }
  };

  const getConversionRate = (clicks_count: number, views_count: number) => {
    return views_count > 0 ? ((clicks_count / views_count) * 100).toFixed(1) : '0.0';
  };

  const getWidgetTestimonialCount = (widget: any) => {
    if (!widget.settings?.selected_sources || widget.settings.selected_sources.length === 0) return 0;
    
    let count = testimonials.filter(t => {
      // Filter by source
      const sourceMatch = widget.settings.selected_sources.includes(t.source);
      
      // Filter by tags if any are specified
      const tagMatch = !widget.settings?.filter_tags || widget.settings.filter_tags.length === 0 || 
        widget.settings.filter_tags.some((tag: string) => 
          t.content.toLowerCase().includes(tag.toLowerCase())
        );
      
      // Only approved testimonials
      const statusMatch = t.status === 'approved';
      
      return sourceMatch && tagMatch && statusMatch;
    }).length;
    
    return Math.min(count, widget.settings?.max_testimonials || 10);
  };

  const handlePreview = async (widget: any) => {
    try {
      // Get testimonials that match the widget's criteria
      const widgetTestimonials = testimonials.filter(t => {
        const sourceMatch = widget.settings?.selected_sources?.includes(t.source) ?? false;
        const tagMatch = !widget.settings?.filter_tags || widget.settings.filter_tags.length === 0 || 
          widget.settings.filter_tags.some((tag: string) => 
            t.content.toLowerCase().includes(tag.toLowerCase())
          );
        const statusMatch = t.status === 'approved';
        return sourceMatch && tagMatch && statusMatch;
      }).slice(0, widget.settings?.max_testimonials || 10);

      // Create preview
      const preview = await createPreview(widget.id, widget, widgetTestimonials);
      if (preview) {
        // Open preview in new tab
        window.open(`/preview/${preview.preview_url}`, '_blank');
      }
    } catch (error) {
      console.error('Error creating preview:', error);
    }
  };

  if (loading) {
    return (
      <div className="p-6 space-y-6 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 min-h-screen">
        <div className="flex items-center justify-center py-16">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading widgets...</p>
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
            Widget Gallery
          </h1>
          <p className="text-gray-600 text-lg">Create and manage beautiful testimonial widgets for your website</p>
        </div>
        <button
          onClick={handleCreateWidget}
          className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 hover:scale-105 shadow-lg flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>Create Widget</span>
        </button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 animate-slide-up" style={{ animationDelay: '100ms' }}>
        {[
          { label: 'Total Widgets', value: widgets.length.toString(), icon: Layout, color: 'purple' },
          { label: 'Total Views', value: widgets.reduce((sum, w) => sum + w.views_count, 0).toLocaleString(), icon: Eye, color: 'blue' },
          { label: 'Total Clicks', value: widgets.reduce((sum, w) => sum + w.clicks_count, 0).toString(), icon: TrendingUp, color: 'green' },
          { label: 'Active Widgets', value: widgets.filter(w => w.is_active).length.toString(), icon: Zap, color: 'amber' }
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

      {widgets.length === 0 ? (
        /* Empty State */
        <div className="text-center py-16 animate-fade-in">
          <div className="w-24 h-24 bg-gradient-to-br from-purple-100 to-purple-200 rounded-full flex items-center justify-center mx-auto mb-6">
            <Code className="w-12 h-12 text-purple-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">No widgets created yet</h3>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            Create your first testimonial widget to start displaying social proof on your website.
          </p>
          <button
            onClick={handleCreateWidget}
            className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 hover:scale-105 shadow-lg"
          >
            Create Your First Widget
          </button>
        </div>
      ) : (
        /* Widgets Grid */
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {widgets.map((widget, index) => {
            const IconComponent = getWidgetIcon(widget.type);
            const conversionRate = getConversionRate(widget.clicks_count, widget.views_count);
            const testimonialCount = getWidgetTestimonialCount(widget);
            
            return (
              <div 
                key={widget.id} 
                className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-slide-up"
                style={{ animationDelay: `${200 + index * 100}ms` }}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${
                      widget.type === 'wall' ? 'from-purple-500 to-purple-600' :
                      widget.type === 'carousel' ? 'from-blue-500 to-blue-600' :
                      'from-green-500 to-green-600'
                    } flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-200`}>
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 group-hover:text-purple-600 transition-colors">
                        {widget.name}
                      </h3>
                      <p className="text-sm text-gray-600">{getWidgetTypeLabel(widget.type)}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-1">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      widget.is_active 
                        ? 'bg-green-100 text-green-700 border border-green-200' 
                        : 'bg-gray-100 text-gray-700 border border-gray-200'
                    }`}>
                      {widget.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-3 mb-6">
                  <div className="text-center p-3 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg border border-blue-200">
                    <div className="text-lg font-bold text-blue-900">{testimonialCount}</div>
                    <div className="text-xs text-blue-700 font-medium">Testimonials</div>
                  </div>
                  <div className="text-center p-3 bg-gradient-to-br from-green-50 to-green-100 rounded-lg border border-green-200">
                    <div className="text-lg font-bold text-green-900">{widget.views_count.toLocaleString()}</div>
                    <div className="text-xs text-green-700 font-medium">Views</div>
                  </div>
                  <div className="text-center p-3 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg border border-purple-200">
                    <div className="text-lg font-bold text-purple-900">{conversionRate}%</div>
                    <div className="text-xs text-purple-700 font-medium">CTR</div>
                  </div>
                </div>

                {/* Performance Indicator */}
                <div className="mb-4 p-3 bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg border border-gray-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Performance</span>
                    <span className="text-sm font-bold text-blue-600">{widget.clicks_count} clicks</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${Math.min(parseFloat(conversionRate) * 10, 100)}%` }}
                    ></div>
                  </div>
                </div>

                {/* Embed Code */}
                <div className="mb-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Embed Code</span>
                    <button
                      onClick={() => copyEmbedCode(widget.embed_code, widget.id)}
                      className="text-blue-600 hover:text-blue-700 transition-colors"
                      title="Copy embed code"
                    >
                      {copiedId === widget.id ? (
                        <span className="text-green-600 text-xs font-medium">Copied!</span>
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                  <code className="text-xs text-gray-600 font-mono break-all">
                    {widget.embed_code}
                  </code>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2">
                  <button 
                    onClick={() => handlePreview(widget)}
                    className="flex-1 bg-gradient-to-r from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:scale-105 flex items-center justify-center space-x-2 border border-gray-200"
                  >
                    <Eye className="w-4 h-4" />
                    <span>Preview</span>
                  </button>
                  <button 
                    onClick={() => navigate(`/dashboard/widgets/edit/${widget.id}`)}
                    className="flex-1 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:scale-105 flex items-center justify-center space-x-2 shadow-md"
                  >
                    <Edit className="w-4 h-4" />
                    <span>Edit</span>
                  </button>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
                  <span className="text-xs text-gray-500">
                    Created {new Date(widget.created_at).toLocaleDateString()}
                  </span>
                  <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <button className="p-1 text-gray-400 hover:text-blue-600 rounded transition-colors">
                      <ExternalLink className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => deleteWidget(widget.id)}
                      className="p-1 text-gray-400 hover:text-red-600 rounded transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Hover Effect Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-blue-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            );
          })}
        </div>
      )}

      {/* Quick Actions */}
      {widgets.length > 0 && (
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-6 border border-purple-200 animate-slide-up" style={{ animationDelay: '600ms' }}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Widget Performance Insights</h3>
                <p className="text-gray-600 text-sm">Your widgets are performing {widgets.length > 2 ? 'excellently' : 'well'}! Average CTR: {widgets.length > 0 ? (widgets.reduce((sum, w) => sum + parseFloat(getConversionRate(w.clicks_count, w.views_count)), 0) / widgets.length).toFixed(1) : 0}%</p>
              </div>
            </div>
            <div className="flex space-x-3">
              <button className="bg-white/70 hover:bg-white text-purple-700 px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:scale-105 border border-purple-200">
                View Analytics
              </button>
              <button
                onClick={handleCreateWidget}
                className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:scale-105 shadow-md"
              >
                Create Another
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Widgets;