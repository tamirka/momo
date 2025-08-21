import React from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { DashboardIcon, OrdersIcon, QuotesIcon, HeartIcon, MessagesIcon } from '../../components/Icons';

const buyerNavLinks = [
  { to: '/buyer-dashboard', text: 'Overview', icon: <DashboardIcon /> },
  { to: '/buyer-dashboard/orders', text: 'My Orders', icon: <OrdersIcon /> },
  { to: '/buyer-dashboard/quotes', text: 'My Quotes', icon: <QuotesIcon /> },
  { to: '/buyer-dashboard/saved-products', text: 'Saved Products', icon: <HeartIcon /> },
  { to: '/messages', text: 'Messages', icon: <MessagesIcon /> },
];

const BuyerNavItem: React.FC<{ to: string; children: React.ReactNode; isEnd?: boolean }> = ({ to, children, isEnd = false }) => {
  const location = useLocation();
  const isActive = isEnd ? location.pathname === to : location.pathname.startsWith(to);
  
  const activeClass = 'bg-primary text-white';
  const inactiveClass = 'text-gray-600 hover:bg-gray-200 hover:text-gray-900';
  
  return (
    <NavLink
      to={to}
      end={isEnd}
      className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
        isActive ? activeClass : inactiveClass
      }`}
    >
      {children}
    </NavLink>
  );
};

const BuyerDashboardLayout: React.FC = () => {
    return (
        <div className="flex">
            {/* Buyer Sidebar */}
            <aside className="w-64 bg-white border-r border-gray-200 flex-shrink-0">
                <div className="flex flex-col h-full">
                    <div className="h-16 flex items-center px-4 border-b">
                        <h1 className="text-lg font-bold text-neutral-dark">My Account</h1>
                    </div>
                    <nav className="flex-1 p-4 space-y-2">
                         {buyerNavLinks.map((link) => (
                            <BuyerNavItem key={link.to} to={link.to} isEnd={link.to === '/buyer-dashboard'}>
                                {link.icon}
                                <span className="ml-3">{link.text}</span>
                            </BuyerNavItem>
                        ))}
                    </nav>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1">
                <Outlet />
            </div>
        </div>
    );
};

export default BuyerDashboardLayout;
