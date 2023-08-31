/* eslint-disable @next/next/no-sync-scripts */
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import PrivateRoute from "../../../PrivateRoute/PrivateRoute";
import { getDate, getTime } from '../../../features/getDate'

const UpdateContact = () => {
  const router = useRouter();
  const { id } = router.query;
  const [projects,setProjects]=useState([])
  const [date,setDate]=useState('')
  const [time,setTime]=useState('')
  const [formData, setFormData] = useState({
    ProjectID:'',  
    phoneNumber:'', 
    name:'', 
    email:'', 
    expactedBudget:'',
    budget:'',
    status:'',
    remarks:''
  });

  console.log(date,"date")
  const onChangeHandler = (event) => {
    setFormData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("/api/queryForm/update-query", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({...formData,id:id}),
    }).then(() =>router.push("/admin/queries") );
  };

  const getContactData = () => {
    fetch("/api/queryForm/get-singlequery", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    })
      .then((res) => {
        // Check if the response status is okay (2xx status code)
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json(); // Parse the JSON data
      })
      .then((data) => {
        // Data is the parsed JSON object
        setFormData({
          ProjectID:data.ProjectID, 
          phoneNumber:data.phoneNumber, 
          name:data.name, 
          email:data.email, 
          expactedBudget:data.expactedBudget,
          budget:data.budget,
          status:data.status,
          remarks:data.remarks
        });
        const date = getDate(data.xata.createdAt)
        const Time = getTime(data.xata.createdAt)
        setDate(date)
        setTime(Time)
      })
      .catch((error) => {
        // Handle any errors that occurred during the fetch or JSON parsing
        console.error("Error fetching or parsing data:", error);
        // You can set the category state to a default value or handle the error in another way
      });
  };

  const getProjectData = ()=>{
    fetch("/api/property/get-property", { 
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => {return res.json()}
      ).then((res) => setProjects(res))
  }

  useEffect(() => {
    getProjectData()
    getContactData();
  }, [id]);

  return (
    <>
      <div className="max-w-screen mx-auto">
        <div className="container mx-auto">
          <div className="p-4">
            <div className="w-full mx-auto md:w-[100%]">
            <form
                onSubmit={handleSubmit}
                className="bg-white md:shadow-xl py-6 rounded-lg md:px-10 px-0"
              >
                <h1 className="font-bold text-3xl text-center">
                  Update Queries
                </h1>
               <div className="flex justify-between mt-2 mb-6">
                <h1 className="font-bold">
                  Date : <span className="font-normal">{date}</span>
                  </h1>
                  <h1 className="font-bold">
                  Time : <span className="font-normal">{time}</span>
                  </h1>
               </div>
                <input type="hidden" name="remember" defaultValue="true" />
                <div className="mt-6 grid grid-cols-3 gap-x-5">
                  <div className="mb-4">
                    <label htmlFor="category" className="block mb-2 md:text-sm text-xs font-medium text-gray-900"> Select an option </label>
                    <select id="AvailableFrom" disabled value={formData.ProjectID} name="ProjectID" onChange={onChangeHandler}
                      className="cursor-not-allowed bg-gray-50 border border-gray-300 text-gray-900 md:text-sm text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required >
                      <option value="">Choose Project</option>
                      {projects.map((data)=><option key={data.id} value={data.id}>{data.ProjectName}({data.requirement})</option>)}
                      
                    </select>
                  </div>
                  <div className="mb-4">
                    <label htmlfor="name" className="block mb-2 md:text-sm text-xs font-medium text-gray-900 ">Name</label>
                    <input type="text" id="name" disabled name='name' value={formData.name} onChange={onChangeHandler} className="cursor-not-allowed bg-gray-50 border border-gray-300 text-gray-900 md:text-sm text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="Name" />
                  </div>
                  <div className="mb-4">
                    <label htmlfor="ask_price" className="block mb-2 md:text-sm text-xs font-medium text-gray-900 ">Email</label>
                    <input type="text" id="number" disabled name='email' value={formData.email} onChange={onChangeHandler} className="cursor-not-allowed bg-gray-50 border border-gray-300 text-gray-900 md:text-sm text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="Email" required />
                  </div>
                  <div className="mb-4">
                    <label htmlfor="phone" className="block mb-2 md:text-sm text-xs font-medium text-gray-900 ">Phone</label>
                    <input type="text" id="number" disabled name="phoneNumber" maxLength={10} value={formData.phoneNumber} onChange={onChangeHandler} className="cursor-not-allowed bg-gray-50 border border-gray-300 text-gray-900 md:text-sm text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="Phone" />
                  </div>
                  <div className="mb-4">
                    <label htmlfor="link" className="block mb-2 md:text-sm text-xs font-medium text-gray-900 ">Budget</label>
                    <input type="link" id="ask_price" disabled name='budget' value={formData.budget} onChange={onChangeHandler} className="cursor-not-allowed bg-gray-50 border border-gray-300 text-gray-900 md:text-sm text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="Budget" />
                  </div>
                  <div className="mb-4">
                    <label htmlfor="link" className="block mb-2 md:text-sm text-xs font-medium text-gray-900 ">Expacted Budget</label>
                    <input type="link" id="ask_price" name='expactedBudget' value={formData.expactedBudget} onChange={onChangeHandler} className="bg-gray-50 border border-gray-300 text-gray-900 md:text-sm text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="Expacted Budget" />
                  </div>
                </div>
                <div className="mb-4">
                    <label htmlFor="category" className="block mb-2 md:text-sm text-xs font-medium text-gray-900"> Select an Staus </label>
                    <select id="AvailableFrom" value={formData.status} name="status" onChange={onChangeHandler}
                      className="bg-gray-50 border border-gray-300 text-gray-900 md:text-sm text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" >
                      <option value="">Choose Status</option>
                      <option value="newlead">New Lead</option>
                      <option value="inprogress">InProgress</option>
                      <option value="converted">Converted</option>
                      <option value="rejected">Rejected</option>
                      <option value="onhold">OnHold</option>
                    </select>
                  </div>
                  <div className="mb-4">
                    <label htmlfor="link" className="block mb-2 md:text-sm text-xs font-medium text-gray-900 ">Remarks</label>
                    <textarea type="link" id="ask_price" rows={3}  name='remarks' value={formData.remarks} onChange={onChangeHandler} className="bg-gray-50 border border-gray-300 text-gray-900 md:text-sm text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="Remarks" />
                  </div>
                  <div className="text-center mb-6">
                    <button
                      type="submit"
                      className="rounded-full cursor-pointer flex w-[30%] mx-auto justify-center 
                      rounded-full bg-gradient-to-r from-[#4216AA] to-[#F8AF0B] hover:bg-gradient-to-l shadow-md py-2 px-4 text-lg 
                      font-medium text-white"
                    >
                      Submit
                    </button>
                  </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PrivateRoute(UpdateContact);
