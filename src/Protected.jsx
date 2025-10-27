import React,{Children, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
export default function Protected({role,children}) {
    const navigate = useNavigate();
    
        const userRole=sessionStorage.getItem('role')  
        if(role===userRole){
            return  children;
        }
        else{
            console.log(userRole,"can not access")
            return navigate('/');
           
        }
}