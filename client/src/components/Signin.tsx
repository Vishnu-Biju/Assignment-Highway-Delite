import * as React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import TextField from "@mui/material/TextField";
import { Grid, Paper, Stack, Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Button from "@mui/material/Button";
import SigninImg from "../assets/Signin.png";
const BaseURL = import.meta.env.VITE_API

const Signin = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleSubmit = async () => {
 
    try {
      const response = await axios.post(BaseURL+"/signin", formData);
      console.log(response); 
      navigate("/success");
      // Reset the form data
      setFormData({ email: "", password: "" });
    } catch (error) {
      console.error(error);
    }
  };
  

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
      <Grid
        item
        xs={12}
        md={6}
        sm={6}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          src={SigninImg}
          alt="helo"
          style={{ maxWidth: "100%", height: "auto" }}
        />
      </Grid>
      <Grid
        item
        xs={12}
        md={6}
        sm={6}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Paper
          sx={{
            width: "50%",
            padding: 5,
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
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
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
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
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
              onClick={handleSubmit}
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
      </Grid>
    </Grid>
  );
};

export default Signin;
