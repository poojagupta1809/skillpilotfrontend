import React,{useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
export default function Protected(props) {
    const {Component}=props
    const navigate = useNavigate();
    
    useEffect(()=>{ 
         const admin=props.Role;
        const userRole=sessionStorage.getItem('role')  
        if(admin===userRole){
            console.log(userRole,"can access")
            return navigate(props.to)
        }
        else{
            return navigate('/');
           
        }
    },[])
  return (
    <div>
      <Component/>
    </div>
  )
}