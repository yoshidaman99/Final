'use client'
import React, { useEffect, useState } from 'react';
import Sidebar from '@/app/components/sidebar';
import { NextPage } from 'next';
import { useRouter } from 'next/navigation';
import Cookies from 'universal-cookie';
import { CookiesProvider } from 'react-cookie';

const cookies = new Cookies();

type PageProps = {
  children: React.ReactNode;
};

const Layout: NextPage<PageProps> = ({ children }) => {
  const [_role, setRole] = useState<string | undefined>(undefined);

  const router = useRouter();

  useEffect(() => {
    const storedUser: any = cookies.get('user');

    if (storedUser) {
      setRole(storedUser.role);
    } else {
      router.push('/login/student');
    }
  }, [router]);

  return (
    <CookiesProvider cookies={cookies}>
      <div className="flex flex-row justify-start">
        <div className='z-50'>
          <Sidebar role={_role} />
        </div>
        <div className="bg-slate-900 flex-1 z-0 h-fit min-h-screen pb-14">
          {children}
        </div>
      </div>
    </CookiesProvider>
  );
};

export default Layout;