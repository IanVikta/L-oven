import { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="bg-cream-100 min-h-screen py-16">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-orange-600 bg-orange-100 px-3 py-1 rounded-full">
            Get In Touch
          </span>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-brown-900 mt-3 mb-4">
            We'd Love to Hear From You
          </h1>
          <p className="text-sm text-brown-700">
            Have questions about catering, private events, or feedback on your coffee? Send us a message or visit our flagship café.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Details & Opening Hours */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-amber-100 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center text-lg font-bold">
                  📍
                </div>
                <div>
                  <h3 className="text-sm font-bold text-brown-900">Café Location</h3>
                  <p className="text-xs text-brown-600">Plot 14 Acacia Avenue, Kololo</p>
                  <p className="text-xs text-brown-500">Kampala, Uganda</p>
                </div>
              </div>

              <div className="flex items-center gap-3 border-t border-amber-50 pt-3">
                <div className="w-10 h-10 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center text-lg font-bold">
                  📞
                </div>
                <div>
                  <h3 className="text-sm font-bold text-brown-900">Phone & WhatsApp</h3>
                  <p className="text-xs text-brown-600">+256 770 123 456</p>
                </div>
              </div>

              <div className="flex items-center gap-3 border-t border-amber-50 pt-3">
                <div className="w-10 h-10 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center text-lg font-bold">
                  ✉️
                </div>
                <div>
                  <h3 className="text-sm font-bold text-brown-900">Email Support</h3>
                  <p className="text-xs text-brown-600">hello@loven.coffee</p>
                </div>
              </div>
            </div>

            {/* Opening Hours */}
            <div className="bg-brown-900 text-white p-6 rounded-3xl shadow-md space-y-3">
              <h3 className="text-lg font-display font-bold text-orange-400">Opening Hours</h3>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between pb-1 border-b border-white/10">
                  <span className="text-cream-200">Mon - Fri:</span>
                  <span className="font-bold text-amber-300">6:30 AM - 9:00 PM</span>
                </div>
                <div className="flex justify-between pb-1 border-b border-white/10">
                  <span className="text-cream-200">Saturday:</span>
                  <span className="font-bold text-amber-300">7:00 AM - 10:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-cream-200">Sunday:</span>
                  <span className="font-bold text-amber-300">7:30 AM - 8:00 PM</span>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Form */}
          <div className="lg:col-span-2 bg-white p-8 rounded-3xl shadow-md border border-amber-100">
            <h2 className="text-2xl font-display font-bold text-brown-900 mb-6">Send Us a Message</h2>

            {submitted ? (
              <div className="bg-orange-50 border border-orange-200 p-6 rounded-2xl text-center space-y-3">
                <div className="text-3xl">🎉</div>
                <h3 className="text-lg font-bold text-brown-900">Thank You!</h3>
                <p className="text-xs text-brown-700">
                  Your message has been received. Our team will get back to you within 24 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="btn btn-primary text-xs py-2 px-4 mt-2"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-brown-800 mb-1">Your Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Jane Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="input text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-brown-800 mb-1">Your Email</label>
                    <input
                      type="email"
                      required
                      placeholder="jane@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="input text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-brown-800 mb-1">Subject</label>
                  <input
                    type="text"
                    required
                    placeholder="General inquiry, Catering, Feedback..."
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="input text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-brown-800 mb-1">Message</label>
                  <textarea
                    rows={5}
                    required
                    placeholder="Tell us how we can help you..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="input text-xs"
                  />
                </div>

                <button type="submit" className="btn btn-primary w-full py-3 text-sm shadow-lg">
                  Submit Message →
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
