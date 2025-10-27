 import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardContent, CardActions, Button, IconButton, Typography, CardMedia,Chip ,MenuItem, Menu} from "@mui/material";
import EditNoteIcon from '@mui/icons-material/EditNote';
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";

const CourseCard = ({ courseDeleteHandler, course }) => {
  const navigate = useNavigate();

  const handleDelete = () => {
    courseDeleteHandler(course.courseId);
  };

  const handleView = () => {
    console.log("View clicked:", course.courseId);
    navigate(`/admin/course-details/${course.courseId}`);  
  };

  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleEditClick = () => {
    handleMenuClose();
   navigate(`/admin/course/edit/${course.courseId}`)// Pass course to parent or navigate
  };

  return (
    <Card sx={{ maxWidth: 350, textAlign: "center", padding: 2 }}>
      <CardHeader
        action={
          <>
            <IconButton onClick={handleMenuOpen}>
            <EditNoteIcon/>
            </IconButton>

            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={handleEditClick}>Edit</MenuItem>
              {/* <MenuItem onClick={() => console.log("Delete Clicked")}>
                Delete
              </MenuItem> */}
              
            </Menu>
          </>
        }
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
