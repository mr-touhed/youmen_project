import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiUrl } from "../utilities/url";


const Login = () => {
    const [errorSms,setErrorSms] = useState("")
   
const navigate = useNavigate()
const handelLogin = (e)=>{
    e.preventDefault()
    const email = e.target.email.value;
    const password = e.target.password.value;

    const logInUser = {email,password}
    // TODO: get login info and send server for authentication 

    fetch(`${apiUrl}/admin/login`,{
        method:"POST",
        headers:{
            "content-type": "application/json"
        },
        body:JSON.stringify(logInUser)
    })
    .then( res => res.json())
    .then( data => {
        
       
        if(!data.result){
           return  setErrorSms(data.massage)
        }
    
        if(data.token){
            sessionStorage.setItem('token', data.token)
            navigate("/admin/allusers")
            
        }
    
    
    })
    
    
}

    return (
        <div className="content-container  ">
            <h2 className="text-center text-6xl">Welcome to Intro Service !</h2>

            <form onSubmit={handelLogin} className="mt-11 max-w-3xl border grid grid-cols-1 p-8 items-center  gap-6 mx-auto">
                    <input  type="email" name="email"  placeholder="Enter Your Email " className="border-2 border-black"/>
                    <input type="password" name="password"  placeholder="Enter Your Password" className="border-2 border-black"/>
                    <input type="submit" name=""  value="Login" className="border-2 p-2 bg-black text-white cursor-pointer hover:bg-slate-900"/>

            </form>

            <h2 className="text-center text-red-600">{errorSms && errorSms}</h2>
        </div>
    );
};

export default Login;