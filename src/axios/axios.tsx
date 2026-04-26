import axios from "axios"

const AxiosURL = axios.create({
baseURL:import.meta.env.VITE_DASE_URL,
headers:{
 "Content-Type": "application/json"
}    
})

export default AxiosURL;