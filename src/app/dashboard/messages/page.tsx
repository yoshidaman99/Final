import React from 'react';
import { Metadata } from 'next';
import HeaderInfo from '@/app/components/header_info';

export const metadata: Metadata = {
    title: 'Message Chat',
};

export default function Page() {
    return (
        <section className=''>
        <div>
            <HeaderInfo title={metadata.title != null ? metadata.title.toString() : ''} bg_color='bg-[#4E6E81]' text_color='text-[#ffffff]' />
        </div>
            <div className="flex flex-row justify-start pb-56">
            <div className='w-52 border-r-2 border-slate-200 mt-2'>
            <aside>
            </aside>
            </div>
            <div className="bg-blue-200 flex-1">
            <div>



            </div>
            </div>
            </div>

        <div>
        </div>
        </section>
    )
}
