import { useEffect, useState } from "react";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/dist/sweetalert2.css';
import { apiUrl } from "../../utilities/url";
import loadingImg from "/Spinner-1s-200px_1.svg?url"
import { IoCloseSharp } from "react-icons/io5";
import { FaLinkedin } from "react-icons/fa";
// CommonJS
// const swal = require('sweetalert2')

const userData = {email:"",office:"",position:"",status:"active",img:"",tel:"",user_name:"",user_path:"",work_tel:"",social_links:[], createAt:new Date()}

const AddUser = () => {
    const [errorSms,seterrorSms]= useState('')
    const [loading,setLoading] = useState(false)
    const [img,setimg] = useState("")
    const [perfectImg,setPerfectImg] = useState(true)
    
    const [socialLinks,setSocialLinks] = useState([{id:1,link:"",web_name:""}])
    const [newUser,setNewuser] = useState(userData)
useEffect(()=>{
    setNewuser(state => ({...state,social_links: socialLinks}))
},[socialLinks])
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

        const change_field_value = (e) =>{
                const property = e.target.name;
                const property_value = e.target.value.trim()

            setNewuser(state => ({...state,[property] : property_value}))
            
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
        // const userPath = form.user_path.value;
        // const name = form.name.value;
        // const position = form.position.value;
        // const organization = form.office.value;
        // const email = form.email.value;
        // const tel = form.tel.value;
        // const work_tel = form.work_tel.value;
        const image = (form.image.files[0]);
        // const LinkedIn_url = form.LinkedIn_url.value;
        // const status = form.status.value;
        
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
                                <input onChange={(e) =>change_field_value(e)} type="text" name="user_path" id="" className="border-2 w-full p-2 bg-slate-50" placeholder="profile path" pattern="\d{4}/[A-Z]{4}/[a-zA-Z0-9\-]*" required/>
                                <small className="text-[10px]">XXXX/ABCD(any four latter)/abcd (15 charecter)</small>
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
                                <input onChange={(e) =>change_field_value(e)} type="tel" name="tel" id="" className="border-2 w-full p-2 bg-slate-50" placeholder="" required/>
                            </div>
                            <div>
                            <small>Number (Work) <span className="text-[9px]">(optional)</span></small>
                                <input onChange={(e) =>change_field_value(e)} type="tel" name="work_tel" id="" className="border-2 w-full p-2 bg-slate-50" placeholder="" />
                            </div>
                    </div>

                    <div className="grid grid-cols-2 justify-between gap-6">
                        {/* social link div  */}
                                <div className="border-2 mt-6 p-2">
                                <p className="text-center">Social Links</p>
                                    {
                                       socialLinks&& socialLinks.map((link,i) => <div key={i}>
                                           
                                                <div className="flex items-center">
                                                <select onChange={(e)=> change_Social_Name(e,link.id)} className="text-[12px] bg-slate-300  border border-r-0 py-3 " name="web_name" id="cars" value={link.web_name}>
                                                
                                        <option className="text-[10px] " value="linkedIn ">linkedIn</option>
                                        <option className="text-[10px]" value="facebook">facebook</option>
                                        <option className="text-[10px]" value="others">others</option>
                                        
                                        </select>
                                                <input onChange={(e)=> socialUrl(e,link.id)} type="url" name="link" id="" className="border border-l-0 w-full py-[9px] bg-slate-50" placeholder="" value={link.link}/>
                                                {
                                                    (socialLinks.length > 1 && i !==0 ) && <IoCloseSharp onClick={() =>removeLinkField(i)}/>
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

                                        <select onChange={(e) =>change_field_value(e)} name="status" id="cars" value={newUser.status}>
                                        <option value="active">active</option>
                                        <option value="inactive">inactive</option>
                                        
                                        </select>
                            </div>
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