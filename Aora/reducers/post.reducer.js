import { authConstant, postConstant } from "@/actions/constants";

const initialState = {
  posts: [],
  userPosts: [],
  //post
  isUploading: false,
  //get
  isLoading: false,
  isRefreshing: false,
  //errHandleling
  errorCode: null,
  errorMessage: "",
};

export default (state = initialState, action) => {
  switch (action.type) {
    case postConstant.CREATE_POST_REQUEST:
      state = {
        ...state,
        isUploading: true,
      };
      break;
    case postConstant.CREATE_POST_FAILURE:
      state = {
        ...state,
        isUploading: false,
        errorCode: action.payload.errorCode,
        errorMessage: action.payload.errorMessage,
      };
      break;
    case postConstant.CREATE_POST_SUCCESS:
      state = {
        ...state,
        posts: [action.payload, ...state.posts],
        userPosts: [action.payload, ...state.userPosts],
        isUploading: false,
        errorCode: null,
        errorMessage: "",
      };
      break;

    //get

    case postConstant.GET_POST_REQUEST:
      state = {
        ...state,
        isLoading: true,
      };
      break;
    case postConstant.GET_POST_SUCCESS:
      state = {
        ...state,
        posts: [...state.posts, ...action.payload.posts],

        isLoading: false,
        errorCode: null,
        errorMessage: "",
      };
      break;
    case postConstant.GET_REFRESH_POST_REQUEST:
      state = {
        ...state,
        isRefreshing: true,
        isLoading: true,
      };
      break;
    case postConstant.GET_REFRESH_POST_SUCCESS:
      state = {
        ...state,
        posts: [...action.payload.posts],

        isLoading: false,
        isRefreshing: false,
        errorCode: null,
        errorMessage: "",
      };
      break;
    case postConstant.GET_USER_POST_REQUEST:
      state = {
        ...state,
        isLoading: true,
      };
      break;
    case postConstant.GET_USER_POST_SUCCESS:
      state = {
        ...state,
        userPosts: [...state.posts, ...action.payload.posts],
        isLoading: false,
        errorCode: null,
        errorMessage: "",
      };
      break;
    case postConstant.GET_REFRESH_USER_POST_FAILURE:
      state = {
        ...state,
        isRefreshing: true,
        isLoading: true,
      };
      break;
    case postConstant.GET_REFRESH_USER_POST_SUCCESS:
      state = {
        ...state,
        userPosts: [...action.payload.posts],
        isLoading: false,
        isRefreshing: false,
        errorCode: null,
        errorMessage: "",
      };
      break;
    case authConstant.LOGOUT_SUCCESS:
      state = {
        posts: [],
        userPosts: [],
        //post
        isUploading: false,
        //get
        isLoading: false,
        isRefreshing: false,
        //errHandleling
        errorCode: null,
        errorMessage: "",
      };
      break;
  }
  console.log(state);
  return state;
};
