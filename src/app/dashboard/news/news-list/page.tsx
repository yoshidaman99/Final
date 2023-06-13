import React from 'react';
import { Metadata } from 'next';
import HeaderInfo from '@/app/components/header_info';
import SearchBar from '@/app/components/UI/search';

export const metadata: Metadata = {
    title: 'List News',
};

export default function Page() {


    return (
        <section className='h-full'>
            <div>
                <HeaderInfo title={metadata.title != null ? metadata.title.toString() : ''} bg_color='bg-[#F9DBBB]' text_color='text-[#2E3840]' />
            </div>
            <div>
                <SearchBar database='' />
            </div>
            <div className='my-4 mx-6 p-2 border-2 border-black-300 rounded'>
            </div>
            <div className='my-4'>
            </div>
        </section>
    )
}
