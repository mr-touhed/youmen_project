import { useState } from "react";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/dist/sweetalert2.css';
import { apiUrl } from "../../utilities/url";
import loadingImg from "../../../public/Spinner-1s-200px_1.svg?url"
// CommonJS
// const swal = require('sweetalert2')

const AddUser = () => {
    const [errorSms,seterrorSms]= useState('')
    const [loading,setLoading] = useState(false)
    const [img,setimg] = useState("")
    const [perfectImg,setPerfectImg] = useState(false)
    






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
        const userPath = form.user_path.value;
        const name = form.name.value;
        const position = form.position.value;
        const organization = form.office.value;
        const email = form.email.value;
        const tel = form.tel.value;
        const work_tel = form.work_tel.value;
        const image = (form.image.files[0]);
        const LinkedIn_url = form.LinkedIn_url.value;
        const status = form.status.value;
        
            if(!perfectImg){
               return seterrorSms("")
            }

            console.log(image, ".........")
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
                        console.log('Image uploaded successfully:', data.data.url);
                        if(data.data.url){
                            const newUser = {userPath,name,position,organization,email,img:data.data.url,tel,work_tel,LinkedIn_url,status}

                            fetch(`${apiUrl}/adduser`,{
                                method:"POST",
                                headers:{
                                    authorization: `bearer ${sessionStorage.getItem("token")}`,
                                    "content-type": "application/json"
                                },
                                body: JSON.stringify(newUser)
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


    console.log(perfectImg)
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
                            <div>
                                <small>user path</small>
                                <input type="text" name="user_path" id="" className="border-2 w-full p-2 bg-slate-50" placeholder="10000/ARTK/username" pattern="\d{4}/[A-Z]{4}/[a-zA-Z0-9\-]*" required/>
                                <small>catalistnumber/ARTK/jhon-doe or jhondoe</small>
                            </div>
                            <div className="upload-file-container">
                                {
                                   img && <img src={img} alt=""  className="w-20 h-20 rounded-full object-cover"/> 
                                }
                                
                                <input type="file" name="image" id="" className="" required accept="image/png, image/jpeg" onChange={uploadImg}/>
                                
                            
                                <br/>
                                <small>image will be 700 x 700 and file size maximum 700kb:</small>
                            </div>
                    </div>
                        <div>
                                <small>Name</small>
                                <input type="text" name="name" id="" className="border-2 w-full p-2 bg-slate-50" placeholder="" required/>
                            </div>
                            <div>
                                <small>Organization</small>
                                <input type="text" name="office" id="" className="border-2 w-full p-2 bg-slate-50" placeholder="" required/>
                            </div>
                            <div>
                                <small>Position</small>
                                <input type="text" name="position" id="" className="border-2 w-full p-2 bg-slate-50" placeholder="" required/>
                            </div>
                            
                            
                            <div>
                                <small>Email</small>
                                <input type="email" name="email" id="" className="border-2 w-full p-2 bg-slate-50" placeholder="" required/>
                            </div>

                            <div className="grid grid-cols-2 justify-between gap-6">
                            <div>
                                <small>Number</small>
                                <input type="tel" name="tel" id="" className="border-2 w-full p-2 bg-slate-50" placeholder="" required/>
                            </div>
                            <div>
                            <small>Number (Work) </small>
                                <input type="tel" name="work_tel" id="" className="border-2 w-full p-2 bg-slate-50" placeholder="" required/>
                            </div>
                    </div>

                    <div className="grid grid-cols-2 justify-between gap-6">
                                <div>
                                <small>LinkedIn Url</small>
                                <input type="url" name="LinkedIn_url" id="" className="border-2 w-full p-2 bg-slate-50" placeholder="" required/>
                            </div>
                            <div className="flex justify-center items-center bg-green-100">
                                    <label htmlFor="status">status:</label>

                                        <select name="status" id="cars">
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