/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { FiMenu, FiBell } from 'react-icons/fi';
import useAuthStore from '../../stores/authStore';

function Header({ openSidebar }) {
  const location = useLocation();
  const { user } = useAuthStore();
  const [scrolled, setScrolled] = useState(false);
  // const [notificationCount, setNotificationCount] = useState(3);
  
  // Get page title based on current route
  const getPageTitle = () => {
    switch (location.pathname) {
      case '/':
        return 'Dashboard';
      case '/user-kyc':
        return 'User KYC Overview';
      case '/loan-applications':
        return 'Loan Applications Tracker';
      case '/payment-history':
        return 'Payment & Repayment History';
      case '/users':
        return 'User List';
      case '/flagged-accounts':
        return 'Flagged Accounts';
      case '/manual-overrides':
        return 'Manual Overrides';
      default:
        return 'Dashboard';
    }
  };

  // Handle scroll event for header styling
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`sticky top-0 z-10 py-4 px-6 bg-white ${
        scrolled ? 'shadow-md' : 'shadow-sm'
      } transition-shadow duration-300`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            onClick={openSidebar}
            className="p-2 rounded-md text-neutral-500 hover:bg-neutral-100 lg:hidden"
            aria-label="Open sidebar"
          >
            <FiMenu size={20} />
          </button>
          <h1 className="text-xl font-semibold text-neutral-800 hidden md:block">
            {getPageTitle()}
          </h1>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="relative">
            <button className="p-2 rounded-md text-neutral-500 hover:bg-neutral-100 relative">
              <FiBell size={20} />
              {/* {notificationCount > 0 && (
                <span className="absolute top-0 right-0 transform translate-x-1/4 -translate-y-1/4 bg-error-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {notificationCount}
                </span>
              )} */}
            </button>
          </div>
          
          <div className="flex items-center">
            <button className="flex items-center gap-2 p-2 rounded-md hover:bg-neutral-100">
              <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-medium">
                {user?.name?.charAt(0) || 'A'}
              </div>
              <span className="hidden md:block text-sm font-medium text-neutral-700">
                {user?.name || 'Admin User'}
              </span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;