import { combineReducers } from "@reduxjs/toolkit";
import { UPDATE_PROFILE_FAIL, UPDATE_PROFILE_START, UPDATE_PROFILE_SUCCESS } from "./actions";
import { ProfileActionTypes } from "@/contracts/actions";

export const initialState = {
  profile: null,
  loading: false,
  error: null
};


const profileReducer = (state = initialState, action: ProfileActionTypes) => {
  switch (action.type) {
    case UPDATE_PROFILE_START:
      return { ...state, loading: true, error: null };
    case UPDATE_PROFILE_SUCCESS:
      return { ...state, loading: false, profile: action.payload };
    case UPDATE_PROFILE_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  profile: profileReducer
});

export type AppState = ReturnType<typeof rootReducer>;


export default rootReducer;