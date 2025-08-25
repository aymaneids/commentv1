import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "How quickly can I set up Credo?",
      answer: "Most founders have Credo running in under 5 minutes. Simply create an account, customize your collection page, and share the link. The embed widget takes just one line of code to add to your site."
    },
    {
      question: "Do my customers need to create an account?",
      answer: "No! That's the beauty of Credo. Your customers just click your link, leave their testimonial, and they're done. No signup, no login, no friction. This leads to much higher completion rates."
    },
    {
      question: "Can I customize how testimonials look on my website?",
      answer: "Absolutely. The Founder plan includes full customization options - match your brand colors, fonts, and styling. You can also remove our branding completely for a professional white-label experience."
    },
    {
      question: "What about spam or inappropriate content?",
      answer: "We've got you covered with smart filtering and moderation tools. You can review testimonials before they go live, and our AI helps filter out spam automatically. You're always in control of what appears on your site."
    },
    {
      question: "How do video testimonials work?",
      answer: "Video testimonials are available on the Founder plan. Customers can record videos directly through their browser - no app downloads required. Videos are automatically optimized and can be embedded anywhere on your site."
    },
    {
      question: "Is there a limit to how many testimonials I can display?",
      answer: "The free Hacker plan allows up to 25 testimonials with 1 widget. The Founder plan gives you unlimited testimonials and widgets, so you can create multiple walls of love for different products or pages."
    },
    {
      question: "Can I export my testimonials?",
      answer: "Yes! You own your data. Export testimonials in multiple formats (CSV, JSON, or individual images) to use in marketing materials, social media, or if you ever want to switch platforms."
    },
    {
      question: "What happens if I need to downgrade or cancel?",
      answer: "You can downgrade or cancel anytime with zero hassle. Your testimonials remain accessible, and you can always upgrade again when you're ready. No long-term contracts or cancellation fees."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Frequently asked questions
          </h2>
          <p className="text-xl text-gray-600">
            Everything you need to know about Credo. Can't find what you're looking for? 
            <a href="mailto:support@credo.com" className="text-blue-600 hover:text-blue-700 ml-1">
              Drop us a line
            </a>.
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-xl border border-gray-200 hover:border-gray-300 transition-colors"
            >
              <button
                className="w-full px-6 py-4 text-left flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-xl"
                onClick={() => toggleFAQ(index)}
              >
                <span className="text-lg font-semibold text-gray-900 pr-8">
                  {faq.question}
                </span>
                {openIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                )}
              </button>
              {openIndex === index && (
                <div className="px-6 pb-4">
                  <p className="text-gray-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Still have questions CTA */}
        <div className="text-center mt-12 p-8 bg-blue-50 rounded-2xl">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Still have questions?
          </h3>
          <p className="text-gray-600 mb-6">
            We're here to help! Reach out and we'll get back to you within 24 hours.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
              Contact Support
            </button>
            <button className="text-blue-600 hover:text-blue-700 px-6 py-3 rounded-lg font-semibold transition-colors">
              Schedule a Demo
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;