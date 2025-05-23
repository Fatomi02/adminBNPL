/* eslint-disable react/prop-types */
import { useLocation, Link } from 'react-router-dom';
import { 
  FiHome, FiFileText, FiDollarSign, FiUsers, 
  FiAlertTriangle, FiSettings, FiX, FiActivity 
} from 'react-icons/fi';
import clsx from 'clsx';

function Sidebar({ isOpen, closeSidebar }) {
  const location = useLocation();
  
  const navItems = [
    { name: 'Dashboard', icon: FiHome, path: '/' },
    { name: 'User KYC', icon: FiFileText, path: '/user-kyc' },
    { name: 'Loan Applications', icon: FiDollarSign, path: '/loan-applications' },
    { name: 'Payment History', icon: FiActivity, path: '/payment-history' },
    { name: 'User List', icon: FiUsers, path: '/users' },
    { name: 'Flagged Accounts', icon: FiAlertTriangle, path: '/flagged-accounts' },
  ];

  return (
    <>
      {/* Mobile sidebar backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-20 bg-black bg-opacity-50 lg:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={clsx(
          "fixed inset-y-0 left-0 z-30 w-64 bg-white border-r border-neutral-200 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:z-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-between h-16 px-6 border-b border-neutral-200">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded bg-primary-500 flex items-center justify-center">
              <span className="text-white font-bold">A</span>
            </div>
            <span className="ml-3 text-lg font-semibold text-neutral-800">Admin Panel</span>
          </div>
          <button 
            className="p-2 rounded-md text-neutral-500 hover:bg-neutral-100 lg:hidden"
            onClick={closeSidebar}
          >
            <FiX size={18} />
          </button>
        </div>

        <nav className="p-4 overflow-y-auto h-[calc(100%-4rem)]">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.path}
                  className={clsx(
                    "flex items-center px-4 py-3 rounded-md transition-colors",
                    location.pathname === item.path 
                      ? "bg-primary-50 text-primary-600" 
                      : "text-neutral-600 hover:bg-neutral-100"
                  )}
                  onClick={() => {
                    if (window.innerWidth < 1024) {
                      closeSidebar();
                    }
                  }}
                >
                  <item.icon size={18} className="mr-3" />
                  <span>{item.name}</span>
                  
                  {/* Notification indicators for certain sections */}
                  {/* {(item.path === '/loan-applications' || item.path === '/flagged-accounts') && (
                    <span className="ml-auto bg-error-500 text-white text-xs px-2 py-1 rounded-full">
                      {item.path === '/loan-applications'}
                    </span>
                  )} */}
                </Link>
              </li>
            ))}
          </ul>
          
          <div className="mt-8 pt-4 border-t border-neutral-200">
            <div className="px-4 py-2">
              <h3 className="text-xs font-medium text-neutral-500 uppercase tracking-wider">
                System
              </h3>
            </div>
            <ul className="mt-2 space-y-1">
              <li>
                <a 
                  href="#" 
                  className="flex items-center px-4 py-3 text-neutral-600 rounded-md hover:bg-neutral-100"
                >
                  <FiSettings size={18} className="mr-3" />
                  <span>Settings</span>
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </aside>
    </>
  );
}

export default Sidebar;