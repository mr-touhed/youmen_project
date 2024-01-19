import { useEffect, useState } from "react";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/dist/sweetalert2.css';
import { apiUrl } from "../../utilities/url";
import loadingImg from "/Spinner-1s-200px_1.svg?url"
import { useLocation, useParams } from "react-router-dom";
import { IoCloseSharp } from "react-icons/io5";
// CommonJS
// const swal = require('sweetalert2')

const EditUser = () => {
    const params = useParams()
    const [errorSms,seterrorSms]= useState('')
    const [loading,setLoading] = useState(false)
    const [error,setError] = useState(false)
    const [user,setUser] = useState({})
    const [socialLinks,setSocialLinks] = useState([])
    const {email,office,position,status,tel,user_name,user_path,work_tel} = user
    
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
                setSocialLinks(data.user.social_links)
                setUser(data.user)
           
            setLoading(false)
        })
    },[params._id,path])


    const addmoreLink = () =>{
        const addnewFild = [...socialLinks,{id:socialLinks.length + 1,link:""}]
        setSocialLinks(addnewFild)
    }
    const removeLinkField =(i) =>{
        console.log(i)
        const newLink = [...socialLinks]
        newLink.splice(i,1)
        
        setSocialLinks(newLink)
        console.log(newLink)
        
    }

    const socialUrl = (e,id) =>{
        const value = e.target.value;
        const find_link = socialLinks.find(link => link.id === id)
        const other_link = socialLinks.filter(link => link.id !== id)
        if(find_link){
            find_link[e.target.name] =  value
            const update_links =  [...other_link,find_link]
            setSocialLinks(update_links)
        }else{
            alert("somethis wrong")
        }
        
}
const change_Social_Name = (e,id) =>{
    const value = e.target.value;
    const find_link = socialLinks.find(link => link.id === id)
    find_link.web_name = value
   
}   


// handel add user store to database 
    const handelEdit = (e) =>{

        console.log("click")
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
        
        const updateData = {id:user._id,user_path,name,position,office,email,tel,work_tel,status,socialLinks}

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
                                <input defaultValue={user_path} type="text" name="user_path" id="" className="border-2 w-full p-2 bg-slate-50" placeholder="10000/ARTK/username" pattern="\d{4}/[A-Z]{4}/[a-zA-Z0-9\-]*" required/>
                                <small className="text-[10px]">XXXX/ABCD(any four latter)/abcd (15 charecter)</small>
                            </div>
                            <div className="upload-file-container">
                               --
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
                                <input defaultValue={tel} type="tel" name="tel" id="" className="border-2 w-full p-2 bg-slate-50" placeholder="" required/>
                            </div>
                            <div>
                            <small>Number (Work) <span className="text-[9px]">(optional)</span></small>
                                <input defaultValue={work_tel} type="tel" name="work_tel" id="" className="border-2 w-full p-2 bg-slate-50" placeholder="" />
                            </div>
                    </div>

                    <div className="grid grid-cols-2 justify-between gap-6">
                        {/* social link div  */}
                                <div>
                                    {
                                       socialLinks&& socialLinks.map((link,i) => <div key={i}>
                                            <small>{link.web_name}</small>
                                                <div className="flex items-center">
                                                <select onChange={(e)=> change_Social_Name(e,link.id)} className="text-[12px] bg-slate-200 border border-r-0 py-3 " name="web_name" id="cars" defaultValue={link.web_name}>
                                                
                                        <option className="text-[10px]" value="linkedIn">linkedIn</option>
                                        <option className="text-[10px]" value="facebook">facebook</option>
                                        <option className="text-[10px]" value="others">others</option>
                                        
                                        </select>
                                                <input onChange={(e)=> socialUrl(e,link.id)} type="url" name="link" id="" className="border border-l-0 w-full py-[9px] bg-slate-50" placeholder="" value={link.link}/>
                                                {
                                                    (socialLinks.length > 1 && i !==0) && <IoCloseSharp onClick={() =>removeLinkField(i)}/>
                                                }
                                                </div>
                                            </div>)
                                    }
                                    {
                                        socialLinks.length < 3 && <span  className="text-[10px] cursor-pointer inline-block p-1 bg-slate-400 rounded-sm text-black mt-3" onClick={addmoreLink}>add more</span>
                                    }
                            </div>
                                    {/* status div */}
                            <div className="flex justify-center self-start mt-6 p-4 items-center bg-green-100">
                                    <label htmlFor="status">status:</label>

                                        <select onChange={(e) =>change_field_value(e)} name="status" id="cars" value={status}>
                                        <option value="active">active</option>
                                        <option value="inactive">inactive</option>
                                        
                                        </select>
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