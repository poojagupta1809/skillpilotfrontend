import { Favorite, FavoriteBorder, MoreVert, Share } from "@mui/icons-material";
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Checkbox,
  IconButton,
  Typography,
  Button
} from "@mui/material";
import React from "react";
import DeleteIcon from '@mui/icons-material/Delete';

const CourseCard = ({courseDeleteHandler,course}) => {
  
  const handleDelete=()=>{
    courseDeleteHandler(course.courseId);
  }
  return (
    // <Card sx={{ margin: 2,height: '10',width: '15' } }>
     <Card sx={{ maxWidth: 350, textAlign: "center", padding: 2 }}>
      <CardHeader
        // avatar={
        //   <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
        //     R
        //   </Avatar>
        // }
        action={
          <IconButton aria-label="settings">
            <MoreVert />
          </IconButton>
        }
         title= {course.topic}
        subheader={course.instructor}
        //subheader={props.course.difficultyLevel}
      />
      <CardMedia
        component="img"
        height="20%"
        image="https://images.pexels.com/photos/4534200/pexels-photo-4534200.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          This impressive paella is a perfect party dish and a fun meal to cook
          together with your guests. Add 1 cup of frozen peas along with the
          mussels, if you like.
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <CardActions>
        <Button size="small">View</Button>
        {/* <Button size="small" >Delete</Button> */}
         <Button variant="outlined" color="error" startIcon={<DeleteIcon />} onClick={handleDelete}>
        Delete
      </Button>
      </CardActions>
      </CardActions>
    </Card>
  );
};

export default CourseCard;