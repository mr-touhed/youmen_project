
import {  useEffect, useState } from "react";
import GetAllUsersHooks from "../../Hooks/GetAllUsersHooks";
import { FiEdit } from "react-icons/fi";
import { GrView } from "react-icons/gr";
import { Link } from "react-router-dom";
const readableTime = (time) =>{

  const inputDateString = time || new Date();

// Create a Date object from the input string
const date = new Date(inputDateString);

// Get the components of the date
const year = date.getUTCFullYear();
const month = (date.getUTCMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
const day = date.getUTCDate().toString().padStart(2, '0');
// const hours = date.getUTCHours().toString().padStart(2, '0');
// const minutes = date.getUTCMinutes().toString().padStart(2, '0');

const formattedDate = `${month}/${day}/${year}`;

return formattedDate; // Output: 12/14/2023 10:24



}

const AllUsers = () => {
    const {loading,allUsers} = GetAllUsersHooks()
    const [showInfo,setShowInfo] = useState([...allUsers])



    useEffect(() => {
        if (!loading) {
          setShowInfo([...allUsers]);
        }
      }, [loading, allUsers]);


    if(loading){
        return "Loading...."
    }

    
    
        
        
        const filterUser = (e) => {
            const filter = (e.target.value)
            if(filter === "all"){
                 setShowInfo(allUsers)
            }
            if(filter === "active"){
                const setusers =  allUsers.filter(user => user.status == filter)
                
                 setShowInfo(setusers)
            }else if(filter === "inactive"){
                const setusers =  allUsers.filter(user => user.status == filter)
                
                 setShowInfo(setusers)
            }else{
                setShowInfo(allUsers)
            }
        }

        
    return (
        <>
        <div className="content-container h-8 bg-slate-500 mt-6 flex justify-between items-center" >
                <div>
                    {/* other oparetion  */}

                    
                </div>


                <div className="p-2">

                <label htmlFor="status" className="text-white">status:</label>

                    <select name="status" id="cars" onChange={filterUser} defaultValue="all">
                    <option value="all">All User</option>
                    <option value="active">active</option>
                    <option value="inactive">inactive</option>

                    </select>
                </div>
        </div>
        {
            true && 
            <div className="flex flex-col content-container border-l-2 border-r-2">
              <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                  <div className="overflow-hidden">
                    <table className="min-w-full text-left text-sm font-light">
                      <thead className="border-b font-medium dark:border-neutral-500">
                        <tr>
                          <th scope="col" className="px-6 py-4">#</th>
                          <th scope="col" className="px-6 py-4">Date of entry</th>
                          <th scope="col" className="px-6 py-4">Catalyst Number</th>
                          <th scope="col" className="px-6 py-4">Name</th>
                          <th scope="col" className="px-6 py-4">Status(Active/inactive)</th>
                          <th scope="col" className="px-6 py-4">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                            showInfo.map((user,index) =>{
                                const {name,status,userName,_id,create,userPath} = user
                                let catalist;
                                let url;
                                if(userPath){
                                  catalist = userPath.split("/")[0]
                                  url = userPath.split("/")[2]
                                }
                                 
                                
                                console.log(user)
                              return  (<tr className="border-b dark:border-neutral-500" key={_id}>
                          <td className="whitespace-nowrap px-6 py-4 font-medium">{index + 1}</td>
                          <td className="whitespace-nowrap px-6 py-4">{readableTime(create)}</td>
                          <td className="whitespace-nowrap px-6 py-4">{catalist}</td>
                          <td className="whitespace-nowrap px-6 py-4">{name}</td>
                          <td className="whitespace-nowrap px-6 py-4">{status}</td>
                          <td className="whitespace-nowrap px-6 py-4 flex gap-4">
                                    <Link  to={ `/admin/user/${_id}/edit?param1=${userPath}`}><FiEdit className="w-6 h-6 text-emerald-900 hover:text-emerald-400"/></Link>
                                    <Link to={`/profile/${catalist}/artk/${url}`} target="_blank"><GrView className="w-6 h-6 text-red-900 hover:text-red-400" /></Link>
                            
                            </td>
                        </tr>)
                                
                                
                                
                            
                            })
                        }
                        
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
        }
        
        </>
    );
};

export default AllUsers;