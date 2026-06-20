import React from "react";
import { ImBook } from "react-icons/im";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-r from-primary-600 to-primary-700 text-white mt-20">
      <div className="border-t border-white/10">
        <div className="w-full px-4 sm:px-10 md:px-16 lg:px-24 py-12">
          {/* Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* Brand */}
            <div className="flex flex-col items-center md:items-start">
              <div className="flex items-center gap-2 mb-2">
                <ImBook className="text-2xl" />
                <h3 className="text-xl font-bold">BookStore</h3>
              </div>
              <p className="text-white/70 text-sm text-center md:text-left">
                Your gateway to endless stories and knowledge
              </p>
            </div>

            {/* Quick Links */}
            <div className="flex flex-col items-center">
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <div className="space-y-2 text-center text-sm text-white/70">
                <Link
                  to="/"
                  className="block hover:text-white transition-colors cursor-pointer"
                >
                  Home
                </Link>
                <a
                  href="/#books"
                  className="block hover:text-white transition-colors cursor-pointer"
                >
                  Browse Books
                </a>
                <Link
                  to="/contact"
                  className="block hover:text-white transition-colors cursor-pointer"
                >
                  Contact Us
                </Link>
              </div>
            </div>

            {/* Social & Info */}
            <div className="flex flex-col items-center md:items-end">
              <h4 className="font-semibold mb-4">Connect</h4>
              <p className="text-sm text-white/70 text-center md:text-right">
                Made with <span className="text-secondary-400">❤️</span> by Aniket
              </p>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-white/10 pt-6 text-center text-sm text-white/60">
            <p>Copyright © {currentYear} BookStore. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
