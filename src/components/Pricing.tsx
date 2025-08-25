import React from 'react';
import { Check, Zap, Crown } from 'lucide-react';

const Pricing: React.FC = () => {
  const plans = [
    {
      name: "Hacker",
      price: "Free",
      description: "Perfect for getting started",
      icon: Zap,
      popular: false,
      features: [
        "Up to 25 testimonials",
        "1 embeddable widget",
        "Basic customization",
        "Email collection",
        "Community support",
        "'Made with Credo' branding"
      ],
      limitations: [
        "No video testimonials",
        "No custom branding",
        "Basic moderation"
      ],
      cta: "Start for free",
      ctaStyle: "bg-gray-900 hover:bg-gray-800 text-white"
    },
    {
      name: "Founder",
      price: "$9",
      period: "/month",
      description: "Everything you need to scale",
      icon: Crown,
      popular: true,
      features: [
        "Unlimited testimonials",
        "Unlimited widgets",
        "Video testimonials",
        "Custom branding",
        "Advanced moderation",
        "Priority support",
        "Analytics dashboard",
        "API access"
      ],
      limitations: [],
      cta: "Start 14-day free trial",
      ctaStyle: "bg-blue-600 hover:bg-blue-700 text-white"
    }
  ];

  return (
    <section id="pricing" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Simple pricing for indie hackers
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Start free, upgrade when you're ready. No hidden fees, no complex tiers. 
            Just testimonials that convert.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan, index) => {
            const IconComponent = plan.icon;
            return (
              <div
                key={index}
                className={`relative bg-white rounded-2xl border-2 p-8 transition-all duration-300 hover:shadow-xl ${
                  plan.popular 
                    ? 'border-blue-500 shadow-lg scale-105' 
                    : 'border-gray-200 hover:border-blue-300'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}

                {/* Plan Header */}
                <div className="text-center mb-8">
                  <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4 ${
                    plan.popular ? 'bg-blue-100' : 'bg-gray-100'
                  }`}>
                    <IconComponent className={`w-8 h-8 ${
                      plan.popular ? 'text-blue-600' : 'text-gray-600'
                    }`} />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                    {plan.period && <span className="text-gray-600">{plan.period}</span>}
                  </div>
                  <p className="text-gray-600">{plan.description}</p>
                </div>

                {/* Features */}
                <div className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <button className={`w-full py-3 px-6 rounded-lg font-semibold transition-all transform hover:scale-105 ${plan.ctaStyle}`}>
                  {plan.cta}
                </button>

                {/* Fine Print */}
                {plan.name === "Founder" && (
                  <p className="text-center text-sm text-gray-500 mt-4">
                    No credit card required • Cancel anytime
                  </p>
                )}
              </div>
            );
          })}
        </div>

        {/* FAQ Link */}
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            Questions about pricing? We've got answers.
          </p>
          <a href="#faq" className="text-blue-600 hover:text-blue-700 font-medium">
            Check out our FAQ →
          </a>
        </div>
      </div>
    </section>
  );
};

export default Pricing;