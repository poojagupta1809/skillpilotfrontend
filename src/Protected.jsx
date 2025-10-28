import React,{Children, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
export default function Protected({role,children}) {
    const navigate = useNavigate();
    
        const userRole=sessionStorage.getItem('role')  
        if(role===userRole){
           console.log(userRole,"role in session")
            return  children;
        }
        else{
            console.log(userRole,"cannot access");
            console.log(role,"role checking")
            return navigate('/');
           
        }
}