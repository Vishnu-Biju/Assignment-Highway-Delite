import * as React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { Paper, Stack, Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Button from "@mui/material/Button";
import SigninImg from "../assets/Signin.png";

const Signin = () => {
  // declare a new state variable for modal open
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <Stack sx={{ width: "60%" }}>
          <img src={SigninImg} alt="helo" />
        </Stack>
        <Paper
          sx={{
            width: "40%",
            height: "100%",
            paddingX: 5,
            paddingY: 5,
            borderRadius: 4,
          }}
        >
          <Stack spacing={2}>
            <Typography
              variant="h4"
              sx={{ color: "#3A244A", fontWeight: "bold" }}
            >
              Fill what we know <span style={{ color: "#D72638" }}>!</span>
            </Typography>
            <TextField
              id="standard-basic"
              label="Enter Email"
              type="email"
              variant="standard"
            />
            <FormControl sx={{ m: 1, width: "100%" }} variant="standard">
              <InputLabel htmlFor="standard-adornment-password">
                Password
              </InputLabel>
              <Input
                id="standard-adornment-password"
                type={showPassword ? "text" : "password"}
                onBlur={() => setShowPassword(false)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>

            <Button
              
              variant="contained"
              style={{ marginTop: "30px" }}
              sx={{
                backgroundColor: "#3A244A",
                "&:hover": {
                  backgroundColor: "#4D395C",
                },
                paddingY: 1.5,
                borderRadius: 2.5,
              }}
            >
              Sign In
            </Button>
            <Button
              variant="contained"
              onClick={() => navigate("/")}
              sx={{
                backgroundColor: "#ffffff",
                color: "#3A244A",
                border: "2px solid",
                fontWeight: "bold",
                "&:hover": {
                  backgroundColor: "#ffffff",
                },
                paddingY: 1.5,
                borderRadius: 2.5,
              }}
            >
              Sign Up
            </Button>
          </Stack>
        </Paper>
      </div>
    </div>
  );
};

export default Signin;
