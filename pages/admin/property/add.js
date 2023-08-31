/* eslint-disable @next/next/no-sync-scripts */
import React, { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import Head from "next/head";
import PrivateRoute from "../../../PrivateRoute/PrivateRoute";

const AddContact = () => {
  const router = useRouter();
  const ReactQuill = useMemo(() => dynamic(() => import('react-quill'), { ssr: false }),[]);
  const [aboutProject,setAboutProject]=useState()
  const [basicAmenities,setBasicAmenities]=useState([])
  const [projectPhotos,setProjectPhotos]=useState([])
  const [formData, setFormData] = useState({
    ProjectName:'', //done
    Sector:'', //done
    ProjectBrochure:'', //done
    PriceStartsfrom:'', //done
    PricePerSQFT:'', //done
    Nooffloors:'', //done
    AvailableFrom:'', //done
    requirement:'', //done
    type:'', //done
  });

  const BasicAmenitiesHandler =(event)=>{
    if (basicAmenities.includes(event.target.value)) {
      const indexOfAmenity = basicAmenities.indexOf(event.target.value);
      const updatedAmenities = [...basicAmenities];
      updatedAmenities.splice(indexOfAmenity, 1);
      setBasicAmenities(updatedAmenities);
    } else {
      setBasicAmenities([...basicAmenities, event.target.value]);
    }
  } 

  const openupWidget = (collmnName) => {
    cloudinary.createUploadWidget(
      {
        cloud_name: "fatimaola",
        upload_preset: "ufa6exrd",
        multiple: true, // Allow multiple image uploads
      },
      (error, results) => {
        if (!error && results && results.event === "success") {
          // Assuming results.info contains the uploaded image information
          const imageUrl = results.info.url;
          // Update projectPhotos with the new image URL
          if(collmnName=="ProjectBrochure"){
            setFormData({...formData,[collmnName]:imageUrl});
          }else{ setProjectPhotos((prevPhotos) => [...prevPhotos, imageUrl]); }
        }
      }
    ).open();
  };

  const onChangeHandler = (event) => {
    setFormData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("/api/property/add-property", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({...formData,projectPhotos:projectPhotos,Amenities:basicAmenities,AboutProject:aboutProject}),
    }).then(() => router.push("/admin")); 
  };

  return (
    <>
      <Head>
          <script
          src='https://upload-widget.cloudinary.com/global/all.js'
          type='text/javascript'
          />
      </Head>
      <div className="max-w-screen mx-auto">
        <div className="container mx-auto">
          <div className="p-4">
            <div className="w-full mx-auto md:w-[100%]">
              <form
                onSubmit={handleSubmit}
                className="bg-white shadow-xl py-8 rounded-lg p-5"
              >
                <h1 className="font-bold text-3xl mb-8 text-center">
                  Property Add
                </h1>
                <input type="hidden" name="remember" defaultValue="true" />
                <div className="mt-8 gap-x-4 grid grid-cols-3">
                  <div className="mb-4">
                    <label htmlfor="name" className="block mb-2 text-sm font-medium text-gray-900 ">Project Name</label>
                    <input type="text" id="name" name='ProjectName' onChange={onChangeHandler} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="Project Name" required />
                  </div>
                  <div className="mb-4">
                    <label htmlfor="name" className="block mb-2 text-sm font-medium text-gray-900 ">Sector</label>
                    <input type="text" id="name" name='Sector' onChange={onChangeHandler} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="Sector" required />
                  </div>
                  <div className="mb-4">
                    <label htmlfor="phone" className="block mb-2 text-sm font-medium text-gray-900 ">Price Start from</label>
                    <input type="text" id="number" name="PriceStartsfrom" onChange={onChangeHandler} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="Price Start from" required />
                  </div>
                  <div className="mb-4">
                    <label htmlfor="Nooffloors" className="block mb-2 text-sm font-medium text-gray-900 ">No Of Floors</label>
                    <input type="text" id="number" name='Nooffloors' onChange={onChangeHandler} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="No Of Floors" required />
                  </div>
                  <div className="mb-4">
                    <label htmlfor="PricePerSQFT" className="block mb-2 text-sm font-medium text-gray-900 ">Price Per SQFT?</label>
                    <input type="text" id="number" name='PricePerSQFT' onChange={onChangeHandler} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="No Of Floors" required />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="category"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Select an option
                    </label>
                    <select
                      id="AvailableFrom"
                      name="AvailableFrom"
                      onChange={onChangeHandler}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      required
                    >
                      <option value="">Choose</option>
                      <option value="2024">2024</option>
                      <option value="2025">2025</option>
                      <option value="2026">2026</option>
                      <option value="2027">2027</option>
                      <option value="2028">2028</option>
                      <option value="2029">2029</option>
                      <option value="2030">2030</option>
                    </select>
                  </div>
                  <div className="mb-4 flex gap-5">
                    <div className="flex gap-1">
                        <input type="radio" id="name" name='type' value="residential" onChange={onChangeHandler} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 " required />
                        <label htmlfor="specialization" className="block text-sm font-medium text-gray-900 ">Residential</label>
                    </div>
                    <div className="flex gap-1">
                        <input type="radio" id="name" name='type' value="commercial" onChange={onChangeHandler} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 " required />
                        <label htmlfor="specialization" className="block text-sm font-medium text-gray-900 ">commercial</label>
                    </div>
                  </div>
                  
                  <div className="mb-4 flex gap-5">
                    <div className="flex gap-1">
                        <input type="radio" id="name" name='requirement' value="buy" onChange={onChangeHandler} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 " required />
                        <label htmlfor="specialization" className="block text-sm font-medium text-gray-900 ">Sell</label>
                    </div>
                    <div className="flex gap-1">
                        <input type="radio" id="name" name='requirement' value="lease" onChange={onChangeHandler} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 " required />
                        <label htmlfor="specialization" className="block text-sm font-medium text-gray-900 ">Lease</label>
                    </div>
                  </div>
                  <div className='mb-5'>
                      <span className="font-bold">ProjectPhotos &nbsp; &nbsp;&nbsp;</span>
                      <button
                      className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                      type='button'
                      onClick={()=>openupWidget("ProjectPhotos")}
                      >
                      Upload Image
                      </button>
                  </div>
                  <div className='mb-5'>
                      <span className="font-bold">ProjectBrochure &nbsp;</span>
                      <button
                      className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                      type='button'
                      onClick={()=>openupWidget("ProjectBrochure")}
                      >
                     Pdf Upload
                      </button>
                  </div>
                </div>
                  <label htmlfor="specialization" className="block text-sm font-medium text-gray-900 ">BasicAmenities</label>
                  <div className="mb-4 grid grid-cols-3">
                    <div className="flex gap-1">
                        <input type="checkbox" id="name" name='requirement' value="Swimming Pool" onChange={BasicAmenitiesHandler} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 " />
                        <label htmlfor="specialization" className="block text-sm font-medium text-gray-900 ">Swimming Pool</label>
                    </div>
                    <div className="flex gap-1">
                        <input type="checkbox" id="name" name='requirement' value="RainWater Harvesting" onChange={BasicAmenitiesHandler} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 " />
                        <label htmlfor="specialization" className="block text-sm font-medium text-gray-900 ">Rain Water Harvesting</label>
                    </div>
                    <div className="flex gap-1">
                        <input type="checkbox" id="name" name='requirement' value="24x7 Security" onChange={BasicAmenitiesHandler} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 " />
                        <label htmlfor="specialization" className="block text-sm font-medium text-gray-900 ">24x7 Security</label>
                    </div>
                    <div className="flex gap-1">
                        <input type="checkbox" id="name" name='requirement' value="Club House" onChange={BasicAmenitiesHandler} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 " />
                        <label htmlfor="specialization" className="block text-sm font-medium text-gray-900 ">Club House</label>
                    </div>
                    <div className="flex gap-1">
                        <input type="checkbox" id="name" name='requirement' value="24/7 Water Supply" onChange={BasicAmenitiesHandler} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 " />
                        <label htmlfor="specialization" className="block text-sm font-medium text-gray-900 ">24/7 Water Supply</label>
                    </div>
                    <div className="flex gap-1">
                        <input type="checkbox" id="name" name='requirement' value="Lift(s)" onChange={BasicAmenitiesHandler} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 " />
                        <label htmlfor="specialization" className="block text-sm font-medium text-gray-900 ">Lift(s)</label>
                    </div> 
                    <div className="flex gap-1">
                        <input type="checkbox" id="name" name='requirement' value="Car Parking" onChange={BasicAmenitiesHandler} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 " />
                        <label htmlfor="specialization" className="block text-sm font-medium text-gray-900 ">Car Parking</label>
                    </div> 
                    <div className="flex gap-1">
                        <input type="checkbox" id="name" name='requirement' value="Internal Street Lights" onChange={BasicAmenitiesHandler} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 " />
                        <label htmlfor="specialization" className="block text-sm font-medium text-gray-900 ">Internal Street Lights</label>
                    </div> 
                    <div className="flex gap-1">
                        <input type="checkbox" id="name" name='requirement' value="Fire Fighting Systems" onChange={BasicAmenitiesHandler} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 " />
                        <label htmlfor="specialization" className="block text-sm font-medium text-gray-900 ">Fire Fighting Systems</label>
                    </div> 
                  </div> 
                  <div className="mb-6">
                    <label htmlFor="message" className="block mb-2 text-xl font-medium text-gray-900">Project Description
                    </label>
                    {!ReactQuill?null:
                    <ReactQuill theme="snow" value={aboutProject} onChange={setAboutProject} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-orange-500 focus:border-orange-500 " placeholder="Write your project description here..."/>      
                    }
                  </div>
                  <div className="text-center">
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

export default PrivateRoute(AddContact);
