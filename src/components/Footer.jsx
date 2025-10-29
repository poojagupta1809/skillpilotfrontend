import { Box, Typography } from "@mui/material";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        width: "100%",
        bgcolor: "primary.main",
        color: "white",
        p: 1,
        textAlign: "center",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 0.5 }}>
        <FlightTakeoffIcon fontSize="small" />
        <Typography variant="subtitle2" fontWeight={600}>Skill Pilot</Typography>
      </Box>
      <Typography variant="body2" sx={{ opacity: 0.9 }}>Guiding your learning journey, one course at a time.</Typography>
      <Typography variant="caption" sx={{ display: "block", opacity: 0.8 }}>
        © {new Date().getFullYear()} Skill Pilot — Learn. Grow. Take Off 🚀
      </Typography>
    </Box>
  );
}
