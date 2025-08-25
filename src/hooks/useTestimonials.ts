import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { Testimonial, CollectionLink, Widget, WidgetPreview } from '../types';

export const useTestimonials = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const fetchTestimonials = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTestimonials(data || []);
    } catch (error) {
      console.error('Error fetching testimonials:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, [user]);

  const updateTestimonialStatus = async (id: string, status: 'approved' | 'hidden') => {
    try {
      const { error } = await supabase
        .from('testimonials')
        .update({ status })
        .eq('id', id);

      if (error) throw error;
      
      setTestimonials(prev => 
        prev.map(t => t.id === id ? { ...t, status } : t)
      );
    } catch (error) {
      console.error('Error updating testimonial:', error);
    }
  };

  const deleteTestimonial = async (id: string) => {
    try {
      const { error } = await supabase
        .from('testimonials')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      setTestimonials(prev => prev.filter(t => t.id !== id));
    } catch (error) {
      console.error('Error deleting testimonial:', error);
    }
  };

  return {
    testimonials,
    loading,
    updateTestimonialStatus,
    deleteTestimonial,
    refetch: fetchTestimonials
  };
};

export const useCollectionLinks = () => {
  const [links, setLinks] = useState<CollectionLink[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const fetchLinks = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('collection_links')
        .select(`
          *,
          testimonials(count)
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setLinks(data || []);
    } catch (error) {
      console.error('Error fetching collection links:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLinks();
  }, [user]);

  const createLink = async (linkData: Omit<CollectionLink, 'id' | 'user_id' | 'url' | 'created_at'>) => {
    if (!user) return;

    try {
      const linkId = crypto.randomUUID();
      
      // Get user's username for the new URL structure
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('username')
        .eq('id', user.id)
        .single();

      if (userError) throw userError;
      
      // Generate URL based on whether user has username set
      const url = userData?.username && linkData.slug
        ? `${window.location.origin}/c/${userData.username}/${linkData.slug}`
        : `${window.location.origin}/collect/${linkId}`;

      const { data, error } = await supabase
        .from('collection_links')
        .insert({
          id: linkId,
          user_id: user.id,
          url,
          ...linkData
        })
        .select()
        .single();

      if (error) throw error;
      
      setLinks(prev => [data, ...prev]);
      return data;
    } catch (error) {
      console.error('Error creating collection link:', error);
      throw error;
    }
  };

  const updateLink = async (id: string, updates: Partial<CollectionLink>) => {
    try {
      const { error } = await supabase
        .from('collection_links')
        .update(updates)
        .eq('id', id);

      if (error) throw error;
      
      setLinks(prev => 
        prev.map(link => link.id === id ? { ...link, ...updates } : link)
      );
    } catch (error) {
      console.error('Error updating collection link:', error);
    }
  };

  const deleteLink = async (id: string) => {
    try {
      const { error } = await supabase
        .from('collection_links')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      setLinks(prev => prev.filter(link => link.id !== id));
    } catch (error) {
      console.error('Error deleting collection link:', error);
    }
  };

  return {
    links,
    loading,
    createLink,
    updateLink,
    deleteLink,
    refetch: fetchLinks
  };
};

export const useWidgets = () => {
  const [widgets, setWidgets] = useState<Widget[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const fetchWidgets = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('widgets')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setWidgets(data || []);
    } catch (error) {
      console.error('Error fetching widgets:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWidgets();
  }, [user]);

  const createWidget = async (widgetData: {
    widget_name: string;
    widget_type: string;
    settings: any;
    is_active?: boolean;
  }) => {
    if (!user) return;

    try {
      // First, ensure the user exists in the users table
      const { data: existingUser, error: userCheckError } = await supabase
        .from('users')
        .select('id')
        .eq('id', user.id)
        .single();

      if (userCheckError && userCheckError.code === 'PGRST116') {
        // User doesn't exist, create them
        const { error: userCreateError } = await supabase
          .from('users')
          .insert({
            id: user.id,
            email: user.email || '',
            first_name: user.user_metadata?.first_name || '',
            last_name: user.user_metadata?.last_name || '',
            company: user.user_metadata?.company || ''
          });

        if (userCreateError) {
          console.error('Error creating user:', userCreateError);
          throw new Error('Failed to create user profile. Please try signing in again.');
        }
      } else if (userCheckError) {
        throw userCheckError;
      }

      const widgetId = crypto.randomUUID();
      const embedCode = `<script src="${window.location.origin}/widget/${widgetId}.js"></script>`;
      
      const { data, error } = await supabase
        .from('widgets')
        .insert({
          id: widgetId,
          user_id: user.id,
          widget_name: widgetData.widget_name,
          widget_type: widgetData.widget_type,
          settings: widgetData.settings,
          is_active: widgetData.is_active ?? true,
          embed_code: embedCode,
          views_count: 0,
          clicks_count: 0
        })
        .select()
        .single();

      if (error) throw error;

      setWidgets(prev => [data, ...prev]);
      
      return data;
    } catch (error) {
      console.error('Error creating widget:', error);
      throw error;
    }
  };

  const updateWidget = async (id: string, updates: Partial<Widget>) => {
    try {
      const { error } = await supabase
        .from('widgets')
        .update(updates)
        .eq('id', id);

      if (error) throw error;
      
      setWidgets(prev => 
        prev.map(widget => widget.id === id ? { ...widget, ...updates } : widget)
      );
    } catch (error) {
      console.error('Error updating widget:', error);
    }
  };

  const deleteWidget = async (id: string) => {
    try {
      const { error } = await supabase
        .from('widgets')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      setWidgets(prev => prev.filter(widget => widget.id !== id));
    } catch (error) {
      console.error('Error deleting widget:', error);
    }
  };

  const incrementViews = async (id: string) => {
    const widget = widgets.find(w => w.id === id);
    if (widget) {
      await updateWidget(id, { views_count: widget.views_count + 1 });
    }
  };

  const incrementClicks = async (id: string) => {
    const widget = widgets.find(w => w.id === id);
    if (widget) {
      await updateWidget(id, { clicks_count: widget.clicks_count + 1 });
    }
  };

  return {
    widgets,
    loading,
    createWidget,
    updateWidget,
    deleteWidget,
    incrementViews,
    incrementClicks,
    refetch: fetchWidgets
  };
};

export const useWidgetPreviews = () => {
  const [previews, setPreviews] = useState<WidgetPreview[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const fetchPreviews = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('widget_previews')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPreviews(data || []);
    } catch (error) {
      console.error('Error fetching widget previews:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPreviews();
  }, [user]);

  const createPreview = async (widgetId: string, widgetData: Widget, testimonials: Testimonial[]) => {
    if (!user) return;

    try {
      const previewId = crypto.randomUUID();
      const previewUrl = `preview-${previewId}`;
      
      const { data, error } = await supabase
        .from('widget_previews')
        .insert({
          id: previewId,
          widget_id: widgetId,
          user_id: user.id,
          preview_data: {
            widget: widgetData,
            testimonials: testimonials
          },
          preview_url: previewUrl,
          is_active: true
        })
        .select()
        .single();

      if (error) throw error;
      
      setPreviews(prev => [data, ...prev]);
      return data;
    } catch (error) {
      console.error('Error creating widget preview:', error);
      throw error;
    }
  };

  const updatePreview = async (id: string, updates: Partial<WidgetPreview>) => {
    try {
      const { error } = await supabase
        .from('widget_previews')
        .update(updates)
        .eq('id', id);

      if (error) throw error;
      
      setPreviews(prev => 
        prev.map(preview => preview.id === id ? { ...preview, ...updates } : preview)
      );
    } catch (error) {
      console.error('Error updating widget preview:', error);
    }
  };

  const deletePreview = async (id: string) => {
    try {
      const { error } = await supabase
        .from('widget_previews')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      setPreviews(prev => prev.filter(preview => preview.id !== id));
    } catch (error) {
      console.error('Error deleting widget preview:', error);
    }
  };

  const getPreviewByUrl = async (previewUrl: string) => {
    try {
      const { data, error } = await supabase
        .from('widget_previews')
        .select('*')
        .eq('preview_url', previewUrl)
        .eq('is_active', true)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching preview by URL:', error);
      throw error; // Re-throw to handle in component
    }
  };

  return {
    previews,
    loading,
    createPreview,
    updatePreview,
    deletePreview,
    getPreviewByUrl,
    refetch: fetchPreviews
  };
};