"use client"
import React, { useEffect, useState, useRef } from 'react';
import Sidebar from '@/app/components/sidebar';
import { NextPage } from 'next';
import { useUser } from '@/lib/Users';
import { useRouter } from 'next/navigation';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

type PageProps = {
  children: React.ReactNode;
};

const Layout: NextPage<PageProps> = ({ children }) => {
    const storedUser = cookies.get('user');
    const { user } = useUser();
    const router = useRouter();
    const [open, setOpen] = useState(true);

    console.log(user)

    useEffect(() => {
      if (!storedUser) {
        router.push('/login/student');
      }
    }, [storedUser, router]);


  const Role = {
    level: storedUser?.role,
  };


  return (
    <>

        <div className="flex flex-row justify-start">
            <div>
                <Sidebar role={`${Role.level}`} />
            </div>
            <div className="bg-blue-200 flex-1 z-0 h-fit min-h-screen pb-14">
              {children}
            </div>
        </div>

    </>
  );
};

export default Layout;
