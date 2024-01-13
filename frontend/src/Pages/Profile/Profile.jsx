import logo from "../../assets/logo_1.png";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { FaPhone } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa6";
import { MdArrowForwardIos } from "react-icons/md";
import { IoArrowRedoSharp } from "react-icons/io5";
import { useEffect, useState } from "react";
import SmsSender from "../../components/SmsSender";
import { apiUrl } from "../../utilities/url";


const Profile = ({ user }) => {
  const [sendSms, setSendSms] = useState(false);
  
  const {
    _id,
    userPath,
    name,
    position,
    organization,
    email,
    img,
    tel,
    work_tel,
    LinkedIn_url,
    status,
    date,
  } = user;
  const [activeProfile,setActiveProfile] = useState(false)

  const downloadVcard = (id) =>{
      
      try {
        // Trigger the download by opening a new window or making a request
        window.open(`${apiUrl}/vcard?id=${id}`);
      } catch (error) {
        console.error('Error downloading vCard:', error);
      }
  }
  const pageTitle = name || "partner"
  useEffect(()=>{
    document.title = `youman | ${pageTitle}`

    setTimeout(() => {
        if(status == "inactive"){
          setActiveProfile(true)
        }
    }, 1000);
  },[status])
  
  const openLinkedInPage = () => {
    window.open(LinkedIn_url, '_blank');
  };
  return (
    <section className="content-container bg-white profile overflow-hidden relative">
      <div className="card_section">
          <a href="https://store.youman.one/product/catalyst" target="_blank"  className="px-3 py-1 ml-5 mt-2 md:mt-8 inline-block text-xs cursor-pointer bg-white rounded-xl border-black border-2 shadow-2xl">Get it</a>
        <div className="max-w-[400px] relative mx-auto md:py-10 p-8 md:p-0 z-10">
          <img
            src={img}
            alt={`${name}'s profile image`}
            className="md:w-96 md:h-96 w-48 h-48  object-cover mx-auto rounded-full border-4 border-black"
          />
          <img
            src={logo}
            alt="you man logo"
            className="md:w-28 md:h-28 w-14 h-14  object-cover absolute md:right-5 right-[25%] top-[65%] md:top-[65%]"
          />
        </div>
      </div>

      <section className="md:max-h-[440px] max-h-[385px]">
        <div
          className={`grid grid-cols-1 justify-items-center   space-y-4  ${
            sendSms && "hidden transition-all duration-75"
          }`}
        >
          <h1 className="md:text-6xl text-3xl font-semibold uppercase leading-10">
            {name}
          </h1>
          <h3 className="md:text-3xl text-lg font-bold "> {position}</h3>
          <div className="grid grid-cols-2 gap-2 my-4">
          <button
              className="bg-black font-serif text-sm uppercase text-white md:px-10 px-6 py-2 md:py-3 rounded-3xl border-white border-4 shadow-lg"
              onClick={() => downloadVcard(_id)}
            >
              contact
            </button>

            <button
              className="bg-black font-serif text-sm uppercase text-white md:px-10 px-6 py-2 md:py-3 rounded-3xl border-white border-4 shadow-lg"
              onClick={() => setSendSms(true)}
            >
              connect
            </button>
          </div>

          <ul className="space-y-6 py-6  md:w-[600px] w-full px-6 text-1xl">
            <li className="shadow-sm flex justify-between items-center ">
              <MdOutlineAlternateEmail /> {email} <MdArrowForwardIos />
            </li>
            <li className=" shadow-sm flex justify-between items-center ">
              <FaPhone />
              <span>
                {work_tel} <span className="text-sm">(work)</span>
              </span>{" "}
              <MdArrowForwardIos />
            </li>
            <li className=" shadow-sm flex justify-between items-center ">
              <FaPhone />
              {tel} <MdArrowForwardIos />
            </li>
            <li onClick={openLinkedInPage} className="shadow-sm flex justify-between items-center cursor-pointer  p-2 ">
              <FaLinkedinIn /> <span className="text-[12px]">{LinkedIn_url}</span>{" "}
              <IoArrowRedoSharp />
            </li>
          </ul>

          
        </div>

        <SmsSender partnerEmail={email} partnerName={name} setSendSms={setSendSms} active={sendSms}/>
      </section>


      {activeProfile && (
            <section className="z-20  absolute top-0 left-0 w-full flex justify-center items-end h-full bg-[rgba(255,255,255,0.71)] ">
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
