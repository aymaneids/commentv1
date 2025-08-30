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
  const [activeBubble, setActiveBubble] = useState<string | null>(null);
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

  React.useEffect(() => {
    if (widget.widget_type === 'floating' && displayTestimonials.length > 0) {
      setActiveBubble(displayTestimonials[0].id);
    }
  }, [widget.widget_type, displayTestimonials]);

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
  }

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
      const baseClasses = `relative bg-white border border-gray-200/50 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 ease-out hover:-translate-y-2 group backdrop-blur-sm ${getAnimationClass()}`;
      
      switch (variant) {
        case 'small':
          return `${baseClasses} p-4`;
        case 'large':
          return `${baseClasses} p-8`;
        default:
          return `${baseClasses} p-6`;
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
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 to-purple-50/30 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        <div className="relative z-10">
        {/* Star Rating */}
        {widget.settings.show_ratings && (
          <div className="flex items-center gap-1 mb-4 group-hover:scale-105 transition-transform duration-200">
            {renderStars(rating)}
          </div>
        )}

        {/* Testimonial Text */}
        <blockquote className={`text-gray-800 leading-relaxed mb-6 font-medium flex-1 ${getTextClasses()} group-hover:text-gray-900 transition-colors duration-200`}>
          "{content}"
        </blockquote>

        {/* Author Information */}
        <div className="flex items-center gap-4 group-hover:transform group-hover:scale-105 transition-all duration-200">
          {/* Avatar */}
          {widget.settings.show_avatars && (
            <div className="relative">
              <div className={`${variant === 'large' ? 'w-16 h-16' : 'w-12 h-12'} bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg ring-2 ring-white group-hover:ring-4 group-hover:ring-blue-100 transition-all duration-200`}>
                <span className={`text-white font-semibold ${variant === 'large' ? 'text-lg' : 'text-base'}`}>
                  {client_name.split(' ').map(n => n[0]).join('').toUpperCase()}
                </span>
              </div>
              {/* Source Platform Icon */}
              {source && (
                <div className="absolute -bottom-1 -right-1 bg-white border border-gray-200 rounded-full p-1 shadow-md group-hover:shadow-lg transition-shadow duration-200">
                  {getPlatformIcon(source)}
                </div>
              )}
            </div>
          )}

          {/* Author Details */}
          <div className="flex-1 min-w-0">
            <div className={`text-gray-900 font-semibold ${variant === 'large' ? 'text-base' : 'text-sm'}`}>
              {client_name}
            </div>
            {widget.settings.show_company && client_email && (
              <div className={`text-gray-500 leading-tight ${variant === 'large' ? 'text-sm' : 'text-xs'}`}>
                {client_email.split('@')[1] || 'Customer'}
              </div>
            )}
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
        <div className={`relative ${className} group`}>
          <div className="relative overflow-hidden rounded-xl">
            <div 
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {displayTestimonials.map((testimonial) => (
                <div key={testimonial.id} className="w-full flex-shrink-0 px-4 py-6 text-center">
                  <TestimonialCard testimonial={testimonial} />
                </div>
              ))}
            </div>
          </div>
          
          {displayTestimonials.length > 1 && (
            <>
              <button
                onClick={() => setCurrentIndex(prev => prev === 0 ? displayTestimonials.length - 1 : prev - 1)}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/90 hover:bg-white shadow-lg transition-all duration-200 hover:scale-110 opacity-0 group-hover:opacity-100 z-10"
              >
                <ChevronLeft className="w-5 h-5 text-gray-700" />
              </button>
              <button
                onClick={() => setCurrentIndex(prev => (prev + 1) % displayTestimonials.length)}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/90 hover:bg-white shadow-lg transition-all duration-200 hover:scale-110 opacity-0 group-hover:opacity-100 z-10"
              >
                <ChevronRight className="w-5 h-5 text-gray-700" />
              </button>
              
              {/* Carousel indicators */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {displayTestimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentIndex 
                        ? 'bg-blue-500 w-6' 
                        : 'bg-white/60 hover:bg-white/80'
                    }`}
                  />
                ))}
              </div>
            </>
          )}
          
          {/* Autoplay indicator */}
          {widget.settings.autoplay && displayTestimonials.length > 1 && (
            <div className="absolute top-4 right-4 bg-green-500/90 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              <span>Auto</span>
            </div>
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
      const activeTestimonial = displayTestimonials.find(t => t.id === activeBubble) || displayTestimonials[0];
      const avatarPositions = [
        { top: '15%', left: '10%', size: 'w-16 h-16', delay: '0s' },
        { top: '30%', left: '80%', size: 'w-20 h-20', delay: '1s' },
        { top: '65%', left: '5%', size: 'w-12 h-12', delay: '2s' },
        { top: '75%', left: '60%', size: 'w-24 h-24', delay: '0.5s' },
        { top: '5%', left: '50%', size: 'w-14 h-14', delay: '1.5s' },
      ];
      
      return (
        <div className={`relative overflow-hidden h-[32rem] rounded-2xl bg-slate-50/50 border border-gray-200/80 p-6 flex flex-col justify-end ${className}`}>
          {/* Floating Avatars */}
          {displayTestimonials.slice(0, 5).map((testimonial, index) => (
            <button
              key={testimonial.id}
              className={`absolute animate-float transition-all duration-300 hover:scale-110 z-10 ${avatarPositions[index].size}`}
              style={{ 
                top: avatarPositions[index].top, 
                left: avatarPositions[index].left,
                animationDelay: avatarPositions[index].delay,
              }}
              onMouseEnter={() => setActiveBubble(testimonial.id)}
            >
              <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg ring-4 ring-white">
                <span className="text-white font-semibold text-2xl">
                  {testimonial.client_name.split(' ').map(n => n[0]).join('').toUpperCase()}
                </span>
              </div>
            </button>
          ))}

          {/* Active Testimonial Card */}
          <div className="relative z-20">
            {activeTestimonial && (
              <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-2xl border border-gray-200/80 animate-fade-in">
                {widget.settings.show_ratings && (
                  <div className="flex items-center justify-center mb-4">
                    {[...Array(activeTestimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                )}
                <blockquote className="text-center text-gray-800 leading-relaxed mb-4 font-medium italic">
                  "{activeTestimonial.content}"
                </blockquote>
                <div className="text-center text-gray-900 font-semibold">
                  - {activeTestimonial.client_name}
                </div>
                {widget.settings.show_company && activeTestimonial.client_email && (
                  <div className="text-center text-gray-600 text-sm mt-1">
                    {activeTestimonial.client_email.split('@')[1]}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      );

    case 'featured':
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