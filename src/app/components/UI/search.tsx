'use client'
import { useBoardStore } from '@/store/BoardStore';
import React from 'react';

interface SearchBar{
    database : string,
}

const SearchBarProps: React.FC<SearchBar> = ({ database }) => {

    const [searchString, setSearchString] = useBoardStore((state)=>[
        state.searchString,
        state.setSearchString,
    ]);

    return(
        <>
            <div className='w-full px-8 py-4'>
                <div className="relative mt-2 rounded-md shadow-sm">
                    <input type="text" name="price" id="price" className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900
                    ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="Search "
                    value={searchString}
                    onChange={(e) => setSearchString(e.target.value)} />
                    <div className="absolute inset-y-0 right-0 flex items-center">
                    <button className='py-1.5 px-3 font-medium hover:font-bold hover:text-slate-800 text-gray-600'>
                        Search
                    </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SearchBarProps;

