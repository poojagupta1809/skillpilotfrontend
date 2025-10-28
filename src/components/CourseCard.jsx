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
    <Card sx={{ maxWidth: 350, textAlign: "center" }}>
      {/* <CardHeader
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
              <MenuItem onClick={() => console.log("Delete Clicked")}>
                Delete
              </MenuItem>
              
            </Menu>
          </>
        }
        title={course.topic}
        subheader={
          <div>{course.instructor} 
         <Chip label={course.difficultyLevel} size="small" color="info" sx={{marginLeft:'10px'}}/>
         </div> }
      /> */}

      <CardMedia
        component="img"
        height="160"
        image={course.imageUrl!=null?course.imageUrl:"https://foundr.com/wp-content/uploads/2023/04/How-to-create-an-online-course.jpg.webp"}
        alt="Course Image"
      />
{/* 
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
      </CardContent> */}

                          <CardContent>
                          <Typography variant="h6" sx={{ fontWeight: "bold", color: "#1E3A8A" }}>
                            {course.topic || "Untitled Course"}
                          </Typography>
                          <Typography sx={{ mb: 1 }}>
                          {course.instructorName || course.instructor || "Unknown"}
                          </Typography>
                          <Typography sx={{ fontWeight: "bold", mb: 2 }}>
                            {/* {course.difficultyLevel || "N/A"} */}
                          <Chip label={course.difficultyLevel} size="small" color="info" sx={{marginLeft:'10px'}}/>
                          </Typography>
                          {/* <Button
                            fullWidth
                            variant={isEnrolled ? "contained" : "outlined"}
                            color={isEnrolled ? "success" : "primary"}
                            disabled={isEnrolled}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEnroll(course.courseId);
                            }}
                          >
                            {isEnrolled ? "Enrolled" : "Enroll"}
                          </Button> */}
                        </CardContent>
      {/* <CardActions>
        <Button size="small" onClick={handleView}>View</Button>
        <Button variant="outlined" color="error" startIcon={<DeleteIcon />} onClick={handleDelete}>
          Delete
        </Button>
      </CardActions> */}
    </Card>
  );
};

// export default function ImgMediaCard() {
//   return (
//     <Card sx={{ maxWidth: 345 }}>
//        <CardHeader
//         action={
//           <>
//             <IconButton onClick={handleMenuOpen}>
//             <EditNoteIcon/>
//             </IconButton>

//             <Menu
//               anchorEl={anchorEl}
//               open={Boolean(anchorEl)}
//               onClose={handleMenuClose}
//             >
//               <MenuItem onClick={handleEditClick}>Edit</MenuItem>
//               {/* <MenuItem onClick={() => console.log("Delete Clicked")}>
//                 Delete
//               </MenuItem> */}
              
//             </Menu>
//           </>
//         }
//         title={course.topic}
//         subheader={
//           <div>{course.instructor} 
//          <Chip label={course.difficultyLevel} size="small" color="info" sx={{marginLeft:'10px'}}/>
//          </div> }
//       />

//       <CardMedia
//         component="img"
//         alt="green iguana"
//         height="140"
//         image="/static/images/cards/contemplative-reptile.jpg"
//       />
//       <CardContent>
//         <Typography gutterBottom variant="h5" component="div">
//           Lizard
//         </Typography>
//         <Typography variant="body2" sx={{ color: 'text.secondary' }}>
//           Lizards are a widespread group of squamate reptiles, with over 6,000
//           species, ranging across all continents except Antarctica
//         </Typography>
//       </CardContent>
//       <CardActions>
//         <Button size="small">Share</Button>
//         <Button size="small">Learn More</Button>
//       </CardActions>
//     </Card>
//   );
// }
export default CourseCard;
