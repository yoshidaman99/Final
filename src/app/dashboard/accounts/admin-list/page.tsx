import React from 'react';
import { Metadata } from 'next';
import HeaderInfo from '@/app/components/header_info';
import { getAdminList } from '@/lib/getAdminList';

export const metadata: Metadata = {
    title: 'List Admin',
};


export default function adminList(): React.JSX.Element {

    return (
        <>
        <div>
            <HeaderInfo title={metadata.title != null ? metadata.title.toString() : ''} bg_color='bg-[#2E3840]' text_color='text-[#ffffff]' />
        </div>
        <div className='m-4'>
            { getAdminList() }
        </div>
        </>
    )
}