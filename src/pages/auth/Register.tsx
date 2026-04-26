import { useEffect, useState } from "react";
import AxiosURL from "./../../axios/axios"
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Register = () => {
const navigate = useNavigate()
const[user,setuser] = useState({
  firstName: "",
   lastName: "",
   email: "",
   password: "",
   role: "",
   organizationName:""
})  


const handleChange = (e:any) =>{
const{name,value} = e.target;
setuser((prev)=>({...prev,[name]:value}))
}

const handleSubmit = async (e: any) => {
  e.preventDefault();
 let res:any;
  try {
    if (user.role === "user") {
      res = await AxiosURL.post(import.meta.env.VITE_RAGISTER_URL, user); 
    }else{
     res = await AxiosURL.post(import.meta.env.VITE_Recruiter_URL, user);
    }
    
    if (res.data?.success) {
      const userData = res.data.data?.[0];
      if (userData) {
        localStorage.setItem("token", userData.token);
        localStorage.setItem("role", userData.role);
      }
      console.log("User Created:", userData);
      // optional: redirect / reset form
  if (userData.role === "user") {
    navigate("/home/user")
    window.location.reload()
  }else{
    navigate("/admin")
    window.location.reload()
  }
  toast.success("account create successfully")
    }


  } catch (error: any) {
    if (error.response) {
      const { status, data } = error.response;

      if (status === 400) {
        toast.error("Validation Errors:", data.errors);
        toast.error(data.errors.password)
      }
      else if (status === 409) {
        toast.error("User already exists:", data.message);
      }
      else {
        toast.error("Server Error:", data.message);
      }
    } else {
      toast.error("Network Error:", error.message);
    }
  }
};

const token = localStorage.getItem("token")
const role = localStorage.getItem("role")
useEffect(()=>{
if (token !== null && role === "user") {
  navigate("/home")
}else if (token !== null && role === "admin") {
navigate("/admin")
}},[token,role])

  return (
    <main className="min-h-screen bg-black flex items-center justify-center p-4">
      {/* Glass Card */}
      <section className="w-full max-w-md bg-white/10 backdrop-blur-lg border border-white/20 
                          rounded-2xl p-6 sm:p-8 shadow-xl">

        <h1 className="text-2xl text-white/75 sm:text-3xl font-bold text-center mb-6">
          Create Account
        </h1>

        <form className="flex flex-col gap-4 text-white" onSubmit={handleSubmit}>

          {/* First Name */}
          <input
          onChange={handleChange}
            type="text"
            name="firstName"
            value={user.firstName}
            required
            placeholder="First Name"
            className="px-4 py-2 rounded-lg bg-white/10 border border-white/20 
             focus:outline-none focus:border-cyan-400 placeholder-gray-300"
          />

          {/* Last Name */}
          <input
          onChange={handleChange}
            type="text"
             name="lastName"
            value={user.lastName}
            required
            placeholder="Last Name"
            className="px-4 py-2 rounded-lg bg-white/10 border border-white/20 
                       focus:outline-none focus:border-cyan-400 placeholder-gray-300"
          />

          {/* Email */}
          <input
          onChange={handleChange}
            type="email"
             name="email"
            value={user.email}
            required
            placeholder="Email Address"
            className="px-4 py-2 rounded-lg bg-white/10 border border-white/20 
                       focus:outline-none focus:border-cyan-400 placeholder-gray-300"
          />

          {/* Password */}
          <input
          onChange={handleChange}
            type="password"
             name="password"
            value={user.password}
            required
            placeholder="Password"
            className="px-4 py-2 rounded-lg bg-white/10 border border-white/20 
                       focus:outline-none focus:border-cyan-400 placeholder-gray-300"
          />

          {/* Role */}
          <select
                name="role"
            value={user.role}
            required
            className="px-4 py-2 rounded-lg bg-[#1e1d28] border border-white/20 
           focus:outline-none focus:border-cyan-400 text-gray-300"
          onChange={handleChange}
          >
            <option value="">Select Role</option>
            <option value="user">User</option>
            <option value="admin">admin</option>
          </select>
          {
            user.role == "admin" &&
            <input
          onChange={handleChange}
            type="text"
             name="organizationName"
            value={user.organizationName}
            
            placeholder="organization name"
            className="px-4 py-2 rounded-lg bg-white/10 border border-white/20 
                       focus:outline-none focus:border-cyan-400 placeholder-gray-300"
          />
          } 

          {/* Button */}
          <button
            type="submit"
            className="mt-2 py-2 rounded-tl-xl rounded-br-xl text-black bg-cyan-500 hover:bg-cyan-600 
                       transition font-semibold"
          >
            Register
          </button>

        </form>

        {/* Footer */}
        <p className="text-sm text-gray-300 text-center mt-4">
          Already have an account?{" "}
        <NavLink to={"/login"}><span className="text-cyan-400 cursor-pointer">Login</span></NavLink> 
        </p>

      </section>

    </main>
  );
};

export default Register;