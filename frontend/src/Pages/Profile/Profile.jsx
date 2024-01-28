import logo from "../../assets/logo_1.png";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { FaPhone } from "react-icons/fa6";
import { MdArrowForwardIos } from "react-icons/md";
import { useEffect, useRef, useState } from "react";
import SmsSender from "../../components/SmsSender";
import VCardComponent from "./VCardComponent";
import { PiInstagramLogoDuotone, PiLinkedinLogoFill } from "react-icons/pi";
import { PiFacebookLogoFill } from "react-icons/pi";
import { PiLinkSimpleFill } from "react-icons/pi";
import { MdAddLocationAlt } from "react-icons/md";
import { HiBuildingOffice2 } from "react-icons/hi2";
const Profile = ({ user }) => {

  console.log(user)
  const [sendSms, setSendSms] = useState(false);
  const {
    _id,address,user_name,position,office,email,tel,work_tel,status,social_links,createAt,img
  } = user;
  const [activeProfile,setActiveProfile] = useState(false)
  console.log(address)
  // const downloadVcard = async() =>{

  //   fetch(`${apiUrl}/vcard?id=${_id}`)
  //   .then( res=> res.json())
  //   .then(data => {
      
     
  //     const vcard =data.vcard


  //     if (vcard){
          
  //       // Create a Blob with the vCard data
  //       const blob =new Blob([vcard], { type: 'text/vcard' });
  //            // Create a download link
  //   const link = document.createElement('a');
  //   link.href = window.URL.createObjectURL(blob);
  //   link.download = `${user_name}_contact.vcf`;

  //   // Trigger a click on the link to initiate the download
  //   link.click();

  //   // Cleanup: remove the link and revoke the Blob URL
  //   window.URL.revokeObjectURL(link.href);

  //     }
      
  //   })
        


      

      

  // }

  const pageTitle = user_name || "partner"
  useEffect(()=>{

    



    document.title = `youman | ${pageTitle}`

    setTimeout(() => {
        if(status == "inactive"){
          setActiveProfile(true)
        }
    }, 1000);
  },[status])
  
  const openLinkedInPage = (link) => {
    window.open(link, '_blank');
  };
  return (
    <section className="content-container bg-white profile overflow-hidden relative ">
      <div className="card_section border-0">
          <a href="https://store.youman.one/product/catalyst" target="_blank"  className="px-3 py-1 ml-5 mt-2 md:mt-8 inline-block text-xs cursor-pointer bg-white rounded-xl border-black border-2 shadow-2xl">Get it</a>
        <div className="max-w-[400px] relative mx-auto md:py-10 p-8 md:p-0 z-10">
          <img
            src={img}
            alt={`${user_name}'s profile image`}
            className="md:w-96 md:h-96 w-48 h-48  object-cover mx-auto rounded-full border-4 border-[#1F1F1F]"
          />
          <img
            src={logo}
            alt="you man logo"
            className="md:w-28 md:h-28 w-14 h-14  object-cover absolute md:right-5 right-[25%] top-[65%] md:top-[65%]"
          />
        </div>
      </div>

      <section className="md:max-h-[520px]  max-h-[500px] px-2">
        <div
          className={` grid grid-cols-1 justify-items-center   space-y-4  ${
            sendSms && "hidden transition-all duration-75"
          }`}
        >
          <h1 className="md:text-6xl text-4xl font-semibold text-center leading-10">
            {user_name}
          </h1>
          <div>
          <h3 className="md:text-3xl text-2xl font-bold text-center"> {position}</h3>
          <p className="md:text-3xl text-2xl font-semibold text-center flex justify-center items-center gap-2 mt-4">{office}<HiBuildingOffice2 className="md:w-8 md:h-8 w-4 h-4 text-slate-300"/></p>
          </div>
          <div className="grid grid-cols-2 gap-2 my-4">
          
            <VCardComponent data={user} className="bg-black font-serif text-sm uppercase text-white md:px-10 px-6 py-2 md:py-3 rounded-3xl border-white border-4 shadow-lg"/>

            <button
              className="bg-black font-serif text-sm uppercase text-white md:px-10 px-6 py-2 md:py-3 rounded-3xl border-white border-4 shadow-lg"
              onClick={() => setSendSms(true)}
            >
              connect
            </button>
          </div>

          <ul className="space-y-6 py-6  md:w-[600px] w-full px-6 md:text-[1.3rem]">
            <li className="shadow-sm shadow-white  md:grid md:grid-cols-[24px_1fr_24px] flex justify-between gap-2 md:gap-6 items-center ">
              <MdOutlineAlternateEmail  className="md:w-6 md:h-6 w-4 h-4"/> <span className="break-words ">{email}</span> <MdArrowForwardIos className="md:w-6 md:h-6 w-4 h-4 text-slate-500"/>
            </li>
          {work_tel && <li className=" shadow-sm  w-full  shadow-white md:grid md:grid-cols-[24px_1fr_24px] flex justify-between gap-6 items-center relative">
            <FaPhone className="md:w-6 md:h-6 w-4 h-4"/>
            <span className=" break-words">
              {work_tel} <span className="md:text-[12px] text-[0.5rem] text-blue-900">(work)</span>
            </span>
            <MdArrowForwardIos className="md:w-6 md:h-6 w-4 h-4 text-slate-500"/>
          </li>}
            <li className=" shadow-sm shadow-white md:grid md:grid-cols-[24px_1fr_24px] flex justify-between gap-6 items-center ">
              <FaPhone className="md:w-6 md:h-6 w-4 h-4"/>
              <span className="">{tel}</span> <MdArrowForwardIos className="md:w-6 md:h-6 w-4 h-4 text-slate-500"/>
            </li>
            <li  className="shadow-sm  shadow-white flex md:gap-12 gap-6 justify-center items-center ">
              {
                social_links && social_links.map(l => {
                 
                    const items =[]
                    if(l.web_name === "linkedIn"){
                      items.push(<a key={l.web_name} onClick={()=> openLinkedInPage(l.link)} title="linkedIn"> <PiLinkedinLogoFill className="w-8 h-8 cursor-pointer"/></a>)
                    }else if (l.web_name === "facebook"){
                        items.push(<a key={l.web_name} onClick={()=> openLinkedInPage(l.link)} title="facebook"> <PiFacebookLogoFill className="w-8 h-8 cursor-pointer"/></a>)
                    }else if (l.web_name === "instagram"){
                      items.push(<a key={l.web_name} onClick={()=> openLinkedInPage(l.link)} title="instagram"> <PiInstagramLogoDuotone className="w-8 h-8 cursor-pointer"/></a>)
                    }                   
                    else if (l.web_name === "others"){
                      items.push(<a key={l.web_name}  onClick={()=> openLinkedInPage(l.link)} title="others"> <PiLinkSimpleFill className="w-8 h-8 cursor-pointer"/></a>)
                    }

                    return items
                })
              }
            </li>
            {address && <li className="max-w-full flex justify-center  items-center gap-3 break-words text-sm">
            <div className="flex items-center gap-4 justify-center ">
            <MdAddLocationAlt className="w-4 h-6 "/>
                <p className="break-words">{address} </p>
            </div>
            </li>}
          </ul>

          
        </div>

        <SmsSender partnerEmail={email} partnerName={user_name} setSendSms={setSendSms} active={sendSms}/>
      </section>


      {activeProfile && (
            <section className="z-20  absolute top-0 left-0 w-full flex justify-center items-center h-full bg-[rgba(255,255,255,0.71)] ">
                    <div className="max-w-[310px] shadow-slate-500 shadow-md text-center space-y-4 bg-[#1b1a1a] rounded-xl p-2 m-3">
                            <div className="border-b-2 border-b-slate-400 p-3 text-white md:space-y-8 space-y-2 mb-3">
                                <h2 className=" text-2xl font-thin  text-red-500 tracking-wide">Membership Expired!</h2>
                                <p className="font-thin text-sm tracking-normal">Your Youman Catalyst membership has expired! Please renew your subscription</p>
                            </div>
                            <a className="text-green-700 font-bold uppercase text-lg tracking-wide" href="https://store.youman.one/product/catalyst" target="_blank">renew</a>
                    </div>
              </section>
          )}
    </section>
    
  
  );
};

export default Profile;
