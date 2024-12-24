import { authConstant } from "@/actions/constants";

const initialState = {
  userData: {
    name: "",
    password: "",
  },
  isLoading: false,
  errorCode: null,
  errorMessage: "",
  isLogined: false,
};

export default (state = initialState, action) => {
  console.log(action.type);
  switch (action.type) {
    case authConstant.LOGIN_REQUEST:
      state = {
        ...state,
        userData: {
          name: "",
          password: "",
        },
        isLoading: true,
        errorCode: null,
        errorMessage: "",
        isLogined: false,
      };
      break;
    case authConstant.LOGIN_FAILURE:
      state = {
        ...state,
        userData: {
          name: "",
          password: "",
        },
        isLoading: false,
        errorCode: action.payload.errorCode,
        errorMessage: action.payload.errorMessage,
        isLogined: false,
      };
      break;
    case authConstant.LOGIN_SUCCESS:
      state = {
        ...state,
        userData: {
          ...action.payload,
        },
        isLoading: false,
        errorCode: null,
        isLogined: true,
        errorMessage: "",
      };
      break;
    case authConstant.LOGOUT_SUCCESS:
      state = {
        userData: {
          name: "",
          password: "",
        },
        isLoading: false,
        errorCode: null,
        errorMessage: "",
        isLogined: false,
      };
      break;
  }
  console.log(state);
  return state;
};
