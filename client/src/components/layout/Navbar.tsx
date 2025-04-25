'use client';
import Link from 'next/link';
import { useState } from 'react';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { name: 'Calculator', path: '/calculator' },
    // { name: 'History', path: '/history' },
  ];

  return (
    <nav className="bg-[#1E1E1E] m-3 rounded-lg text-white py-1">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <span className="w-6 h-6 text-white">
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.373 0 12c0 5.135 3.208 9.503 7.678 11.178l.503-.852c.216-.366.313-.792.275-1.218-.041-.459.06-.922.285-1.324l1.528-2.768c.379-.685.284-1.543-.27-2.112L7.2 11.826a1.993 1.993 0 0 1 .008-2.743L9.31 6.896c.604-.592 1.52-.714 2.266-.303l2.764 1.535a1.988 1.988 0 0 1 .968 1.753v2.879c0 .553.225 1.082.626 1.465l1.852 1.748c.384.362.91.56 1.448.547.543-.013 1.053-.238 1.428-.632.682-.711 1.3-1.485 1.834-2.312A11.955 11.955 0 0 0 24 12c0-6.627-5.373-12-12-12z"/>
              </svg>
            </span>
            <span className="text-xl font-bold hidden sm:block text-white">
              CryptoLead
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className="px-3 py-2 rounded-md text-sm font-medium text-white hover:bg-[#575656]"
              >
                {item.name}
              </Link>
            ))}
            <Link
              href="/customer-form"
              className="inline-flex items-center gap-1 px-4 py-2 bg-white text-[#1E1E1E] hover:bg-[#302e2e] hover:text-white transition rounded-md text-sm font-medium"
            >
              Convert Crypto
            </Link>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-gray-700 focus:outline-none"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
            >
              <span className="sr-only">Toggle menu</span>
              {menuOpen ? (
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 text-white">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                onClick={() => setMenuOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-[#575656]">
                {item.name}
              </Link>
            ))}
            <Link
              href="/customer-form"
              onClick={() => setMenuOpen(false)}
              className="block px-4 py-2 mt-2 text-center bg-white text-[#1E1E1E] hover:bg-[#302e2e] hover:text-white rounded-md font-medium"
            >
              <div className="flex justify-center items-center gap-1">
                Convert Crypto
              </div>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
