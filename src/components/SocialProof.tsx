import React from 'react';
import { Star, Quote } from 'lucide-react';

const SocialProof: React.FC = () => {
  const testimonials = [
    {
      content: "Credo saved me hours every week. I just share the link with happy customers and testimonials appear on my site automatically. Game changer for my SaaS.",
      author: "Sarah Chen",
      role: "Founder",
      company: "TaskFlow Pro",
      avatar: "SC",
      rating: 5
    },
    {
      content: "As a solo founder, I don't have time to chase testimonials. Credo handles everything for me. Set it up once in 5 minutes, and it just works.",
      author: "Marcus Rodriguez",
      role: "Indie Hacker",
      company: "CodeSnap",
      avatar: "MR",
      rating: 5
    },
    {
      content: "The video testimonial feature is incredible. My landing page conversion rate increased by 40% after adding Credo's wall of love widget.",
      author: "Emily Parker",
      role: "No-code Maker",
      company: "AutoFlow",
      avatar: "EP",
      rating: 5
    }
  ];

  const metrics = [
    { value: "40%", label: "Average conversion lift" },
    { value: "5 min", label: "Average setup time" },
    { value: "95%", label: "Customer completion rate" },
    { value: "1,000+", label: "Happy founders" }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Loved by indie hackers worldwide
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Don't just take our word for it. Here's what founders are saying about Credo.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100"
            >
              {/* Stars */}
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>

              {/* Quote */}
              <div className="relative mb-6">
                <Quote className="absolute -top-2 -left-2 w-6 h-6 text-blue-200" />
                <p className="text-gray-700 leading-relaxed pl-4">
                  {testimonial.content}
                </p>
              </div>

              {/* Author */}
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mr-4">
                  <span className="text-white font-semibold text-sm">
                    {testimonial.avatar}
                  </span>
                </div>
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.author}</div>
                  <div className="text-gray-600 text-sm">
                    {testimonial.role} at {testimonial.company}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Metrics */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {metrics.map((metric, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                  {metric.value}
                </div>
                <div className="text-gray-600 text-sm md:text-base">
                  {metric.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to join them?
          </h3>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-all transform hover:scale-105 shadow-md">
            Start your free trial
          </button>
        </div>
      </div>
    </section>
  );
};

export default SocialProof;