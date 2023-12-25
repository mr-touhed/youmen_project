import logo from "../../assets/logo_1.png";
import VCardComponent from "./VCardComponent";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { FaPhone } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa6";
import { MdArrowForwardIos } from "react-icons/md";
import { IoArrowRedoSharp } from "react-icons/io5";
import { useEffect, useState } from "react";
import SmsSender from "../../components/SmsSender";

const Profile = ({ user }) => {
  const [sendSms, setSendSms] = useState(false);
  const {
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

  const vCardData = {
    fullName: name,
    officeName: organization,
    position: position,
    workNumber: work_tel,
    tel: tel,
    email: email,
    linkedin: LinkedIn_url,
  };
  const pageTitle = name || "user"
  useEffect(()=>{
    document.title = `youman|${pageTitle}`
  })

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

      <section className="md:max-h-[440px] max-h-[403px]">
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
            <VCardComponent
              data={vCardData}
              className="bg-black uppercase font-serif  text-sm text-white md:px-10 md:py-3 px-6 py-2 rounded-3xl border-white border-4 shadow-lg"
            />

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
            <li className="shadow-sm flex justify-between items-center   p-2 ">
              <FaLinkedinIn /> <span className="text-[12px]">{LinkedIn_url}</span>{" "}
              <IoArrowRedoSharp />
            </li>
          </ul>

          
        </div>

        <SmsSender active={sendSms} setSendSms={setSendSms} />
      </section>


      {status === "inactive" && (
            <div className="z-20 absolute top-0 left-0  w-full min-h-[100%] bg-[rgba(18,17,17,0.93)] flex justify-center items-center px-4">
              <h2 className="rotate-12 text-2xl text-slate-300 text-center">
                Please Subscribe your Account
              </h2>
            </div>
          )}
    </section>
  );
};

export default Profile;
