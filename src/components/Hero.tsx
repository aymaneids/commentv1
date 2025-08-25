import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Play, Star } from 'lucide-react';

const Hero: React.FC = () => {
  const navigate = useNavigate();

  const handleStartFree = () => {
    navigate('/auth');
  };

  return (
    <section className="pt-24 pb-20 bg-gradient-to-br from-slate-50 to-blue-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-slate-900/[0.04] bg-[length:75px_75px]"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Star className="w-4 h-4 fill-current" />
            <span>Trusted by 1,000+ indie hackers</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Collect testimonials
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              without the hassle
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed">
            Stop chasing customers for testimonials. Credo automates the entire process with 
            a simple link and embeddable widget. Set up in minutes, not hours.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-12">
            <button 
              onClick={handleStartFree}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center space-x-2"
            >
              <span>Start collecting testimonials</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 px-8 py-4 rounded-xl font-semibold text-lg transition-colors">
              <Play className="w-5 h-5" />
              <span>Watch demo (2 min)</span>
            </button>
          </div>

          {/* Social Proof Numbers */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-8 sm:space-y-0 sm:space-x-12 text-center">
            <div>
              <div className="text-3xl font-bold text-gray-900">10,000+</div>
              <div className="text-gray-600">Testimonials collected</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-900">1,000+</div>
              <div className="text-gray-600">Happy founders</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-900">5 min</div>
              <div className="text-gray-600">Average setup time</div>
            </div>
          </div>
        </div>

        {/* Hero Image/Demo */}
        <div className="mt-20">
          <div className="relative max-w-5xl mx-auto">
            <div className="bg-white rounded-2xl shadow-2xl p-8 border">
              <div className="bg-gradient-to-r from-gray-100 to-gray-200 rounded-lg h-96 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Play className="w-12 h-12 text-blue-600" />
                  </div>
                  <p className="text-gray-600 text-lg">Interactive Demo Coming Soon</p>
                  <p className="text-gray-500 text-sm">See Credo in action</p>
                </div>
              </div>
            </div>
            {/* Floating elements */}
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-blue-500 rounded-full opacity-20 animate-pulse"></div>
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-purple-500 rounded-full opacity-10 animate-pulse delay-1000"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;