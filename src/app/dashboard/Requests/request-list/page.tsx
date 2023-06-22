import React from 'react';
import { Metadata } from 'next';
import HeaderInfo from '@/app/components/header_info';
import RequestList  from '@/lib/getRequestList';

export const metadata: Metadata = {
    title: 'Request List',
};

export default function requestList() {


    return (
        <section>
        <div>
            <HeaderInfo title={'Request List'} />
        </div>
        <div className='p-4'>
            <div className='p-3 bg-slate-100 rounded'>
                <div>
                       
                    </div>
                    <div>

                        <RequestList />
                    </div>

                </div>
        </div>
        </section>
    )
}
