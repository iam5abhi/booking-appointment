import React,{useState,useEffect} from 'react'
import PrivateRoute from '../../../PrivateRoute/PrivateRoute';
import UpdateUrl from '../../../components/Admin/Url/UpdateUrl';
import AddSecondUrl from '../../../components/Admin/Url/AddSecondUrl';
import UpdateSecondUrl from '../../../components/Admin/Url/UpdateSecondUrl';

const Index = () => {
    const [queries,setQueries]=useState()
    const [secondUrl,setSecondUrl]=useState()
    const [addSecondOpen,setAddSecondOpen]=useState(false)
    const [updateSecondOpen,setUpdateSecondOpen]=useState(false)
    const [updateOpen,setUpdateOpen]=useState(false)
    const [Id,setId]=useState('')
    
    const UpdateHandler =(id)=>{
        setId(id)
        setUpdateOpen(true)
    }

    const UpdateSecondHandler =(id)=>{
        setId(id)
        setUpdateSecondOpen(true)
    }
    
    const getQueriesData = ()=>{
        fetch("/api/messageSendUrl/get-url", { 
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }).then((res) => {return res.json()}
          ).then((res) => setQueries(res))
    }

    const getSecondData = ()=>{
        fetch("/api/messageSendUrl/get-url-second", { 
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }).then((res) => {return res.json()}
          ).then((res) => setSecondUrl(res))
    }

    useEffect(() => {
        getQueriesData();
        getSecondData();
    }, [])
    return (
        <>
           <div className="container mx-auto px-4 sm:px-8">
            <div className="pt-8">
                <div className='px-2 flex justify-between'>
                    <h2 className="text-2xl font-semibold leading-tight">First Url</h2>
                </div>
                <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                    <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
                        <table className="min-w-full m leading-normal ">
                            <thead>
                                <tr>
                                    <th className=" px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                       Sr
                                    </th>
                                    <th className="text-center px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                    Url
                                    </th>
                                    <th className="text-center px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                    Date
                                    </th>
                                   
                                    <th className="text-center px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                        Actions
                                    </th> 
                                </tr>
                            </thead>
                            <tbody>
                                {!queries?"loading....":queries.map((data,index)=>{
                                    return <tr key={index+1}>
                                    <td className="px-5 py-5 bg-white text-sm">
                                         {index+1}. 
                                    </td>
                                    <td className="text-center px-5 py-5 bg-white text-blue-500 text-sm">
                                        <a href={data.firstUrl} target='_blank' >firsturl link</a> 
                                    </td>
                                    <td className="text-center px-5 py-5 bg-white text-sm">
                                        {data.xata.createdAt}
                                    </td>  
                                    <td className="text-center px-5 py-5 bg-white text-sm">
                                        <span onClick={()=>UpdateHandler(data.id)} className="mr-3 cursor-pointer relative inline-block px-3 py-1 font-semibold text-yellow-900 leading-tight">
                                            <span aria-hidden className="absolute inset-0 bg-yellow-200 opacity-50 rounded-full" />
                                            <span className="relative">Update</span>
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
        <div className="container mx-auto px-4 sm:px-8">
            <div className="pb-8">
                <div className='px-2 flex justify-between'>
                    <h2 className="text-2xl font-semibold leading-tight">Second Url</h2>
                    <h2 onClick={()=>setAddSecondOpen(true)} className="cursor-pointer text-lg font-semibold  leading-tight bg-gradient-to-r from-[#4216AA] to-[#F8AF0B] hover:bg-gradient-to-l shadow-md text-white rounded-full shadow px-5 py-1">Add Url</h2>
                </div>
                <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                    <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
                        <table className="min-w-full m leading-normal ">
                            <thead>
                                <tr>
                                    <th className=" px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                       Sr
                                    </th>
                                    <th className="text-center px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                    Name
                                    </th>
                                    <th className="text-center px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                    Second Url
                                    </th>
                                    <th className="text-center px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                    Date
                                    </th>
                                   
                                    <th className="text-center px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                        Actions
                                    </th> 
                                </tr>
                            </thead>
                            <tbody>
                                {!secondUrl?"loading....":secondUrl.map((data,index)=>{
                                    return <tr key={index+1}>
                                    <td className="px-5 py-5 bg-white text-sm">
                                         {index+1}. 
                                    </td>
                                    <td className="text-center px-5 py-5 bg-white text-sm">
                                       {data.name}
                                    </td>
                                    <td className="text-center px-5 py-5 bg-white text-blue-500 text-sm">
                                        <a href={data.secondUrl} target='_blank' >secondurl link</a> 
                                    </td>
                                    <td className="text-center px-5 py-5 bg-white text-sm">
                                        {data.xata.createdAt}
                                    </td>  
                                    <td className="text-center px-5 py-5 bg-white text-sm">
                                        <span onClick={()=>UpdateSecondHandler(data.id)} className="mr-3 cursor-pointer relative inline-block px-3 py-1 font-semibold text-yellow-900 leading-tight">
                                            <span aria-hidden className="absolute inset-0 bg-yellow-200 opacity-50 rounded-full" />
                                            <span className="relative">Update</span>
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
        {!updateOpen?null: <UpdateUrl setOpen={setUpdateOpen} open={updateOpen} id={Id} getQueriesData={getQueriesData} />}
        {!addSecondOpen?null: <AddSecondUrl setOpen={setAddSecondOpen} open={addSecondOpen} getQueriesData={getSecondData} />}
        {!updateSecondOpen?null: <UpdateSecondUrl setOpen={setUpdateSecondOpen} open={updateSecondOpen} id={Id} getQueriesData={getSecondData} />}
        </>
    )
}

export default PrivateRoute(Index)