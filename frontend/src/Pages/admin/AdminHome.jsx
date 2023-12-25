import { Link, Outlet, useNavigate } from "react-router-dom";
import logo from "../../assets/logo_1.png"
const AdminHome = () => {
    const navigate = useNavigate()
    const handelsignOut = () =>{
        sessionStorage.clear()
        navigate("/")


    }

    return (
        <div className="min-h-screen p-6 ">
            <nav className="flex bg-slate-800 p-4 text-white"> 

                <div className="flex-1">
                       <img src={logo} alt="" className="w-12 h-12"/>
                    </div>

                    <ul className="flex items-center gap-6">
                        <li><Link to="/admin/adduser" className="bg-slate-400 px-6 py-2 rounded-sm">Add user</Link></li>
                        <li><Link to="/admin/allusers" className="bg-slate-400 px-6 py-2 rounded-sm">All user</Link></li>
                        <li className="bg-red-400 px-6 py-2 rounded-sm cursor-pointer" onClick={handelsignOut}>Log out</li>
                        
                        
                    </ul>           
                
            </nav>



            <section className="content-container">
                    <Outlet/>
            </section>
        </div>
    );
};

export default AdminHome;