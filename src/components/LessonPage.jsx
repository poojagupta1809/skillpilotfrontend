import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const LessonPage = () => {
  
  const [lesson, setLesson] = useState(null);
let lessonId=4;
  useEffect(() => {

   axios.get(`http://localhost:9090/api/courses/lessons/${lessonId}`,)
   .then((res)=>{
    setLesson(res.data)
    console.log(res.data)
   }
  )
  .catch(
    (err)=>console.log(err)
  )
    },[])




  return (
    <div>

     {lesson && (
  <>
    <h1>Title: {lesson.title}</h1>
    <p>Description: {lesson.description}</p>
    <p>Content Type: {lesson.contentType}</p>
    <p>Content: {lesson.content}</p>
    <p>Video Url: {lesson.videoUrl}</p>
    <p>CreatedAt: {lesson.createdAt}</p>
    </>

)}


      {/* Add more lesson details here if needed */}
    </div>
  );
};

export default LessonPage;

