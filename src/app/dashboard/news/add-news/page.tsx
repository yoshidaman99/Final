'use client'
import React, { useState, useEffect } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import HeaderInfo from '@/app/components/header_info';
import { db } from '@/firebase/firebaseApp';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '@/firebase/firebaseApp';

export default function Page() {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [message, setMessage] = useState('');
  const [imageUploaded, setImageUploaded] = useState(false);

  const handleFormSubmit = async () => {
    // Retrieve the image file from the input field
    const imageFileInput = document.getElementById('file-upload') as HTMLInputElement;
    const imageFile : File | undefined = imageFileInput?.files?.[0];

    if (!imageFile) {
        // No file selected, handle this case accordingly
        return;
      }

    // Create a reference to the storage location where you want to store the image
    const storageRef = ref(storage, 'images/' + imageFile.name);

    try {
      // Upload the image file to Firebase Storage
      const snapshot = await uploadBytes(storageRef, imageFile);

      // Obtain the download URL of the uploaded image
      const imageUrl = await getDownloadURL(snapshot.ref);

      // Save the form data (including the image URL) to the Firestore database
      await addDoc(collection(db, 'news'), {
        title: title,
        date: date,
        message: message,
        imageUrl: imageUrl,
        createdAt: serverTimestamp(),
      });

      alert("Post Created");
      // Reset the form fields
      setTitle('');
      setDate('');
      setMessage('');
      setImageUploaded(true);

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
      <HeaderInfo
        title={'add news'}
        bg_color='bg-[#F9DBBB]'
        text_color='text-[#2E3840]'
      />

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

        <div className='mt-4'>
          <div className='col-span-full'>
            <label className='block text-sm font-medium leading-6 text-gray-900'>
              News Photo
            </label>
            <div className='mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10'>
              <div className='text-center'>
                {!imageUploaded ? (
                  <svg
                    className='mx-auto h-12 w-12 text-gray-300'
                    viewBox='0 0 24 24'
                    fill='currentColor'
                    aria-hidden='true'
                  >
                    <path
                      fillRule='evenodd'
                      d='M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25
                                        2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0
                                        00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0
                                        112.25 0 1.125 1.125 0 01-2.25 0z'
                      clipRule='evenodd'
                    />
                  </svg>
                ) : (
                  <svg
                    className='mx-auto h-12 w-12 text-green-500'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                    aria-hidden='true'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M5 13l4 4L19 7'
                    />
                  </svg>
                )}
                <div className='mt-4 flex text-sm leading-6 text-gray-600'>
                  <label className='relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none
                                    focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500'>
                    <span>Upload a file</span>
                    <input
                      id='file-upload'
                      name='file-upload'
                      type='file'
                      className='sr-only'
                    />
                  </label>
                  <p className='pl-1'>or drag and drop</p>
                </div>
                <p className='text-xs leading-5 text-gray-600'>PNG, JPG, GIF up to 10MB</p>
              </div>
            </div>
          </div>
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