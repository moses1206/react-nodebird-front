export const initialState = {
  isLoggedIn: false,
  me: null,
  signUpData: {},
  loginData: {},
};

export const LOG_IN = "LOG_IN";
export const LOG_OUT = "LOG_OUT";

// async action creator(비동기 액션 크리에이터)
// Action Creator

export const loginAction = (data) => {
  return {
    type: LOG_IN,
    data,
  };
};
export const logoutAction = () => {
  return {
    type: LOG_OUT,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOG_IN":
      return {
        ...state,
        isLoggedIn: true,
        me: action.data,
      };

    case "LOG_OUT":
      return {
        ...state,
        isLoggedIn: false,
        me: null,
      };

    default:
      return state;
  }
};

export default reducer;
