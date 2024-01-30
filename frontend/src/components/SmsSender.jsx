import { useState } from "react";
import { FaWindowClose } from "react-icons/fa";
import { IoSend } from "react-icons/io5";
import { apiUrl } from "../utilities/url";
import Swal from "sweetalert2"
const SmsSender = ({partnerName,partnerEmail,setSendSms,active}) => {
    const [loading,setloading] = useState(false)
    const Toast = Swal.mixin({
        toast: true,
        position: "bottom-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });
      


    const handelClose = () =>{
        
        setSendSms(false)
    }

const [emailInfo,setEmailInfo] = useState({name:"",email:"",phone:""})

    const getInputEmail = (e) =>{
        setEmailInfo(preState => ({...preState, [e.target.name]:(e.target.value).trim()}))
        
    }


    const sendEmail =async (e) =>{
        const mailData = {...emailInfo,sendTo:partnerEmail,partner:partnerName}
        e.preventDefault()
        setloading(true)
        const res = await fetch(`${apiUrl}/email`,{
            method:"POST",
            headers:{
                "content-type":"application/json"
            },
            body:JSON.stringify(mailData)
        })
        const data = await res.json()

       
        if(data.result){
            Toast.fire({
                icon: "success",
                title: "Sending  Email successfully"
              });
              setloading(false)
            e.target.reset();
        }else{
            setloading(false)
            Toast.fire({
                icon: "error",
                title: "Something went wrong"
              });
              console.log(data)
        }
    }
    const PartnerNickName = partnerName?.split(" ")[0].toUpperCase() || "---"
    return (
        <section className={`md:max-h-[530px] min-h-[550px] max-h-[550px] ${active ?"active-sms" :"sms-section "}`}>
                    
                    <div className="grid grid-cols-1 space-y-3 max-w-xl mx-auto pb-8 px-6">
                    <div className="flex justify-between items-center my-6">
                    <h2 className="text-lg">Share Your contact information <br/> with {PartnerNickName} !</h2>
                    <FaWindowClose className="w-6 h-6 cursor-pointer" onClick={handelClose} />
                    </div>
                            <form  className="space-y-4" onSubmit={sendEmail}>
                            <div className="flex flex-col">
                                <span className="text-[12px] font-thin">Hello {PartnerNickName} ! my name is ...</span>
                            <input onChange={(e)=>getInputEmail(e)} type="text" name="name" id="" placeholder="your name" className="border p-2 bg-slate-50 rounded-md" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[12px] font-thin">You can reach me at..</span>
                            <input onChange={(e)=>getInputEmail(e)} type="email" name="email" id="" className="border p-2 bg-slate-50 rounded-md" placeholder="email"/>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[12px] font-thin">And mobile Number.....</span>
                            <input onChange={(e)=>getInputEmail(e)} type="tel" name="phone" id="" className="border p-2 bg-slate-50 rounded-md" placeholder="number with country code (+880)"/>
                            </div>
                            <button type="submit"  className="px-6 text-sm flex items-center gap-2 py-2 bg-black text-white max-w-sm mx-auto cursor-pointer rounded-md hover:bg-slate-700" disabled={loading}>Send Massage <IoSend className="w-4 h-4"/></button>
                            </form>

                    </div>
                </section>
    );
};

export default SmsSender;