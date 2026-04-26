import {createContext, useContext, useEffect, useState } from "react";
import AxiosURL from "../axios/axios";
import { toast } from "react-toastify";

export const AuthContext = createContext(null);

export const AuthProvider = ({children}) =>{
const[apply,setAppliedJobs] = useState<any[]>([])
const[roleAU,setrole] = useState(false);
const role = localStorage.getItem("role") || null
const[colorFont,setcolorFont] = useState({
color: "#066BDB" ,
// "#25B4F4",
fontSize:"8vw"  
})

useEffect(()=>{
if (role !== null) {
if (role === "user") {
setcolorFont((prev)=>({...prev,color:"#D91099"}))
setcolorFont((prev)=>({...prev,fontSize:"9vw"}))
setrole(true)  
}
}
},[role])

const handleApplay = async (id: string) => {
  try {
    const token = localStorage.getItem("token");

    const headers = { Authorization: `Bearer ${token}`};    
const response = await AxiosURL.post(`${import.meta.env.VITE_User_Apply_Jobs_URL}/${id}`,{},{headers})

  toast.success(response.data.message);
  
  } catch (err: any) {
 if (err?.status === 409) {
  toast.warn("You have already applied for this job");
}
  }
};

const[Authoriza,setauth] = useState(true)
const[adminAuthoriza,setauthadmin] = useState(true)

const getAllJbos = async() =>{
try {    
const token = localStorage.getItem("token");    
const headers = { Authorization: `Bearer ${token}` };  
const response = await AxiosURL.get(import.meta.env.VITE_User_Jobs_URL ,{headers})
return response.data.data
}catch (error: any) {
  if (error.response) {    
    if (error.response.status === 403) {
    setauth(false)
    return;
    } 
    else {
      toast.warn(error.response.data.message || "Something went wrong");
    }
  } else {
    toast.warn("Network error 🌐 Please check your internet");
  }
}} 


const getAllJobsPosted = async()=>{
try {
 const headers = { Authorization: `Bearer ${localStorage.getItem("token")}` };
const response = await AxiosURL.get(import.meta.env.VITE_Recruiter_Jobs_URL,{headers});
return response.data.data  
}catch (error: any) {
  if (error.response) {    
    if (error.response.status === 403) {
    setauthadmin(false)
    return;
    } 
    else {
      toast.warn(error.response.data.message || "Something went wrong");
    }
  } else {
    toast.warn("Network error 🌐 Please check your internet");
  }

}
}


useEffect(()=>{ 
if (role !== null && role === "user") {
  getAllJbos() 
}  
},[role])
useEffect(()=>{
if (role !== null && role === "admin"){
  getAllJobsPosted() 
}    
},[role])




return(
<AuthContext.Provider value={{getAllJobsPosted,adminAuthoriza,roleAU,Authoriza,colorFont,getAllJbos,handleApplay}}>{children}</AuthContext.Provider>    
)    
}

export const useAuth = () =>{
 const AuthContextValue = useContext(AuthContext);
 return AuthContextValue   
}
