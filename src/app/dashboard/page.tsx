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
    </div>
  );
};

export default Page;
