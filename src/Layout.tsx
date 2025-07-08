import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Elements/Navbar';
import Footer from './Elements/Footer';

const Layout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
   <Navbar/>
    <main className="flex-grow w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Outlet />
      </main>
 <Footer />
    </div>
  );
};

export default Layout;
