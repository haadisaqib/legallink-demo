import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import TypewriterText from '../components/TypewriterText';
import AnimatedBackground from '../components/AnimatedBackground';
import TestimonialCarousel from '../components/TestimonialCarousel';
import Footer from '../components/Footer';
import ContactUsModal from '../components/ContactUsModal';
import { scrollToSection } from '../utils/scroll';

const Marketing: React.FC = () => {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
      <AnimatedBackground />
      {/* Add a subtle overlay to ensure text remains readable */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900/50 via-gray-800/50 to-gray-900/50 pointer-events-none" />
      
      {/* Rest of the content with relative positioning */}
      <div className="relative">
        {/* Navigation Header */}
        <nav className="backdrop-blur-lg bg-gray-900/70 sticky top-0 z-50 border-b border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
              <div className="flex items-center">
                <Link to="/" className="flex items-center group">
                  <span className="text-2xl font-bold">
                    <span className="text-white">LegalLink</span>
                    <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent group-hover:from-blue-300 group-hover:to-blue-500 transition-all duration-300">AI</span>
                  </span>
                </Link>
              </div>
              <div className="hidden md:flex items-center space-x-8">
                <button
                  onClick={() => scrollToSection('features')}
                  className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium transition-colors duration-200"
                >
                  Features
                </button>
                <button
                  onClick={() => scrollToSection('how-it-works')}
                  className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium transition-colors duration-200"
                >
                  How It Works
                </button>
                <button
                  onClick={() => scrollToSection('testimonials')}
                  className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium transition-colors duration-200"
                >
                  Reviews
                </button>
                <button
                  onClick={() => scrollToSection('contact')}
                  className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium transition-colors duration-200"
                >
                  Contact
                </button>
              </div>
              <div className="flex items-center space-x-4">
                <Link
                  to="/auth"
                  className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium transition-colors duration-200"
                >
                  Sign In
                </Link>
                <Link
                  to="/auth"
                  className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg text-sm font-medium transition-all duration-300 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40"
                >
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <div id="hero" className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-purple-600/10 animate-gradient"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 relative">
            <div className="text-center">
              <h1 className="text-5xl tracking-tight font-extrabold text-transparent bg-gradient-to-r from-white to-gray-300 bg-clip-text sm:text-6xl md:text-7xl">
                <span className="block">AI-Powered</span>
                <span className="block bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text">
                  <TypewriterText className="inline-block" />
                </span>
              </h1>
              <p className="mt-6 max-w-md mx-auto text-lg text-gray-300 sm:text-xl md:mt-8 md:max-w-3xl">
                Transform your legal workflow with advanced AI technology. Get instant document analysis, contract review, and expert insights.
              </p>
              <div className="mt-10 flex justify-center space-x-6">
                <Link
                  to="/app"
                  className="px-8 py-4 text-lg font-medium rounded-lg bg-blue-500 text-white hover:bg-blue-600 transform hover:scale-105 transition-all duration-300 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40"
                >
                  Sign Up
                </Link>
                <Link
                  to={"/demo"}
                  className="px-8 py-4 text-lg font-medium rounded-lg bg-gray-800 text-white hover:bg-gray-700 transition-all duration-300 border border-gray-700"
                >
                  Try Demo
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div id="features" className="pt-24 pb-32 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-purple-600/5"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="text-center">
              <h2 className="text-4xl font-extrabold text-white sm:text-5xl">
                Enterprise-Grade Legal AI Solutions
              </h2>
              <p className="mt-4 text-xl text-gray-400 max-w-3xl mx-auto">
                Powerful features designed for legal professionals and enterprises
              </p>
            </div>
            <div className="mt-24 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: "AI Document Review",
                  description: "Automatically analyze contracts, agreements, and legal documents with AI-powered insights and risk assessment.",
                  icon: (
                    <div className="bg-blue-500 rounded-xl p-4 w-16 h-16 mx-auto flex items-center justify-center">
                      <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                  )
                },
                {
                  title: "Legal Research Assistant",
                  description: "Accelerate case research with AI that searches through vast legal databases and case law in seconds.",
                  icon: (
                    <div className="bg-blue-500 rounded-xl p-4 w-16 h-16 mx-auto flex items-center justify-center">
                      <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                  )
                },
                {
                  title: "Client Communication",
                  description: "AI-powered chatbots and automated responses to handle routine client inquiries 24/7.",
                  icon: (
                    <div className="bg-blue-500 rounded-xl p-4 w-16 h-16 mx-auto flex items-center justify-center">
                      <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                    </div>
                  )
                },
                {
                  title: "Case Prediction Analytics",
                  description: "Leverage AI to predict case outcomes and provide data-driven insights for better legal strategies.",
                  icon: (
                    <div className="bg-blue-500 rounded-xl p-4 w-16 h-16 mx-auto flex items-center justify-center">
                      <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                      </svg>
                    </div>
                  )
                },
                {
                  title: "Automated Billing",
                  description: "Smart time tracking and billing automation that integrates seamlessly with your existing workflows.",
                  icon: (
                    <div className="bg-blue-500 rounded-xl p-4 w-16 h-16 mx-auto flex items-center justify-center">
                      <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  )
                },
                {
                  title: "Compliance Monitoring",
                  description: "Stay ahead of regulatory changes with AI that monitors and alerts you to relevant legal updates.",
                  icon: (
                    <div className="bg-blue-500 rounded-xl p-4 w-16 h-16 mx-auto flex items-center justify-center">
                      <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                      </svg>
                    </div>
                  )
                }
              ].map((feature, index) => (
                <div key={index} className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-purple-600/10 rounded-2xl transform group-hover:scale-105 transition-all duration-300"></div>
                  <div className="relative p-8 rounded-2xl border border-gray-800 bg-gray-900/50 backdrop-blur-sm">
                    {feature.icon}
                    <h3 className="mt-8 text-xl font-semibold text-white text-center">{feature.title}</h3>
                    <p className="mt-4 text-base text-gray-400 text-center">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* How It Works Section */}
        <div id="how-it-works" className="pt-24 pb-32 relative bg-gray-900/50">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-purple-600/5"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="text-center">
              <h2 className="text-4xl font-extrabold text-white sm:text-5xl">
                How LegalLink AI Works
              </h2>
              <p className="mt-4 text-xl text-gray-400 max-w-3xl mx-auto">
                Seamlessly integrate AI into your legal practice with our enterprise-grade platform designed for law firms.
              </p>
            </div>

            <div className="mt-20 grid grid-cols-1 gap-12 md:grid-cols-3">
              {[
                {
                  step: "1",
                  title: "Simple Integration",
                  description: "Our AI platform integrates seamlessly with your existing legal software and workflows. No disruption to your current processes."
                },
                {
                  step: "2",
                  title: "AI Training & Setup",
                  description: "Our AI learns your firm's specific practices and preferences, becoming more effective with each interaction and case."
                },
                {
                  step: "3",
                  title: "Transform Your Practice",
                  description: "Watch as AI streamlines your workflows, enhances research capabilities, and improves client service delivery."
                }
              ].map((step, index) => (
                <div key={index} className="relative text-center">
                  <div className="bg-blue-500 rounded-xl w-16 h-16 mx-auto mb-8 flex items-center justify-center text-2xl font-bold text-white">
                    {step.step}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-4">{step.title}</h3>
                  <p className="text-gray-400">{step.description}</p>
                </div>
              ))}
            </div>

            <div className="mt-32 bg-gray-800/50 rounded-2xl p-12 backdrop-blur-sm border border-gray-700">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-8">
                    Why Choose LegalLink AI?
                  </h3>
                  <ul className="space-y-4">
                    {[
                      "Enterprise-grade security and compliance",
                      "Custom AI training for your firm's needs",
                      "24/7 support and ongoing optimization",
                      "Proven ROI and efficiency improvements"
                    ].map((benefit, index) => (
                      <li key={index} className="flex items-center text-gray-300">
                        <svg className="w-5 h-5 text-blue-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="text-center lg:text-right">
                  <h4 className="text-xl font-semibold text-white mb-4">
                    Ready to transform your firm?
                  </h4>
                  <Link
                    to="/app"
                    className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium rounded-lg bg-blue-500 text-white hover:bg-blue-600 transform hover:scale-105 transition-all duration-300 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40"
                  >
                    Schedule Your Demo
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials Section */}
        <div id="testimonials" className="pt-24">
          <TestimonialCarousel />
        </div>

        {/* Contact Section */}
        <div id="contact" className="pt-24">
          <Footer onContactClick={() => setIsContactModalOpen(true)} />
        </div>
      </div>
      <ContactUsModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />
    </div>
  );
};

export default Marketing; 