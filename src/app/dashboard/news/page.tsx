import React from 'react';
import { Metadata } from 'next';
import HeaderInfo from '@/app/components/header_info';

export const metadata: Metadata = {
    title: 'News',
};



export default function Page() {

    return (
        <section>
        <div><HeaderInfo title={metadata.title != null ? metadata.title.toString() : ''} bg_color='bg-[#F9DBBB]' text_color='text-[#2E3840]' /></div>
        <div>
           
        </div>
        </section>
    )
}
