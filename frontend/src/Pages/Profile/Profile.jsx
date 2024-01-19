import logo from "../../assets/logo_1.png";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { FaFacebook, FaPhone } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa6";
import { MdArrowForwardIos } from "react-icons/md";
import { IoArrowRedoSharp } from "react-icons/io5";
import { useEffect, useRef, useState } from "react";
import SmsSender from "../../components/SmsSender";
import { apiUrl } from "../../utilities/url";
import VCardComponent from "./VCardComponent";


const Profile = ({ user }) => {

  
  const [sendSms, setSendSms] = useState(false);
  const btnref = useRef(null)
  const {
    _id,user_path,user_name,position,office,email,tel,work_tel,status,social_links,createAt,img
  } = user;
  const [activeProfile,setActiveProfile] = useState(false)
  const LinkedIN =social_links&& (social_links.find(link => link.web_name === "linkedIn")?.link)
  const Fb_Link = social_links&& (social_links.find(link => link.web_name === "facebook")?.link)

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
  
  const openLinkedInPage = () => {
    window.open(LinkedIN, '_blank');
  };
  return (
    <section className="content-container bg-white profile overflow-hidden relative">
      <div className="card_section">
          <a href="https://store.youman.one/product/catalyst" target="_blank"  className="px-3 py-1 ml-5 mt-2 md:mt-8 inline-block text-xs cursor-pointer bg-white rounded-xl border-black border-2 shadow-2xl">Get it</a>
        <div className="max-w-[400px] relative mx-auto md:py-10 p-8 md:p-0 z-10">
          <img
            src={img}
            alt={`${user_name}'s profile image`}
            className="md:w-96 md:h-96 w-48 h-48  object-cover mx-auto rounded-full border-4 border-black"
          />
          <img
            src={logo}
            alt="you man logo"
            className="md:w-28 md:h-28 w-14 h-14  object-cover absolute md:right-5 right-[25%] top-[65%] md:top-[65%]"
          />
        </div>
      </div>

      <section className="md:max-h-[440px]  max-h-[400px]">
        <div
          className={`grid grid-cols-1 justify-items-center   space-y-4  ${
            sendSms && "hidden transition-all duration-75"
          }`}
        >
          <h1 className="md:text-6xl text-3xl font-semibold  leading-10">
            {user_name}
          </h1>
          <h3 className="md:text-3xl text-2xl font-bold "> {position}</h3>
          <div className="grid grid-cols-2 gap-2 my-4">
          {/* <button
            ref={btnref}
              className="bg-black font-serif text-sm uppercase text-white md:px-10 px-6 py-2 md:py-3 rounded-3xl border-white border-4 shadow-lg"
              onClick={downloadVcard}
            >
              save contact
            </button> */}
            <VCardComponent data={user} className="bg-black font-serif text-sm uppercase text-white md:px-10 px-6 py-2 md:py-3 rounded-3xl border-white border-4 shadow-lg"/>

            <button
              className="bg-black font-serif text-sm uppercase text-white md:px-10 px-6 py-2 md:py-3 rounded-3xl border-white border-4 shadow-lg"
              onClick={() => setSendSms(true)}
            >
              connect
            </button>
          </div>

          <ul className="space-y-6 py-6  md:w-[600px] w-full px-6 text-[1.3rem]">
            <li className="shadow-sm shadow-white flex justify-between items-center ">
              <MdOutlineAlternateEmail /> {email} <MdArrowForwardIos />
            </li>
            <li className=" shadow-sm  shadow-white flex justify-between items-baseline relative">
              <FaPhone />
              <span className="after:content-['(work)'] after:absolute after:top-2 after:right-8 after:text-[12px] ">
                { work_tel || "***************"}
              </span>{" "}
              <MdArrowForwardIos />
            </li>
            <li className=" shadow-sm shadow-white flex justify-between items-center ">
              <FaPhone />
              {tel} <MdArrowForwardIos />
            </li>
            <li onClick={openLinkedInPage} className="shadow-sm  shadow-white grid grid-cols-[1fr_3fr_1fr]   items-center cursor-pointer  p-2 ">
              {LinkedIN ? <FaLinkedinIn className="text-[#0A66C2]"/> : <FaFacebook className="text-[#0A66C2]"/>} <span className="text-[12px] text-[#0A66C2] font-semibold">{LinkedIN || Fb_Link}</span>{" "}
              <IoArrowRedoSharp className="text-[#0A66C2] justify-self-end" />
            </li>
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
