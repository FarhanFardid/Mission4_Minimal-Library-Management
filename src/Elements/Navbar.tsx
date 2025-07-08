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
    <header className="bg-white border-b shadow-sm sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2 text-2xl font-bold text-primary">
          <Menu className="w-5 h-5 text-blue-600" />
          <span>Library Management</span>
        </div>
        <nav>
          <ul className="flex gap-4">
            {navItems.map(({ label, path }) => (
              <li key={path}>
                <NavLink
                  to={path}
                  className={({ isActive }) =>
                    cn(
                      'text-gray-700 hover:text-blue-600 px-2 py-1 transition duration-200',
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
