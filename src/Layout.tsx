// src/components/Layout.tsx
import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

const navItems = [
  { label: 'All Books', path: '/books' },
  { label: 'Add Book', path: '/create-book' },
  { label: 'Borrow Summary', path: '/borrow-summary' },
];

const Layout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <nav className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="text-xl font-bold text-gray-800">Library Management</div>
          <ul className="flex space-x-6">
            {navItems.map(({ label, path }) => (
              <li key={path}>
                <NavLink
                  to={path}
                  className={({ isActive }) =>
                    `text-gray-700 hover:text-blue-600 transition ${
                      isActive ? 'font-semibold border-b-2 border-blue-600' : ''
                    }`
                  }
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-6">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 text-center text-sm text-gray-600 py-4 mt-auto">
        &copy; {new Date().getFullYear()} Library Management. All rights reserved.
      </footer>
    </div>
  );
};

export default Layout;
