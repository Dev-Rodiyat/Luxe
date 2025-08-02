import { Sparkles } from 'lucide-react';

export default function Footer() {
  const footerSections = [
    {
      title: 'Shop',
      links: ['Women', 'Men', 'Accessories', 'Sale', 'New Arrivals', 'Best Sellers']
    },
    {
      title: 'Company',
      links: ['About Us', 'Careers', 'Press', 'Sustainability', 'Investors', 'Affiliates']
    },
    {
      title: 'Support',
      links: ['Help Center', 'Contact Us', 'Size Guide', 'Shipping', 'Returns', 'Track Order']
    }
  ];

  return (
    <footer className="bg-gray-900 text-white py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Sparkles className="w-8 h-8 text-purple-400" />
              <span className="text-2xl font-bold">Luxe</span>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Elevating fashion with timeless elegance and modern sophistication. Join millions who trust Luxe for premium quality.
            </p>

            {/* Social Media */}
            <div className="flex space-x-3 mb-6">
              {['f', 't', 'i', 'p'].map((social, idx) => (
                <button
                  key={idx}
                  className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center font-semibold hover:scale-110 transition-transform duration-300"
                >
                  {social}
                </button>
              ))}
            </div>
          </div>

          {footerSections.map((section, idx) => (
            <div key={idx}>
              <h4 className="font-semibold mb-4 text-lg">{section.title}</h4>
              <ul className="space-y-3">
                {section.links.map((link, linkIdx) => (
                  <li key={linkIdx}>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-white transition-colors duration-300 hover:translate-x-1 inline-block"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-center md:text-left">
              <p>&copy; 2025 Luxe. All rights reserved.</p>
            </div>

            <div className="flex flex-wrap justify-center md:justify-end space-x-6 text-sm text-gray-400">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Cookies</a>
              <a href="#" className="hover:text-white transition-colors">Accessibility</a>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="flex justify-center md:justify-end mt-6 space-x-4">
            <div className="text-gray-500 text-sm">We accept:</div>
            {['💳', '💰', '🏦', '📱'].map((payment, idx) => (
              <div key={idx} className="w-8 h-8 bg-gray-800 rounded flex items-center justify-center">
                {payment}
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
