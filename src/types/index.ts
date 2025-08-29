export interface Testimonial {
  id: string;
  user_id: string;
  client_name: string;
  client_email: string;
  content: string;
  rating: number;
  source: 'direct' | 'instagram' | 'facebook' | 'x' | 'youtube';
  status: 'pending' | 'approved' | 'hidden';
  created_at: string;
  collection_link_id?: string;
}

export interface CollectionLink {
  id: string;
  user_id: string;
  name: string;
  description?: string;
  url: string;
  slug?: string;
  is_active: boolean;
  allow_video: boolean;
  require_rating: boolean;
  collect_email: boolean;
  custom_message?: string;
  created_at: string;
  submissions_count?: number;
  views_count?: number;
}

export interface Widget {
  id: string;
  user_id: string;
  widget_name: string;
  widget_type: 'wall' | 'carousel' | 'single' | 'masonry' | 'list' | 'floating' | 'featured' | 'awards' | 'infinite-scroll';
  settings: {
    theme: 'light' | 'dark' | 'auto';
    max_testimonials: number;
    animation_style: string;
    show_ratings: boolean;
    show_avatars: boolean;
    show_company: boolean;
    autoplay: boolean;
    selected_sources: string[];
    filter_tags: string[];
  };
  is_active: boolean;
  embed_code: string;
  views_count: number;
  clicks_count: number;
  created_at: string;
  updated_at: string;
}

export interface WidgetPreview {
  id: string;
  widget_id: string;
  user_id: string;
  preview_data: {
    widget: Widget;
    testimonials: Testimonial[];
  };
  preview_url: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface AnalyticsData {
  totalTestimonials: number;
  pendingApproval: number;
  totalViews: number;
  conversionRate: number;
  recentActivity: Array<{
    id: string;
    type: 'submission' | 'approval' | 'import';
    description: string;
    timestamp: string;
  }>;
  chartData: Array<{
    date: string;
    submissions: number;
    approvals: number;
    views: number;
  }>;
}