import React from 'react';
import { Metadata } from 'next';
import HeaderInfo from '@/app/components/header_info';
import { getRequestList } from '@/lib/getRequestList';
export const metadata: Metadata = {
    title: 'Request List',
};

export default function requestList() {


    return (
        <section>
        <div>
            <HeaderInfo title={metadata.title != null ? metadata.title.toString() : ''} bg_color='bg-[#2E3840]' text_color='text-[#ffffff]' />
        </div>
        <div className='p-4'>
            <div className='p-3 bg-slate-100 rounded'>
                <div>
                       
                    </div>
                    <div>
                       {getRequestList()}
                    </div>

                </div>
        </div>
        </section>
    )
}
