import {actionTypes} from "../actions/actionTypes";

const initialState = {
  parcel: {},
  parcels: [],
};

const parcelReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ALL_PARCELS:
      return {
        parcels: action.payload,
      };
    case actionTypes.CREATE_PARCEL:
      return {
        ...state,
        parcels: action.payload,
      };
    case actionTypes.UPDATE_PARCEL:
      return {
        parcels: state.map((parcel) =>
          parcel._id === action.payload.id ? action.payload : parcel
        ),
      };

    case actionTypes.DELETE_PARCEL:
      return {
        parcels: state.filter((parcel) => parcel._id !== action.payload),
      };

    case actionTypes.ONE_PARCEL:
      return {
        parcel: action.payload,
      };
    default:
      return state;
  }
};

export default parcelReducer;
