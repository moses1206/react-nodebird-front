import {
  all,
  delay,
  fork,
  put,
  take,
  takeLatest,
} from "@redux-saga/core/effects";
import axios from "axios";

function addPostAPI(data) {
  return axios.post("/api/post", data);
}

function* addPost(action) {
  try {
    // const result = yield call(addPostAPI,action.payload)
    yield delay(1000);
    yield put({
      type: "ADD_POST_REQUEST",
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: "ADD_POST_FAILURE",
      data: err.response.data,
    });
  }
}

function* watchAddPost() {
  // 2초동안 여러번 눌러도 1번만 서버에 요청을 보낸다.
  yield takeLatest("ADD_POST_REQUEST", addPost);
}

export default function* postSaga() {
  yield all([fork(watchAddPost)]);
}
