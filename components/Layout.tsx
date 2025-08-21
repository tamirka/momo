import React from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import Modal from './Modal';
import LoginPage from '../pages/LoginPage';
import SignupPage from '../pages/SignupPage';

const Layout: React.FC = () => {
  const [isSidebarOpen, setSidebarOpen] = React.useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  const handleCloseModal = () => {
    navigate(location.pathname, { replace: true });
  };
  
  const showLoginModal = location.hash === '#/login';
  const showSignupModal = location.hash === '#/signup';

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen bg-gray-100 text-neutral-dark">
      <Sidebar isOpen={isSidebarOpen} />
      <div
        className={`relative min-h-screen transition-all duration-300 ease-in-out ${
          isSidebarOpen ? 'lg:ml-64' : 'lg:ml-0'
        }`}
      >
        <Header onMenuClick={toggleSidebar} isSidebarOpen={isSidebarOpen} />
        <main className="p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>

      <Modal isOpen={showLoginModal} onClose={handleCloseModal}>
        <LoginPage onSuccess={handleCloseModal} />
      </Modal>

      <Modal isOpen={showSignupModal} onClose={handleCloseModal}>
        <SignupPage onSuccess={handleCloseModal}/>
      </Modal>
    </div>
  );
};

export default Layout;