// src/components/widget/WidgetPreview.tsx

import React, { useState } from 'react';
import { Star, Play, ChevronLeft, ChevronRight, Trophy, Quote, Award } from 'lucide-react';
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
  const displayTestimonials = testimonials.slice(0, widget.settings.max_testimonials);

  // Auto-advance carousel
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
    switch (widget.settings.theme) {
      case 'dark': return 'bg-gray-900 text-white border-gray-700';
      case 'auto': return 'bg-gray-50 text-gray-900 border-gray-200';
      default: return 'bg-white text-gray-900 border-gray-200';
    }
  };

  if (displayTestimonials.length === 0) {
    return (
      <div className={`rounded-xl p-6 ${getThemeClasses()} border-2 border-dashed ${className}`}>
        <div className="text-center text-gray-500">
          <p className="text-sm">No testimonials to display.</p>
        </div>
      </div>
    );
  };

  // ### NEW & IMPROVED TESTIMONIAL CARD SUB-COMPONENT ###
  const TestimonialCard: React.FC<{ testimonial: Testimonial; index?: number }> = ({ 
    testimonial, 
    index = 0
  }) => {
    const theme = widget.settings.theme;
    
    // Theme-aware classes for dynamic styling
    const themeStyles = {
      cardBg: theme === 'dark' ? 'bg-gray-800' : 'bg-white',
      primaryText: theme === 'dark' ? 'text-gray-100' : 'text-gray-800',
      secondaryText: theme === 'dark' ? 'text-gray-400' : 'text-gray-600',
      borderColor: theme === 'dark' ? 'border-gray-700' : 'border-gray-200',
      quoteColor: theme === 'dark' ? 'text-gray-700' : 'text-gray-200',
    };

    return (
      <div 
        className={`${getAnimationClass()} ${themeStyles.cardBg} p-8 rounded-xl shadow-md border ${themeStyles.borderColor} flex flex-col text-center transition-shadow hover:shadow-lg`}
        style={{ animationDelay: `${index * 100}ms` }}
      >
        {widget.settings.show_ratings && (
          <div className="flex items-center justify-center mb-4">
            {[...Array(testimonial.rating)].map((_, i) => (
              <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
            ))}
          </div>
        )}

        <div className="relative my-4">
          <span className={`absolute -left-5 -top-3 text-6xl font-serif ${themeStyles.quoteColor}`}>"</span>
          <blockquote className={`font-serif italic text-lg ${themeStyles.primaryText} mx-4`}>
            {testimonial.content}
          </blockquote>
          <span className={`absolute -right-5 -bottom-5 text-6xl font-serif ${themeStyles.quoteColor}`}>"</span>
        </div>

        <figcaption className="mt-6 flex items-center justify-center space-x-4">
          {widget.settings.show_avatars && (
            <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-md">
              <span className="text-white font-semibold text-lg">
                {testimonial.client_name.split(' ').map(n => n[0]).join('').toUpperCase()}
              </span>
            </div>
          )}
          <div className="text-left">
            <p className={`font-semibold ${themeStyles.primaryText}`}>{testimonial.client_name}</p>
            {widget.settings.show_company && testimonial.client_email && (
              <p className={`text-sm ${themeStyles.secondaryText}`}>
                {/* Placeholder for company name - adapt if you have this data */}
                TechCorp • {testimonial.client_email}
              </p>
            )}
          </div>
        </figcaption>
      </div>
    );
  };

  // Render based on widget type using the new card
  switch (widget.widget_type) {
    case 'wall':
    case 'masonry':
      return (
        <div className={`rounded-xl p-4 ${getThemeClasses()} border ${className}`}>
          <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
            {displayTestimonials.map((testimonial, index) => (
              <div key={testimonial.id} className="break-inside-avoid">
                <TestimonialCard testimonial={testimonial} index={index} />
              </div>
            ))}
          </div>
        </div>
      );

    case 'carousel':
      return (
        <div className={`rounded-xl p-4 ${getThemeClasses()} border relative ${className}`}>
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
        <div className={`${getThemeClasses()} rounded-xl border ${className}`}>
          <TestimonialCard testimonial={displayTestimonials[0]} />
        </div>
      );

    case 'infinite-scroll':
      // Create extended testimonials for seamless infinite scroll
      const extendedTestimonials = Array.from({ length: 12 }, (_, i) => ({
        ...displayTestimonials[i % displayTestimonials.length],
        id: `${displayTestimonials[i % displayTestimonials.length]?.id || 'default'}-${i}`
      }));

      return (
        <div className={`rounded-xl p-4 ${getThemeClasses()} border relative overflow-hidden h-96 ${className}`}>
          {/* Gradient Masks */}
          <div className={`absolute top-0 left-0 right-0 h-12 bg-gradient-to-b ${
            widget.settings.theme === 'dark' ? 'from-gray-900' : 'from-white'
          } to-transparent z-10 pointer-events-none`} />
          <div className={`absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t ${
            widget.settings.theme === 'dark' ? 'from-gray-900' : 'from-white'
          } to-transparent z-10 pointer-events-none`} />
          
          <div className="absolute inset-0 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            {/* First Column - Moving Up */}
            <div className="relative overflow-hidden">
              <div className="flex flex-col gap-4 animate-scroll-up">
                {[...extendedTestimonials, ...extendedTestimonials].map((testimonial, index) => (
                  <div key={`col1-${index}`} className="flex-shrink-0">
                    <TestimonialCard testimonial={testimonial} index={index} />
                  </div>
                ))}
              </div>
            </div>

            {/* Second Column - Moving Down (hidden on mobile) */}
            <div className="relative overflow-hidden hidden sm:block">
              <div className="flex flex-col gap-4 animate-scroll-down">
                {[...extendedTestimonials, ...extendedTestimonials].slice().reverse().map((testimonial, index) => (
                  <div key={`col2-${index}`} className="flex-shrink-0">
                    <TestimonialCard testimonial={testimonial} index={index} />
                  </div>
                ))}
              </div>
            </div>

            {/* Third Column - Moving Up with Delay (hidden on mobile and tablet) */}
            <div className="relative overflow-hidden hidden lg:block">
              <div className="flex flex-col gap-4 animate-scroll-up-delayed">
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

    // Other cases can be added here...

    default:
      return (
        <div className={`${getThemeClasses()} rounded-xl border ${className}`}>
          <TestimonialCard testimonial={displayTestimonials[0]} />
        </div>
      );
  }
};

export default WidgetPreview;