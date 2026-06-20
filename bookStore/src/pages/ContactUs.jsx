import React, { useState } from "react";
import { FiPhone, FiMail, FiMapPin } from "react-icons/fi";
import { FaFacebook, FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";
import { toast } from "react-toastify";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate form submission
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (
        formData.name &&
        formData.email &&
        formData.subject &&
        formData.message
      ) {
        toast.success("Message sent successfully! We'll get back to you soon.");
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
      }
    } catch (error) {
      toast.error("Failed to send message. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 pt-24 pb-16">
      {/* Header Section */}
      <div className="mx-auto px-6 sm:px-10 md:px-16 lg:px-24 mb-16">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent mb-4">
            Get In Touch
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Have a question or feedback? We'd love to hear from you. Reach out to
            us using the form below or through any of our contact channels.
          </p>
        </div>
      </div>

      <div className="mx-auto px-6 sm:px-10 md:px-16 lg:px-24">
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {/* Contact Info Cards */}
          {[
            {
              icon: FiPhone,
              title: "Phone",
              content: "+1 (555) 123-4567",
              color: "primary",
            },
            {
              icon: FiMail,
              title: "Email",
              content: "support@bookstore.com",
              color: "secondary",
            },
            {
              icon: FiMapPin,
              title: "Address",
              content: "123 Book Street, Literature City, BC 12345",
              color: "blue",
            },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-xl shadow-card hover:shadow-card-hover transition-all duration-300 p-8 border border-gray-100 hover:border-primary-300"
              >
                <div
                  className={`w-16 h-16 rounded-xl bg-${item.color}-100 flex items-center justify-center mb-4`}
                >
                  <Icon className={`text-3xl text-${item.color}-600`} />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-lg">{item.content}</p>
              </div>
            );
          })}
        </div>

        {/* Contact Form and Info */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-card overflow-hidden border border-gray-100">
              <div className="bg-gradient-to-r from-primary-500 to-primary-600 px-8 py-6">
                <h2 className="text-2xl font-bold text-white">Send us a Message</h2>
              </div>

              <form className="p-8 space-y-6" onSubmit={handleSubmit}>
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Your Name <span className="text-secondary-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="John Doe"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Your Email <span className="text-secondary-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="john@example.com"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
                    />
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Subject <span className="text-secondary-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="How can we help?"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Message <span className="text-secondary-500">*</span>
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Your message here..."
                    required
                    rows="6"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 resize-none"
                  ></textarea>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-primary-500 to-primary-600 text-white font-bold py-3 rounded-lg hover:shadow-glow-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>
          </div>

          {/* Info and Social */}
          <div>
            {/* Business Hours */}
            <div className="bg-white rounded-xl shadow-card overflow-hidden border border-gray-100 mb-6">
              <div className="bg-gradient-to-r from-secondary-500 to-secondary-600 px-8 py-6">
                <h3 className="text-2xl font-bold text-white">Business Hours</h3>
              </div>
              <div className="p-8 space-y-4">
                <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                  <span className="font-semibold text-gray-700">Monday - Friday</span>
                  <span className="text-gray-600">9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                  <span className="font-semibold text-gray-700">Saturday</span>
                  <span className="text-gray-600">10:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-gray-700">Sunday</span>
                  <span className="text-gray-600">Closed</span>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-white rounded-xl shadow-card overflow-hidden border border-gray-100">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-8 py-6">
                <h3 className="text-2xl font-bold text-white">Follow Us</h3>
              </div>
              <div className="p-8">
                <div className="grid grid-cols-4 gap-4">
                  {[
                    {
                      icon: FaFacebook,
                      label: "Facebook",
                      color: "text-blue-600",
                    },
                    {
                      icon: FaTwitter,
                      label: "Twitter",
                      color: "text-blue-400",
                    },
                    {
                      icon: FaLinkedin,
                      label: "LinkedIn",
                      color: "text-blue-700",
                    },
                    {
                      icon: FaGithub,
                      label: "GitHub",
                      color: "text-gray-800",
                    },
                  ].map((social, idx) => {
                    const Icon = social.icon;
                    return (
                      <a
                        key={idx}
                        href="#"
                        className="flex flex-col items-center justify-center p-3 rounded-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-110"
                        title={social.label}
                      >
                        <Icon className={`text-3xl ${social.color}`} />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
