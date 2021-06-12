import {
  all,
  delay,
  fork,
  put,
  takeLatest,
  throttle,
  call,
} from 'redux-saga/effects';
import axios from 'axios';

import {
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  ADD_POST_FAILURE,
  LOAD_POST_REQUEST,
  LOAD_POST_SUCCESS,
  LOAD_POST_FAILURE,
  REMOVE_POST_REQUEST,
  REMOVE_POST_SUCCESS,
  REMOVE_POST_FAILURE,
  REMOVE_POST_OF_ME,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_FAILURE,
  ADD_POST_TO_ME,
} from '../reducers/types';

function loadPostsAPI(data) {
  return axios.get('/posts', data);
}

function* loadPosts(action) {
  try {
    const result = yield call(loadPostsAPI, action.data);
    yield put({
      type: LOAD_POST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: LOAD_POST_FAILURE,
      data: err.response.data,
    });
  }
}

function addPostAPI(data) {
  // req.body.content를 보내주기위해 content:data 입력
  return axios.post('/post', { content: data });
}

function* addPost(action) {
  try {
    const result = yield call(addPostAPI, action.data);

    // Post가 등록되면은 User의 Posts 갯수도 +1이 되어야하므로
    // Post가 등록될때 User의 Posts의 내용도 바꿔야한다.
    yield put({
      type: ADD_POST_SUCCESS,
      data: result.data,
    });
    yield put({
      type: ADD_POST_TO_ME,
      data: result.data.id,
    });
  } catch (err) {
    yield put({
      type: ADD_POST_FAILURE,
      data: err.response.data,
    });
  }
}

function removePostAPI(data) {
  return axios.delete('/api/post', data);
}

function* removePost(action) {
  try {
    // const result = yield call(addPostAPI,action.payload)
    yield delay(1000);

    // Post가 삭제될때 User의 Posts 갯수도 -1이 되어야하므로
    // Post가 삭제될때 User의 Posts의 내용도 바꿔야한다.
    yield put({
      type: REMOVE_POST_SUCCESS,
      data: action.data,
    });
    yield put({
      type: REMOVE_POST_OF_ME,
      data: action.data,
    });
  } catch (err) {
    yield put({
      type: REMOVE_POST_FAILURE,
      data: err.response.data,
    });
  }
}

function addCommentAPI(data) {
  // data : {content,postId,userId}
  // POST   /post/1/comment
  return axios.post(`/post/${data.postId}/comment`, data);
}

function* addComment(action) {
  try {
    const result = yield call(addCommentAPI, action.data);
    yield put({
      type: ADD_COMMENT_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ADD_COMMENT_FAILURE,
      data: err.response.data,
    });
  }
}

function* watchLoadPosts() {
  yield throttle(5000, LOAD_POST_REQUEST, loadPosts);
}

function* watchAddPost() {
  // 2초동안 여러번 눌러도 1번만 서버에 요청을 보낸다.
  yield takeLatest(ADD_POST_REQUEST, addPost);
}

function* watchRemovePost() {
  // 2초동안 여러번 눌러도 1번만 서버에 요청을 보낸다.
  yield takeLatest(REMOVE_POST_REQUEST, removePost);
}

function* watchAddComment() {
  try {
    yield takeLatest(ADD_COMMENT_REQUEST, addComment);
  } catch (err) {
    console.log(err);
  }
}

export default function* postSaga() {
  yield all([
    fork(watchAddPost),
    fork(watchRemovePost),
    fork(watchAddComment),
    fork(watchLoadPosts),
  ]);
}
