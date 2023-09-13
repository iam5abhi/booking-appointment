import React, { useState, useEffect } from 'react';
import { Fragment, useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import Head from 'next/head';


function UpdateDetails({setOpen,open,getQueriesData,id}) {
  const cancelButtonRef = useRef(null)
  const [formData,setFormData]=useState({logo:'',alternatePhoneNumber:'',email:'',phoneNumber:'',about:'',address:'',location:""})

  const handleChange =(event)=>{
    setFormData((pre)=>({
      ...pre,
      [event.target.name]:event.target.value
    }))
  }

  const openupWidget = () => {
    cloudinary.createUploadWidget(
      { cloud_name: "fatimaola", upload_preset: "ufa6exrd" },
      (error, result) => {
        if (!error && result && result.event === "success") {
          setFormData({...formData,logo:result.info.url});
        }
      }
    )
    .open();
  };

  const handleSubmit =(event)=>{
      event.preventDefault();
      fetch("/api/details/update-details", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
      body: JSON.stringify({...formData,id:id}),
      }).then((res) => {
        getQueriesData() 
        setOpen(false)
      })
  }

  const getData = () => {
    fetch("/api/details/get-singledetails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    })
      .then((res) => { 
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        // Data is the parsed JSON object
        setFormData({
          logo:data.logo, 
          alternatePhoneNumber:data.alternatePhoneNumber, 
          phoneNumber:data.phoneNumber, 
          email:data.email, 
          about:data.about,
          address:data.address,
          location:data.location
        });
      })
      .catch((error) => {console.error("Error fetching or parsing data:", error)});
  };

  useEffect(()=>{
    getData()
  },[])

  return (
    <>
      <Head>
          <script
          src='https://upload-widget.cloudinary.com/global/all.js'
          type='text/javascript'
          />
      </Head>
    <Transition.Root show={open} as={Fragment}>   
    <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
      <Transition.Child
        as={Fragment}
        enter="ease-out duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="ease-in duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      </Transition.Child>
      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex md:min-h-full mt-36 md:mt-0 items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <Dialog.Panel className="relative transform overflow-hidden rounded-xl bg-white text-left shadow-xl transition-all sm:my-8 w-full md:max-w-xl">
            <div className="max-w-screen mx-auto">
              <div className="container mx-auto">
                <div className="col-span-2">
                  <div className=" border-b border-gray-200 rounded">
                      <div className="text-end p-2">
                        <i onClick={() => setOpen(false)} className="fa-solid fa-xmark text-xs font-extrabold bg-gray-400 h-5 leading-5 w-5 z-50 rounded-full text-center text-white"></i>
                      </div>
                      <Dialog.Title as="h2" className=" text-xl text-center font-semibold">
                        Update Details
                      </Dialog.Title> 
                    <div className="overflow-auto">
                    <div className="container w-11/15 mx-auto px-3 bg-white rounded  ">
                      <div className="relative flex flex-col flex-auto min-w-0 mt-2 p-4 break-words border-0 shadow-blur rounded-2xl bg-white/80 bg-clip-border mb-4 draggable " draggable="true">
                        <form onSubmit={handleSubmit}>
                              <div className='mt-1'>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email <span class="text-red-600">*</span></label>
                                <input type="text" name='email' value={formData.email} onChange={handleChange} id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder='Enter Email' />
                              </div>
                              <div className='mt-1'>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Number <span class="text-red-600">*</span></label>
                                <input type="text" name='phoneNumber' value={formData.phoneNumber} maxLength={10} onChange={handleChange} id="phonenumber" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder='Enter Number' required/>
                              </div>
                              <div className='mt-1' >
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Alternate Phone Number</label>
                                <input type="text" name='alternatePhoneNumber' value={formData.alternatePhoneNumber} onChange={handleChange} id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder='Enter Number' />
                              </div>
                              <div className='mt-1'>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Location <span class="text-red-600">*</span></label>
                                <input type="text" name='location' value={formData.location} onChange={handleChange} id="location" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder='Enter Location' required/>
                              </div>
                              <div className='mt-1' >
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Address</label>
                                <input type="text" name='address' value={formData.address} onChange={handleChange} id="address" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder='Enter Address' />
                              </div>
                              <div className='mt-1'>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">About Us<span class="text-red-600">*</span></label>
                                <textarea type="text" rows={3} name='about' onChange={handleChange} value={formData.about} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder='Enter About Us' required/>
                              </div> 
                              <div className='mt-2 mb-5'>
                                <button
                                className='bg-gradient-to-r from-[#4216AA] to-[#F8AF0B] hover:bg-gradient-to-l text-white font-bold py-2 px-4 rounded'
                                type='button'
                                onClick={()=>openupWidget()}
                                >
                                Upload Logo
                                </button>
                              </div>
                            <div className='grid justify-items-center mt-5'>
                              <button type="submit" className="text-white bg-gradient-to-r from-[#4216AA] to-[#F8AF0B] hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm px-6 py-2 text-center mr-3 md:mr-0">Submit</button>
                            </div>
                        </form>
                      </div>
                    </div>
              </div>
              </div>
            </div>
          </div>
         </div>
        </Dialog.Panel>
        </Transition.Child>
        </div>
      </div>
    </Dialog>
  </Transition.Root>
  </>
  )
}
export default React.memo(UpdateDetails)