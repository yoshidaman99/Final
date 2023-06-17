'use client'
import React, { useEffect, useState } from 'react';
import { useCookies } from "react-cookie";
import { RxAvatar } from 'react-icons/rx';

function getUserNameFromArray(cookies: any): any {
  for (const key in cookies) {
    if (key === 'user' && cookies.hasOwnProperty(key)) {
      const user = cookies[key];
      if (user.hasOwnProperty('name')) {
        return user.name;
      }
    }
  }
  return null;
}

interface HeaderInfoProps {
    title : string;
  }


  const HeaderInfo: React.FC<HeaderInfoProps> = ({ title}) => {
    const [user,setUser] = useState('');
    const [cookies] = useCookies(['user']);

    useEffect(()=>{
      let name = getUserNameFromArray(cookies);
      setUser(name);
    },[cookies, setUser]);


    
    return (
      <div  className='w-full bg-[#729967] flex flex-auto'>
          <div className={`h-11 flex justify-between text-center py-2 px-4 font-medium 
          text-lg text-txtadmin bg-[#729967]`}>
            <span className='mr-4 '>{title}</span> 
            <span className='text-white border-x-2 px-3 flex justify-start'>
              <RxAvatar color='#FFA870' className='mt-1 mr-2 font-light' /> 
              {user}
            </span>
          </div>
      </div>
    );

  };

export default HeaderInfo;


