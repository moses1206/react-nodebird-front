const initialState = {
  user: {
    isLoggedIn: false,
    user: null,
    signUpData: {},
    loginData: {},
  },
  post: {
    mainPosts: [],
  },
};

// async action creator(비동기 액션 크리에이터)
// Action Creator
const changeNickname = (data) => {
  return {
    type: "CHANGE_NICKNAME",
    data,
  };
};

export const loginAction = (data) => {
  "LOG_IN", data;
};

export const logoutAction = () => {
  "LOG_OUT";
};

// 리듀서는 (이전상태, 액션) 을 통해서 다음상태를 만들어내는 함수이다.
const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CHANGE_NICKNAME":
      return {
        ...state,
        name: action.data,
      };
    case "LOG_IN":
      return {
        ...state,
        user: {
          ...state.user,
          isLoggedIn: true,
          user: action.data,
        },
      };
    case "LOG_OUT":
      return {
        ...state,
        user: {
          ...state.user,
          isLoggedIn: false,
          user: null,
        },
      };
  }
};

export default rootReducer;
