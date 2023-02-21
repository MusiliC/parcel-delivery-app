import axios from "axios";

const url = "http://localhost:5000/users";

export const fetchPosts = () => axios.get(url);

export const signIn = (formData) =>
  axios.post(
    `${url}/register
`,
    formData
  );
export const signUp = (formData) => axios.post(`${url}/sign`, formData);

export const oneUser = (id) => axios.get(`${url}/${id}`);
