import React, { useState } from 'react';
import { Star, Play, ChevronLeft, ChevronRight, Twitter, Instagram, Facebook, Youtube, Link, Award, Trophy, Sparkles } from 'lucide-react';
import { Widget, Testimonial } from '../../types';

interface WidgetPreviewProps {
  widget: Widget;
  testimonials: Testimonial[];
  className?: string;
}

const WidgetPreview: React.FC<WidgetPreviewProps> = ({
  widget,
  testimonials,
  className = ''
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hoveredBubble, setHoveredBubble] = useState<string | null>(null);
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const displayTestimonials = testimonials.slice(0, widget.settings.max_testimonials);

  React.useEffect(() => {
    if (widget.widget_type === 'carousel' && widget.settings.autoplay && displayTestimonials.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex(prev => (prev + 1) % displayTestimonials.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [widget.widget_type, widget.settings.autoplay, displayTestimonials.length]);

  const getAnimationClass = () => {
    switch (widget.settings.animation_style) {
      case 'fade': return 'animate-fade-in';
      case 'slide': return 'animate-slide-up';
      case 'scale': return 'animate-scale-in';
      default: return '';
    }
  };

  const getThemeClasses = () => {
    return widget.settings.theme === 'dark' 
      ? 'bg-gray-900 text-white' 
      : 'bg-white text-gray-900';
  };

  if (displayTestimonials.length === 0) {
    return (
      <div className={`rounded-xl p-6 border-2 border-dashed ${className}`}>
        <div className="text-center text-gray-500">
          <p className="text-sm">No testimonials to display.</p>
        </div>
      </div>
    );
  };

  // ### TESTIMONIAL CARD COMPONENT ###
  const TestimonialCard: React.FC<{ 
    testimonial: Testimonial; 
    index?: number; 
    variant?: 'default' | 'small' | 'large' 
  }> = ({ 
    testimonial, 
    index = 0,
    variant = 'default'
  }) => {
    const { rating, content, client_name, source, client_email } = testimonial;
    
    const getPlatformIcon = (platform: string) => {
      switch (platform) {
        case 'x':
          return <Twitter className="w-4 h-4 text-gray-500" />;
        case 'instagram':
          return <Instagram className="w-4 h-4 text-gray-500" />;
        case 'facebook':
          return <Facebook className="w-4 h-4 text-gray-500" />;
        case 'youtube':
         return <Youtube className="w-4 h-4 text-gray-500" />;
        case 'direct':
         return <Link className="w-4 h-4 text-gray-500" />;
        default:
          return null;
      }
    };
    
    const renderStars = (rating: number) => {
      return Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          className={`w-5 h-5 ${
            i < rating
              ? "text-yellow-400 fill-current"
              : "text-gray-300"
          }`}
        />
      ));
    };

    const getCardClasses = () => {
      const baseClasses = `relative bg-white border border-gray-200/80 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 ease-out hover:-translate-y-1 group ${getAnimationClass()}`;
      
      switch (variant) {
        case 'small':
          return `${baseClasses} p-6`;
        case 'large':
          return `${baseClasses} p-12`;
        default:
          return `${baseClasses} p-10`;
      }
    };

    const getTextClasses = () => {
      switch (variant) {
        case 'small':
          return 'text-sm';
        case 'large':
          return 'text-lg';
        default:
          return 'text-base';
      }
    };

    return (
      <div
        className={getCardClasses()}
        style={{ animationDelay: `${index * 100}ms` }}
      >
        {/* Star Rating */}
        <div className="flex items-center gap-1 mb-4">
          {renderStars(rating)}
        </div>

        {/* Testimonial Text */}
        <blockquote className={`text-gray-800 leading-relaxed mb-6 font-medium flex-1 ${getTextClasses()}`}>
          "{content}"
        </blockquote>

        {/* Author Information */}
        <div className="flex items-center gap-4">
          {/* Avatar */}
          <div className="relative">
            <div className={`${variant === 'large' ? 'w-16 h-16' : 'w-12 h-12'} bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-md ring-2 ring-white`}>
              <span className={`text-white font-semibold ${variant === 'large' ? 'text-lg' : 'text-base'}`}>
                {client_name.split(' ').map(n => n[0]).join('').toUpperCase()}
              </span>
            </div>
            {/* Source Platform Icon */}
            {source && (
              <div className="absolute -bottom-1 -right-1 bg-white border border-gray-200 rounded-full p-1 shadow-sm">
                {getPlatformIcon(source)}
              </div>
            )}
          </div>

          {/* Author Details */}
          <div className="flex-1 min-w-0">
            <div className={`text-gray-900 font-semibold ${variant === 'large' ? 'text-base' : 'text-sm'}`}>
              {client_name}
            </div>
            <div className={`text-gray-500 leading-tight ${variant === 'large' ? 'text-sm' : 'text-xs'}`}>
              {["credo"].filter(Boolean).join(" • ")}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Render based on widget type
  switch (widget.widget_type) {
    case 'wall':
    case 'masonry':
      return (
        <div className={`${className}`}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayTestimonials.map((testimonial, index) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} index={index} />
            ))}
          </div>
        </div>
      );

    case 'carousel':
      return (
        <div className={`relative ${className}`}>
           <div className="relative overflow-hidden">
            <div 
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {displayTestimonials.map((testimonial) => (
                <div key={testimonial.id} className="w-full flex-shrink-0 p-2">
                  <TestimonialCard testimonial={testimonial} />
                </div>
              ))}
            </div>
          </div>
          
          {displayTestimonials.length > 1 && (
            <>
              <button
                onClick={() => setCurrentIndex(prev => prev === 0 ? displayTestimonials.length - 1 : prev - 1)}
                className="absolute left-0 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white shadow-lg transition-all"
              >
                <ChevronLeft className="w-5 h-5 text-gray-600" />
              </button>
              <button
                onClick={() => setCurrentIndex(prev => (prev + 1) % displayTestimonials.length)}
                className="absolute right-0 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white shadow-lg transition-all"
              >
                <ChevronRight className="w-5 h-5 text-gray-600" />
              </button>
            </>
          )}
        </div>
      );

    case 'single':
      return (
        <div className={`${className}`}>
          <TestimonialCard testimonial={displayTestimonials[0]} />
        </div>
      );

    case 'list':
      // Clean social media feed style
      return (
        <div className={`rounded-xl p-6 ${getThemeClasses()} border ${className}`}>
          <div className="divide-y divide-gray-200">
            {displayTestimonials.map((testimonial, index) => (
              <div key={testimonial.id} className="py-6 first:pt-0 last:pb-0">
                <div className="flex space-x-4">
                  {widget.settings.show_avatars && (
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-md">
                        <span className="text-white font-semibold text-sm">
                          {testimonial.client_name.split(' ').map(n => n[0]).join('').toUpperCase()}
                        </span>
                      </div>
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-2">
                      <h4 className={`font-semibold ${
                        widget.settings.theme === 'dark' ? 'text-white' : 'text-gray-900'
                      }`}>
                        {testimonial.client_name}
                      </h4>
                      {widget.settings.show_ratings && (
                        <div className="flex items-center">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                          ))}
                        </div>
                      )}
                    </div>
                    <p className={`leading-relaxed ${
                      widget.settings.theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      "{testimonial.content}"
                    </p>
                    {widget.settings.show_company && testimonial.client_email && (
                      <p className={`text-sm mt-2 ${
                        widget.settings.theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                      }`}>
                        {testimonial.client_email.split('@')[1]}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      );

    case 'floating':
      // Playful floating bubbles with hover interactions
      return (
        <div className={`rounded-xl p-8 ${getThemeClasses()} border ${className} relative overflow-hidden`}>
          <div className="relative h-80">
            {displayTestimonials.slice(0, 6).map((testimonial, index) => {
              const positions = [
                { top: '10%', left: '15%' },
                { top: '25%', left: '70%' },
                { top: '45%', left: '20%' },
                { top: '60%', left: '75%' },
                { top: '75%', left: '40%' },
                { top: '15%', left: '45%' }
              ];
              
              return (
                <div 
                  key={testimonial.id} 
                  className="absolute animate-bounce cursor-pointer transition-all duration-300 hover:scale-110"
                  style={{ 
                    ...positions[index],
                    animationDelay: `${index * 800}ms`,
                    animationDuration: '4s',
                    animationIterationCount: 'infinite'
                  }}
                  onMouseEnter={() => setHoveredBubble(testimonial.id)}
                  onMouseLeave={() => setHoveredBubble(null)}
                >
                  {/* Bubble */}
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center shadow-lg border-4 border-white">
                    <span className="text-white font-bold text-sm">
                      {testimonial.client_name.split(' ').map(n => n[0]).join('').toUpperCase()}
                    </span>
                  </div>
                  
                  {/* Hover tooltip */}
                  {hoveredBubble === testimonial.id && (
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-64 bg-white rounded-lg shadow-xl p-4 border z-10 animate-scale-in">
                      <div className="text-center">
                        {widget.settings.show_ratings && (
                          <div className="flex items-center justify-center mb-2">
                            {[...Array(testimonial.rating)].map((_, i) => (
                              <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                            ))}
                          </div>
                        )}
                        <p className="text-sm text-gray-700 mb-2">"{testimonial.content}"</p>
                        <p className="font-semibold text-gray-900 text-sm">{testimonial.client_name}</p>
                      </div>
                      {/* Arrow */}
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white"></div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          
          <div className="text-center mt-4">
            <p className={`text-sm ${widget.settings.theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
              Hover over the bubbles to read testimonials
            </p>
          </div>
        </div>
      );

    case 'featured':
      // Featured spotlight with hierarchy
      return (
        <div className={`rounded-xl p-6 ${getThemeClasses()} border ${className}`}>
          {/* Featured testimonial */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-100 to-pink-100 px-4 py-2 rounded-full mb-4">
              <Sparkles className="w-4 h-4 text-purple-600" />
              <span className="text-sm font-semibold text-purple-800">Featured Review</span>
            </div>
          </div>
          
          <div className="mb-8 transform scale-105 shadow-lg rounded-xl">
            <TestimonialCard testimonial={displayTestimonials[featuredIndex]} variant="large" />
          </div>
          
          {/* Supporting testimonials */}
          {displayTestimonials.length > 1 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 opacity-75">
              {displayTestimonials.slice(1, 3).map((testimonial, index) => (
                <div 
                  key={testimonial.id} 
                  className="transform scale-90 cursor-pointer hover:scale-95 transition-transform duration-200"
                  onClick={() => setFeaturedIndex(index + 1)}
                >
                  <TestimonialCard testimonial={testimonial} variant="small" />
                </div>
              ))}
            </div>
          )}
          
          {displayTestimonials.length > 3 && (
            <div className="text-center mt-4">
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                View {displayTestimonials.length - 3} more reviews
              </button>
            </div>
          )}
        </div>
      );

    case 'awards':
      // Prestigious, high-end showcase
      return (
        <div className={`rounded-xl p-8 ${getThemeClasses()} border-2 border-yellow-200 ${className} relative`}>
          {/* Decorative elements */}
          <div className="absolute top-4 left-4">
            <Award className="w-6 h-6 text-yellow-500" />
          </div>
          <div className="absolute top-4 right-4">
            <Award className="w-6 h-6 text-yellow-500" />
          </div>
          
          <div className="text-center">
            {/* Premium badge */}
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-yellow-100 to-amber-100 px-6 py-3 rounded-full mb-6 border border-yellow-300">
              <Trophy className="w-5 h-5 text-yellow-600" />
              <span className="text-sm font-bold text-yellow-800 uppercase tracking-wide">Top Review</span>
            </div>
            
            {/* Large star rating */}
            {widget.settings.show_ratings && (
              <div className="flex items-center justify-center mb-6">
                {[...Array(displayTestimonials[0].rating)].map((_, i) => (
                  <Star key={i} className="w-8 h-8 text-yellow-400 fill-current" />
                ))}
              </div>
            )}
            
            {/* Elegant quote */}
            <blockquote className={`text-2xl leading-relaxed mb-8 font-medium italic ${
              widget.settings.theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
            }`} style={{ fontFamily: 'Georgia, serif' }}>
              "{displayTestimonials[0].content}"
            </blockquote>
            
            {/* Author with elegant styling */}
            <div className="flex items-center justify-center space-x-4">
              {widget.settings.show_avatars && (
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full flex items-center justify-center shadow-lg border-4 border-yellow-200">
                  <span className="text-white font-bold text-lg">
                    {displayTestimonials[0].client_name.split(' ').map(n => n[0]).join('').toUpperCase()}
                  </span>
                </div>
              )}
              <div className="text-center">
                <div className={`font-bold text-xl ${
                  widget.settings.theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`} style={{ fontFamily: 'Georgia, serif' }}>
                  {displayTestimonials[0].client_name}
                </div>
                {widget.settings.show_company && displayTestimonials[0].client_email && (
                  <div className={`text-sm font-medium ${
                    widget.settings.theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {displayTestimonials[0].client_email.split('@')[1]}
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Decorative border */}
          <div className="absolute inset-0 rounded-xl border-4 border-yellow-300 opacity-20 pointer-events-none"></div>
        </div>
      );

    case 'infinite-scroll':
      const extendedTestimonials = Array.from({ length: 12 }, (_, i) => ({
        ...displayTestimonials[i % displayTestimonials.length],
        id: `${displayTestimonials[i % displayTestimonials.length]?.id || 'default'}-${i}`
      }));

      return (
        <div className={`relative overflow-hidden h-[48rem] ${className}`}>
          <div className={`absolute top-0 left-0 right-0 h-12 bg-gradient-to-b ${
            widget.settings.theme === 'dark' ? 'from-gray-900' : 'from-slate-50'
          } to-transparent z-10 pointer-events-none`} />
          <div className={`absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t ${
            widget.settings.theme === 'dark' ? 'from-gray-900' : 'from-indigo-100'
          } to-transparent z-10 pointer-events-none`} />
          
          <div className="absolute inset-0 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="relative overflow-hidden">
              <div className="flex flex-col gap-8 animate-scroll-up">
                {[...extendedTestimonials, ...extendedTestimonials].map((testimonial, index) => (
                  <div key={`col1-${index}`} className="flex-shrink-0">
                    <TestimonialCard testimonial={testimonial} index={index} />
                  </div>
                ))}
              </div>
            </div>
            <div className="relative overflow-hidden hidden sm:block">
              <div className="flex flex-col gap-8 animate-scroll-down">
                {[...extendedTestimonials, ...extendedTestimonials].slice().reverse().map((testimonial, index) => (
                  <div key={`col2-${index}`} className="flex-shrink-0">
                    <TestimonialCard testimonial={testimonial} index={index} />
                  </div>
                ))}
              </div>
            </div>
            <div className="relative overflow-hidden hidden lg:block">
              <div className="flex flex-col gap-8 animate-scroll-up-delayed">
                {[...extendedTestimonials, ...extendedTestimonials].map((testimonial, index) => (
                  <div key={`col3-${index}`} className="flex-shrink-0">
                    <TestimonialCard testimonial={testimonial} index={index} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      );
    
    default:
      return (
        <div className={`${className}`}>
          <TestimonialCard testimonial={displayTestimonials[0]} />
        </div>
      );
  }
};

export default WidgetPreview;