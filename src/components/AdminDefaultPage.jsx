import React, { useEffect } from 'react'
import Layout from '../Layout'
import { useState } from 'react';
import { Grid ,Typography, Box} from '@mui/material';
import CourseCard from './CourseCard';
import axios from 'axios';

export default function AdminDefaultPage() {
    let authorization = 'Bearer ' + sessionStorage.getItem("token");
    axios.defaults.headers.common['Authorization'] = authorization;

    const [loading, setLoading] = useState(false);
    const [courses, setCourses] = useState([])


    useEffect(() => {

        axios.get("http://localhost:8088/api/courses/view")
            .then(
                (response) => {
                    setCourses(response.data)
                    console.log(courses, " get coursesss")
                    setLoading(true);
                }
            )
            .catch(
                (err) => {
                    console.log("Error occured", err)

                    // setError("Invalid username /password")
                    alert("Not able to get courses");

                }

            )

    }, [loading])



    const removeCourseHandler = (id) => {
        axios.delete(`http://localhost:8088/api/courses/${id}`)
            .then(
                (response) => {
                    setCourses(response.data)
                    setCourses(courses.filter((course) => course.courseId != id))
                    console.log(courses, "after delete")
                }
            )
            .catch(
                (err) => {
                    console.log("Error occured", err)

                    // setError("Invalid username /password")
                    alert("Not able to delete courses");

                }

            )
    }

    return (
        <div>{loading ?
            <Layout>
                <Typography variant="h6" color="text.secondary" paragraph  sx={{  justifyContent: 'flex-start', alignItems: "flex-start" }}>
            Welcome {sessionStorage.getItem('username')}!!
          
          </Typography>
           <Box sx={{ py: 4, px: 2, bgcolor: "#F0F4FF", minHeight: "100vh" }}>
                <Grid container spacing={6} sx={{ padding: 3, justifyContent: 'flex-start', alignItems: "flex-start" }} >
                        
                    {courses.map((course) =>

                        <Grid item="true" xs={12} sm={6} lg={3} >

                            <CourseCard course={course} courseDeleteHandler={removeCourseHandler} />
                        </Grid>
                    )}
                </Grid>
               </Box>
            </Layout> :
            <div>
                <h3>loading...</h3>
            </div>
        }

        </div>
    )
}
