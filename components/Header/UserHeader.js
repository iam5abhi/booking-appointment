import Link from 'next/link'
import React from 'react'
import { userAuth, logout } from "../firebase/UserFirebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from 'next/router';

const UserHeader = () => {
    const [user] = useAuthState(userAuth);
    const router = useRouter()
    return (
        <>
        {!router.pathname.includes('/admin')?
        <nav className="bg-white border-gray-200 shadow">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <Link href="/" className="flex items-center">
                    <span className="self-center font-semibold whitespace-nowrap ">LOGO</span> {/* <img src="" className='h-8' /> */}
                </Link>
                {!user ? null :
                    <div className="flex md:order-2">
                        <button type="button" onClick={() => logout()} className="text-white bg-gradient-to-r from-[#4216AA] to-[#F8AF0B] hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm px-6 py-2 text-center mr-3 md:mr-0">Logout</button>
                        <button data-collapse-toggle="navbar-cta" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 " aria-controls="navbar-cta" aria-expanded="false">
                            <span className="sr-only">Open main menu</span>
                            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h15M1 7h15M1 13h15" />
                            </svg>
                        </button>
                    </div>
                }
                <div className="items-center justify-between w-full md:flex md:w-auto md:order-1 hidden" id="navbar-cta">
                    <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg  md:flex-row md:space-x-8 md:mt-0 md:border-0 ">
                    {!user ? 
                        <li>
                            <Link href="/user-login" className="block py-2 pl-3 pr-4 text-violet-950  rounded md:bg-transparent md:p-0 " aria-current="page">Login</Link>
                        </li> 
                        : <>
                        <li>
                            <Link href="/change-password" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-violet-950 md:p-0  ">Change Password</Link>
                        </li>
                        <li>
                            <Link href="/appointmnet" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-violet-950 md:p-0  ">Appointmnet</Link>
                        </li>
                        </>
                    }   
                    </ul>
                </div>
            </div>
        </nav>
        :null}
        </>
    )
}

export default UserHeader