'use client'
import React from 'react';
import { NextPage } from 'next';

type PageProps = {
  children: React.ReactNode;
};

const Layout: NextPage<PageProps> = ({ children }) => {

  return (
      <div className="w-full">
          {children}
      </div>
  );
};

export default Layout;