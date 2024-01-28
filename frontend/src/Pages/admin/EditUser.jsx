import { useEffect, useState } from "react";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/dist/sweetalert2.css';
import { apiUrl } from "../../utilities/url";
import loadingImg from "/Spinner-1s-200px_1.svg?url"
import { useParams } from "react-router-dom";
import { IoCloseSharp } from "react-icons/io5";
import DynamicSocialMedia from "../../Hooks/DynamicSocialMedia";
// CommonJS
// const swal = require('sweetalert2')

const EditUser = () => {

    const [errorSms,seterrorSms]= useState('')
    const [loading,setLoading] = useState(false)
    const [error,setError] = useState(false)
    const [user,setUser] = useState({})
    const {email,office,position,status,tel,user_name,user_path,work_tel,address} = user
    const {sections,setSections,addSection,handleInputChange,handleSelectChange,removeSection} = DynamicSocialMedia()
    const {_id} = useParams()
    console.log(_id)
    useEffect(() =>{

        setLoading(true)
        fetch(`${apiUrl}/user?id=${_id}`,{
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
                setSections(data.user?.social_links)
               
            setLoading(false)
        })
    },[_id])






























    const handelEdit = (e) =>{

        seterrorSms("")
        e.preventDefault()
        const form = e.target;
        const user_path = form.user_path.value;
        const name = form.name.value;
        const position = form.position.value;
        const office = form.office.value;
        const email = form.email.value;
        const tel = form.tel.value;
        const work_tel = form.work_tel.value;
        const status = form.status.value;
        const address = form.address.value;
        const updateData = {id:user._id,user_path,name,position,office,email,tel,work_tel,status,socialLinks:sections,address}

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
      
       console.log(updateData)
            
        
           
    }



  
    return (
        <>
        <h2 className="text-2xl text-center">{errorSms}</h2>
           
        <div className="flex justify-center items-center mt-16 content-container">
                
            <form onSubmit={handelEdit} className=" border p-6 w-full">
                    <div className="grid grid-cols-2 justify-between items-center gap-6">
                            <div>
                                <small>user path</small>
                                <input defaultValue={user_path} type="text" name="user_path" id="" className="border-2 w-full p-2 bg-slate-50" placeholder="0000/username" pattern="\d{4}/[a-zA-Z0-9\-]*" required/>
                                <small className="text-[10px]">XXXX/abcd (15 charecter)</small>
                            </div>
                            <div className="upload-file-container">
                               
                            </div>
                    </div>
                        <div>
                                <small>Name</small>
                                <input defaultValue={user_name} type="text" name="name" id="" className="border-2 w-full p-2 bg-slate-50" placeholder="" required/>
                            </div>
                            <div>
                                <small>Organization</small>
                                <input defaultValue={office} type="text" name="office" id="" className="border-2 w-full p-2 bg-slate-50" placeholder="" required/>
                            </div>
                            <div>
                                <small>Position <span className="text-[9px]">(optional)</span></small>
                                <input defaultValue={position} type="text" name="position" id="" className="border-2 w-full p-2 bg-slate-50" placeholder="" />
                            </div>
                            
                            
                            <div>
                                <small>Email</small>
                                <input defaultValue={email} type="email" name="email" id="" className="border-2 w-full p-2 bg-slate-50" placeholder="" required/>
                            </div>

                            <div className="grid grid-cols-2 justify-between gap-6">
                            <div>
                                <small>Number</small>
                                <input defaultValue={tel } type="tel" name="tel" id="" className="border-2 w-full p-2 bg-slate-50" placeholder="" required/>
                            </div>
                            <div>
                            <small>Number (Work) <span className="text-[9px]">(optional)</span></small>
                                <input defaultValue={work_tel } placeholder="with country code" type="tel" name="work_tel" id="" className="border-2 w-full p-2 bg-slate-50"  />
                            </div>
                    </div>

                    <div className="grid grid-cols-2 justify-between gap-6">
                       
                                    {/* status div */}

                            <div>
                            <div>
                            <small>address Office/home <span className="text-[9px]">(optional)</span></small>
                                <input defaultValue={address}  type="tel" name="address" id="" className="border-2 w-full p-2 bg-slate-50" placeholder="" />
                            </div>
                            <div className="flex justify-center self-start mt-6 p-4 items-center bg-green-100">
                                    <label htmlFor="status">status:</label>

                                        {
                                            status && <select  name="status" id="cars" defaultValue={status}>
                                            <option value="active">active</option>
                                            <option value="inactive">inactive</option>
                                            
                                            </select>
                                        }
                            </div>
                            </div>

                             {/* social link div  */}
                             <div>
                                <p>social links</p>
                                    {
                                       sections&& sections.map((section,i) =>  <div key={i}>
                                        
                                            <small>{section.web_name}</small>
                                                <div className="flex items-center">
                                                <select value={section.web_name} onChange={(e) => handleSelectChange(section.id, e.target.value)} className="text-[12px] bg-slate-200 border border-r-0 py-3 " name="web_name" id="cars" >
                                         
                                        <option className="text-[10px]" value="linkedIn">linkedIn</option>
                                        <option className="text-[10px]" value="facebook">facebook</option>
                                        <option className="text-[10px]" value="instagram">instagram</option>
                                        <option className="text-[10px]" value="others">others</option>
                                        
                                        </select>
                                                <input  value={section.link} onChange={(e) => handleInputChange(section.id, e.target.value)} type="url" name="link" id="" className="border border-l-0 w-full py-[9px] bg-slate-50" required />
                                                {
                                                    (sections.length > 1 && i !==0) && <IoCloseSharp className="w-6 h-6 cursor-pointer" onClick={() => removeSection(section.id)}/>
                                                }
                                                </div>
                                            </div>)
                                    }
                                    {
                                        sections.length < 4 && <span  className="text-[10px] cursor-pointer inline-block p-1 bg-slate-400 rounded-sm text-black mt-3" onClick={addSection}>add more</span>
                                    }
                            </div>
                    </div>

                             
                                <div className="flex justify-center mt-8">
                            
                                <button type="submit"  className="border px-10 py-2 text-white bg-slate-900 cursor-pointer " disabled={loading}>{!loading ? "Update User" :  <><img src={loadingImg} alt="" className="w-8 h-8 inline"/>Loading...</>} </button>
                            </div>
                            <p className="text-center text-red-600">{errorSms && errorSms}</p>
            </form>
        </div>
        </>
    );
};

export default EditUser;