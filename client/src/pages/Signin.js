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
import axios from "axios";
import { apiUrl } from "../data/api";
import { CircularProgress } from "@mui/material";
import styled from "styled-components";
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

export default function SignIn() {
  const [user, setuser] = React.useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const [loader_addbtn, setloader_addbtn] = React.useState(false);

  let name, value;
  const handleLogin = (e) => {
    e.preventDefault();
    name = e.target.name;
    value = e.target.value;

    setuser({ ...user, [name]: value });
    console.log(value);
  };

  const Postdata = async (e) => {
    e.preventDefault(); //????
    const { email, password } = user;
    try {
      setloader_addbtn(true);

      const res = await axios.post(
        apiUrl + `/signin`,
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );
      if (res.status !== 200) {
        throw new Error(res.error);
      }
      setloader_addbtn(false);

      navigate("/");
      // window.alert("login success");
    } catch (error) {
      window.alert("invalid credentials");
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
            Sign in
          </Typography>
          <Box
            component="form"
            method="POST"
            onSubmit={Postdata}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              value={user.email}
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={handleLogin}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={user.password}
              onChange={handleLogin}
            />
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
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
                Sign In
              </Button>
            )}
            <Grid container>
              <Grid item xs>
                {/* <Link href="#" variant="body2">
                  Forgot password?
                </Link> */}
              </Grid>
              <Grid item>
                <Link href="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
      </Container>
    </ThemeProvider>
  );
}
