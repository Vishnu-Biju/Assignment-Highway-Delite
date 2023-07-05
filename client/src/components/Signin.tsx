import * as React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
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
import Popover from "@mui/material/Popover";
import TextField from "@mui/material/TextField";

const BaseURL = import.meta.env.VITE_API;

const Signin = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otp, setOtp] = useState(0);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [passwordError, setPasswordError] = useState("");

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleSubmit = async () => {
    console.log(formData);
    try {
      const response = await axios.post(`${BaseURL}/signin`, formData);

      // Handle response
      if (response.status === 200) {
        // Sign-in successful, check if OTP verification is required
        if (response.data.user.verified) {
          setShowOtpModal(true);
          console.log("User has been successfully verified");

          
        } else {
          // OTP verification required
          console.log("OTP verification required");
          setShowOtpModal(true);
        }
      } else {
        // Sign-in failed
        console.log(response.data.message);
        setPasswordError("Incorrect password. Please try again.");
      }
    } catch (error) {
      console.error("An unexpected error occurred:", error);
      setPasswordError("Password is incorrect. Please try again");
    }
  };

  const handleOtpSubmit = async () => {
    console.log(otp);

    try {
      const response = await axios.post(`${BaseURL}/signin/${otp.toString()}`, {
        email: formData.email,
        otp: otp,
      });
      console.log(response);

      // Handle response
      if (response.status === 200) {
        // Sign-in successful
        console.log("User has been successfully verified");
        setFormData({ email: "", password: "" });
        navigate("/success", {
          state: {
            firstName: response.data.user.firstName,
            lastName: response.data.user.lastName,
            email: response.data.user.email,
            contactMode: response.data.user.contactMode,
          },
        });
      } else {
        // Sign-in failed
        console.log(response.data.message);
        setPasswordError("Incorrect password. Please try again.");
      }
    } catch (error) {
      console.error("An unexpected error occurred:", error);
      setPasswordError("An unexpected error occurred. Please try again later.");
    }
  };

  const openOtpModal = Boolean(showOtpModal);
  const otpModalId = openOtpModal ? "otp-modal" : undefined;

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
              Fill what we know{" "}
              <span style={{ color: "#D72638" }}>!</span>
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

            {passwordError && (
              <Typography variant="body2" sx={{ color: "red" }}>
                {passwordError}
              </Typography>
            )}

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

      {/* OTP Modal */}
      <Popover
        id={otpModalId}
        open={openOtpModal}
        onClose={() => setShowOtpModal(false)}
        anchorOrigin={{
          vertical: "center",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "center",
          horizontal: "center",
        }}
      >
        <Stack spacing={2} style={{ padding: "20px" }}>
          <Typography variant="h5" sx={{ color: "#3A244A" }}>
            OTP Verification
          </Typography>
          <Typography variant="body1" sx={{ color: "#3A244A" }}>
            An OTP has been sent to your email. Please enter it below to
            verify.
          </Typography>
          <TextField
            id="otp-input"
            label="OTP"
            type="number"
            variant="outlined"
            value={otp}
            onChange={(e) => setOtp(Number(e.target.value))}
          />
          <Button
            variant="contained"
            onClick={handleOtpSubmit}
            sx={{
              backgroundColor: "#3A244A",
              "&:hover": {
                backgroundColor: "#4D395C",
              },
              paddingY: 1.5,
              borderRadius: 2.5,
            }}
          >
            Verify
          </Button>
        </Stack>
      </Popover>
    </Grid>
  );
};

export default Signin;
