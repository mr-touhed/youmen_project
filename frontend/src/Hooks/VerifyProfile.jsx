import { useParams } from "react-router-dom";
import { apiUrl } from "../utilities/url";
import React, { useEffect, useState } from "react";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import Loading from "../components/Loading";

const VerifyProfile = ({children}) => {
    const {id,path} = useParams()
    const userPath = `${id}/${path}`
    const [loading,setLoading] = useState(false)
    const [user,setUser] = useState({})
    const [error,setError] = useState(false)
    const [show,setShow] = useState(true)
    
    useEffect(() =>{

        setLoading(true)
        fetch(`${apiUrl}/user/profile?path=${userPath}`)
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
                console.log("verify data.......",data)
            setLoading(false)
        })

        setTimeout(()=>{
            setShow(false)
        },1900)
    },[userPath])


    if(show || loading){
        return <Loading/>
    }

    if(error){
        return <ErrorPage/>
    }

    // Pass the user data to children components
  return React.Children.map(children, (child) =>
  React.cloneElement(child, { user }))
};

export default VerifyProfile;