import React, { useState } from 'react'
import UserPrivateRoute from '../PrivateRoute/UserPrivateRoute';
import { userAuth } from "../components/firebase/UserFirebase";
import { useAuthState } from "react-firebase-hooks/auth";

const Home = () => {
    const today = new Date().toISOString().split('T')[0];
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 5);
    const maxDateString = maxDate.toISOString().split('T')[0];
    const [queries,setQueries]=useState({date:'',time:[]})
    const [formData,setFormData]=useState({date:'',time:'',name:''});
    const [user, loading, error] = useAuthState(userAuth);

    console.log(user)
    const getQueriesData = (event)=>{
        fetch("/api/filter/filter", { 
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          body: JSON.stringify({ date: event.target.value }),
          }).then((res) => {return res.json()}
          ).then((res) => {
            if(res.length!=0){
            let time = res.map(data=>data.time)
            setQueries({date:res[0].date,time:time})
            }else{
            setQueries({date:'',time:[]})
            }
            setFormData({...formData,date:event.target.value})
          })
    }

    const BookAppointment = ()=>{
        if(!formData.date || !formData.time || !formData.name){
            alert("please select date and time ? ")
        }else{
            fetch("/api/appointment/book-appointment", { 
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
              body: JSON.stringify({...formData,phoneNumber:user.phoneNumber}),
              }).then((res) => {window.location.reload()}
              ).catch((error) => {alert(error,"something want wrong")})
        }
    }

    return (
        <>
            <div className="w-screen">
                <div className="mx-auto grid max-w-screen-lg px-6 pb-20">
                    <div className>
                        <p className="mt-8 font-serif text-xl font-bold text-blue-900">Select a date</p>
                        <div className="relative mt-4 w-56">
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                <svg aria-hidden="true" className="h-5 w-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillrule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" cliprule="evenodd" /></svg>
                            </div>
                            <input autofocus="autofocus" max={maxDateString} min={today} onChange={getQueriesData} type="date" className="datepicker-input block w-full rounded-lg border border-emerald-300 bg-emerald-50 p-2.5 pl-10 text-emerald-800 outline-none ring-opacity-30 placeholder:text-emerald-800 focus:ring focus:ring-emerald-300 sm:text-sm" placeholder="Select date" />
                        </div>
                    </div>
                    <div className='mt-4 w-56'>
                        <input type="text" onChange={(event)=>setFormData({...formData,name:event.target.value})} className="block w-full rounded-lg border border-emerald-300 bg-emerald-50 p-2.5 text-emerald-800 outline-none ring-opacity-30 placeholder:text-emerald-800 focus:ring focus:ring-emerald-300 sm:text-sm" placeholder="Enter Name" />
                    </div>
                    {formData.date?
                    <div className>
                    <p className="mt-8 font-serif text-xl font-bold text-blue-900">Select a time</p>
                    <div className="mt-4 grid grid-cols-4 gap-2 lg:max-w-xl">
                        <button type='button' onClick={(event)=>setFormData({...formData,time:event.target.value})} className={`rounded-lg px-4 py-2 font-medium active:scale-95 ${formData.time == "12:00" ? "bg-emerald-700 text-white" : "bg-emerald-100 text-emerald-900"} ${queries.time.includes("12:00") ? "bg-red-100 text-red-900" : ""}`} value="12:00" disabled={queries.time.includes("12:00")}>12:00</button>
                        <button type='button' onClick={(event)=>setFormData({...formData,time:event.target.value})} className={`rounded-lg px-4 py-2 font-medium active:scale-95 ${formData.time == "14:00" ? "bg-emerald-700 text-white" : "bg-emerald-100 text-emerald-900"} ${queries.time.includes("14:00") ? "bg-red-100 text-red-900" : ""}`} value="14:00" disabled={queries.time.includes("14:00")} >14:00</button>
                        <button type='button' onClick={(event)=>setFormData({...formData,time:event.target.value})} className={`rounded-lg px-4 py-2 font-medium active:scale-95 ${formData.time == "09:00" ? "bg-emerald-700 text-white" : "bg-emerald-100 text-emerald-900"} ${queries.time.includes("09:00") ? "bg-red-100 text-red-900" : ""}`} value="09:00" disabled={queries.time.includes("09:00")} >09:00</button>
                        <button type='button' onClick={(event)=>setFormData({...formData,time:event.target.value})} className={`rounded-lg px-4 py-2 font-medium active:scale-95 ${formData.time == "13:00" ? "bg-emerald-700 text-white" : "bg-emerald-100 text-emerald-900"} ${queries.time.includes("13:00") ? "bg-red-100 text-red-900" : ""}`} value="13:00" disabled={queries.time.includes("13:00")} >13:00</button>
                        <button type='button' onClick={(event)=>setFormData({...formData,time:event.target.value})} className={`rounded-lg px-4 py-2 font-medium active:scale-95 ${formData.time == "15:00" ? "bg-emerald-700 text-white" : "bg-emerald-100 text-emerald-900"} ${queries.time.includes("15:00") ? "bg-red-100 text-red-900" : ""}`} value="15:00" disabled={queries.time.includes("15:00")} >15:00</button>
                        <button type='button' onClick={(event)=>setFormData({...formData,time:event.target.value})} className={`rounded-lg px-4 py-2 font-medium active:scale-95 ${formData.time == "16:00" ? "bg-emerald-700 text-white" : "bg-emerald-100 text-emerald-900"} ${queries.time.includes("16:00") ? "bg-red-100 text-red-900" : ""}`} value="16:00" disabled={queries.time.includes("16:00")} >16:00</button>
                        <button type='button' onClick={(event)=>setFormData({...formData,time:event.target.value})} className={`rounded-lg px-4 py-2 font-medium active:scale-95 ${formData.time == "17:00" ? "bg-emerald-700 text-white" : "bg-emerald-100 text-emerald-900"} ${queries.time.includes("17:00") ? "bg-red-100 text-red-900" : ""}`} value="17:00" disabled={queries.time.includes("17:00")} >17:00</button>
                        <button type='button' onClick={(event)=>setFormData({...formData,time:event.target.value})} className={`rounded-lg px-4 py-2 font-medium active:scale-95 ${formData.time == "11:00" ? "bg-emerald-700 text-white" : "bg-emerald-100 text-emerald-900"} ${queries.time.includes("11:00") ? "bg-red-100 text-red-900" : ""}`} value="11:00" disabled={queries.time.includes("11:00")} >11 :00</button>
                    </div>
                </div>
                :null}
                    <button type='button' onClick={BookAppointment} className="mt-8 w-56 rounded-full border-8 border-emerald-500 bg-emerald-600 px-10 py-4 text-lg font-bold text-white transition hover:translate-y-1">Book Now</button>
                </div>
            </div>
        </>
    )
}

export default UserPrivateRoute(Home)
