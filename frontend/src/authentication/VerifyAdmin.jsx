import { useEffect, useState } from "react";
import { apiUrl } from "../utilities/url";
import { useNavigate } from "react-router-dom";


const VerifyAdmin = ({children}) => {
    const [admin,setAdmin] = useState(false)
   
    const [loading,setLoading] = useState(false)
    const navigate = useNavigate()
    useEffect(()=>{
        setLoading(true)
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
                
            }{
                setLoading(false)
            }
        })


        
    },[])
 
    if(loading){
        return ;
    }
    if(!admin ){
       return  navigate("/")
    }
    if(admin){
        return children
    }
};

export default VerifyAdmin;