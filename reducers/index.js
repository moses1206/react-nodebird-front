import { HYDRATE } from 'next-redux-wrapper';
import { combineReducers } from 'redux';

import user from './user';
import post from './post';

// 리듀서는 (이전상태, 액션) 을 통해서 다음상태를 만들어내는 함수이다.
const rootReducer = combineReducers({
  // 서버사이드 랜더링을 위해 HYDRATE를 사용해야 하고 사용하기 위해 index리듀서를 추가한 것이다.
  index: (state = {}, action) => {
    switch (action.type) {
      case HYDRATE:
        console.log('HYDRATE', action);
        return {
          ...state,
          ...action.payload,
        };

      default:
        return state;
    }
  },
  user,
  post,
});

export default rootReducer;
