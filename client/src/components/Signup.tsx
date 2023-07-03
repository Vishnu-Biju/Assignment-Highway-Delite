import * as React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { Menu, Paper, Stack, Typography } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";
import Button from "@mui/material/Button";
import SignupImg from "../assets/Signup.png";

const Signup: React.FC = () => {
  // declare a new state variable for modal open
  const [open, setOpen] = useState(false);

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showPasswordRe, setShowPasswordRe] = useState<boolean>(true);
  const [contactMode, setContactMode] = useState<string>("Contact Mode");
  const [anchorEl, setAnchorEl] = useState<any>(null);

  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [passwordMismatchError, setPasswordMismatchError] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowPasswordRe = () => setShowPasswordRe((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const dropdown = [
    {
      value: "email",
      label: "Email",
    },
    {
      value: "phone",
      label: "Phone",
    },
  ];

  // function to handle modal open
  const handleOpen = () => {
    setOpen(true);
  };

  // function to handle modal close
  const handleClose = () => {
    setOpen(false);
  };

  const handleDropdown = (e: any) => {
    setAnchorEl(e.currentTarget);
  };

  const handleCloseDropdown = (mode: string = contactMode) => {
    setContactMode(mode);
    setAnchorEl(null);
  };

  const handlePasswordConfirmationChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = event.target;
    setPasswordConfirmation(value);
    setPasswordMismatchError(value !== password);
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
      <div style={{ display: "flex" }}>
        <Stack sx={{ width: "60%" }}>
          <img src={SignupImg} alt="helo" />
        </Stack>
        <Paper
          sx={{ width: "40%", paddingX: 4, paddingY: 2, borderRadius: 4 }}
        >
          <Stack spacing={2}>
            <div
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <Typography
                variant="h4"
                sx={{ color: "#3A244A", fontWeight: "bold" }}
              >
                Let us know{" "}
                <span style={{ color: "#D72638" }}>!</span>
              </Typography>
              <Link to="Signin">
                <Typography
                  variant="h6"
                  sx={{ color: "#3A244A", fontSize: "small", placeSelf: "end" }}
                >
                  Sign <span style={{ color: "#D72638" }}>In</span>
                </Typography>
              </Link>
            </div>
            <TextField
              id="standard-basic"
              label="First Name"
              variant="standard"
            />
            <TextField
              id="standard-basic"
              label="Last Name"
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
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </FormControl>
            <FormControl sx={{ m: 1, width: "100%" }} variant="standard">
              <InputLabel htmlFor="standard-adornment-password">
                Retype Password
              </InputLabel>
              <Input
                id="standard-adornment-password"
                type={showPasswordRe ? "text" : "password"}
                onBlur={() => setShowPasswordRe(false)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPasswordRe}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPasswordRe ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                onChange={handlePasswordConfirmationChange}
                value={passwordConfirmation}
                error={passwordMismatchError}
              />
              {passwordMismatchError && (
                <Typography variant="caption" color="error">
                  Passwords do not match
                </Typography>
              )}
            </FormControl>
            <FormControl sx={{ m: 1, width: "100%" }} variant="standard">
              <InputLabel htmlFor="standard-adornment-password">
                {contactMode}
              </InputLabel>
              <Input
                id="standard-adornment-password"
                type={contactMode === "Contact Mode" ? "text" : contactMode}
                onBlur={() => setShowPasswordRe(false)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-controls="simple-menu"
                      aria-haspopup="true"
                      aria-label="Open to show more"
                      title="Open to show more"
                      onClick={handleDropdown}
                    >
                      <ArrowDropDownOutlinedIcon />
                    </IconButton>
                    <Menu
                      id="simple-menu"
                      anchorEl={anchorEl}
                      keepMounted
                      open={Boolean(anchorEl)}
                      onClose={() => handleCloseDropdown}
                    >
                      {dropdown.map((item) => (
                        <MenuItem
                          onClick={() => handleCloseDropdown(item.label)}
                          key={item.value}
                          value={item.value}
                        >
                          {item.label}
                        </MenuItem>
                      ))}
                    </Menu>
                  </InputAdornment>
                }
              />
            </FormControl>
            <TextField
              id="standard-basic"
              label="Enter Email"
              type="email"
              variant="standard"
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
            >
              Sign Up
            </Button>
          </Stack>
        </Paper>
      </div>
    </div>
  );
};

export default Signup;
