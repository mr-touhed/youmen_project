import { useEffect, useState } from "react";
import { apiUrl } from "../utilities/url";


const GetAllUsersHooks = () => {
   
    const [loading,setLoading] = useState(false)
    const [allUsers,setallUsers] = useState([])
   
    const [error,setError] = useState(false)
        useEffect(()=>{
            setLoading(true)
            fetch(`${apiUrl}/allusers`,{
                method:"GET",
                headers:{
                    authorization: `bearer ${sessionStorage.getItem("token")}`
                }
            })
            .then(res => res.json())
            .then(data => {
                
                
                setallUsers(data)
                setLoading(false)
                
                })
                .catch(err =>{
                    console.log(err)
                    setLoading(false)
                    setError(true)
                })

        },[])
        
            return {loading,allUsers,error}

};

export default GetAllUsersHooks;