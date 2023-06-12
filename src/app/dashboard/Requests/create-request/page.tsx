'use client'
import React, { useState } from 'react';
import HeaderInfo from '@/app/components/header_info';
import { addRequest } from '@/lib/addRequest';


export default function CreateRequest(): React.JSX.Element {
  const requestList = [
    {
      request: 'Request Diploma',
      notes: 'Please be informed that for no issue in getting your diploma, you need to have all requirements and payment paid.',
      employeeAssign: 'registral',
    },
    {
      request: 'Request Clearance',
      notes: 'Please make sure all fees from the cashier are paid.',
      employeeAssign: 'cashier',
    },
  ];

  const [templateName,setTemplateName] = useState('');
  const [employee,setEmployee] = useState('');
  const [title,setTitle] = useState('');
  const [message,setMessage] = useState('');


  const [selectedRequest, setSelectedRequest] = useState('');

  const handleRequestChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRequest(e.target.value);
    setTemplateName(e.target.value);
    setTitle(e.target.value);
  };

  const handleEmployee = (value: string) => {
    setEmployee(value);
  };

  const handleMessage = (value:string) => {
    setMessage(value);
  }

  const handleAddRequest  = async (e : React.FormEvent) => {
    e.preventDefault();
    try{
        addRequest(title,message,templateName, employee );
    }catch (error){

    }
  }

  const selectedRequestData = requestList.find((item) => item.request === selectedRequest);

  return (
    <section>
      <div>
        <HeaderInfo title={'Create Request'} bg_color='bg-[#2E3840]' text_color='text-[#ffffff]' />
      </div>
    <form onSubmit={handleAddRequest}>
      <div className='w-full p-5 text-slate-900'>
        <div className='w-full p-4 bg-slate-100 rounded'>
          <div className='w-fill'>
            <h1 className='text-lg font-semibold'>Create a Request</h1>
          </div>
          <div className=''>
            <select
            id='template_name'
            className='px-3 py-2 w-10/12 mt-2'
            value={templateName}
            onChange={handleRequestChange}
            required
            >
              <option value='' selected>
                Select a Request...
              </option>
              {requestList.map((item, index) => (
                <option key={index} value={item.request}>
                  {item.request}
                </option>
              ))}
            </select>
          </div>
          <div className='mt-2'>
            <h2>Notes:</h2>
          </div>
          <div className='mt-2 p-2 ring-2 ring-black h-screen max-h-350'>
            <h3 id='request_text'>{selectedRequestData?.notes}</h3>
          </div>
          {selectedRequestData && (
            <div className='mt-2'>
              <h2>Employee:</h2>
              <input
              value={selectedRequestData.employeeAssign}
              onChange={(e)=>{handleEmployee(e.target.value)}}>
              </input>
            </div>
          )}
          <div className='mt-2'>
            <h2>Message:</h2>
          </div>
          <div className='mt-2 w-full'>
              <textarea
              value={message}
              onChange={(e)=>handleMessage(e.target.value)}
              placeholder='Message...'
              className='w-full h-36 border-2 border-black p-3'
              required
              >
              </textarea>
          </div>
          <div className='h-14 pt-4'>
            <button
            type='submit'
            className='float-right px-3 py-2 bg-red-600 text-white rounded'>
                Send Request
            </button>
          </div>
        </div>
      </div>
      </form>
    </section>
  );
}
