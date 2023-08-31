import { useRouter } from 'next/router';
import React,{useState,useEffect} from 'react'
import PrivateRoute from '../../PrivateRoute/PrivateRoute';
import Link from 'next/link';

const Url = () => {
    const router = useRouter();
    const [contact,setContact]=useState()
    
    const deleteContacts = (id) => {
        fetch("/api/property/delete-property", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: id }),
        }).then(() => {
            getCategotyData()
            alert("delete Succfully")
        });
    }; 
    
    // const statsContacts = (data,status) => {
    //     fetch("/api/property/status-property", {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify({ data: data , status: status }),
    //     }).then(() => {
    //         getCategotyData()
    //         alert("delete Succfully")
    //     });
    // };

    const getCategotyData = ()=>{
        fetch("/api/property/get-property", { 
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }).then((res) => {return res.json()}
          ).then((res) => setContact(res))
    }

    useEffect(() => {
        getCategotyData();
    }, [])
    return (
        <>
           <div className="container mx-auto px-4 sm:px-8">
            <div className="py-8">
                <div className='px-2 flex justify-between'>
                    <h2 className="text-2xl font-semibold leading-tight">Property</h2>
                    <Link href="/admin/property/add" ><h2 className="cursor-pointer text-lg font-semibold  leading-tight bg-gradient-to-r from-[#4216AA] to-[#F8AF0B] hover:bg-gradient-to-l shadow-md text-white rounded-full shadow px-5 py-1">Add Property</h2></Link>
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
                                        location
                                    </th>
                                    <th className="text-center px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                        Price
                                    </th>
                                    <th className="text-center px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                        Price Scure feet
                                    </th>
                                    <th className="text-center px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                        duration
                                    </th>
                                    <th className="text-center px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                    Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {!contact?"loading....":contact.map((data,index)=>{
                                    return <tr key={index+1}>
                                    <td className="px-5 py-5 bg-white text-sm">
                                        {data.ProjectName}  
                                    </td>
                                    <td className="text-center px-5 py-5 bg-white text-sm">
                                        {data.Sector}  
                                    </td>
                                    <td className="text-center px-5 py-5 bg-white text-sm">
                                        {data.PriceStartsfrom}
                                    </td>
                                    <td className="text-center px-5 py-5 bg-white text-sm">
                                        {data.PricePerSQFT}
                                    </td>
                                    <td className="text-center px-5 py-5 bg-white text-sm">
                                        {data.AvailableFrom}
                                    </td>
                                    <td className="text-center px-5 py-5 bg-white text-sm">
                                        <span onClick={()=>router.push(`/admin/property/${data.id}`)} className="mr-3 relative inline-block px-3 py-1 font-semibold text-yellow-900 leading-tight">
                                            <span aria-hidden className="absolute inset-0 bg-yellow-200 opacity-50 rounded-full" />
                                            <span className="relative">Update</span>
                                        </span>
                                        <span onClick={()=>deleteContacts(data.id)} className={`relative inline-block px-3 py-1 font-semibold text-red-800 leading-tight`}>
                                            <span aria-hidden className={`absolute inset-0 bg-red-200 opacity-50 rounded-full`} />
                                            <span className="relative">Delete</span>
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

export default PrivateRoute(Url)