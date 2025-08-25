import React from 'react';
import { Link, Zap, Badge as Widget, Shield, Video, Sparkles } from 'lucide-react';

const Features: React.FC = () => {
  const features = [
    {
      icon: Link,
      title: "One-Click Collection",
      description: "Share a single link with your customers. No forms, no logins, no friction. They click, leave feedback, done.",
      highlight: "Setup in 30 seconds"
    },
    {
      icon: Widget,
      title: "Embeddable Wall of Love",
      description: "Beautiful, responsive widget that automatically displays your testimonials. Copy/paste one line of code.",
      highlight: "Zero maintenance"
    },
    {
      icon: Zap,
      title: "Real-Time Updates",
      description: "New testimonials appear instantly on your website. No manual publishing, no delays, no hassle.",
      highlight: "Fully automated"
    },
    {
      icon: Video,
      title: "Video Testimonials",
      description: "Collect powerful video testimonials with the same simplicity. Perfect for landing pages and social media.",
      highlight: "Premium feature"
    },
    {
      icon: Shield,
      title: "Smart Filtering",
      description: "Auto-moderate content and highlight your best testimonials. Keep your reputation protected.",
      highlight: "Built-in protection"
    },
    {
      icon: Sparkles,
      title: "Custom Branding",
      description: "Remove our branding and match your brand colors. Professional appearance that builds trust.",
      highlight: "White-label ready"
    }
  ];

  return (
    <section id="features" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Everything you need to collect testimonials
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We've built the simplest testimonial collection system on the planet. 
            Set it up once, and it works forever.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-blue-200 group"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-100 group-hover:bg-blue-500 rounded-lg flex items-center justify-center transition-colors">
                    <IconComponent className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors" />
                  </div>
                  <div className="ml-3">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {feature.highlight}
                    </span>
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to automate your testimonials?
            </h3>
            <p className="text-gray-600 mb-6">
              Join 1,000+ founders who've already streamlined their social proof collection.
            </p>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-all transform hover:scale-105 shadow-md">
              Start collecting testimonials
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;