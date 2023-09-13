import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import UserPrivateRoute from '../../PrivateRoute/UserPrivateRoute'
import { useAuthState } from 'react-firebase-hooks/auth'
import { userAuth } from '../../components/firebase/UserFirebase'

const Appointment = () => {
    const router = useRouter()
    const [appointmnet,setAppointmnet]=useState()
    const [ user ] = useAuthState(userAuth);

    const getCategotyData = ()=>{
        fetch("/api/appointment/filter-appointment", { 
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          body: JSON.stringify({ phoneNumber:user.phoneNumber }),
          }).then((res) => {return res.json()}
          ).then((res) => setAppointmnet(res))
    }

    useEffect(() => {
        getCategotyData();
    }, [])
  return (    
        <>
        <div className="container mx-auto px-4 sm:px-8">
          <div className="py-8">
              <div className='px-2 flex justify-between'>
                  <h2 className="text-2xl font-semibold leading-tight">Appointment</h2>
                  <h2 onClick={()=>router.push('/appointment/add')} className="cursor-pointer text-lg font-semibold  leading-tight bg-gradient-to-r from-[#4216AA] to-[#F8AF0B] hover:bg-gradient-to-l shadow-md text-white rounded-full shadow px-5 py-1">Add Appointment</h2>
              </div>
              <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                  <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
                      <table className="min-w-full leading-normal ">
                          <thead>
                              <tr>
                                  <th className="text-left px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                      name
                                  </th>
                                  <th className="text-center px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                      Date
                                  </th>
                                  <th className="text-center px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                      Time
                                  </th>
                                  <th className="text-center px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                      Phone Number
                                  </th>
                                  <th className="text-center px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                      Status
                                  </th>
                              </tr>
                          </thead>
                          <tbody>
                              {!appointmnet?"loading....":appointmnet.map((data,index)=>{
                                  return <tr key={index+1}>
                                  <td className="px-5 py-5 bg-white text-sm">
                                      {data.name}  
                                  </td>
                                  <td className="text-center px-5 py-5 bg-white text-sm">
                                      {data.date}  
                                  </td>
                                  <td className="text-center px-5 py-5 bg-white text-sm">
                                      {data.time}
                                  </td>
                                  <td className="text-center px-5 py-5 bg-white text-sm">
                                      {data.phoneNumber}
                                  </td>
                                  <td className="text-center px-5 py-5 bg-white text-sm">
                                      <span className={`mr-3 relative inline-block px-3 py-1 font-semibold text-${data.status=="Booked"?"blue":data.status=="Completed"?'green':'red'}-900 leading-tight`}>
                                          <span aria-hidden className={`absolute inset-0 bg-${data.status=="Booked"?"blue":data.status=="Completed"?'green':'red'}-200 opacity-50 rounded-full`} />
                                          <span className="relative">{data.status}</span>
                                      </span>
                                  </td>
                              </tr>
                              })}
                          </tbody>
                      </table>
                  </div>
              </div>
          </div>
        </div>
    </>
  )
}

export default UserPrivateRoute(Appointment)