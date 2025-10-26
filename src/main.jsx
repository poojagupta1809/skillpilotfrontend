import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import axios from 'axios';

// Set a common header for all request types
let authorization = 'Bearer ' + sessionStorage.getItem("token");

axios.defaults.headers.common['Authorization'] = authorization; 

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
