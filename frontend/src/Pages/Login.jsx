import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiUrl } from "../utilities/url";
import logo from "../assets/logo_1.png"

const Login = () => {
    const[loading,setLoading] = useState(false)
    const [errorSms,setErrorSms] = useState("")
   
const navigate = useNavigate()
const handelLogin = (e)=>{
    setLoading(true)
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
            setLoading(false)
           return  setErrorSms(data.massage)
           
        }
    
        if(data.token){
            sessionStorage.setItem('token', data.token)
            navigate("/admin/allusers")
            
        }
    
    
    })
    
    
}

    return (
        <div className="content-container  mt-6">
                <img src={logo} alt="" className="mx-auto w-16 h-16"/>
            <h2 className="text-center text-4xl mt-4">Welcome to You man Profile Service !</h2>

            <form onSubmit={handelLogin} className="mt-4 max-w-3xl border grid grid-cols-1 p-8 items-center  gap-6 mx-auto">
                    <input  type="email" name="email"  placeholder="Enter Your Email " className="border-2 border-black"/>
                    <input type="password" name="password"  placeholder="Enter Your Password" className="border-2 border-black"/>
                    <input disabled={loading} type="submit" name=""  value="Login" className="border-2 p-2 bg-black text-white cursor-pointer hover:bg-slate-900 disabled:bg-slate-600"/>

            </form>

            <h2 className="text-center text-red-600">{errorSms && errorSms}</h2>
        </div>
    );
};

export default Login;