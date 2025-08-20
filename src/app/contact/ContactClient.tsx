'use client';

import { useState } from 'react';

export default function ContactClient() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    // Here you would send the form data to your backend or email service
  };

  return (
    <main className="min-h-screen bg-white py-16">
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="text-4xl font-bold text-green-900 mb-6">Contact Us</h1>
        <div className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-green-800 mb-3">Contact Information</h3>
              <p className="mb-2"><span className="font-semibold">Address:</span> 28095 Alessandro Blvd, Moreno Valley, CA</p>
              <p className="mb-2"><span className="font-semibold">Phone:</span> 951-674-9422</p>
              <p className="mb-2"><span className="font-semibold">Email:</span> Adam@adamhallsnursery.com</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-green-800 mb-3">Business Hours</h3>
              <div className="space-y-1 text-sm">
                <p><span className="font-semibold">Monday - Sunday:</span> 8:00 AM - 6:00 PM</p>
                <p className="text-green-600 font-medium mt-2">*After time changes: 8:00 AM - 5:00 PM</p>
              </div>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-green-50 rounded-lg">
            <h4 className="font-semibold mb-2 text-green-800">Services Available</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <ul className="space-y-1">
                <li>• Plant consultation</li>
                <li>• Landscape design</li>
                <li>• Garden planning</li>
              </ul>
              <ul className="space-y-1">
                <li>• Local delivery service</li>
                <li>• Custom plant orders</li>
                <li>• Seasonal workshops</li>
              </ul>
              <ul className="space-y-1">
                <li>• Plant care advice</li>
                <li>• Soil testing</li>
                <li>• Garden maintenance tips</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h4 className="font-semibold mb-3 text-blue-800">Contact Our Team</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-200 rounded-full flex items-center justify-center">
                  <span className="text-blue-700 font-semibold text-xs">AH</span>
                </div>
                <div>
                  <p className="font-semibold text-blue-900">Adam Hall</p>
                  <p className="text-blue-700">Founder & Head Grower</p>
                  <a href="tel:9515382730" className="text-blue-600 hover:text-blue-800">(951) 538-2730</a>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-200 rounded-full flex items-center justify-center">
                  <span className="text-blue-700 font-semibold text-xs">TH</span>
                </div>
                <div>
                  <p className="font-semibold text-blue-900">Taylor Hall</p>
                  <p className="text-blue-700">Customer Service Manager & Design</p>
                  <a href="tel:9512505117" className="text-blue-600 hover:text-blue-800">(951) 250-5117</a>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-200 rounded-full flex items-center justify-center">
                  <span className="text-blue-700 font-semibold text-xs">DD</span>
                </div>
                <div>
                  <p className="font-semibold text-blue-900">Devon Dourseoua</p>
                  <p className="text-blue-700">Sales Manager & Head Plant Specialist</p>
                  <a href="tel:9517043370" className="text-blue-600 hover:text-blue-800">(951) 704-3370</a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mb-8">
          <iframe
            title="Store Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3312.123456789012!2d-117.2345678901234!3d33.91234567890123!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80db8b1234567890%3A0x1234567890abcdef!2s28095%20Alessandro%20Blvd%2C%20Moreno%20Valley%2C%20CA%2092555!5e0!3m2!1sen!2sus!4v1234567890!5m2!1sen!2sus"
            width="100%"
            height="250"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full rounded-lg shadow-md"
          ></iframe>
        </div>
        <h2 className="text-2xl font-bold text-green-800 mb-4">Send Us a Message</h2>
        {submitted ? (
          <div className="bg-green-100 text-green-800 p-4 rounded mb-4">Thank you for reaching out! We'll get back to you soon.</div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-1 font-medium" htmlFor="name">Name</label>
              <input type="text" id="name" name="name" value={form.name} onChange={handleChange} required className="w-full px-4 py-2 border border-green-300 rounded focus:ring-2 focus:ring-green-400" />
            </div>
            <div>
              <label className="block mb-1 font-medium" htmlFor="email">Email</label>
              <input type="email" id="email" name="email" value={form.email} onChange={handleChange} required className="w-full px-4 py-2 border border-green-300 rounded focus:ring-2 focus:ring-green-400" />
            </div>
            <div>
              <label className="block mb-1 font-medium" htmlFor="message">Message</label>
              <textarea id="message" name="message" value={form.message} onChange={handleChange} required rows={4} className="w-full px-4 py-2 border border-green-300 rounded focus:ring-2 focus:ring-green-400" />
            </div>
            <button type="submit" className="bg-green-700 hover:bg-green-800 text-white font-bold py-2 px-6 rounded-full shadow focus:outline-none focus:ring-2 focus:ring-green-400 transition">Send Message</button>
          </form>
        )}
      </div>
    </main>
  );
} 