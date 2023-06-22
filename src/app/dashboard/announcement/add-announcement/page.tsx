'use client'
import React, { useState, useEffect } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import HeaderInfo from '@/app/components/header_info';
import { db } from '@/firebase/firebaseApp';

export default function Page() {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [message, setMessage] = useState('');
  const [imageUploaded, setImageUploaded] = useState(false);

  const handleFormSubmit = async () => {

    try {

      // Save the form data (including the image URL) to the Firestore database
      await addDoc(collection(db, 'course'), {
        title: title,
        date: date,
        message: message,
        createdAt: serverTimestamp(),
      });

      alert("Post Created");
      // Reset the form fields
      setTitle('');
      setDate('');
      setMessage('');

    } catch (error) {
      // Handle any errors that occur during the upload or database save process
      console.error('Error uploading image or saving data:', error);
    }


  };

  useEffect(() => {
    // Reset the imageUploaded state after 2 seconds
    let timeout : any;
    if (imageUploaded) {
      timeout = setTimeout(() => {
        setImageUploaded(false);
      }, 2000);
    }
    return () => clearTimeout(timeout);
  }, [imageUploaded]);

  return (
    <div>
      <HeaderInfo title={'Add news'}/>

      <div className='rounded border-2 border-gray-900 my-4 mx-20 p-5 bg-[#fafafa]'>
        <div>
          <h1 className='text-2xl font-bold mb-3 text-left'>Add News</h1>
        </div>

        <div className='mt-4'>
          <input
          required
            type='text'
            name='first-name'
            id='first-name'
            className='block w-full rounded-md border-0 py-1.5
            text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset
            focus:ring-indigo-600 sm:text-sm sm:leading-6 px-4'
            autoComplete='given-name'
            placeholder='Title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className='mt-4'>
          <input
          required
            type='date'
            className='block py-1.5 rounded-md
            text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset
            focus:ring-indigo-600 sm:text-sm sm:leading-6 px-4'
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div className='mt-4'>
          <textarea
          required
            className='w-full text-black h-60 py-3 px-4 rounded-md placeholder:text-gray-400 ring-1 ring-inset
            focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
            placeholder='Write your Message...'
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
        </div>

        <div className='mt-4 pb-12'>
          <button
            type='button'
            onClick={handleFormSubmit}
            className='float-right inline-flex w-full justify-center rounded-none bg-red-600 px-10 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto'
          >
            Publish
          </button>
        </div>
      </div>
    </div>
  );
}