import * as React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
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
import Grid from "@mui/material/Grid";
const BaseURL = import.meta.env.VITE_API;

const Signup: React.FC = () => {
  

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showPasswordRe, setShowPasswordRe] = useState<boolean>(true);
  const [contactMode, setContactMode] = useState<string>("Contact Mode");
  const [anchorEl, setAnchorEl] = useState<any>(null);

  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [passwordMismatchError, setPasswordMismatchError] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowPasswordRe = () => setShowPasswordRe((show) => !show);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    contactMode: "",
  });

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

  const handleDropdown = (e: any) => {
    setAnchorEl(e.currentTarget);
  };

  const handleCloseDropdown = (mode: string = contactMode) => {
    setContactMode(mode);
    setAnchorEl(null);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setFormData({ ...formData, password: value });
    setPassword(value);
    setPasswordMismatchError(value !== passwordConfirmation);
  };

  const handlePasswordConfirmationChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = event.target;
    setPasswordConfirmation(value);
    setPasswordMismatchError(password !== value && value.length > 0);
  };

  const handleSubmit = async () => {
    console.log(formData);
    try {
      const response = await axios.post(BaseURL + "/register", formData);
      navigate("/signin");
      console.log(response.data);
      // Reset the form data
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        contactMode: "",
      });
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
          src={SignupImg}
          alt="Signup"
          style={{ maxWidth: "100%", height: "auto" }}
        />
      </Grid>
      <Grid item xs={12} md={6} sm={6} style={{ width: "100%" }}>
        <Paper
          sx={{ paddingX: 4, paddingY: 6, borderRadius: 4 }}
          style={{ margin: "0 auto", width: "50%", padding: "28px" }}
        >
          <Stack spacing={2}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Typography
                variant="h4"
                sx={{ color: "#3A244A", fontWeight: "bold" }}
              >
                Let us know <span style={{ color: "#D72638" }}>!</span>
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
              fullWidth
              value={formData.firstName}
              onChange={(e) =>
                setFormData({ ...formData, firstName: e.target.value })
              }
            />
            <TextField
              id="standard-basic"
              label="Last Name"
              variant="standard"
              fullWidth
              value={formData.lastName}
              onChange={(e) =>
                setFormData({ ...formData, lastName: e.target.value })
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
                onChange={handlePasswordChange}
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
                onChange={(e) =>
                  setFormData({ ...formData, contactMode: e.target.value })
                }
                value={formData.contactMode}
              />
            </FormControl>
            <TextField
              id="standard-basic"
              label="Enter Email"
              type="email"
              variant="standard"
              fullWidth
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
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
              onClick={handleSubmit}
            >
              Sign Up
            </Button>
          </Stack>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Signup;
