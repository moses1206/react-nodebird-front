import { createWrapper } from 'next-redux-wrapper';
import { applyMiddleware, createStore, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';

import reducer from '../reducers';
import rootSaga from '../sagas';

const loggerMiddleware =
  ({ dispatch, getState }) =>
  (next) =>
  (action) => {
    console.log(action);
    return next(action);
  };

const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [sagaMiddleware, loggerMiddleware];
  const enhancer =
    process.env.NODE_ENV === 'production'
      ? compose(applyMiddleware(...middlewares))
      : composeWithDevTools(applyMiddleware(...middlewares));
  const store = createStore(reducer, enhancer);
  store.sagaTask = sagaMiddleware.run(rootSaga);
  return store;
};

const wrapper = createWrapper(configureStore, {
  debug: process.env.NODE_ENV === 'development',
});

export default wrapper;

// Redux 원리 //
// 1. 메인저장소가 있고
// 2. Action을 만든다. Action 안에 reducer에 넘길 데이터를 작성한다.
// 3. 액션에서 넘긴 데이터는 action.data로 리듀서에 넘어간다.
// 4. 리듀서에서는 기존의 스테이트를 불러온다음 변경되는 데이터만 변경하게된다.
// 5. 중앙저장소와 Reducer를 합해서 Store 이다.
