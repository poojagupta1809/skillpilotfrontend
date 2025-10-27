 import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardContent, CardActions, Button, IconButton, Typography, CardMedia,Chip } from "@mui/material";
import MoreVert from "@mui/icons-material/MoreVert";
import DeleteIcon from "@mui/icons-material/Delete";

const CourseCard = ({ courseDeleteHandler, course }) => {
  const navigate = useNavigate();

  const handleDelete = () => {
    courseDeleteHandler(course.courseId);
  };

  const handleView = () => {
    console.log("View clicked:", course.courseId);
    navigate(`/admin/course-details/${course.courseId}`);  
  };

  return (
    <Card sx={{ maxWidth: 350, textAlign: "center", padding: 2 }}>
      <CardHeader
        action={<IconButton><MoreVert /></IconButton>}
        title={course.topic}
        subheader={
          <div>{course.instructor} 
         <Chip label={course.difficultyLevel} size="small" color="info" sx={{marginLeft:'10px'}}/>
         </div> }
      />

      <CardMedia
        component="img"
        height="160"
        image="https://foundr.com/wp-content/uploads/2023/04/How-to-create-an-online-course.jpg.webp"
        alt="Course Image"
      />

      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {course.description?.substring(0, 80)}...
        </Typography>
      </CardContent>

      <CardActions>
        <Button size="small" onClick={handleView}>View</Button>
        <Button variant="outlined" color="error" startIcon={<DeleteIcon />} onClick={handleDelete}>
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};

export default CourseCard;
