 import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardContent, CardActions, Button, IconButton, Typography, CardMedia,Chip ,MenuItem, Menu} from "@mui/material";
import EditNoteIcon from '@mui/icons-material/EditNote';
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";

const CourseCard = ({courseEnroll ,course}) => {
    const onEnroll=(courseId)=>{
    courseEnroll(courseId);
    }
  
  return (
      <div className="course-details-container">
          <Card className="course-card">
            <CardContent className="course-card-content"></CardContent>
    {/* <Card sx={{ maxWidth: 350, textAlign: "center" }}> */}
      <CardMedia
        component="img"
        height="160"
        image={course.imageUrl!=null?course.imageUrl:"https://foundr.com/wp-content/uploads/2023/04/How-to-create-an-online-course.jpg.webp"}
        alt="Course Image"
      />

      <CardContent>
         <Typography gutterBottom variant="h5" component="div">
        {course.topic}
        </Typography>
          <Typography gutterBottom variant="h6" component="div">
         <div>{course.instructor} 
         <Chip label={course.difficultyLevel} size="small" color="info" sx={{marginLeft:'10px'}}/>
         </div>
         </Typography>
        <Typography variant="body2" color="text.secondary">
          {course.description?.substring(0, 100)}...
        </Typography>
        <div className="enroll-button-container">
                    <Button
                          variant="contained"
                          color="primary"
                          sx={{ mt: 2 }}
                          onClick={(e) => handleEnroll(course.courseId)}
                          disabled={userEnrollments.includes(course.courseId)}
                        >
                          {userEnrollments.includes(course.courseId)
                            ? "Enrolled"
                            : "Enroll"}
                        </Button>
                  </div>
      </CardContent>
    </Card>
    </div>
  );
};
export default CourseCard;
