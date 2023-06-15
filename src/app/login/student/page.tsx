'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import { login } from '@/lib/login-student';

const StudentLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {

    e.preventDefault();

        try {
            const str = await login(email, password);
            if (typeof str === 'string') {
              setError('Invalid email or password');
            }
          } catch (error) {
            setError('Invalid email or password');
            console.error(error);
          }
  };

  return (
    <>
      <div className="flex justify-center mt-5">
        <div className="ring-4 ring-red-300 py-4 px-8 pb-5 border-4 border-gray2 bg-slate-100 rounded w-552 md:mt-4 xl:mt-10 drop-shadow-md">
          <h1 className="text-center text-slate-700 font-bold text-3xl uppercase mb-2">Login</h1>
          <div className="border-t-2 border-gray-500">
            <form onSubmit={handleLogin}>
              <label className="block">
                <input
                  required
                  autoComplete="username"
                  placeholder="Email"
                  className="mt-4 p-2 w-full border-2 border-slate-200 placeholder-slate-400 contrast-more:border-slate-400 contrast-more:placeholder-slate-500"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </label>

              <label className="block">
                <input
                  required
                  autoComplete="new-password"
                  placeholder="Password"
                  className="text-black mt-2 p-2 w-full border-2 border-slate-200 placeholder-slate-400 contrast-more:border-slate-400 contrast-more:placeholder-slate-500"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </label>

              {error && (
                <p className="text-red-500 mt-2 text-sm">{error}</p>
              )}

              <button
                type="submit"
                className="mt-5 middle none w-full center mr-4 bg-green-500 py-3 px-6 font-sans text-xs font-bold uppercase text-black shadow-md shadow-green-500/20 transition-all hover:shadow-lg hover:shadow-green-800/40 hover:bg-green-700 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                data-ripple-light="true"
              >
                Login
              </button>
            </form>

            <Link href="/login/student/register" passHref>
              <button className="block w-full select-none bg-pink-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-800/40 hover:bg-pink-700 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
                Register
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentLogin;