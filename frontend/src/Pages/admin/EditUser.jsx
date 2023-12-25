import { useEffect, useState } from "react";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/dist/sweetalert2.css';
import { apiUrl } from "../../utilities/url";
import loadingImg from "/Spinner-1s-200px_1.svg?url"
import { useLocation, useParams } from "react-router-dom";
// CommonJS
// const swal = require('sweetalert2')

const EditUser = () => {
    const params = useParams()
    const [errorSms,seterrorSms]= useState('')
    const [loading,setLoading] = useState(false)
  
    const [user,setUser] = useState({})
   
    const {userPath,name,position,organization,email,tel,work_tel,LinkedIn_url,status,date,_id} = user
    const urlParams = new URLSearchParams(window.location.search);
    const path = urlParams.get('param1')
    useEffect(() =>{

        setLoading(true)
        fetch(`${apiUrl}/user?path=${path}`,{
            headers:{
                authorization: `bearer ${sessionStorage.getItem("token")}`
            }
        })
        .then(res => {
            
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
    },[params._id,path])

// handel add user store to database 
    const handelEdit = (e) =>{

        console.log("click")
        seterrorSms("")
        e.preventDefault()
        const form = e.target;
        const userPath = form.user_path.value;
        const name = form.name.value;
        const position = form.position.value;
        const organization = form.office.value;
        const email = form.email.value;
        const tel = form.tel.value;
        const work_tel = form.work_tel.value;
        const LinkedIn_url = form.LinkedIn_url.value;
        const status = form.status.value;
        
        const updateData = {_id,userPath,name,position,organization,email,tel,work_tel,LinkedIn_url,status}

        fetch(`${apiUrl}/update`,{
            method:"PATCH",
            headers:{
                authorization: `bearer ${sessionStorage.getItem("token")}`,
                "content-type": "application/json"
            },
            body:JSON.stringify(updateData)
        })
        .then( res => res.json())
        .then(data => {
            if(data.result){
                Swal.fire(
                    'Good job!',
                    data.massage,
                    'success'
                  )
            }
        })
      
       
            
        
           
    }



  
    return (
        <>
        <h2 className="text-2xl text-center">{errorSms}</h2>
           
        <div className="flex justify-center items-center mt-16 content-container">
                
            <form onSubmit={handelEdit} className=" border p-6 w-full">
                    <div className="grid grid-cols-2 justify-between items-center gap-6">
                            <div>
                                <small>user path</small>
                                <input defaultValue={userPath} type="text" name="user_path" id="" className="border-2 w-full p-2 bg-slate-50" placeholder="10000/ARTK/username" pattern="\d{4}/[A-Z]{4}/[a-zA-Z0-9\-]*" required/>
                                <small>catalistnumber/ARTK/jhon-doe or jhondoe</small>
                            </div>
                            <div className="upload-file-container">
                               --
                            </div>
                    </div>
                        <div>
                                <small>Name</small>
                                <input defaultValue={name} type="text" name="name" id="" className="border-2 w-full p-2 bg-slate-50" placeholder="" required/>
                            </div>
                            <div>
                                <small>Organization</small>
                                <input defaultValue={organization} type="text" name="office" id="" className="border-2 w-full p-2 bg-slate-50" placeholder="" required/>
                            </div>
                            <div>
                                <small>Position</small>
                                <input defaultValue={position} type="text" name="position" id="" className="border-2 w-full p-2 bg-slate-50" placeholder="" required/>
                            </div>
                            
                            
                            <div>
                                <small>Email</small>
                                <input defaultValue={email} type="email" name="email" id="" className="border-2 w-full p-2 bg-slate-50" placeholder="" required/>
                            </div>

                            <div className="grid grid-cols-2 justify-between gap-6">
                            <div>
                                <small>Number</small>
                                <input defaultValue={tel} type="tel" name="tel" id="" className="border-2 w-full p-2 bg-slate-50" placeholder="" required/>
                            </div>
                            <div>
                            <small>Number (Work) </small>
                                <input defaultValue={work_tel} type="tel" name="work_tel" id="" className="border-2 w-full p-2 bg-slate-50" placeholder="" required/>
                            </div>
                    </div>

                    <div className="grid grid-cols-2 justify-between gap-6">
                                <div>
                                <small>LinkedIn Url</small>
                                <input defaultValue={LinkedIn_url} type="url" name="LinkedIn_url" id="" className="border-2 w-full p-2 bg-slate-50" placeholder="" required/>
                            </div>
                            <div className="flex justify-center items-center bg-green-100">
                                    <label htmlFor="status">status:</label>
                               
                                       {
                                        status &&  <select name="status" id="cars" defaultValue={status}>
                                        <option value="active">active</option>
                                        <option value="inactive">inactive</option>
                                        
                                        </select>
                                       }
                            </div>
                    </div>

                             
                                <div className="flex justify-center mt-8">
                            
                                <button type="submit" name="" id="" className="border px-10 py-2 text-white bg-slate-900 cursor-pointer " disabled={loading}>{!loading ? "Update User" :  <><img src={loadingImg} alt="" className="w-8 h-8 inline"/>Loading...</>} </button>
                            </div>
                            <p className="text-center text-red-600">{errorSms && errorSms}</p>
            </form>
        </div>
        </>
    );
};

export default EditUser;