import React from 'react';
import { Clock, Frown, TrendingDown } from 'lucide-react';

const Problem: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Problem Statement */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            The Social Proof Paradox Every Founder Faces
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            You know testimonials boost conversions, but collecting them feels impossible. 
            Sound familiar?
          </p>
        </div>

        {/* Pain Points */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="w-8 h-8 text-red-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Hours of Manual Work</h3>
            <p className="text-gray-600">
              Chasing customers via email, formatting testimonials, updating your website manually. 
              It's a time sink you can't afford.
            </p>
          </div>
          
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Frown className="w-8 h-8 text-red-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Customer Friction</h3>
            <p className="text-gray-600">
              Complex forms, login requirements, and multi-step processes. 
              Most customers give up before they even start.
            </p>
          </div>
          
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingDown className="w-8 h-8 text-red-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Lost Conversions</h3>
            <p className="text-gray-600">
              Without social proof, potential customers bounce. Every day without testimonials 
              is money left on the table.
            </p>
          </div>
        </div>

        {/* Solution Transition */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            What if collecting testimonials was as simple as sharing a link?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            That's exactly what Credo does. No more manual work, no more customer friction, 
            no more lost conversions.
          </p>
          <div className="flex items-center justify-center space-x-4">
            <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-sm">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-700">5-minute setup</span>
            </div>
            <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-sm">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-700">Zero friction for customers</span>
            </div>
            <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-sm">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-700">Automatic display</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Problem;