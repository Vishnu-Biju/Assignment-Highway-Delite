import { Typography, Paper, Grid } from "@mui/material";
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const SuccessPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Redirect to login page after 20 seconds
    const redirectTimeout = setTimeout(() => {
      navigate("/signin");
    }, 20000); // 20 seconds

    // Clean up the timeout when the component unmounts
    return () => clearTimeout(redirectTimeout);
  }, [navigate]);

  const { state } = location;
  const { firstName, lastName, email, contactMode } = state;

  return (
    <Grid
      container
      style={{
        height: "100vh",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Grid item xs={12} md={6} sm={6} style={{ width: "100%" }}>
        <Paper
          sx={{
            paddingX: 4,
            paddingY: 6,
            borderRadius: 4,
            backgroundColor: "#3A244A",
            color: "#FFFFFF",
          }}
          style={{ margin: "0 auto", width: "50%", padding: "28px" }}
        >
          <Typography variant="h4" sx={{ fontWeight: "bold" }}>
            Verification Complete
          </Typography>
          <Typography variant="subtitle1" sx={{ marginTop: 2 }}>
            Congratulations! Your registration/login is successful.
          </Typography>
          <Typography variant="body1" sx={{ marginTop: 2 }}>
            <span style={{ color: "#D72638" }}>Name:</span> {firstName}{" "}
            {lastName}
          </Typography>
          <Typography variant="body1">
            <span style={{ color: "#D72638" }}>Email:</span> {email}
          </Typography>
          <Typography variant="body1">
            <span style={{ color: "#D72638" }}>Contact Mode:</span>{" "}
            {contactMode}
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default SuccessPage;
