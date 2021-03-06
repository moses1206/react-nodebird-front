import { all, call, delay, fork, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

import {
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_IN_FAILURE,
  LOG_OUT_REQUEST,
  LOG_OUT_SUCCESS,
  LOG_OUT_FAILURE,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
  FOLLOW_REQUEST,
  FOLLOW_SUCCESS,
  FOLLOW_FAILURE,
  UNFOLLOW_REQUEST,
  UNFOLLOW_SUCCESS,
  UNFOLLOW_FAILURE,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAILURE,
  CHANGE_NICKNAME_REQUEST,
  CHANGE_NICKNAME_SUCCESS,
  CHANGE_NICKNAME_FAILURE,
  LOAD_FOLLOWINGS_REQUEST,
  LOAD_FOLLOWERS_REQUEST,
  LOAD_FOLLOWINGS_SUCCESS,
  LOAD_FOLLOWINGS_FAILURE,
  LOAD_FOLLOWERS_SUCCESS,
  LOAD_FOLLOWERS_FAILURE,
  REMOVE_FOLLOWER_REQUEST,
  REMOVE_FOLLOWER_SUCCESS,
  REMOVE_FOLLOWER_FAILURE,
  LOAD_MY_INFO_REQUEST,
  LOAD_MY_INFO_SUCCESS,
  LOAD_MY_INFO_FAILURE,
} from '../reducers/types';

// ***************************************//
// ************* LoadMyInfo **************//
// ***************************************//
function loadMyInfoAPI() {
  return axios.get('/user');
}

function* loadMyInfo() {
  try {
    const result = yield call(loadMyInfoAPI);
    yield put({
      type: LOAD_MY_INFO_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_MY_INFO_FAILURE,
      error: err.response.data,
    });
  }
}

// ***************************************//
// ************** LoadUser ***************//
// ***************************************//
function loadUserAPI(data) {
  return axios.get(`/user/${data}`);
}

function* loadUser(action) {
  try {
    const result = yield call(loadUserAPI, action.data);
    console.log('loadUserData', result.data);
    yield put({
      type: LOAD_USER_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_USER_FAILURE,
      error: err.response.data,
    });
  }
}

// ***************************************//
// ************** LogIN USER**************//
// ***************************************//
// BaseURL 설정을 했기 때문에 http://localhost:3065는 삭제한다.
// Log In
function logInAPI(data) {
  return axios.post('/user/login', data);
}

function* logIn(action) {
  // Call은 데이터를 받아올때까지 기다리는 것이고 fork 는 데이터를 받아오면서 다른것도 동시에 실행된다.
  //   요청의 성공은 result.data , 실패는 err.response.data에 담겨져있따.

  try {
    // put은 thunk의 dispatch와 같다.
    // delay 는 setItemout과 기능이 같다.
    // result에 서버에서 보낸 res.json(user) => deserialize된 User 데이터가 담긴다.
    const result = yield call(logInAPI, action.data);
    yield put({
      type: LOG_IN_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOG_IN_FAILURE,
      error: err.response.data,
    });
  }
}

// ***************************************//
// ************** LogOut USER*************//
// ***************************************//
function logOutAPI() {
  return axios.post('/user/logout');
}

function* logOut() {
  try {
    yield call(logOutAPI);
    yield put({
      type: LOG_OUT_SUCCESS,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOG_OUT_FAILURE,
      error: err.response.data,
    });
  }
}

// ***************************************//
// ************* SIGN UP USER*************//
// ***************************************//
function signUpAPI(data) {
  return axios.post('/user', data);
}

function* signUp(action) {
  try {
    const result = yield call(signUpAPI, action.data);
    console.log(result);
    yield delay(1000);
    yield put({
      type: SIGN_UP_SUCCESS,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: SIGN_UP_FAILURE,
      error: err.response.data,
    });
  }
}

// ***************************************//
// ************* FOLLOW USER**************//
// ***************************************//
function followAPI(data) {
  return axios.patch(`/user/${data}/follow`);
}

function* follow(action) {
  try {
    const result = yield call(followAPI, action.data);
    yield put({
      type: FOLLOW_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: FOLLOW_FAILURE,
      error: err.response.data,
    });
  }
}

// ***************************************//
// ************ UNFOLLOW USER*************//
// ***************************************//
function unfollowAPI(data) {
  return axios.delete(`/user/${data}/follow`);
}

function* unfollow(action) {
  try {
    const result = yield call(unfollowAPI, action.data);
    yield put({
      type: UNFOLLOW_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: UNFOLLOW_FAILURE,
      error: err.response.data,
    });
  }
}

// ***************************************//
// ********** CHANGE NICK NAME************//
// ***************************************//
function changeNicknameAPI(data) {
  return axios.patch('user/nickname', { nickname: data });
}

function* changeNickname(action) {
  try {
    const result = yield call(changeNicknameAPI, action.data);
    yield put({
      type: CHANGE_NICKNAME_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: CHANGE_NICKNAME_FAILURE,
      error: err.response.data,
    });
  }
}

// ***************************************//
// ********** LOAD FOLLOWINGS ************//
// ***************************************//
function loadFollowingsAPI(data) {
  return axios.get('/user/followings', data);
}

function* loadFollowings(action) {
  try {
    const result = yield call(loadFollowingsAPI, action.data);
    yield put({
      type: LOAD_FOLLOWINGS_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_FOLLOWINGS_FAILURE,
      error: err.response.data,
    });
  }
}

// ***************************************//
// ********** LOAD FOLLOWERS ************//
// ***************************************//
function loadFollowersAPI(data) {
  return axios.get('/user/followers', data);
}

function* loadFollowers(action) {
  try {
    const result = yield call(loadFollowersAPI, action.data);
    yield put({
      type: LOAD_FOLLOWERS_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_FOLLOWERS_FAILURE,
      error: err.response.data,
    });
  }
}

// ***************************************//
// ********** REMOVE FOLLOWER ************//
// ***************************************//
function removeFollowerAPI(data) {
  return axios.delete(`/user/follower/${data}`);
}

function* removeFollower(action) {
  try {
    const result = yield call(removeFollowerAPI, action.data);
    yield put({
      type: REMOVE_FOLLOWER_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: REMOVE_FOLLOWER_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchLogIn() {
  //   Take는 LOG_IN이 실행될때까지 기다리겠다는 것이다.
  //   Take는 일회용이다. 1번만 딱 실행해준다.
  //   while take는 동기적으로 동작하지만 takeEvery(while문 대체)는 비동기로 동작한다.
  //   takeLatest는 여러번 눌렀을때 마지막것만 실행된다. 클릭실수를 막아준다.
  //   takeLatest는 따닥2번 눌렀을때 응답만 2번 중1번만 할뿐 만약 입력이 2번눌리었다면
  //                2번다 서버에 저장되고 1번만 프론트로 데이타를 넘긴다. 요청까지 취소못한다.
  //                새로고침하면 같은게 2개가 뜨게된다.
  //   그래서 throttle이 필요하다. throttle("ADD_POST_REQUEST", addPost, 2000)
  //   요청보내느것도 정해진 시간에 1번만 보내게 된다. 보통 스크롤해서 데이터를 불러올때 Throttle을 많이 사용한다.
  //   제로초는 대부분 Takelastest를 사용하고 요청이 2번오는것은 서버에서 검사해서 처리하도록한다.

  // 순서도 fork를 통해 watchLogIn을 실행하면 watchlgoIn은 loginAPI를 통해 서버에서 데이터를 받아온다.
  yield takeLatest(LOG_IN_REQUEST, logIn);
}

function* watchLoadUser() {
  yield takeLatest(LOAD_USER_REQUEST, loadUser);
}

function* watchLogOut() {
  yield takeLatest(LOG_OUT_REQUEST, logOut);
}

function* watchSignUp() {
  yield takeLatest(SIGN_UP_REQUEST, signUp);
}

function* watchFollow() {
  yield takeLatest(FOLLOW_REQUEST, follow);
}

function* watchUnfollow() {
  yield takeLatest(UNFOLLOW_REQUEST, unfollow);
}

function* watchChangeNickname() {
  yield takeLatest(CHANGE_NICKNAME_REQUEST, changeNickname);
}

function* watchLoadFollowings() {
  yield takeLatest(LOAD_FOLLOWINGS_REQUEST, loadFollowings);
}

function* watchLoadFollowers() {
  yield takeLatest(LOAD_FOLLOWERS_REQUEST, loadFollowers);
}

function* watchRemoveFollower() {
  yield takeLatest(REMOVE_FOLLOWER_REQUEST, removeFollower);
}

function* watchLoadMyInfo() {
  yield takeLatest(LOAD_MY_INFO_REQUEST, loadMyInfo);
}

export default function* userSaga() {
  yield all([
    fork(watchRemoveFollower),
    fork(watchLoadFollowings),
    fork(watchLoadFollowers),
    fork(watchLoadUser),
    fork(watchLoadMyInfo),
    fork(watchLogIn),
    fork(watchLogOut),
    fork(watchSignUp),
    fork(watchFollow),
    fork(watchUnfollow),
    fork(watchChangeNickname),
  ]);
}
