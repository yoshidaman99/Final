'use client'
import React, { useEffect, useState } from 'react';
import Sidebar from '@/app/components/sidebar';
import { NextPage, GetServerSideProps } from 'next';
import { useRouter } from 'next/navigation';
import Cookies from 'universal-cookie';
import { CookiesProvider } from 'react-cookie';

const cookies = new Cookies();

type PageProps = {
  children: React.ReactNode;
};

const Layout: NextPage<PageProps> = ({ children}) => {
  const router = useRouter();
  const [_role, setRole] = useState<string | undefined>(undefined);

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
          <div>
            <Sidebar role={_role} />
          </div>
          <div className="bg-slate-900 flex-1 z-0 h-fit min-h-screen pb-14">
            {children}
          </div>
        </div>
      </CookiesProvider>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  // You can access the cookies from the incoming request using `context.req.cookies`
  const cookiesFromRequest = context.req.cookies;

  // Pass the cookies as props to the component
  return {
    props: {
      cookiesFromRequest,
    },
  };
};

export default Layout;