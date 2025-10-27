import React,{useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
export default function Protected(props) {
    const {Component}=props
    const navigate = useNavigate();
    
    useEffect(()=>{ 
         const admin='ADMIN';
        // sessionStorage.getItem('roleType')
        if(props.Role===admin){
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