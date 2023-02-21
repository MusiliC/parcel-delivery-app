import axios from "axios";

const url = "http://localhost:5000/parcels";

export const fetchParcels = () => axios.get(url);

export const createParcel = (newPost) => axios.post(`${url}/create`, newPost);

export const updateParcel = (id, postData) =>
  axios.patch(`${url}/update/${id}`, postData);

export const deleteParcel = (id) => axios.delete(`${url}/delete/${id}`);

export const oneParcel = (id) => axios.get(`${url}/${id}`);
