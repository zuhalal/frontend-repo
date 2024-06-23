import { UPDATE_PROFILE_FAIL, UPDATE_PROFILE_START, UPDATE_PROFILE_SUCCESS } from "@/store/actions";
import { UserData } from "./user";

export type UpdateProfileStartAction = {
  type: typeof UPDATE_PROFILE_START;
}

export type UpdateProfileSuccessAction = {
  type: typeof UPDATE_PROFILE_SUCCESS;
  payload: UpdateProfileResponse;
}

export type UpdateProfileFailAction = {
  type: typeof UPDATE_PROFILE_FAIL;
  payload: string;
}

export type UpdateProfileResponse = {
  data: UserData;
  message: string;
  error?: boolean;
}

export type ProfileActionTypes = UpdateProfileStartAction | UpdateProfileSuccessAction | UpdateProfileFailAction;