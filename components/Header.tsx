
import React from 'react';
import { LogoIcon, SearchIcon, UserCircleIcon, MenuIcon, XIcon } from './Icons';
import { useAuth } from '../auth/Auth';
import { useNavigate, NavLink } from 'react-router-dom';


interface HeaderProps {
  onMenuClick: () => void;
  isSidebarOpen: boolean;
}

const NavItem: React.FC<{ to: string; children: React.ReactNode }> = ({ to, children }) => {
  const activeClass = 'text-primary border-primary';
  const inactiveClass = 'text-neutral-dark border-transparent hover:text-primary';
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors duration-200 ${
          isActive ? activeClass : inactiveClass
        }`
      }
    >
      {children}
    </NavLink>
  );
};


const Header: React.FC<HeaderProps> = ({ onMenuClick, isSidebarOpen }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/home');
  }

  const getDashboardPath = () => {
    if (!user) return '/home';
    return user.role === 'supplier' ? '/dashboard' : '/buyer-dashboard';
  };

  return (
    <header className="sticky top-0 z-40 bg-white shadow-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <button
              onClick={onMenuClick}
              className="lg:hidden mr-2 p-2 rounded-md text-neutral-dark hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
              aria-label="Toggle sidebar"
            >
              {isSidebarOpen ? <XIcon /> : <MenuIcon />}
            </button>
            <div className="flex-shrink-0 flex items-center">
                <NavLink to="/home" className="flex items-center">
                  <LogoIcon className="h-8 w-auto text-primary" />
                  <span className="ml-3 text-2xl font-bold text-neutral-dark hidden sm:inline">Yazbox</span>
                </NavLink>
            </div>
            <nav className="hidden lg:flex items-center space-x-8 ml-10">
              <NavItem to="/browse">Browse Products</NavItem>
              <NavItem to="/suppliers">Find Suppliers</NavItem>
            </nav>
          </div>

          <div className="flex-1 max-w-lg mx-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="search"
                name="search"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm"
                placeholder="Search for custom boxes, mailers..."
                type="search"
              />
            </div>
          </div>
          
          <div className="flex items-center">
            {user ? (
               <div className="flex items-center space-x-2">
                    <a href={`#${getDashboardPath()}`} className="px-4 py-2 text-sm font-medium text-neutral-dark">
                        My Account
                    </a>
                    <button onClick={handleLogout} className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-focus">
                        Log Out
                    </button>
               </div>
            ) : (
                <>
                    <div className="hidden md:flex items-center space-x-2">
                        <a href="#/login" className="px-4 py-2 text-sm font-medium text-neutral-dark bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                            Log In
                        </a>
                        <a href="#/signup" className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-focus">
                            Sign Up
                        </a>
                    </div>
                    <div className="md:hidden ml-2">
                         <a href="#/login" className="p-2 rounded-full text-gray-600 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-focus">
                            <UserCircleIcon className="h-7 w-7" />
                         </a>
                    </div>
                </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;