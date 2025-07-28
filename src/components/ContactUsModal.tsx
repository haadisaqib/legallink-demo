import React, { useState } from 'react';
import { X, Mail } from 'lucide-react';

interface ContactUsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactUsModal: React.FC<ContactUsModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const validateEmail = (email: string) => /.+@.+\..+/.test(email);
  const isFormValid = name && email && subject && message && validateEmail(email);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    if (!isFormValid) {
      setError('Please fill out all fields with valid information.');
      return;
    }
    setIsSubmitting(true);

    try {
      // API Gateway base URL from environment variable
      const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
      const contactFormUrl = `${apiBaseUrl}/contact-form`;
      
      console.log('Sending contact form to:', contactFormUrl);
      console.log('Request payload:', { name: name.trim(), email: email.trim(), subject: subject.trim(), message: message.trim() });
      
      const response = await fetch(contactFormUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          subject: subject.trim(),
          message: message.trim()
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('API Error Response:', errorData);
        console.error('Response Status:', response.status);
        throw new Error(errorData.error || `Failed to send message (Status: ${response.status})`);
      }

      const result = await response.json();
      console.log('Contact form submission successful:', result);
      
      setSuccess(true);
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
    } catch (error) {
      console.error('Error sending contact form:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to send message';
      setError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      {/* Modal */}
      <div className="relative bg-gray-900 rounded-xl border border-gray-800 w-full max-w-lg my-8">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-800">
          <h2 className="text-xl font-semibold text-white flex items-center gap-2">
            <Mail className="w-6 h-6 text-blue-500" />
            Contact Us
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>
        {/* Content */}
        <form className="p-6 space-y-4" onSubmit={handleSubmit}>
          {error && <div className="text-red-400 text-sm mb-2">{error}</div>}
          {success && <div className="text-green-400 text-sm mb-2">Thank you! Your message has been sent.</div>}
          <div>
            <label className="block text-gray-300 mb-1">Name</label>
            <input
              type="text"
              className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={name}
              onChange={e => setName(e.target.value)}
              disabled={isSubmitting}
              required
            />
          </div>
          <div>
            <label className="block text-gray-300 mb-1">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={e => setEmail(e.target.value)}
              disabled={isSubmitting}
              required
            />
          </div>
          <div>
            <label className="block text-gray-300 mb-1">Subject</label>
            <input
              type="text"
              className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={subject}
              onChange={e => setSubject(e.target.value)}
              disabled={isSubmitting}
              required
            />
          </div>
          <div>
            <label className="block text-gray-300 mb-1">Message</label>
            <textarea
              className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
              value={message}
              onChange={e => setMessage(e.target.value)}
              disabled={isSubmitting}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            disabled={!isFormValid || isSubmitting}
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactUsModal; 