import React from 'react';
import { Metadata } from 'next';
import HeaderInfo from '@/app/components/header_info';

export const metadata: Metadata = {
    title: 'Dashboard',
};

export default function Page() {
    return (
        <>
            <div>
                <HeaderInfo title={metadata.title != null ? metadata.title.toString() : ''} bg_color='bg-[#393646]' text_color='text-[#ffffff]' />
            </div>      
        </>

    );
}
