'use client'
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

interface MenuItem {
  title: string;
  location: string;
}

const Navigation: React.FC = () => {
  const navMenu: MenuItem[] = [
    {
        title: 'Home',
        location: '/',
    },
    {
      title: 'Student-Login',
      location: '/login/student',
    },
    {
      title: 'Admin-Login',
      location: '/login/admin',
    },
  ];

  const [currentPath, setCurrentPath] = useState('');

  useEffect(() => {
    setCurrentPath(window.location.pathname);
  }, []);

  return (
    <div className='bg-[#729967] px-10 h-10'>
      <nav className="flex">
        <ul className="flex space-x-4 text-white mt-2">
          {navMenu.map((menuItem, index) => (
            <li key={index}
              className={`
                ${currentPath === menuItem.location ? 'underline font-bold' : ''}
                transition duration-300 ease-in-out hover:text-orange-300 hover:underline
              `}
            >
              <Link href={menuItem.location}>
                {menuItem.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Navigation;
