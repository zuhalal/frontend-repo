"use client";

import React, { useEffect, useState } from 'react'
import { Box, Button, TextField, Typography } from "@mui/material";
import { UserData } from '@/contracts/user';
import { useDispatch, useSelector } from 'react-redux';
import { ProfileActionTypes, UpdateProfileStartAction } from '@/contracts/actions';
import { updateProfileAsync } from '@/store/actions';
import { Dispatch } from '@reduxjs/toolkit';
import { AppState } from '@/store/reducers';

type UpdateUserFormProps = {
  data: UserData | null;
}

const UpdateUserForm = ({ data }: UpdateUserFormProps) => {
  const [username, setUsername] = useState(data?.username || "");
  const [address, setAddress] = useState(data?.address || "");

  const profile = useSelector((state: AppState) => state.profile);

  const dispatch = useDispatch<Dispatch<ProfileActionTypes>>();

  const handleUpdateProfile = (e:  React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newProfileData = { username, address };
    // @ts-ignore
    dispatch(updateProfileAsync(newProfileData));
  };

  useEffect(() => {
    if (profile?.profile?.data) {
      profile?.profile?.data?.username && setUsername(profile?.profile?.data?.username);
      profile?.profile?.data?.address && setAddress(profile?.profile?.data?.address);
    }
  }, [profile])
    

  return (
    <Box display={'flex'} flexDirection={"column"} justifyContent={"center"} alignItems={'center'} padding={12}>
      {profile?.loading && <Typography>Loading...</Typography>}
      {profile?.error && <Typography color="red" >{profile?.error}</Typography>}
      {(!profile?.loading && profile?.profile?.message && !profile?.error) && <Typography color="green" >{profile?.profile?.message}</Typography>}
      <Box component="form" onSubmit={handleUpdateProfile} noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          name="username"
          label="Username"
          type="text"
          id="username"
          autoComplete="current-username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="address"
          label="Address"
          type="text"
          id="address"
          autoComplete="current-address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Submit
        </Button>
      </Box>
    </Box>
  )
}

export default UpdateUserForm