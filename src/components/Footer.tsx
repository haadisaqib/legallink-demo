import React from 'react';
import { Link } from 'react-router-dom';

interface FooterProps {
  onContactClick?: () => void;
}

const Footer: React.FC<FooterProps> = ({ onContactClick }) => {
  return (
    <footer className="bg-gray-900/50 backdrop-blur-sm border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <Link to="/" className="flex items-center mb-4">
              <span className="text-2xl font-bold">
                <span className="text-white">LegalLink</span>
                <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">AI</span>
              </span>
            </Link>
            <p className="text-gray-400 text-sm">
              Empowering law firms with cutting-edge AI technology to streamline operations, enhance research, and deliver exceptional client outcomes.
            </p>
          </div>

          {/* AI Solutions */}
          <div>
            <h3 className="text-white font-semibold mb-4">AI Solutions</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/document-review" className="text-gray-400 hover:text-white transition-colors">
                  Document Review
                </Link>
              </li>
              <li>
                <Link to="/legal-research" className="text-gray-400 hover:text-white transition-colors">
                  Legal Research
                </Link>
              </li>
              <li>
                <Link to="/case-analytics" className="text-gray-400 hover:text-white transition-colors">
                  Case Analytics
                </Link>
              </li>
              <li>
                <Link to="/client-communication" className="text-gray-400 hover:text-white transition-colors">
                  Client Communication
                </Link>
              </li>
              <li>
                <Link to="/compliance-monitoring" className="text-gray-400 hover:text-white transition-colors">
                  Compliance Monitoring
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/for-law-firms" className="text-gray-400 hover:text-white transition-colors">
                  For Law Firms
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-400 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-400 hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                {onContactClick ? (
                  <button
                    type="button"
                    onClick={onContactClick}
                    className="text-gray-400 hover:text-white transition-colors bg-transparent border-none outline-none cursor-pointer p-0"
                  >
                    Contact Us
                  </button>
                ) : (
                  <Link to="/contact" className="text-gray-400 hover:text-white transition-colors">
                    Contact Us
                  </Link>
                )}
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2025 LegalLink AI. All rights reserved.
          </p>
          <p className="text-gray-400 text-sm mt-2 md:mt-0">
            Enterprise AI solutions for legal professionals.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 