import React, { useEffect } from 'react'
import Layout from '../Layout'
import { useState } from 'react';
import { Grid } from '@mui/material';
import CourseCard from './CourseCard';
import axios from 'axios';

export default function AdminDefaultPage() {
    const [loading,setLoading]=useState(false);
    const[courses,setCourses]=useState([])


   useEffect(()=>{

    axios.get("http://localhost:8088/api/courses/view")
            .then(
                (response)=>
                {
                   setCourses(response.data)
                   console.log(courses," get coursesss")
                   setLoading(true);
                  }
            )
            .catch(
                (err)=>
                    {
                        console.log("Error occured",err )
                          
                               // setError("Invalid username /password")
                                alert("Not able to get courses");
                          
                    }
                
            )
        
        },[loading])
    
          

        const removeCourseHandler=(id)=>{
            axios.delete(`http://localhost:8088/api/courses/${id}`)
            .then(
                (response)=>
                {
                   setCourses(response.data)
                   setCourses(courses.filter((course)=>course.courseId!=id))
                   console.log(courses,"after delete")
                  }
            )
            .catch(
                (err)=>
                    {
                        console.log("Error occured",err )
                          
                               // setError("Invalid username /password")
                                alert("Not able to delete courses");
                          
                    }
                
            )
        }

  return (
    <div>{loading?
        <Layout>
          <Grid container spacing={8} sx={{ padding: 3, justifyContent: 'flex-start', alignItems: "flex-start" }} >
             {courses.map((course)=> 
             
        <Grid item="true" xs={12} sm={6} >
            
          <CourseCard course={course}  courseDeleteHandler={removeCourseHandler}/>
        </Grid>
              ) }
        </Grid>
      </Layout>:
      <div>
        <h3>loading...</h3>
      </div>
    }
       
    </div>
  )
}
