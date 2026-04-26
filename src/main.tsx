import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {Slide , ToastContainer} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './Context/contextAPI.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
    <App />
        <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick={false}
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="dark"
transition={Slide }
/>
    </AuthProvider>
  </StrictMode>,
)
