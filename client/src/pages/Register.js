import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { apiUrl } from "../data/api";
import axios from "axios";
import { CircularProgress } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function SignUp() {
  const [user, setuser] = React.useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    cpassword: "",
  });
  const [profileimg, setprofileimg] = React.useState();
  const [loader_addbtn, setloader_addbtn] = React.useState(false);
  const navigate = useNavigate();

  let name, value;
  const handleInput = (e) => {
    // console.log(e.target.name); //this is name,email,...
    name = e.target.name;
    value = e.target.value;

    setuser({ ...user, [name]: value });
  };

  const Postdata = async (e) => {
    e.preventDefault(); //????
    const { name, email, password, phone, cpassword } = user;
    if (!name || !email || !phone || !password || !cpassword) {
      window.alert("please fill properly");
    } else {
      const formData = new FormData(); //work only with multer in backend
      formData.append("name", name);
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("password", password);
      formData.append("cpassword", cpassword);
      formData.append("file", profileimg);

      // console.log(Array.from(formData));
      setloader_addbtn(true);

      const res = await axios.post(
        apiUrl + `/signup`,
        // {
        //   name,
        //   email,
        //   password,
        //   phone,
        //   cpassword,
        //   a,
        // },
        formData,
        {
          withCredentials: true,
        }
      );
      const data = await res.data;
      console.log(data.status);

      if (data.status === 422) {
        window.alert(data.error);
        // console.log(res);
        console.log("invalid registration");
      } else {
        window.alert(data.message);
        console.log("registration successful");

        navigate("/login");
      }
      setloader_addbtn(false);
    }
  };
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            method="POST"
            noValidate
            onSubmit={Postdata}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="name"
                  value={user.name}
                  // required
                  fullWidth
                  id="name"
                  label="Name"
                  autoFocus
                  onChange={handleInput}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  // required

                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  value={user.email}
                  autoComplete="email"
                  onChange={handleInput}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  // required
                  fullWidth
                  id="phone"
                  label="Phone Number"
                  name="phone"
                  value={user.phone}
                  // autoComplete="family-name"
                  onChange={handleInput}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  // required
                  fullWidth
                  name="password"
                  value={user.password}
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={handleInput}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  // required
                  fullWidth
                  name="cpassword"
                  value={user.cpassword}
                  label="Confirm Password"
                  type="password"
                  id="confirm_password"
                  // autoComplete="new-password"
                  onChange={handleInput}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  // required
                  fullWidth
                  type="file"
                  // autoComplete="new-password"
                  onChange={(e) => setprofileimg(e.target.files[0])}
                />
              </Grid>
            </Grid>
            {loader_addbtn ? (
              <CircularProgress style={{ display: "flex", margin: "auto" }} />
            ) : (
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                // onClick={Postdata}
              >
                Sign Up
              </Button>
            )}
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        {/* <Copyright sx={{ mt: 5 }} /> */}
      </Container>
    </ThemeProvider>
  );
}
