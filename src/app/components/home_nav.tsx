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
      title: 'Sign-up',
      location: '/login/student',
    },
  ];

  const [currentPath, setCurrentPath] = useState('');

  useEffect(() => {
    setCurrentPath(window.location.pathname);
  }, []);

  return (
    <div className="bg-gray-200 py-4 px-24">
      <nav className="flex justify-end">
        <ul className="flex space-x-4 text-slate-900">
          {navMenu.map((menuItem, index) => (
            <li key={index} className={`
              ${currentPath === menuItem.location ? 'underline font-bold' : ''}
              transition duration-300 ease-in-out hover:text-blue-500 hover:underline
            `}>
              <Link href={menuItem.location}>
                <span>{menuItem.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Navigation;
