import React from "react";
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

export default function LessonList({ lessons, onDeleteLesson, onEditLesson }) {
  const navigate = useNavigate();

  const handleOpenLesson = (lesson) => {
    navigate(`/lesson/${lesson.lessonId}`, { state: { lesson } });
  };

  return (
    <List sx={{ width: "100%", bgcolor: "background.paper" }}>
      {lessons.map((lesson) => (
        <li key={lesson.lessonId} style={{ listStyle: "none" }}>
          <ListItemButton
            onClick={() => handleOpenLesson(lesson)}
            sx={{
              mb: 1,
              borderRadius: 2,
              "&:hover": { bgcolor: "primary.light" },
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

            {onEditLesson && (
              <Tooltip title="Edit lesson" placement="bottom-start">
                <IconButton
                  edge="end"
                  color="primary"
                  onClick={(e) => {
                    e.stopPropagation();
                    onEditLesson(lesson);
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
