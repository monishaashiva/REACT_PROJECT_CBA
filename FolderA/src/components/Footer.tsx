import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Hospital Funding</h3>
            <p className="text-gray-600 text-sm">
              Connecting patients, hospitals, and fund managers for seamless healthcare funding.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/" className="text-gray-600 hover:text-primary-600 transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="/user/login" className="text-gray-600 hover:text-primary-600 transition-colors">
                  User Portal
                </a>
              </li>
              <li>
                <a href="/hospital/login" className="text-gray-600 hover:text-primary-600 transition-colors">
                  Hospital Portal
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact</h3>
            <p className="text-gray-600 text-sm">
              Email: support@hospitalfunding.com<br />
              Phone: +1 (555) 123-4567
            </p>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-center text-gray-500 text-sm">
            © 2024 Hospital Funding. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
