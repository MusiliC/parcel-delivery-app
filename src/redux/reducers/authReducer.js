import { actionTypes } from "../actions/actionTypes";

const initialState = {
  authUser: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH:
      localStorage.setItem("profile", JSON.stringify({ ...action?.payload }));
      return {
        ...state,
        authUser: action?.payload,
      };

    case actionTypes.LOGOUT:
      localStorage.removeItem("profile");
      return { ...state, authUser: null };
    default:
      return state;
  }
};

export default authReducer;
