'use client'
import React from 'react';

interface TableProps {
    tableColumns : any[],
    dataColumn? : any,
    textCaption? : string,
}

const Table: React.FC<TableProps> = ({ textCaption , tableColumns , dataColumn  }) => {
    return(
        <>
            { tableColumns?
                <div className='relative rounded overflow-auto'>
                    <table className='border-collapse table-auto w-full text-sm border border-slate-100 bg-gray-50'>
                        <caption className='caption-top'>
                            {textCaption}
                        </caption>
                        <thead>
                            <tr className='border-b-2 dark:border-slate-600 text-lg font-medium dark:text-lime-950 border border-slate-600'>
                                {tableColumns.map((column, index)=>(
                                    <td className='pl-2 text-lime-900 border border-slate-600' key={index}>{column}</td>
                                ))}
                            </tr>
                        </thead>
                        <tbody className=' bg-gray-950'>
                                {dataColumn?.map((rows: any , rowIndex: number) => (
                                    <tr key={rowIndex} className='text-slate-300 border border-slate-50 hover:font-bold hover:bg-slate-600'>
                                        {tableColumns.map((column, columnIndex)=>(
                                            <td key={columnIndex} className='p-2 border border-slate-50'>{rows[column]}</td>
                                        ))}
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
        : '' }

        </>
    );
};

export default Table;
