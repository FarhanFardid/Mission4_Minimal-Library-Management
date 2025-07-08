import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Menu } from 'lucide-react';

const navItems = [
  { label: 'All Books', path: '/books' },
  { label: 'Add Book', path: '/create-book' },
  { label: 'Borrow Summary', path: '/borrow-summary' },
];

const Navbar = () => {
  return (
    <header className="w-full bg-white border-b shadow-sm">
      {/* This div ensures full width and padding */}
      <div className="px-4 py-4 flex items-center justify-between w-full max-w-[100vw]">
        <div className="flex items-center gap-2 text-2xl font-bold text-primary">
          <Menu className="w-5 h-5 text-blue-600" />
          <span>Library Management</span>
        </div>
        <nav className="overflow-x-auto">
          <ul className="flex gap-4 flex-wrap">
            {navItems.map(({ label, path }) => (
              <li key={path}>
                <NavLink
                  to={path}
                  className={({ isActive }) =>
                    cn(
                      'text-gray-700 hover:text-blue-600 px-2 py-1 transition duration-200 whitespace-nowrap',
                      isActive && 'font-semibold border-b-2 border-blue-600'
                    )
                  }
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
