'use client'
import React, { useEffect, useState } from 'react';
import { Metadata } from 'next';
import HeaderInfo from '@/app/components/header_info';
import { signup } from '@/lib/signup';

export const metadata: Metadata = {
    title: 'Add Admin',
};

export default function Page(): React.JSX.Element {

    const [fName, setFName] = useState('');
    const [lName, setLName] = useState('');
    const [email,setEmail] = useState('');
    const [jobRole, setjobRole] = useState('admin');
    const [status, setStatus] = useState('active');
    const [dept, setDept] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [emailError, setEmailError]= useState(false);

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


      const handleSignup = async (e : React.FormEvent) => {
        e.preventDefault();
        if (password === confirmPassword && !isInputEmpty()) {
            // Passwords match, proceed with the form submission or further processing
            setShowModal(true);
            console.log('Signup Complete!');
          } else {
            // Passwords do not match, display an error message or handle it accordingly
            console.log('Password and confirm password do not match');
          }
    };

    const handleModalConfirm = () => {
        setShowModal(false);
        try{
          const error: Promise< 1 | undefined > = signup(email, password, fName, lName, jobRole, status, dept);
            if(typeof error != undefined)
              setEmailError(true);
        }catch (error){
          console.log(error);
        }
              
       console.log('Signup Complete!');
      };

      const handleModalCancel = () => {
        setShowModal(false);
      };

    const isInputEmpty = () => {
        return (
            fName.trim() === '' ||
            lName.trim() === '' ||
            email.trim() === '' ||
            jobRole.trim() === '' ||
            status.trim() === '' ||
            dept.trim() === '' ||
            password.trim() === '' ||
            confirmPassword.trim() === ''
        );
    };

    return (
        <>
        <section>
          <div>
            <HeaderInfo title={metadata.title != null ? metadata.title.toString() : ''} bg_color='bg-[#2E3840]' text_color='text-[#ffffff]' />
          </div>
        </section>

        <div className=' text-slate-800 flex items-center justify-center p-4 mt-2'>
        <div className='w-3/4 ring-2 py-3 px-4 rounded-md bg-slate-100'>
        <div className='class="container mx-auto py-8"'>
          <h1 className="text-2xl font-bold mb-6">User Form</h1>
          <form onSubmit={handleSignup}>

          <div className='py-2 px-3 ring-2 rounded mb-4'>

                <h2 className="text-xl font-bold mb-3">Login Credencial</h2>

                <div className="mb-4">
                <label
                htmlFor="email"
                className="p-2  block text-gray-700 font-medium mb-1">Email</label>
                <input
                required
                type="email"
                placeholder='Email...'
                value={email}
                onChange={(e)=> setEmail(e.target.value)}
                id="email"
                name="email"
                className="p-2 w-full border-gray-300 rounded-md shadow-sm
                focus:ring-indigo-500 focus:border-indigo-500" />
                 {emailError && <p className="text-red-500 mt-2 text-sm ml-1">Invalid email</p>}
                </div>

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
                    className="p-2 w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
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
                    className="p-2 w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    {passwordError && (
                    <p className="text-red-500 mt-1 text-sm">{passwordError}</p>
                    )}
                </div>

            </div>


            <div className="mb-4">
              <label
              htmlFor="firstName"
              className="block text-gray-700 font-medium mb-1">First Name</label>
              <input
              required
              type="text"
              value={fName}
              placeholder='First Name...'
              onChange={(e)=> setFName(e.target.value)}
              id="firstName"
              name="firstName"
              className="p-2 w-full border-gray-300 rounded-md shadow-sm
               focus:ring-indigo-500 focus:border-indigo-500" />
            </div>
            <div className="mb-4">
              <label
              htmlFor="lastName"
              className="block text-gray-700 font-medium mb-1">Last Name</label>
              <input
              required
              type="text"
              value={lName}
              placeholder='Last Name...'
              onChange={(e)=> setLName(e.target.value)}
              id="lastName"
              name="lastName"
              className="p-2 w-full border-gray-300 rounded-md shadow-sm
               focus:ring-indigo-500 focus:border-indigo-500" />
            </div>

            <div className="mb-4">
                <label
                htmlFor="jobRole"
                className="p-2  block text-gray-700 font-medium mb-1">Job Role</label>
                <select
                value={jobRole}
                onChange={(e)=> setjobRole(e.target.value)}
                id="jobRole"
                name="jobRole"
                className="p-2 w-full border-gray-300 rounded-md shadow-sm
                focus:ring-indigo-500 focus:border-indigo-500">
                <option value="admin">Admin</option>
                <option value="teacher">Teacher</option>
                <option value="registral">Registral</option>
                <option value="cashier">Cashier</option>
                </select>
            </div>
            <div className="mb-4">
              <label
              htmlFor="status"
              className="block text-gray-700 font-medium mb-1">Status</label>
              <select
              value={status}
              onChange={(e)=> setStatus(e.target.value)}
              id="status"
              name="status"
              className="p-2 w-full border-gray-300 rounded-md shadow-sm
              focus:ring-indigo-500 focus:border-indigo-500">
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
            <div className="mb-4">
              <label
              htmlFor="department"
              className="block text-gray-700 font-medium mb-2">Department</label>
              <input
              required
              placeholder='Department...'
              value={dept}
              onChange={(e)=> setDept(e.target.value)}
              type="text"
              id="department"
              name="department"
              className="p-2 w-full border-gray-300 rounded-md shadow-sm
              focus:ring-indigo-500 focus:border-indigo-500" />
            </div>

            <div className="flex justify-end">
              <button
              type="submit"
              className="p-2  bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 mb-4">
                Submit
              </button>
            </div>
          </form>
        </div>
        </div>
        </div>

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