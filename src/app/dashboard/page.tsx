import React from 'react';
import { Metadata, NextPage } from 'next';
import HeaderInfo from '@/app/components/header_info';

export const metadata: Metadata = {
  title: 'Dashboard',
};

const Page: NextPage = () => {
  return (
    <div>
      <HeaderInfo
        title={metadata.title != null ? metadata.title.toString() : ''}
        bg_color="bg-[#393646]"
        text_color="text-[#ffffff]"
      />

    <div className="flex items-center justify-center h-screen text-center">
        <div className="bg-white p-8 border-2 border-blue-500 rounded ring-2 ring-blue-500">
          <h1 className="text-4xl font-bold text-gray-800 mb-8">Welcome to ICC Information Website</h1>
          <p className="text-lg text-gray-600 text-center mb-12">Thank you for visiting our website. We provide amazing services and products.</p>
        </div>
      </div>

    </div>
  );
};

export default Page;
