import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Home from "./pages/home"
import Navbar from "./components/navbar"
import User from "./pages/User"
import Jobapplay from "./pages/Jobapplay"
import Register from "./pages/auth/Register"
import Login from "./pages/auth/Login"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import Search from "./pages/search/Search"
import AdminPost from "./pages/admin/adminPost"
import CompanyProfile from "./pages/admin/companyProfile"
import AdminDashbord from "./pages/admin/admin"
import UserApplayJobs from "./pages/admin/UserApplayJobs"
import AdminNavbar from "./pages/admin/navbar/Navbar"
import Stair from "./components/stairs"

function App() {
const queryClient = new QueryClient()
const router = createBrowserRouter([
  {
   "path":"/",
   element:<Register/>
  },
    {
   "path":"/login",
   element:<Login/>
  },
  {
    path:"/home",
    element:(<> <Stair/><Navbar/> </>),
    children:[
      {
        index:true,
        element:<Home/>
      },
      {
        path:"user",
        element: <User/>
      },
      {
        path:"Jobapplay",
        element: <Jobapplay/>
      },
       {
        path:"search",
        element: <Search/>
      }
    ]
  },
  //admin Routes
  {
    path:"/admin",
    element:(<><Stair/> <AdminNavbar/> </>),
    children:[
      {
        index:true,
        element:<Home/>
      },
      {
        path:"post",
        element: <AdminPost/>
      },
        {
        path:"company/profile",
        element: <CompanyProfile/>
      },
       {
        path:"dashbord",
        element: <AdminDashbord/>
      },
      {
        path:"job/aplay/:id",
        element: <UserApplayJobs/>
      }
    ]
  }
])  
  return (
    <>
    <QueryClientProvider client={queryClient}>
   <RouterProvider router={router}></RouterProvider>
   </QueryClientProvider>
    </>
  )
}

export default App
