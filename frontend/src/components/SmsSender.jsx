import { FaWindowClose } from "react-icons/fa";
import { IoSend } from "react-icons/io5";
const SmsSender = ({partnerName,partnerEmail,setSendSms,active}) => {
        

    const handelClose = () =>{
        
        setSendSms(false)
    }
    const PartnerNickName = partnerName?.split(" ")[0].toUpperCase() || "---"
    return (
        <section className={`md:min-h-[440px] min-h-[403px] ${active ?"active-sms" :"sms-section "}`}>
                    
                    <div className="grid grid-cols-1 space-y-3 max-w-xl mx-auto pb-8 px-6">
                    <div className="flex justify-between items-center my-6">
                    <h2 className="text-lg">Share Your contact information <br/> with {PartnerNickName} !</h2>
                    <FaWindowClose className="w-6 h-6 cursor-pointer" onClick={handelClose} />
                    </div>
                            <form action="" className="space-y-4">
                            <div className="flex flex-col">
                                <span className="text-[12px] font-thin">Hello {PartnerNickName} ! my name is ...</span>
                            <input type="text" name="name" id="" className="border p-2 bg-slate-50 rounded-md" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[12px] font-thin">You can reach me at..</span>
                            <input type="email" name="email" id="" className="border p-2 bg-slate-50 rounded-md" placeholder="email"/>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[12px] font-thin">And mobile Number.....</span>
                            <input type="tel" name="mobile" id="" className="border p-2 bg-slate-50 rounded-md" placeholder="number with country code"/>
                            </div>
                            <button type="submit"  className="px-6 text-sm flex items-center gap-2 py-2 bg-black text-white max-w-sm mx-auto cursor-pointer rounded-md hover:bg-slate-700" >Send Massage <IoSend className="w-4 h-4"/></button>
                            </form>

                    </div>
                </section>
    );
};

export default SmsSender;