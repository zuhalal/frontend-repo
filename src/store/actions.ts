import { ProfileActionTypes, UpdateProfileFailAction, UpdateProfileResponse, UpdateProfileStartAction, UpdateProfileSuccessAction } from "@/contracts/actions";
import { UserData } from "@/contracts/user";
import { fetchWithFirebaseHeadersClient } from "@/lib/firebase/clientFetcher";
import { Dispatch } from "@reduxjs/toolkit";

export const UPDATE_PROFILE_START = 'UPDATE_PROFILE_START';
export const UPDATE_PROFILE_SUCCESS = 'UPDATE_PROFILE_SUCCESS';
export const UPDATE_PROFILE_FAIL = 'UPDATE_PROFILE_FAIL';

export const updateProfileAsync = (profileData: UserData) => {
  return (dispatch: Dispatch<ProfileActionTypes>) => {
    dispatch(updateProfileStart() as UpdateProfileStartAction);
    
    fetchWithFirebaseHeadersClient(`${process.env.NEXT_PUBLIC_API_URL}/api/update-user-data?username=${profileData.username}&address=${profileData.address}`, "POST", profileData)
    .then(response => {
      if (!response.ok) {
        console.error('Error:', response);
      }
      return response.json();
    })
    .then(data => {
      if (data?.error) {
        dispatch(updateProfileFail(data?.message) as UpdateProfileFailAction);
      } else {
        dispatch(updateProfileSuccess(data) as UpdateProfileSuccessAction);
      }
    })
    .catch(error => {
      console.log(error)
      dispatch(updateProfileFail(error.message) as UpdateProfileFailAction);
    });
  };
};

export const updateProfileStart = () => ({
  type: UPDATE_PROFILE_START
});

export const updateProfileSuccess = (profileData: UpdateProfileResponse) => ({
  type: UPDATE_PROFILE_SUCCESS,
  payload: profileData
});

export const updateProfileFail = (error: string) => ({
  type: UPDATE_PROFILE_FAIL,
  payload: error
});

