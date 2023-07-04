import * as React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
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

const BaseURL = import.meta.env.VITE_API;

Modal.setAppElement(document.body);

const Signin = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showOtpModal, setShowOtpModal] = useState<boolean>(false);
  const [otp, setOtp] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [passwordError, setPasswordError] = useState<string>("");

  const handleClickShowPassword = () => setShowPassword((show) => !show);

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
          console.log("User has been successfully verified");

          setShowOtpModal(true);
          // Proceed with further actions for signed-in user
        } else {
          // OTP verification required
          console.log("OTP verification required");
          // Show OTP verification form/modal and proceed accordingly
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

        // Sign-in failed
        console.log(response.data.message);
        setPasswordError("Incorrect password. Please try again.");
      }
    } catch (error) {
      console.error("An unexpected error occurred:", error);
      setPasswordError("An unexpected error occurred. Please try again later.");
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
      <Modal
        isOpen={showOtpModal}
        onRequestClose={() => setShowOtpModal(false)}
        contentLabel="OTP Modal"
        style={{
          overlay: {
            background: "rgba(0, 0, 0, 0.5)",
          },
          content: {
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "300px",
            height: "200px", // Adjust the height to make it smaller
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#ffffff",
            border: "1px solid #ccc",
            borderRadius: "4px",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
          },
        }}
      >
        <Stack spacing={2} style={{ padding: "20px" }}>
          <Typography variant="h4">Enter OTP</Typography>
          <TextField
            id="otp"
            label="OTP"
            type="number"
            variant="standard"
            value={otp}
            onChange={(e) => setOtp(Number(e.target.value))}
          />
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
            onClick={handleOtpSubmit}
          >
            Submit
          </Button>
        </Stack>
      </Modal>
    </Grid>
  );
};

export default Signin;
