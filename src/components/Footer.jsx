import { Box, Typography, Link, Grid } from "@mui/material";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "primary.main",
        color: "white",
        py: 4,
        px: 2,
        mt: "auto",
      }}
    >
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} md={4} textAlign="center">
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 1 }}>
            <FlightTakeoffIcon />
            <Typography variant="h6" fontWeight={600}>
              Skill Pilot
            </Typography>
          </Box>
          <Typography variant="body2" sx={{ mt: 1 }}>
            Guiding your learning journey, one course at a time.
          </Typography>
        </Grid>

        <Grid item xs={12} md={4} textAlign="center">
          <Typography variant="subtitle2" sx={{ mb: 1 }}>
            Quick Links
          </Typography>
          <Box>
            <Link href="/about" underline="hover" color="inherit" sx={{ mx: 1 }}>
              About
            </Link>
        
          </Box>
        </Grid>
      </Grid>

      <Typography
        variant="caption"
        sx={{ display: "block", textAlign: "center", mt: 3, opacity: 0.8 }}
      >
        © {new Date().getFullYear()} Skill Pilot — Learn. Grow. Take Off 🚀
      </Typography>
    </Box>
  );
}
