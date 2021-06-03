// 제너레이터는 함수이다. generate.next()하면 첫번째 Yield에서 멈춘다 다시 generate.next()하면
// 두번째 Next에서 멈춘다. 중단점이 있는 함수이다.
// While (true) {}       >>>>>>>>>>>>>>  무한반복이 된다. 절대 멈추지 않는다. 하지만 yield를 사용하면
// 무한반복을 멈추게 된다.

// let i = 0;
// const gen = function* () {
//   while (true) {
//     yield i++;
//   }
// };
// const g = gen();
// g.next();

import { all, fork } from "redux-saga/effects";

import postSaga from "./post";
import userSaga from "./user";

export default function* rootSaga() {
  // All은 동시에 배열안에 모든것을 실행한다.
  yield all([fork(postSaga), fork(userSaga)]);
}
