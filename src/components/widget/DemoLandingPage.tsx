import React from 'react';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Star, ArrowRight, CheckCircle, Zap, Shield, Users } from 'lucide-react';
import WidgetPreview from './WidgetPreview';
import { useWidgetPreviews } from '../../hooks/useTestimonials';
import { WidgetPreview as WidgetPreviewType } from '../../types';

const DemoLandingPage: React.FC = () => {
  const { previewId } = useParams<{ previewId: string }>();
  const { getPreviewByUrl } = useWidgetPreviews();
  const [preview, setPreview] = useState<WidgetPreviewType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPreview = async () => {
      if (!previewId) return;
      
      try {
        setError(null);
        const previewData = await getPreviewByUrl(previewId);
        setPreview(previewData);
      } catch (error) {
        console.error('Error fetching preview:', error);
        setError('Failed to load preview data');
      } finally {
        setLoading(false);
      }
    };

    fetchPreview();
  }, [previewId]); // Removed getPreviewByUrl dependency to prevent re-renders

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading preview...</p>
        </div>
      </div>
    );
  }

  if (error || !preview) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl">😞</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Preview Not Found</h1>
          <p className="text-gray-600">
            {error || 'This widget preview is not available or has been disabled.'}
          </p>
        </div>
      </div>
    );
  }

  const { widget, testimonials } = preview.preview_data;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Demo Banner */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center space-x-2 text-sm">
            <Zap className="w-4 h-4" />
            <span className="font-medium">This is a demo landing page showing how your widget looks in a real website</span>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">C</span>
              </div>
              <span className="text-xl font-bold text-gray-900">Credo Demo</span>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">Features</a>
              <a href="#testimonials" className="text-gray-600 hover:text-gray-900 transition-colors">Testimonials</a>
              <a href="#pricing" className="text-gray-600 hover:text-gray-900 transition-colors">Pricing</a>
            </nav>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
              Get Started
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Star className="w-4 h-4 fill-current" />
              <span>Trusted by 1,000+ companies</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Build amazing products
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                that customers love
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Our platform helps you create, manage, and scale your business with powerful tools 
              and integrations that just work.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-12">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all transform hover:scale-105 shadow-lg flex items-center space-x-2">
                <span>Start Free Trial</span>
                <ArrowRight className="w-5 h-5" />
              </button>
              <button className="text-gray-600 hover:text-gray-900 px-8 py-4 rounded-xl font-semibold text-lg transition-colors">
                Watch Demo
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Everything you need to succeed
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Powerful features designed to help you build, launch, and grow your business.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Zap,
                title: "Lightning Fast",
                description: "Built for speed and performance with modern technologies."
              },
              {
                icon: Shield,
                title: "Secure & Reliable",
                description: "Enterprise-grade security with 99.9% uptime guarantee."
              },
              {
                icon: Users,
                title: "Team Collaboration",
                description: "Work together seamlessly with powerful collaboration tools."
              }
            ].map((feature, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section - This is where your widget appears */}
      <section id="testimonials" className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              What our customers say
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Don't just take our word for it. Here's what real customers think about our platform.
            </p>
          </div>

          {/* Widget Preview Container */}
          <div className="w-full">
            <div className="relative">
              {/* Widget Preview */}
              <WidgetPreview
                widget={widget}
                testimonials={testimonials}
              />
            </div>

            {/* Widget Details */}
            <div className="mt-8 bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Widget Configuration</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">Type:</span>
                  <span className="ml-2 font-medium capitalize">{widget.type}</span>
                </div>
                <div>
                  <span className="text-gray-500">Theme:</span>
                  <span className="ml-2 font-medium capitalize">{widget.theme}</span>
                </div>
                <div>
                  <span className="text-gray-500">Max Items:</span>
                  <span className="ml-2 font-medium">{widget.max_testimonials}</span>
                </div>
                <div>
                  <span className="text-gray-500">Animation:</span>
                  <span className="ml-2 font-medium capitalize">{widget.animation_style}</span>
                </div>
              </div>
              
              <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-blue-800 text-sm">
                  <strong>How it works in real websites:</strong> This widget would be embedded using a simple script tag. 
                  It automatically fetches and displays your approved testimonials, updates in real-time, and matches your website's design.
                  Visitors can interact with it (click, scroll through carousel, etc.) and it tracks engagement metrics for you.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Ready to get started?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of companies already using our platform to grow their business.
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all transform hover:scale-105 shadow-lg">
            Start Your Free Trial
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">C</span>
              </div>
              <span className="text-xl font-bold">Credo Demo</span>
            </div>
            <p className="text-gray-400 mb-4">
              This is a demo landing page showing how your Credo widget integrates seamlessly into real websites.
            </p>
            <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
              <span>Powered by</span>
              <span className="font-semibold text-blue-400">Credo</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default DemoLandingPage;