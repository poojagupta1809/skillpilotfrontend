import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardContent, CardActions, Button, IconButton, Typography, CardMedia, Chip, MenuItem, Menu ,Box, Autocomplete,Divider} from "@mui/material";
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
    navigate(`/admin/course/edit/${course.courseId}`)  // Pass course to parent or navigate
  };

  return (
            
                <Card
                  key={course.courseId}
                  sx={{
                    width: 300,
                    borderRadius: 3,
                    boxShadow: 3,
                    cursor: "pointer",
                    overflow: "hidden",
                    transition: "transform 0.3s, box-shadow 0.3s",
                    "&:hover": { transform: "translateY(-5px)", boxShadow: 6 },
                    position: "relative",
                  }}
                  onDoubleClick={() => navigate(`/course/${course.courseId}`)}
                >
                   <CardMedia
                    component="img"
                    height="160"
                    image={course.imageUrl != null ? course.imageUrl : "https://foundr.com/wp-content/uploads/2023/04/How-to-create-an-online-course.jpg.webp"}
                    alt="Course Image"
                  />
                  <CardContent sx={{ bgcolor: "rgba(255, 255, 255, 0.9)" }}>
                    <Typography variant="h6" sx={{ fontWeight: "bold", color: "#1E3A8A", mb: 1 }}>
                      {course.topic}
                    </Typography>

                    {course.instructor ? (
                      <Typography sx={{ mb: 1, color: "#555" }}>
                        {course.instructor}
                      </Typography>
                    ) : null}

                    {course.difficultyLevel ? (
                      <Typography sx={{ fontWeight: "bold", mb: 2 }}>
                        {course.difficultyLevel}
                      </Typography>
                    ) : null}

                    <Typography sx={{ fontWeight: "bold", mb: 2, color: "#1E3A8A" }}>
                      {course.courseType && course.courseType.toLowerCase() === "paid" && course.price
                        ? `₹${course.price}`
                        : "Free"}
                    </Typography>

                    {/* <Button
                      fullWidth
                      variant={enrolledCourseIds.includes(course.courseId) ? "contained" : "outlined"}
                      color={enrolledCourseIds.includes(course.courseId) ? "success" : "primary"}
                      disabled={enrolledCourseIds.includes(course.courseId)}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEnroll(course.courseId);
                      }}
                    >
                      {enrolledCourseIds.includes(course.courseId) ? "Enrolled" : "Enroll"}
                    </Button> */}
                      <CardActions disableSpacing>
        <CardActions>
        <Button size="small" onClick={handleView}>View</Button>
        {/* <Button size="small" >Delete</Button> */}
         <Button variant="outlined" color="error" startIcon={<DeleteIcon />} onClick={handleDelete}>
      
      </Button>
      </CardActions>
      </CardActions>
                  </CardContent>
                </Card>
           
      
      // </Box>

      
 
    // </Box>
  );
};


export default CourseCard;
