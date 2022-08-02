import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:8000" });

// API.interceptors.request.use((req) => {
//   if (localStorage.getItem("profile")) {
//     req.headers.Authorization = `Bearer ${
//       JSON.parse(localStorage.getItem("profile")).token
//     }`;
//   }

//   return req;
// });

// export const fetchPosts = () => API.get("/posts");
// export const createPost = (newPost) => API.post("/posts", newPost);
// export const likePost = (id) => API.patch(`/posts/${id}/likePost`);
// export const updatePost = (id, updatedPost) =>
//   API.patch(`/posts/${id}`, updatedPost);
// export const deletePost = (id) => API.delete(`/posts/${id}`);

export const signIn = (formData) => API.post("/user/signin", formData);
export const signUp = (formData) => API.post("/user/signup", formData);
export const changePassword = (formData) =>
  API.post("/user/forgetPassword", formData);
export const createPost = (formData) => API.post("/post/create", formData);
export const createComment = (formData) =>
  API.post("/comment/create", formData);
export const getAllPosts = () => API.get("/post/all");
export const likePost = (id, user) => API.patch(`/post/${id}/${user}/likePost`);
export const updatePost = (id, updatedPost) =>
  API.patch(`/post/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/post/${id}`);
