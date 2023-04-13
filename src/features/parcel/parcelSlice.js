import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const url = "http://localhost:5000/parcels";

//fetch parcels async thunk
export const fetchParcels = createAsyncThunk(
  "parcels/fetchParcels",
  async (parcelData, thunkAPI) => {
    try {
      // console.log(thunkAPI);
      const response = await axios.get(url);
      return [...response.data];
    } catch (error) {
      return thunkAPI.rejectWithValue(
        "something went wrong try check your network"
      );
    }
  }
);

//create new parcel

export const newParcel = createAsyncThunk(
  "parcels/create",
  async (parcelData, thunkAPI) => {
    try {
      console.log(parcelData);
      const response = await axios.post(`${url}/create`, parcelData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

//update parcel

export const updateParcel = createAsyncThunk(
  "parcels/update",
  async (parcelData, thunkAPI) => {
    try {
      const { id } = parcelData;
      console.log(parcelData);
      const response = await axios.patch(`${url}/update/${id}`, parcelData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

//delete parcel

export const deleteParcel = createAsyncThunk(
  "parcels/delete",
  async (id, thunkAPI) => {
    try {
      const response = await axios.delete(`${url}/delete/${id}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

const initialState = {
  parcels: [],
  error: null,
  isLoading: false,
};

const parcelSlice = createSlice({
  name: "parcel",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchParcels.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchParcels.fulfilled, (state, action) => {
        state.isLoading = false;
        state.parcels = action.payload;
      })
      .addCase(fetchParcels.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(newParcel.fulfilled, (state, action) => {
        state.parcels = [...state.parcels, action.payload];
      })
      .addCase(deleteParcel.fulfilled, (state, action) => {
        state.parcels = state.parcels.filter(
          (parcel) => parcel.id !== action.payload.id
        );
      })
      .addCase(updateParcel.fulfilled, (state, action) => {
        if (!action.payload?.id) {
          console.log("Could not complete update ");
          console.log(action.payload);
          return;
        }
        state.parcels = [
          ...parcels,
          state.parcels.map((parcel) =>
            parcel._id === action.payload.id ? action.payload : parcel
          ),
        ];
      });
  },
});

export const selectAllParcels = (state) => state.parcels;

export const selectParcelById = (state, id) =>
  state.parcels?.parcels.find((parcel) => parcel._id === id);

export default parcelSlice.reducer;
