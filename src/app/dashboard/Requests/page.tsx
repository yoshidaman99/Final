'use client'
import HeaderInfo from '@/app/components/header_info';
import { RequestList } from '@/lib/getRequestListPersonal';
import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';

export default async function Request() {
  const [User, setUser] = useState('');
  const cookies : any = useCookies(['user']);

  useEffect(() => {
    const userID = getUserIDFromArray(cookies);
    setUser(userID);
    console.log(userID)
  }, [cookies]);

  function getUserIDFromArray(cookies: any) {
    for (let i = 0; i < cookies.length; i++) {
      const object = cookies[i];
      if (object.hasOwnProperty('user')) {
        const user = object.user;
        if (user.hasOwnProperty('id')) {
          return user.id;
        }
      }
    }
    return null;
  }

  return (
    <section>
      <div>
        <HeaderInfo title={'Request'} bg_color='bg-[#2E3840]' text_color='text-[#ffffff]' />
      </div>

      <div className='h-7 w-full bg-slate-50'>

      </div>
    </section>
  );
}