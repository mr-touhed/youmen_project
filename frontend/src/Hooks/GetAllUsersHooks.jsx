import { useEffect, useState } from "react";
import { apiUrl } from "../utilities/url";


const GetAllUsersHooks = () => {
    // ignore next line react-hooks/rules-of-hooks 
    const [loading,setLoading] = useState(false)
    const [allUsers,setallUsers] = useState([])
        useEffect(()=>{
            setLoading(true)
            fetch(`${apiUrl}/allusers`,{
                method:"GET",
                headers:{
                    authorization: `bearer ${sessionStorage.getItem("token")}`
                }
            })
            .then(res => {
                setLoading(false)
               return res.json()
                
                
            })
            .then(data => {
                
                console.log(data)
                setallUsers(data)
                setLoading(false)
                
                })
                .catch(err =>{
                    console.log(err)
                })

        },[])

            return {loading,allUsers}

};

export default GetAllUsersHooks;