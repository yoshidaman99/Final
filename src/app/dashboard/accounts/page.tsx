/* eslint-disable @next/next/no-sync-scripts */
'use client'
import React, { useEffect, useState } from 'react';
import HeaderInfo from '@/app/components/header_info';
import {updatingPassword} from '@/lib/updateAdmin';


export default function Page(): React.JSX.Element {


    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        if (password !== confirmPassword) {
          setPasswordError('Passwords do not match');
        } else {
          setPasswordError('');
        }
      }, [password, confirmPassword]);
    
    
    const handlePasswordChange = (value: string) => {
        setPassword(value);
      };
    
      const handleConfirmPasswordChange = (value: string) => {
        setConfirmPassword(value);
      };
      
      const handleModalConfirm = () => {
        setShowModal(false);
        try {
          const error: Promise<1 | undefined> = updatingPassword(password);
          if (typeof error !== 'undefined') {
            // Handle the error
          }
        } catch (error) {
          console.log(error);
        }
      };

      const handleModalCancel = () => {
        setShowModal(false);
      };

    return (
        <>
        <form onSubmit={handleModalConfirm}>
        <div>
            <HeaderInfo title='Admin List' bg_color='bg-[#2E3840]' text_color='text-[#ffffff]' />
        </div>

        <div className='p-8 ring-2 mt-5 bg-slate-100 rounded-md w-3/4 ml-auto mr-auto'>
        <h1 className=' text-xl font-semibold mb-2 border-b-2 pb-2 text-slate-800 '> Change Password </h1>
        <div className="mb-4">
                    <label htmlFor="password" className="block text-gray-700 font-medium mb-1">
                    Password
                    </label>
                    <input
                    required
                    type="password"
                    value={password}
                    placeholder="Password..."
                    onChange={(e) => handlePasswordChange(e.target.value)}
                    id="password"
                    name="password"
                    className="p-2 w-full text-slate-800 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" 
                    title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="confirmPassword" className="block text-gray-700 font-medium mb-1">
                    Confirm Password
                    </label>
                    <input
                    required
                    type="password"
                    value={confirmPassword}
                    placeholder="Confirm Password..."
                    onChange={(e) => handleConfirmPasswordChange(e.target.value)}
                    id="confirmPassword"
                    name="confirmPassword"
                    className="p-2 w-full text-slate-800 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    {passwordError && (
                    <p className="text-red-500 mt-1 text-sm">{passwordError}</p>
                    )}
            </div>
            
            <div className="flex justify-end">
              <button
              type="submit"
              className="p-2  bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 mb-4">
                Submit
              </button>
            </div>
        </div>
        </form>


        {showModal && (
            <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 transition-opacity">
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>

                <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>&#8203;

                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100 sm:mx-0 sm:h-10 sm:w-10">
                        {/* Heroicon name: exclamation */}
                        <svg
                        className="h-6 w-6 text-indigo-600"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                        >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 9v2m0 4h.01m-6.938-9L12 4.062l6.938 6.938M20.062 12L12 19.062l-8.062-8.062"
                        />
                        </svg>
                    </div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <h3 className="text-lg leading-6 font-medium text-gray-900">Create Account</h3>
                        <div className="mt-2">
                        <p className="text-sm text-gray-500">Are you sure you want to create an account?</p>
                        </div>
                    </div>
                    </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                    <button
                    type="button"
                    onClick={handleModalConfirm}
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                    >
                    Create
                    </button>
                    <button
                    type="button"
                    onClick={handleModalCancel}
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    >
                    Cancel
                    </button>
                    </div>
                    </div>
                    </div>
                    </div>
              )}

        </>
    )
}