import { useParams } from "react-router-dom";
import { apiUrl } from "../utilities/url";
import React, { useEffect, useState } from "react";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import ProfileLoader from "../components/ProfileLoader";

const VerifyProfile = ({children}) => {
    const [loading,setLoading] = useState(false)
    const [user,setUser] = useState({})
    const [error,setError] = useState(false)
    const {id,path,artk} = useParams()
    
    useEffect(() =>{

        setLoading(true)
        fetch(`${apiUrl}/user?path=${id}/${artk}/${path}`)
        .then(res => {
            console.log(res , "......................................")
            if(!res.ok){
                setLoading(false)
                setError(true)
                throw new Error ({result:false, })
            }
             return res.json()
        })
        .then(data => {
                if(!data.result){
                    setError(true)
                    setLoading(false)
                }
                setUser(data.user)
           
            setLoading(false)
        })
    },[id,path])


    if(loading){
        return <ProfileLoader/>
    }

    if(error){
        return <ErrorPage/>
    }

    // Pass the user data to children components
  return React.Children.map(children, (child) =>
  React.cloneElement(child, { user }))
};

export default VerifyProfile;