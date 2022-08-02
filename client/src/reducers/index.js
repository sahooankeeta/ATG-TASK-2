import * as actionType from "../helpers/constants.js";

const initialState = {
  isLoading: false,
  profile: localStorage.getItem("profile")
    ? JSON.parse(localStorage.getItem("profile"))
    : {},
  posts: localStorage.getItem("posts")
    ? JSON.parse(localStorage.getItem("posts"))
    : [],
  error: "",
};
const reducers = (state = initialState, action) => {
  switch (action.type) {
    case actionType.AUTH:
      localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
      //console.log(action.data);
      return { ...state, profile: action.data, isLoading: false, error: "" };
    case actionType.LOGOUT:
      localStorage.clear();

      return {
        ...state,
        isLoading: false,
        posts: [],
        error: "",
        profile: {},
      };
    case actionType.SET_LOADING: //HANDLE LOADING EVENT
      return { ...state, isLoading: action.payload };
    case actionType.SET_ERROR: //HANDLE ERROR
      return { ...state, error: action.payload };
    case actionType.FETCH_ALL_POSTS:
      return { ...state, posts: action.payload };
    case actionType.CREATE:
      return { ...state, posts: [...state.posts, action.payload], error: "" };
    case actionType.UPDATE:
      return {
        ...state,
        error: "",
        posts: state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
      };
    case actionType.DELETE:
      return {
        ...state,
        error: "",
        posts: state.posts.filter((post) => post._id !== action.payload),
      };
    case actionType.LIKE:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
      };
    case actionType.CREATE_COMMENT:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
      };
    default:
      return state;
  }
};
export default reducers;
