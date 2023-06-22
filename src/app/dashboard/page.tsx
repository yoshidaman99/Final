'use client'
import React, { useEffect, useState } from 'react';
import {  NextPage } from 'next';
import HeaderInfo from '@/app/components/header_info';
import { RequestList } from '@/lib/getRequestListDashboard';
import { RequestListInProgress } from '@/lib/getRequestListPerDayInProgress';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const Page: NextPage = () => {
  const [student, setStudent] = useState(true);
  const [_role, setRole] = useState<string | undefined>(undefined);

  useEffect(() => {
    const storedUser: any = cookies.get('user');
    if (storedUser) {
      setRole(storedUser.role);

      if (storedUser.role !== 'student') {
        setStudent(false);
      }
    }
  }, []);

  return (
    <div>
      <HeaderInfo title="Dashboard" />

      <div className="p-20">
        <div className="bg-white p-8 border-2 border-blue-500 rounded ring-2 ring-blue-500">
          <h1 className="text-4xl font-bold text-gray-800 mb-8">Welcome to Interface Computer College Information Website</h1>
          <p className="text-lg text-gray-600 text-center mb-12">Thank you for visiting our website. We provide amazing services and products.</p>
        </div>

        {typeof document !== 'undefined' && (
          <>
            {!student && (
              <>
                <div className="w-1/2 mt-10">
                  <RequestList />
                </div>
                <div className="w-3/4 mt-10">
                  <RequestListInProgress />
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Page;
