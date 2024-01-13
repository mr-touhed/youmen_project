
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../Pages/Login";
import AddUser from "../Pages/admin/AddUser";
import AdminHome from "../Pages/admin/AdminHome";
import AllUsers from "../Pages/admin/AllUsers";
import Profile from "../Pages/Profile/Profile";
import VerifyProfile from "../Hooks/VerifyProfile";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import EditUser from "../Pages/admin/EditUser";
import VerifyAdmin from "../authentication/VerifyAdmin";


 export const router = createBrowserRouter([
  {
    path:"/profile/:id/artk/:path",
    element: <VerifyProfile>
      <Profile/>
      </VerifyProfile>
   
   
  },
    {
      path: "/",
      element: <App/>,
      children:[
        {
            path:"/",
            element: <Login/>

        },
        
      ]
    },
    {
        path: "/admin",
        element: <VerifyAdmin>
          <AdminHome/>
          </VerifyAdmin>,
        children:[
            {
                path: "adduser",
                element: <VerifyAdmin>
                  <AddUser/>
                </VerifyAdmin>
            },
            {
                path: "allusers",
                element: <VerifyAdmin>
                  <AllUsers/>
                </VerifyAdmin>
            },
            {
              path:"user/:_id/edit",
              element: <VerifyAdmin>
                <EditUser/>
              </VerifyAdmin>
            }
        ]
    },
    {
      path:"*",
      element: <ErrorPage/>
    }
    
  ]);