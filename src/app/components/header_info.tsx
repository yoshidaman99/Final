'use client'
import React from 'react';

interface HeaderInfoProps {
    title : string;
    bg_color: string;
    text_color: string;
  }

  const HeaderInfo: React.FC<HeaderInfoProps> = ({ title , bg_color , text_color }) => {
    return (
      <div className={`w-full text-center pt-2 pb-2 font-bold ${text_color} ${bg_color}`}>
            {title}
      </div>
    );

  };

export default HeaderInfo;
