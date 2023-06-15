'use client'
import React, { useEffect, useState } from 'react';
import HeaderInfo from '@/app/components/header_info';
import { signup } from '@/lib/student-signup';

function Page(): React.JSX.Element {
  const [fName, setFName] = useState('');
  const [lName, setLName] = useState('');
  const [email, setEmail] = useState('');
  const [course, setCourse] = useState('');
  const [year, setYear] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [emailError, setEmailError] = useState(false);

  useEffect(() => {
    if (password !== confirmPassword) {
      setPasswordError('Passwords do not match');
    } else {
      setPasswordError('');
    }
  }, [password, confirmPassword]);

  const handlePasswordChange = (value:string) => {
    setPassword(value);
  };

  const handleConfirmPasswordChange = (value:string) => {
    setConfirmPassword(value);
  };

  const handleSignup = async (e:any) => {
    e.preventDefault();
    if (password === confirmPassword && !isInputEmpty()) {
      // Passwords match, proceed with the form submission or further processing
      setShowModal(true);
      signup(email, password, fName, lName, course, year);
      console.log('Signup Complete!');
      window.location.reload();
    } else {
      // Passwords do not match, display an error message or handle it accordingly
      console.log('Password and confirm password do not match');
    }
  };

  const handleModalConfirm = () => {
    setShowModal(false);
    try {
      console.log('Signup Complete!');
      const error = signup(email, password, fName, lName, course, year);
      if (typeof error !== 'undefined') setEmailError(true);
    } catch (error) {
      console.log(error);
    }

  };

  const handleModalCancel = () => {
    setShowModal(false);
  };

  const isInputEmpty = () => {
    return (
      fName.trim() === '' ||
      lName.trim() === '' ||
      email.trim() === '' ||
      course.trim() === '' ||
      year.trim() === '' ||
      password.trim() === '' ||
      confirmPassword.trim() === ''
    );
  };

  return (
    <>
       <div className="text-slate-800 flex items-center justify-center p-4 mt-2">
        <div className="w-3/4 ring-2 py-3 px-4 rounded-md bg-slate-100">
          <div className="container mx-auto py-8">
            <h1 className="text-2xl font-bold mb-6">User Form</h1>
            <form onSubmit={handleSignup}>
              <div className="py-2 px-3 ring-2 rounded mb-4">
                <h2 className="text-xl font-bold mb-3">Login Credentials</h2>

                <div className="mb-4">
                  <label htmlFor="email" className="p-2 block text-gray-700">Email:</label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="password" className="p-2 block text-gray-700">Password:</label>
                  <input
                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => handlePasswordChange(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="confirmPassword" className="p-2 block text-gray-700">Confirm Password:</label>
                  <input
                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                    type="password"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => handleConfirmPasswordChange(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                    required
                  />
                  {passwordError && <p className="text-red-500">{passwordError}</p>}
                </div>
              </div>

              <div className="py-2 px-3 ring-2 rounded mb-4">
                <h2 className="text-xl font-bold mb-3">Personal Information</h2>

                <div className="mb-4">
                  <label htmlFor="firstName" className="p-2 block text-gray-700">First Name:</label>
                  <input
                    type="text"
                    id="firstName"
                    value={fName}
                    onChange={(e) => setFName(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="lastName" className="p-2 block text-gray-700">Last Name:</label>
                  <input
                    type="text"
                    id="lastName"
                    value={lName}
                    onChange={(e) => setLName(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="course" className="p-2 block text-gray-700">Course:</label>
                  <input
                    type="text"
                    id="course"
                    value={course}
                    onChange={(e) => setCourse(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="year" className="p-2 block text-gray-700">Year:</label>
                  <input
                    type="text"
                    id="year"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded"
                disabled={!!passwordError || isInputEmpty()}
              >
                Sign Up
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>&#8203;

            <div
              className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-headline"
            >
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <svg
                      className="h-6 w-6 text-red-600"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-headline">
                      Registration Successful
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Thank you for registering! An email with further instructions has been sent to your email address.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div>*this is unclickable if any question are not answered.</div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse items-end justify-items-end">

              <button
                type="submit"
                className="float-right inline-flex justify-center rounded-md border border-transparent shadow-sm 
                px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-600 focus:outline-none 
                focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                disabled={!!passwordError || isInputEmpty()}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
      )}
    </>
  );
}

export default Page;