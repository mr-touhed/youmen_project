import { useEffect, useState } from "react";
import { apiUrl } from "../utilities/url";
import { Navigate, useNavigate } from "react-router-dom";


const VerifyAdmin = ({children}) => {
    const [admin,setAdmin] = useState(true)
    const [loading,setLoading] = useState(true)
    const navigate = useNavigate();
    useEffect(()=>{
        
        fetch(`${apiUrl}/admin/check`,{
            headers:{
                authorization: `bearer ${sessionStorage.getItem("token")}`
            }
        })
        .then( res => res.json())
        .then(data => {
            console.log(data)
            if(data.isAdmin){
                setAdmin(true)
                setLoading(false)
                
            }else{
                setAdmin(false)
                setLoading(false)
                navigate("/", { replace: true })
                
            }
        })

       
    },[navigate])

   
 
    if(loading){
        return null
    }
    if(!admin){
        return <Navigate to="/" replace={true}/>
    }
    
    if(admin){
        return children
    }
};

export default VerifyAdmin;