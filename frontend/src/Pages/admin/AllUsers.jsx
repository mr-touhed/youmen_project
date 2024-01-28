
import {  useEffect, useState } from "react";
import GetAllUsersHooks from "../../Hooks/GetAllUsersHooks";
import Swal from 'sweetalert2'
import { Link } from "react-router-dom";
import { FcCancel,FcSupport,FcShare    } from "react-icons/fc";
import { apiUrl } from "../../utilities/url";


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
    const {loading,allUsers =[]} = GetAllUsersHooks()
    const [showInfo,setShowInfo] = useState([...allUsers] || [])



    useEffect(() => {
        if (!loading) {
          setShowInfo([...allUsers]);
        }
      }, [loading, allUsers]);


    if(loading){
        return "Loading...."
    }

    const handelSearch = (e) =>{
      const inputValue = e.target.value;
      const filterUser = allUsers.filter(user => user.userPath?.split("/")[0] == inputValue)
      
      if(!inputValue){
        setShowInfo([...allUsers])
        
      }else{
        setShowInfo(filterUser)
      }
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


      const handelRemove = (_id) =>{
          
          Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
              console.log(_id)
              fetch(`${apiUrl}/delete?id=${_id}`,{
                method:"DELETE"
              })
              .then(res=> res.json())
              .then(data => {
                  if(data.result){
                    const update_users = showInfo.filter(user => user._id !== _id)
                    setShowInfo(update_users)
                    Swal.fire(
                      'Deleted!',
                      'Your file has been deleted.',
                      'success'
                    )
                  }else{
                    Swal.fire({
                      icon: 'error',
                      title: 'Oops...',
                      text: 'Something went wrong!',
                      
                    })
                  }
              })

              
            }
          })

      }
        
    return (
        <>
        <div className="content-container h-8 bg-slate-500 mt-6 flex justify-between items-center" >
                <div className="ml-6">
                    {/* other oparetion  */}

                    <input onChange={handelSearch} type="search" name="" id="" placeholder="search by catalyst number" className="px-2 focus:outline-0 bg-slate-100 focus:bg-white"/>
                </div>


                <div className="p-2">

                <label htmlFor="status" className="text-white">status:</label>

                    <select name="status" id="cars" onChange={filterUser} defaultValue="all">
                    <option value="all">all users</option>
                    <option value="active">active</option>
                    <option value="inactive">inactive</option>

                    </select>
                </div>
        </div>
        {
            showInfo && 
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
                                const {user_name,status,_id,createAt,user_path} = user
                                let catalist;
                                let name;
                                if(user_path){
                                  catalist = user_path.split("/")[0]
                                  name= user_path.split("/")[1]
                                  
                                }
                                 
                                
                               
                              return  (<tr className={`border-b dark:border-neutral-500 ${index%2 == 0 ? "bg-slate-100": ""} hover:bg-slate-200`} key={_id}>
                          <td className="whitespace-nowrap px-6 py-4 font-medium">{index + 1}</td>
                          <td className="whitespace-nowrap px-6 py-4">{readableTime(createAt)}</td>
                          <td className="whitespace-nowrap px-6 py-4">{catalist}</td>
                          <td className="whitespace-nowrap px-6 py-4">{user_name}</td>
                          <td className="whitespace-nowrap px-6 py-4">{status}</td>
                          <td className="whitespace-nowrap px-6 py-4 flex gap-4">
                                    <Link  to={ `/admin/user/${_id}/edit`} ><FcSupport title="edit"  className="w-6 h-6 text-emerald-900 hover:text-emerald-400"/></Link>
                                    <Link to={`/profile/${user_path}`} target="_blank"><FcShare title="view"   className="w-6 h-6 text-red-900 hover:text-red-400" /></Link>
                                    <button onClick={()=>handelRemove(_id)}><FcCancel title="delete" className="w-6 h-6"/></button>
                            
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