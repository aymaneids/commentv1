import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase, getCollectionLinkByUsernameAndSlug } from '../../lib/supabase';
import { Star, Send, Video, Camera, CheckCircle, Heart } from 'lucide-react';

interface CollectionLink {
  id: string;
  name: string;
  description?: string;
  allow_video: boolean;
  require_rating: boolean;
  collect_email: boolean;
  custom_message?: string;
  user_id: string;
  views_count?: number;
  submissions_count?: number;
}

interface CollectionPageProps {
  customUrl?: {
    username: string;
    slug: string;
  };
}

const CollectionPage: React.FC<CollectionPageProps> = ({ customUrl }) => {
  const params = useParams<{ linkId?: string; username?: string; slug?: string }>();
  
  // Determine which parameters to use based on the route
  const linkId = !customUrl ? params.linkId : undefined;
  const username = customUrl ? customUrl.username : params.username;
  const slug = customUrl ? customUrl.slug : params.slug;

  const [link, setLink] = useState<CollectionLink | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    client_name: '',
    client_email: '',
    content: '',
    rating: 5,
  });

  useEffect(() => {
    const fetchLink = async () => {
      // Ensure we have either a linkId or a username/slug pair
      if (!linkId && !(username && slug)) {
        setLoading(false);
        return;
      }

      try {
        let data: CollectionLink | null = null;
        let error: any = null;

        if (linkId) {
          // Fetch by ID for /collect/:linkId routes
          ({ data, error } = await supabase
            .from('collection_links')
            .select('*')
            .eq('id', linkId)
            .eq('is_active', true)
            .single());
        } else if (username && slug) {
          // Fetch by username and slug for /c/:username/:slug routes
          data = await getCollectionLinkByUsernameAndSlug(username, slug);
        }

        if (error) throw error;
        if (!data) throw new Error('Link not found');

        setLink(data);

        // Increment view count
        await supabase
          .from('collection_links')
          .update({ views_count: (data.views_count || 0) + 1 })
          .eq('id', data.id);

      } catch (err) {
        console.error('Error fetching collection link:', err);
        setLink(null); // Ensure link is null on error
      } finally {
        setLoading(false);
      }
    };

    fetchLink();
  }, [linkId, username, slug]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!link) return;

    setSubmitting(true);

    try {
      const { error } = await supabase
        .from('testimonials')
        .insert({
          user_id: link.user_id,
          collection_link_id: link.id,
          client_name: formData.client_name,
          client_email: formData.client_email,
          content: formData.content,
          rating: formData.rating,
          source: 'direct',
          status: 'pending',
        });

      if (error) throw error;

      // Increment submissions count
      await supabase
        .from('collection_links')
        .update({ submissions_count: (link.submissions_count || 0) + 1 })
        .eq('id', link.id);

      setSubmitted(true);
    } catch (error) {
      console.error('Error submitting testimonial:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const setRating = (rating: number) => {
    setFormData(prev => ({ ...prev, rating }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!link) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl">😞</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Link Not Found</h1>
          <p className="text-gray-600">This testimonial collection link is not available or has been disabled.</p>
        </div>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center animate-scale-in">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Thank You!</h1>
            <p className="text-gray-600 mb-6">
              Your testimonial has been submitted successfully. We appreciate you taking the time to share your experience!
            </p>
            <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
              <Heart className="w-4 h-4 text-red-500" />
              <span>Powered by Credo</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-4">
      <div className="max-w-2xl mx-auto py-12">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="inline-flex items-center space-x-2 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shadow-lg">
              <span className="text-white font-bold">C</span>
            </div>
            <span className="text-xl font-bold text-gray-900">Credo</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{link.name}</h1>
          {link.description && (
            <p className="text-gray-600 text-lg">{link.description}</p>
          )}
          {link.custom_message && (
            <div className="mt-4 p-4 bg-blue-50 rounded-xl border border-blue-200">
              <p className="text-blue-800">{link.custom_message}</p>
            </div>
          )}
        </div>

        {/* Form */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20 animate-slide-up">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Your Name *
              </label>
              <input
                type="text"
                name="client_name"
                value={formData.client_name}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="John Doe"
                required
              />
            </div>

            {/* Email */}
            {link.collect_email && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="client_email"
                  value={formData.client_email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="john@example.com"
                  required
                />
              </div>
            )}

            {/* Rating */}
            {link.require_rating && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Rating *
                </label>
                <div className="flex items-center space-x-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="transition-all duration-200 hover:scale-110"
                    >
                      <Star
                        className={`w-8 h-8 ${
                          star <= formData.rating
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="ml-4 text-sm text-gray-600">
                    {formData.rating} out of 5 stars
                  </span>
                </div>
              </div>
            )}

            {/* Testimonial Content */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Your Testimonial *
              </label>
              <textarea
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                rows={6}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                placeholder="Share your experience with us..."
                required
              />
              <p className="text-sm text-gray-500 mt-2">
                Tell us about your experience and how our product/service helped you.
              </p>
            </div>

            {/* Video Option */}
            {link.allow_video && (
              <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center">
                <Video className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">Record a Video Testimonial</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Video testimonials are more engaging and personal. Click below to record yours!
                </p>
                <button
                  type="button"
                  className="bg-purple-100 hover:bg-purple-200 text-purple-700 px-6 py-3 rounded-lg font-semibold transition-colors flex items-center space-x-2 mx-auto"
                >
                  <Camera className="w-5 h-5" />
                  <span>Record Video</span>
                </button>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-4 px-6 rounded-xl font-semibold transition-all duration-200 hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center space-x-2"
            >
              {submitting ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  <span>Submit Testimonial</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 animate-fade-in" style={{ animationDelay: '300ms' }}>
          <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
            <Heart className="w-4 h-4 text-red-500" />
            <span>Powered by</span>
            <span className="font-semibold text-gray-700">Credo</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollectionPage;