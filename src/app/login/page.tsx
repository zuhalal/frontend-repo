"use client";

import { signInWithEmail } from "@/lib/firebase/auth";
import React, { useState } from "react";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useRouter } from "next/navigation";

import cookie from 'cookie';
import { redirect } from 'next/navigation'

const Login = () => {
  const cookies = cookie.parse(document.cookie);
  const [message, setMessage] = useState("");

  const uid = cookies.uid;

  if (uid) {
    redirect('/');
  }
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await signInWithEmail(email, password);
      router.push("/");
    } catch (error: any) {
      setMessage(error?.message)
      console.log(error)
    }
  };
  return (
    <Container component="main" maxWidth="xs">
    <Box
      sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign in
      </Typography>
      <Box component="form" onSubmit={handleLogin} noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
          onChange={(e) => setEmail(e.target.value)}
          value={email}
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
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
        />
        {message && <Typography color="red" >{message}</Typography>}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign In
        </Button>
        <Grid container>
          <Grid item>
            <Link href="/register" variant="body2">
              {"Don't have an account? Sign Up"}
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Box>
  </Container>
  );
};

// export async function getServerSideProps(context: GetServerSidePropsContext) {
//   const { req } = context;
//   const cookies = cookie.parse(req ? req.headers.cookie || "" : document.cookie);

//   // Now you can use the uid stored in cookies for server-side logic
//   const uid = cookies.uid;

//   if (uid) {
//     redirect('/');
//   }

//   // Fetch user-specific data here using the uid
//   return {
//     props: {
//       uid,
//     },
//   };
// }

export default Login;