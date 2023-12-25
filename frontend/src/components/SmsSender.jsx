import { FaWindowClose } from "react-icons/fa";
import { IoSend } from "react-icons/io5";
const SmsSender = ({active,setSendSms}) => {
        console.log(active)

    const handelClose = () =>{
        
        setSendSms(false)
    }
    return (
        <section className={`md:min-h-[440px] min-h-[403px] ${active ?"active-sms" :"sms-section "}`}>
                    
                    <div className="grid grid-cols-1 space-y-3 max-w-xl mx-auto pb-8 px-6">
                    <div className="flex justify-between items-center ">
                    <h2 className="text-sm">Send a Massage</h2>
                    <FaWindowClose className="w-6 h-6 cursor-pointer" onClick={handelClose} />
                    </div>
                            <input type="text" name="" id="" className="border p-2 bg-slate-50" placeholder="name"/>
                            <input type="tel" name="" id="" className="border p-2 bg-slate-50" placeholder="mobile number"/>
                            <textarea name="" id="" cols="15" rows="6" className="border p-2 bg-slate-50" placeholder="massage"></textarea>
                            <button type="submit"  className="px-6 flex items-center gap-2 py-2 bg-black text-white max-w-sm mx-auto cursor-pointer rounded-md hover:bg-slate-700" >Send Massage <IoSend className="w-4 h-4"/></button>

                    </div>
                </section>
    );
};

export default SmsSender;