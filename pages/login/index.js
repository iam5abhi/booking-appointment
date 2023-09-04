import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { auth, logInWithEmailAndPassword } from "../../components/firebase/Firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const Login = () => {
  const [formData,setFormData]=useState({ email: '', password: '' })
  const [user, loading] = useAuthState(auth);
  const router = useRouter()

  const FromHandler=(event)=>{
    setFormData((pre)=>({
      ...pre,
      [event.target.name]:event.target.value
    }))
  }

  const logInWithEmailAndPasswords = (event) => {
    event.preventDefault(); 
    logInWithEmailAndPassword(formData.email,formData.password)
  };

  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) router.push('/admin');
  }, [user, loading]);
  
  return (
    <>
    
      <div className="max-w-screen mx-auto">
        <div className="container mx-auto py-10">
          <div className="p-4">
            <div className="w-full mx-auto md:w-[35%]">
              <form onSubmit={logInWithEmailAndPasswords} className="bg-white shadow-xl py-14 rounded-lg p-5">
                <h1 className=" font-bold text-3xl mb-8 text-center ">Login</h1>
                <input type="hidden" name="remember" defaultvalue="true" />
                <div className="mt-8 space-y-4 ">
                  <div className="mb-4">
                    <label htmlfor="name" className="block mb-2 text-sm font-medium text-gray-900 ">Username</label>
                    <input type="text" id="email" name='email' onChange={FromHandler} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="Username" required />
                  </div>
                  <div className="mb-4">
                    <label htmlfor="password" className="block mb-2 text-sm font-medium text-gray-900 ">Password</label>
                    <input type="password" id="password" name='password' onChange={FromHandler} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="Password" required />
                  </div> 
                  <div className="flex items-center justify-end">
                    <div className="text-sm">
                    <Link href="/reset" className="text-blue-600 border-gray-200  hover:underline ">Forgot your password?</Link>
                    </div>
                  </div>
                  <div className="text-center mb-6">
                    <button type="submit" className="rounded-full  flex w-[30%] mx-auto justify-center 
                rounded-full  bg-gradient-to-r from-[#4216AA] to-[#F8AF0B] hover:bg-gradient-to-l shadow-md py-2 px-4 text-lg 
                font-medium text-white ">Submit</button> 
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login;

