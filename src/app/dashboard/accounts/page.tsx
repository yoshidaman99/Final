import React from 'react';
import { Metadata } from 'next';
import HeaderInfo from '@/app/components/header_info';

export const metadata: Metadata = {
    title: 'Accounts',
};

export default function Page() {
    return (
        <section>
        <div>
            <HeaderInfo title={metadata.title != null ? metadata.title.toString() : ''} bg_color='bg-[#2E3840]' text_color='text-[#ffffff]' />
        </div>
        </section>
    )
}