import { useEffect, useState } from "react";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/dist/sweetalert2.css';
import { apiUrl } from "../../utilities/url";
import loadingImg from "/Spinner-1s-200px_1.svg?url"
import { IoCloseSharp } from "react-icons/io5";
import { v4 as uuidv4 } from 'uuid';
import DynamicSocialMedia from "../../Hooks/DynamicSocialMedia";
// CommonJS
// const swal = require('sweetalert2')

const userData = {email:"",office:"",position:"",status:"active",img:"",tel:"",user_name:"",user_path:"",work_tel:"",address:"",social_links:[], createAt:new Date()}

const AddUser = () => {
   
    const [errorSms,seterrorSms]= useState('')
    const [loading,setLoading] = useState(false)
    const [img,setimg] = useState("")
    const [perfectImg,setPerfectImg] = useState(true)
    const {sections,addSection,handleInputChange,handleSelectChange,removeSection} = DynamicSocialMedia()

    const [newUser,setNewuser] = useState(userData)
useEffect(()=>{
    setNewuser(state => ({...state,social_links: sections}))
},[sections])
    
  
        const change_field_value = (e) =>{
                const property = e.target.name;
                const property_value = e.target.value.trim()

            setNewuser(state => ({...state,[property] : property_value}))
            
        }

    
   

    // convert image 64base 
    const convertbase64 = (img) =>{
        const reader = new FileReader()

        reader.onload = () =>{
            
            setimg(reader.result.toString())
        }
        reader.readAsDataURL(img)
        
    }

    
    const checkImage_Size= (image) =>{
        const file = image;
         // Check file size
      const maxSizeKB = 700;
      if (file.size / 1024 > maxSizeKB) {
        setPerfectImg(false)
        seterrorSms(`Image size exceeds the maximum allowed size of ${maxSizeKB} KB.`)
        alert(`Image size exceeds the maximum allowed size of ${maxSizeKB} KB.`);
        return 
      }

        // Check image dimensions
        const maxWidth = 700;
        const maxHeight = 700;
        const img = new Image();
        img.src = URL.createObjectURL(file);
  
        img.onload = function () {
          if (img.width > maxWidth || img.height > maxHeight) {
            seterrorSms(`Image dimensions should be at most ${maxWidth}x${maxHeight} pixels.`)
            alert(`Image dimensions should be at most ${maxWidth}x${maxHeight} pixels.`);
            return setPerfectImg(false)
          }


    }
    setPerfectImg(true)
    return image;
}



// handel add user store to database 
    const handelAddUser = async(e) =>{

       
        seterrorSms("")
        e.preventDefault()
        const form = e.target;
       
        const image = (form.image.files[0]);
      
        
            if(!perfectImg){
               return seterrorSms("")
            }

           
            if(perfectImg){
                setLoading(true)
                try {
                    const formData = new FormData();
                        formData.append('image', image);

                        const response = await fetch(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_APP_IMGbb_secret}`, {
                            method: 'POST',
                            body: formData,
                        });

                        const data = await response.json();
                        
                        if(data.data.url){
                           const user = {...newUser}
                           user.img = data.data.url;
                            
                            fetch(`${apiUrl}/adduser`,{
                                method:"POST",
                                headers:{
                                    authorization: `bearer ${sessionStorage.getItem("token")}`,
                                    "content-type": "application/json"
                                },
                                body: JSON.stringify(user)
                            }).then( res => res.json()).then(data => {
                                if(!data.result){
                                    setLoading(false)
                                    
                                    seterrorSms(data.massage)
                                    Swal.fire({
                                        icon: "error",
                                        title: "Oops...",
                                        text: data.massage,
                                        
                                      });
                                }else{
                                    setLoading(false)
                                    Swal.fire({
                                        
                                        icon: "success",
                                        title: "Your work has been saved",
                                        showConfirmButton: false,
                                        timer: 1500
                                      });

                                      form.reset()
                                      setimg("")
                                }
                                
                            }).catch(err => seterrorSms(err.massage))
                            
                            
                            
                        }
                  } catch (error) {
                    console.error('Error uploading image:', error);
                    seterrorSms(error.result)
                  }

                
            }
       
            
      
        
            
        
           
    }


  
    const uploadImg = async(e) =>{
        seterrorSms("")
     const   image =  e.target.files[0]
        const check = await checkImage_Size(image)
        
            convertbase64(image)
        
        
    }
    return (
        <>
        <h2 className="text-2xl text-center">{errorSms}</h2>
           
        <div className="flex justify-center items-center mt-16 content-container">
                
            <form onSubmit={handelAddUser} className=" border p-6 w-full">
                    <div className="grid grid-cols-2 justify-between items-center gap-6">
                            {/* user path div  */}
                            <div>
                                <small>user path</small>
                                <input onChange={(e) =>change_field_value(e)} type="text" name="user_path" id="" className="border-2 w-full p-2 bg-slate-50" placeholder="profile path" pattern="\d{4}/[a-zA-Z0-9\-]*" required/>
                                <small className="text-[10px]">XXXX/abcd (15 charecter)</small>
                            </div>
                                {/* image div  */}
                            <div className="upload-file-container">
                                {
                                   img && <img src={img} alt=""  className="w-20 h-20 rounded-full object-cover"/> 
                                }
                                
                                <input type="file" name="image" id="" className="" required accept="image/png, image/jpeg" onChange={uploadImg}/>
                                
                            
                                <br/>
                                <small>image will be 700 x 700 and file size maximum 700kb:</small>
                            </div>
                    </div>
                                {/* name div  */}
                        <div>
                                <small>Name</small>
                                <input onChange={(e) =>change_field_value(e)} type="text" name="user_name" id="" className="border-2 w-full p-2 bg-slate-50" placeholder="" required/>
                            </div>
                                {/* organization div  */}
                            <div>
                                <small>Organization</small>
                                <input onChange={(e) =>change_field_value(e)} type="text" name="office" id="" className="border-2 w-full p-2 bg-slate-50" placeholder="" required/>
                            </div>
                            {/* position div  */}
                            <div>
                                <small>Position <span className="text-[9px]">(optional)</span></small>
                                <input onChange={(e) =>change_field_value(e)} type="text" name="position" id="" className="border-2 w-full p-2 bg-slate-50" placeholder="" />
                            </div>
                            
                            {/* email div  */}
                            <div>
                                <small>Email</small>
                                <input onChange={(e) =>change_field_value(e)} type="email" name="email" id="" className="border-2 w-full p-2 bg-slate-50" placeholder="" required/>
                            </div>
                                    {/* number div  */}
                            <div className="grid grid-cols-2 justify-between gap-6">
                            <div>
                                <small>Number</small>
                                <input onChange={(e) =>change_field_value(e)} type="tel" name="tel" id="" className="border-2 w-full p-2 bg-slate-50" placeholder="" defaultValue="+880" required/>
                            </div>
                            <div>
                            <small>Number (Work) <span className="text-[9px]">(optional)</span></small>
                                <input onChange={(e) =>change_field_value(e)} type="tel" name="work_tel" id="" className="border-2 w-full p-2 bg-slate-50" placeholder="" defaultValue="+880"/>
                            </div>
                    </div>

                    <div className="grid grid-cols-2 justify-between gap-6">
                            <div>
                            <div>
                            <small>address Office/home <span className="text-[9px]">(optional)</span></small>
                                <input onChange={(e) =>change_field_value(e)} type="tel" name="address" id="" className="border-2 w-full p-2 bg-slate-50" placeholder="" />
                            </div>
                            <div className="flex justify-center self-start mt-6 p-4 items-center bg-green-100">
                                    <label htmlFor="status">status:</label>

                                        <select onChange={(e) =>change_field_value(e)} name="status" id="cars" value={newUser.status}>
                                        <option value="active">active</option>
                                        <option value="inactive">inactive</option>
                                        
                                        </select>
                            </div>
                            </div>
                        {/* social link div  */}
                        <div className="mt-6">
                                <p className="text-center">social links</p>
                                    {
                                       sections&& sections.map((section,i) =>  <div key={i}>
                                        
                                            <small>{section.web_name}</small>
                                                <div className="flex items-center">
                                                <select value={section.web_name} onChange={(e) => handleSelectChange(section.id, e.target.value)} className="text-[12px] bg-slate-200 border border-r-0 py-3 " name="web_name"  >
                                                <option className="text-[10px]" >choose</option>
                                        <option className="text-[10px]" value="linkedIn">linkedIn</option>
                                        <option className="text-[10px]" value="facebook">facebook</option>
                                        <option className="text-[10px]" value="instagram">instagram</option>
                                        <option className="text-[10px]" value="others">others</option>
                                        
                                        </select>
                                                <input  value={section.link} onChange={(e) => handleInputChange(section.id, e.target.value)} type="url" name="link" id="" className="border border-l-0 w-full py-[9px] bg-slate-50" placeholder="" required/>
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
                                    {/* status div */}
                            
                    </div>

                             
                                <div className="flex justify-center mt-8">
                            
                                <button type="submit" name="" id="" className="border px-10 py-2 text-white bg-slate-900 cursor-pointer  " disabled={loading || !perfectImg}>{!loading ? "Add New User" :  <><img src={loadingImg} alt="" className="w-8 h-8 inline"/>Loading...</>} </button>
                            </div>
                            <p className="text-center text-red-600">{errorSms && errorSms}</p>
            </form>
        </div>
        </>
    );
};

export default AddUser;