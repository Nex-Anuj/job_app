import { useState } from "react";
import AxiosURL from "../../axios/axios";
import { toast } from "react-toastify";

const CompanyProfile = () => {
  const [comProfile, setcomProfile] = useState({
    companyId: "",
    companyImg: null, // File ke liye null rakhein
  });

  const handleChange = (e:any) => {
    const { type, name, value, files } = e.target;
    if (type === "file") {
      setcomProfile((prev) => ({ ...prev, companyImg: files[0] }));
    } else {
      // Text handle karne ke liye
      setcomProfile((prev) => ({ ...prev, [name]: value }));
    }
  };

const handleSubmit = async (e:any) => {
  e.preventDefault();
  
  // 1. FormData create kiya (Correct)
  const formData = new FormData();
  formData.append("companyId", comProfile.companyId);
  formData.append("companyImg", comProfile.companyImg);

  // 2. Headers set kiye
  const token = localStorage.getItem("token");
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "multipart/form-data" 
  };

  try {
    const response = await AxiosURL.patch(import.meta.env.VITE_Recruiter_Org_URL, formData, { headers });
    
    toast.success("Profile updated successfully!");

  } catch (error:any) {
    toast.error("Error updating profile:", error.response?.data || error.message);
    toast.error(error.response?.data?.message || "Something went wrong!");
  }
};

  return (
    <main className="min-h-screen bg-[url('/bg.png')] bg-cover bg-center flex items-center justify-center p-4">
      <form 
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 shadow-xl"
      >
        <h2 className="text-2xl font-bold text-white mb-6 text-center">Company Profile</h2>

        <div className="flex flex-col gap-5">
          {/* Company ID */}
          <div>
            <label className="text-gray-300 text-sm mb-2 block">Company ID</label>
            <input 
              type="text" 
              required
              name="companyId"
              value={comProfile.companyId} 
              placeholder="Enter your companyId" 
              onChange={handleChange}
              className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white outline-none focus:border-blue-500 transition-all"
            />
          </div>

          {/* Company Image */}
          <div>
            <label className="text-gray-300 text-sm mb-2 block">Company Logo</label>
            <input 
              type="file" 
              accept="image/*" 
              required
              onChange={handleChange}
              className="w-full text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 cursor-pointer"
            />
          </div>

          <button 
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-tl-2xl rounded-br-2xl cursor-pointer transition-all mt-4 shadow-lg shadow-blue-500/20"
          >
            Update Profile
          </button>
        </div>
      </form>
    </main>
  );
};

export default CompanyProfile;