import React from "react";
import { List, ListItemButton, ListItemText, ListItemAvatar, Avatar, Typography, Divider, Chip, IconButton } from "@mui/material";
import DeleteIcon  from "@mui/icons-material/Delete";
import { Tooltip } from "@mui/material";
export default function LessonList({ lessons, onSelectLesson, onDeleteLesson}) {
  return (
    <List sx={{ width: "100%", bgcolor: "background.paper" }}>
      {lessons.map((lesson) => (
        <div key={lesson.lessonId}>
          <ListItemButton
            onClick={() => onSelectLesson(lesson)}
            sx={{ mb: 1, borderRadius: 2, "&:hover": { bgcolor: "primary.light" } }}
          >
            {lesson.thumbnailUrl && (
              <ListItemAvatar>
                <Avatar variant="rounded" src={lesson.thumbnailUrl} sx={{ width: 60, height: 60, mr: 2 }} />
              </ListItemAvatar>
            )}

            <ListItemText
              primary={<Typography variant="h6">{lesson.title}</Typography>}
              secondary={
                <>
                  <Typography variant="body2" color="text.secondary">{lesson.description}</Typography>
                  <Chip label={lesson.contentType} size="small" color="primary" sx={{ mt: 0.5 }} />
                </>
              }
            /><Tooltip title="Delete lesson" placement="bottom-start">
            <IconButton edge="end" color="error" onClick={(e)=>{e.stopPropagation(); onDeleteLesson(lesson.lessonId);}}>
                <DeleteIcon/>
            </IconButton>
            </Tooltip>
          </ListItemButton>
          <Divider />
        </div>
      ))}
    </List>
  );
}
