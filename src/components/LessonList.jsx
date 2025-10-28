import React, { useState } from "react"; 
import {
  List,
  ListItemButton,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
  Divider,
  Chip,
  IconButton,
  Tooltip,
  Box,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function LessonList({ lessons, onDeleteLesson, onEditLesson }) {
  const [selectedLessonId, setSelectedLessonId] = useState(null);
  const navigate = useNavigate();
  const authorization = "Bearer " + sessionStorage.getItem("token");
  axios.defaults.headers.common["Authorization"] = authorization;

  const handleOpenLesson = (lesson) => {
    setSelectedLessonId(lesson.lessonId);
    navigate(`/courses/lesson/${lesson.lessonId}`, { state: { lesson } });
  };

  return (
    <List sx={{ width: "100%", bgcolor: "background.paper" }}>
      {lessons.map((lesson) => (
        <li key={lesson.lessonId} style={{ listStyle: "none" }}>
          <ListItemButton
            selected={selectedLessonId === lesson.lessonId} 
            onClick={() => handleOpenLesson(lesson)}
            sx={{
              mb: 1,
              borderRadius: 2,
              "&.Mui-selected": {
                bgcolor: "primary.light",
                "&:hover": { bgcolor: "primary.main" },
              },
            }}
          >
            {lesson.thumbnailUrl && (
              <ListItemAvatar>
                <Avatar
                  variant="rounded"
                  src={lesson.thumbnailUrl}
                  sx={{ width: 60, height: 60, mr: 2 }}
                />
              </ListItemAvatar>
            )}

            <ListItemText
              primary={<Typography variant="h6">{lesson.title}</Typography>}
              secondary={
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    {lesson.description}
                  </Typography>
                  <Chip
                    label={lesson.contentType}
                    size="small"
                    color="primary"
                    sx={{ mt: 0.5 }}
                  />
                </Box>
              }
            />

            {onEditLesson && (<Tooltip title="Edit lesson" placement="bottom-start">
    <IconButton
      edge="end"
      color="primary"
      onClick={(e) => {
        e.stopPropagation();
        navigate(`/courses/lessons/${lesson.lessonId}/edit`);
      }}
      sx={{ mr: 1 }}
    >
      <EditIcon />
    </IconButton>
  </Tooltip>
)}
            {onDeleteLesson && (
              <Tooltip title="Delete lesson" placement="bottom-start">
                <IconButton
                  edge="end"
                  color="error"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteLesson(lesson.lessonId);
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            )}
          </ListItemButton>
          <Divider />
        </li>
      ))}
    </List>
  );
}
