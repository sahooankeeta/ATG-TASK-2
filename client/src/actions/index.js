import * as actionType from "../helpers/constants.js";
import * as api from "./../api";
import notify from "./../helpers/notify.js";

export const signin = (formData, router) => async (dispatch) => {
  //
  try {
    dispatch({ type: actionType.SET_LOADING, payload: true });
    //notify("info", "please wait");
    const { data } = await api.signIn(formData);
    //console.log(data);
    if (data?.error)
      dispatch({ type: actionType.SET_ERROR, payload: data.error });
    else dispatch({ type: actionType.AUTH, data });
    dispatch({ type: actionType.SET_LOADING, payload: false });
    //notify("success", "signed in success");
    router.push("/");
  } catch (error) {
    console.log(error);
    dispatch({ type: actionType.SET_ERROR, payload: error.message });
    notify("error", error.message);
    dispatch({ type: actionType.SET_LOADING, payload: false });
  }
};

export const signup = (formData, router) => async (dispatch) => {
  // let navigate = useNavigate();
  try {
    dispatch({ type: actionType.SET_LOADING, payload: true });
    const { data } = await api.signUp(formData);

    if (data?.error)
      dispatch({ type: actionType.SET_ERROR, payload: data.error });
    dispatch({ type: actionType.AUTH, data });
    dispatch({ type: actionType.SET_LOADING, payload: false });
    router.push("/");
  } catch (error) {
    console.log(error);
    dispatch({ type: actionType.SET_ERROR, payload: error.message });

    dispatch({ type: actionType.SET_LOADING, payload: false });
  }
};
export const changePassword = (formData) => async (dispatch) => {
  // let navigate = useNavigate();
  try {
    dispatch({ type: actionType.SET_LOADING, payload: true });
    const { data } = await api.changePassword(formData);
    dispatch({ type: actionType.SET_LOADING, payload: false });
    if (data?.error)
      dispatch({ type: actionType.SET_ERROR, payload: data.error });

    //router.push("/");
  } catch (error) {
    console.log(error);
    dispatch({ type: actionType.SET_ERROR, payload: error.message });

    dispatch({ type: actionType.SET_LOADING, payload: false });
  }
};
export const createPost = (formData, router) => async (dispatch) => {
  try {
    dispatch({ type: actionType.SET_LOADING, payload: true });
    const { data } = await api.createPost(formData);

    if (data?.error)
      dispatch({ type: actionType.SET_ERROR, payload: data.error });
    else dispatch({ type: actionType.CREATE, payload: data });
    dispatch({ type: actionType.SET_LOADING, payload: false });
    router.push("/");
  } catch (error) {
    console.log(error);
    dispatch({ type: actionType.SET_ERROR, payload: error.message });

    dispatch({ type: actionType.SET_LOADING, payload: false });
  }
};
export const getPosts = () => async (dispatch) => {
  try {
    dispatch({ type: actionType.SET_LOADING, payload: true });
    const { data } = await api.getAllPosts();

    if (data?.error)
      dispatch({ type: actionType.SET_ERROR, payload: data.error });
    else
      dispatch({
        type: actionType.FETCH_ALL_POSTS,
        payload: data,
      });
    dispatch({ type: actionType.SET_LOADING, payload: false });
  } catch (err) {
    dispatch({ type: actionType.SET_ERROR, payload: err.message });
    dispatch({ type: actionType.SET_LOADING, payload: false });
  }
};
export const likePost = (id) => async (dispatch) => {
  const user = JSON.parse(localStorage.getItem("profile"));

  try {
    const { data } = await api.likePost(id, user.result._id);

    dispatch({ type: actionType.LIKE, payload: data });
  } catch (error) {
    console.log(error);
  }
};
export const deletePost = (id) => async (dispatch) => {
  try {
    await await api.deletePost(id);

    dispatch({ type: actionType.DELETE, payload: id });
  } catch (error) {
    console.log(error);
  }
};
export const updatePost = (id, post, router) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(id, post);

    dispatch({ type: actionType.UPDATE, payload: data });
    router.push("/");
  } catch (error) {
    console.log(error);
  }
};
export const createComment = (formData) => async (dispatch) => {
  const user = JSON.parse(localStorage.getItem("profile"));

  try {
    const { data } = await api.createComment(formData);
    console.log(data);
    dispatch({ type: actionType.CREATE_COMMENT, payload: data });
  } catch (error) {
    console.log(error);
  }
};
