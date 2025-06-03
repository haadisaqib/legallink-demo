import React, { useState } from 'react';

const testimonials = [
  {
    quote: "LegalLink AI has revolutionized our document review process. What used to take hours now takes minutes, and the accuracy is remarkable. Our productivity has increased by 300%.",
    author: "Sarah M. Johnson",
    title: "Managing Partner • Johnson & Associates"
  },
  {
    quote: "The AI-powered research capabilities have transformed how we handle cases. We're finding relevant precedents faster than ever before.",
    author: "Michael R. Thompson",
    title: "Senior Partner • Thompson Legal Group"
  },
  {
    quote: "Implementation was seamless, and the ROI was immediate. Our associates can now focus on higher-value tasks while AI handles the routine work.",
    author: "Jennifer L. Chen",
    title: "Technology Director • Chen & Partners LLP"
  }
];

const TestimonialCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="relative py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative">
          <div className="text-center">
            <h2 className="text-4xl font-extrabold text-white sm:text-5xl mb-4">
              What Law Firms Say
            </h2>
            <p className="text-xl text-gray-400 mb-12">
              Leading law firms are already transforming their practices with LegalLink AI.
            </p>
          </div>

          <div className="relative bg-gray-800/50 backdrop-blur-sm rounded-2xl p-12 border border-gray-700">
            <div className="text-center">
              <div className="text-5xl text-blue-500/20 font-serif absolute top-4 left-8">"</div>
              <p className="text-xl text-white mb-8 relative">
                {testimonials[currentIndex].quote}
              </p>
              <div className="mt-8">
                <h4 className="text-lg font-semibold text-white">
                  {testimonials[currentIndex].author}
                </h4>
                <p className="text-gray-400">
                  {testimonials[currentIndex].title}
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-center items-center mt-8 space-x-4">
            <button
              onClick={prevSlide}
              className="p-2 rounded-full bg-gray-800/50 hover:bg-gray-700/50 text-white transition-colors duration-200"
              aria-label="Previous testimonial"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-200 ${
                    index === currentIndex ? 'bg-blue-500 w-8' : 'bg-gray-600 hover:bg-gray-500'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextSlide}
              className="p-2 rounded-full bg-gray-800/50 hover:bg-gray-700/50 text-white transition-colors duration-200"
              aria-label="Next testimonial"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCarousel; 