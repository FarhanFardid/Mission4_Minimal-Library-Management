import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Elements/Navbar';
import Footer from './Elements/Footer';

const Layout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
   <Navbar/>
    <main className="flex-grow container px-4 py-6 mx-auto">
        <Outlet />
      </main>
 <Footer />
    </div>
  );
};

export default Layout;
