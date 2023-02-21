import { actionTypes } from "../actions/actionTypes";
import * as api from "../../api/authIndex";

export const signIn = (formData) => async (dispatch) => {
  try {
    //log  in user

    const { data } = await api.signIn(formData);

    dispatch({ type: actionTypes.AUTH, payload: data });
    return { success: true, auth: data };
  } catch (error) {
    console.log(error);
    return { success: false };
  }
};

export const signUp = (formData) => async (dispatch) => {
  try {
    //sign up user

    const { data } = await api.signUp(formData);

    dispatch({ type: actionTypes.AUTH, payload: data });
    return { success: true, auth: data };
  } catch (error) {
    console.log(error);
    return { success: false };
  }
};

export const signOut = () => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.LOGOUT,
    });
  };
};
