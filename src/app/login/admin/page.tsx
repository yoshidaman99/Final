'use client'
import React, { useState } from 'react';
import { initFirebase } from '@/firebase/firebaseApp';
import { getAuth  } from "firebase/auth";
import { useUser } from '@/lib/Users';


export default function Page() {

    const app = initFirebase();
    const auth = getAuth();

    const { login } = useUser();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    function isString(value : string | void) {
        return typeof value === 'string';
      }

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
           const error = await login(email, password);
           if (isString(error))
           setError('Invalid email or password');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <div className="flex justify-center mt-5">
                <div className="text-black ring-offset-2 py-4 px-8 pb-8 border-4 border-gray2 bg-[#151D3B] rounded w-552 md:mt-4 xl:mt-10 drop-shadow-md">

                    <h1 className="text-center font-bold text-3xl text-white uppercase mb-2">
                        Login
                    </h1>
                    <div className="border-t-2 border-gray-500">

                        <form onSubmit={handleLogin}>
                            <label className="block">
                                <input
                                    required
                                    type='email'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Email"
                                    className="mt-4 p-2 w-full border-2 border-slate-200 placeholder-slate-400
                                    contrast-more:border-slate-400 contrast-more:placeholder-slate-500"
                                    autoComplete="username"
                                />
                            </label>

                            <label className="block">
                                <input
                                    required
                                    placeholder="Password"
                                    className="mt-2 p-2 w-full border-2 border-slate-200 placeholder-slate-400
                                    contrast-more:border-slate-400 contrast-more:placeholder-slate-500"
                                    type="password"
                                    onChange={(e) => setPassword(e.target.value)}
                                    value={password}
                                    autoComplete="current-password"
                                />
                            </label>

                            {error && (
                                <p className="text-red-500 mt-2 text-sm">{error}</p>
                            )}

                            <button
                                type='submit'
                                className="mt-5 middle none w-full center mr-4 bg-green-500 py-3 px-6 font-sans text-xs font-bold uppercase
                                 text-white shadow-md shadow-green-500/20 transition-all hover:shadow-lg hover:shadow-green-800/40 hover:bg-green-700
                                 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none
                                 disabled:opacity-50 disabled:shadow-none"
                                data-ripple-light="true"
                            >
                                Login
                            </button>
                        </form>

                    </div>

                </div>
            </div>
        </>
    )
}
