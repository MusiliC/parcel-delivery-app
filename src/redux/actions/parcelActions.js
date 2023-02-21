import { actionTypes } from "../actions/actionTypes.js";

import * as api from "../../api/parcelIndex";

export const getParcels = () => async (dispatch) => {
  try {
    const { data } = await api.fetchParcels();
    dispatch({ type: actionTypes.ALL_PARCELS, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const createParcel = (newParcel) => async (dispatch) => {
  try {
    const { data } = await api.createParcel(newParcel);

    dispatch({ type: actionTypes.CREATE_PARCEL, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const updateParcel = (id, parcelData) => async (dispatch) => {
  try {
    const { data } = await api.updateParcel(id, parcelData);
    dispatch({ type: actionTypes.UPDATE_PARCEL, payload: data });
    dispatch(getParcels());
  } catch (error) {
    console.log(error);
  }
};

export const deleteParcel = (id) => async (dispatch) => {
  try {
    await api.deleteParcel(id);
    dispatch({ type: actionTypes.DELETE_PARCEL, payload: id });
    dispatch(getParcels());
  } catch (error) {
    console.log(error);
  }
};

export const getOneParcel = (id) => async (dispatch) => {
  try {
    const { data } = await api.oneParcel(id);
    dispatch({ type: actionTypes.ONE_PARCEL, payload: data });
 
  } catch (error) {
    console.log(error);
  }
};
