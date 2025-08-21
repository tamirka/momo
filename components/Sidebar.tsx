
import React from 'react';
import { NavLink } from 'react-router-dom';
import { HomeIcon, BrowseIcon, SuppliersIcon, DashboardIcon, AboutIcon, ContactIcon, CategoryIcon } from './Icons';
import { useAuth } from '../auth/Auth';

interface SidebarProps {
  isOpen: boolean;
}

const navLinks = [
  { to: '/home', text: 'Home', icon: <HomeIcon /> },
  { to: '/browse', text: 'Browse', icon: <BrowseIcon /> },
  { to: '/suppliers', text: 'Suppliers', icon: <SuppliersIcon /> },
];

const secondaryLinks = [
  { to: '/about', text: 'About Us', icon: <AboutIcon /> },
  { to: '/contact', text: 'Contact', icon: <ContactIcon /> },
]

const categories = [
  "Mailer Boxes", "Shipping Boxes", "Product Packaging", "Flexible Packaging", "Luxury Boxes"
];

const NavItem: React.FC<{ to: string; children: React.ReactNode }> = ({ to, children }) => {
  const activeClass = 'bg-primary text-white';
  const inactiveClass = 'text-gray-300 hover:bg-neutral-dark hover:text-white';
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center px-4 py-2.5 text-sm font-medium rounded-md transition-colors duration-200 ${
          isActive ? activeClass : inactiveClass
        }`
      }
    >
      {children}
    </NavLink>
  );
};

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  const { user } = useAuth();
  
  const dashboardPath = user?.role === 'supplier' ? '/dashboard' : '/buyer-dashboard';

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-50 w-64 bg-neutral-dark text-white flex-col transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
        <div className="flex flex-col h-full">
            <div className="flex items-center justify-center h-16 flex-shrink-0 bg-gray-900">
                <h1 className="text-xl font-semibold text-white">Categories</h1>
            </div>
            <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
                <p className="px-4 pt-4 pb-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">Main</p>
                {navLinks.map((link) => (
                    <NavItem key={link.to} to={link.to}>
                        {link.icon}
                        <span className="ml-3">{link.text}</span>
                    </NavItem>
                ))}
                {user && (
                    <NavItem to={dashboardPath}>
                        <DashboardIcon />
                        <span className="ml-3">Dashboard</span>
                    </NavItem>
                )}

                <p className="px-4 pt-6 pb-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">Shop by Category</p>
                {categories.map((category) => (
                    <NavItem key={category} to={`/browse?category=${category.toLowerCase().replace(' ', '-')}`}>
                        <CategoryIcon />
                        <span className="ml-3">{category}</span>
                    </NavItem>
                ))}
            </nav>
            <div className="flex-shrink-0 p-2 border-t border-gray-700">
                 <nav className="px-2 py-2 space-y-1">
                    {secondaryLinks.map((link) => (
                        <NavItem key={link.to} to={link.to}>
                            {link.icon}
                            <span className="ml-3">{link.text}</span>
                        </NavItem>
                    ))}
                 </nav>
            </div>
        </div>
    </aside>
  );
};

export default Sidebar;