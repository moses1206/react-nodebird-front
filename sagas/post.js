import { all, fork, put, takeLatest, throttle, call } from 'redux-saga/effects';
import axios from 'axios';

import {
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  ADD_POST_FAILURE,
  LOAD_POST_REQUEST,
  LOAD_POST_SUCCESS,
  LOAD_POST_FAILURE,
  LOAD_POSTS_REQUEST,
  LOAD_POSTS_SUCCESS,
  LOAD_POSTS_FAILURE,
  REMOVE_POST_REQUEST,
  REMOVE_POST_SUCCESS,
  REMOVE_POST_FAILURE,
  REMOVE_POST_OF_ME,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_FAILURE,
  ADD_POST_TO_ME,
  LIKE_POST_REQUEST,
  LIKE_POST_SUCCESS,
  LIKE_POST_FAILURE,
  UNLIKE_POST_REQUEST,
  UNLIKE_POST_SUCCESS,
  UNLIKE_POST_FAILURE,
  UPLOAD_IMAGE_SUCCESS,
  UPLOAD_IMAGE_FAILURE,
  UPLOAD_IMAGE_REQUEST,
  RETWEET_REQUEST,
  RETWEET_SUCCESS,
  RETWEET_FAILURE,
  LOAD_USER_POSTS_REQUEST,
  LOAD_HASHTAG_POSTS_REQUEST,
  LOAD_HASHTAG_POSTS_SUCCESS,
  LOAD_HASHTAG_POSTS_FAILURE,
  LOAD_USER_POSTS_SUCCESS,
  LOAD_USER_POSTS_FAILURE,
} from '../reducers/types';

// ************************************************ //
// ******************** LIKE ********************** //
// LIKE UNLIKE 는 patch를 사용한다. 일부수정이다.
// data는 post.id가 담겨있다.
// ************************************************ //

// ***************************************//
// ************* LIKE POST****************//
// ***************************************//
function likePostAPI(data) {
  return axios.patch(`/post/${data}/like`); // PATCH post/1/like
}

function* likePost(action) {
  try {
    // backend에서 PostId,UserId를 리턴한다.
    const result = yield call(likePostAPI, action.data);
    yield put({
      type: LIKE_POST_SUCCESS,
      // 서버에서 받은 result.data에 PostId , UserId가 들어있다.
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LIKE_POST_FAILURE,
      error: err.response.data,
    });
  }
}

// ***************************************//
// *********** UNLIKE POST****************//
// ***************************************//
function unlikePostAPI(data) {
  // 이 게시물의 라이크를 삭제
  return axios.delete(`/post/${data}/like`);
}

function* unlikePost(action) {
  try {
    const result = yield call(unlikePostAPI, action.data);
    yield put({
      type: UNLIKE_POST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: UNLIKE_POST_FAILURE,
      error: err.response.data,
    });
  }
}

// ************************************************ //
// ***************** LOAD POST********************* //
// ************************************************ //
function loadPostAPI(data) {
  return axios.get(`/post/${data}`);
}

function* loadPost(action) {
  try {
    const result = yield call(loadPostAPI, action.data);
    yield put({
      type: LOAD_POST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_POST_FAILURE,
      error: err.response.data,
    });
  }
}

// ************************************************ //
// ***************** LOAD POSTS******************** //
// ************************************************ //
function loadPostsAPI(lastId) {
  // get메소드는 데이터를 넣을수 없는데 넣어야할 경우는
  // 퀴리스티링 방식 주소뒤에 ?key = 값 형식으로 넣는다.
  // lastId가 undefined 면 0값을 넘겨준다.
  return axios.get(`/posts?lastId=${lastId || 0}`);
}

function* loadPosts(action) {
  try {
    const result = yield call(loadPostsAPI, action.lastId);
    yield put({
      type: LOAD_POSTS_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_POSTS_FAILURE,
      error: err.response.data,
    });
  }
}

// ************************************************ //
// *********** LOAD USER POSTS********************* //
// ************************************************ //
function loadUserPostsAPI(data, lastId) {
  return axios.get(`/user/${data}/posts?lastId=${lastId || 0}`);
}

function* loadUserPosts(action) {
  try {
    const result = yield call(loadUserPostsAPI, action.data, action.lastId);
    yield put({
      type: LOAD_USER_POSTS_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_USER_POSTS_FAILURE,
      data: err.response.data,
    });
  }
}

// ************************************************ //
// ****************** ADD POST ******************** //
// ************************************************ //
function addPostAPI(data) {
  // req.body.content를 보내주기위해 content:data 입력
  return axios.post('/post', data);
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
    console.error(err);
    yield put({
      type: ADD_POST_FAILURE,
      error: err.response.data,
    });
  }
}

// ************************************************ //
// *************** REMOVE POST ******************** //
// ************************************************ //
function removePostAPI(data) {
  return axios.delete(`/post/${data}`);
}

function* removePost(action) {
  try {
    const result = yield call(removePostAPI, action.data);

    // Post가 삭제될때 User의 Posts 갯수도 -1이 되어야하므로
    // Post가 삭제될때 User의 Posts의 내용도 바꿔야한다.
    yield put({
      type: REMOVE_POST_SUCCESS,
      data: result.data,
    });
    yield put({
      type: REMOVE_POST_OF_ME,
      data: action.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: REMOVE_POST_FAILURE,
      error: err.response.data,
    });
  }
}

// ************************************************ //
// *************** ADD COMMENT ******************** //
// ************************************************ //
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
      error: err.response.data,
    });
  }
}

// ************************************************ //
// *************** IMAGE UPLOAD ******************* //
// ************************************************ //
function uploadImagesAPI(data) {
  return axios.post('/post/images', data);
}

function* uploadImages(action) {
  try {
    const result = yield call(uploadImagesAPI, action.data);
    yield put({
      type: UPLOAD_IMAGE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: UPLOAD_IMAGE_FAILURE,
      error: err.response.data,
    });
  }
}

// ************************************************ //
// *************** RETWEET**** ******************** //
// ************************************************ //
function retweetAPI(data) {
  return axios.post(`/post/${data}/retweet`);
}

function* retweet(action) {
  try {
    const result = yield call(retweetAPI, action.data);
    yield put({
      type: RETWEET_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: RETWEET_FAILURE,
      error: err.response.data,
    });
  }
}

// ************************************************ //
// ********* LOAD HASHTAG POSTS******************** //
// ************************************************ //
function loadHashTagPostsAPI(data, lastId) {
  return axios.get(
    // 한글이나 특수문자를 주소창에 넣어서 보낼수 없지만
    // encodeURIComponent를 통해 데이터를 변환해서 보낼수 있다.
    `/hashtag/${encodeURIComponent(data)}?lastId=${lastId || 0}`
  );
}

function* loadHashTagPosts(action) {
  try {
    const result = yield call(loadHashTagPostsAPI, action.data, action.lastId);
    yield put({
      type: LOAD_HASHTAG_POSTS_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_HASHTAG_POSTS_FAILURE,
      error: err.response.data,
    });
  }
}

// ************************************************ //
// ****************** WATCH *********************** //
// ************************************************ //
function* watchRetweet() {
  yield takeLatest(RETWEET_REQUEST, retweet);
}

function* watchUploadImages() {
  yield takeLatest(UPLOAD_IMAGE_REQUEST, uploadImages);
}

function* watchLikePost() {
  yield takeLatest(LIKE_POST_REQUEST, likePost);
}

function* watchUnlikePost() {
  yield takeLatest(UNLIKE_POST_REQUEST, unlikePost);
}

function* watchLoadPost() {
  yield takeLatest(LOAD_POST_REQUEST, loadPost);
}

function* watchLoadPosts() {
  yield throttle(5000, LOAD_POSTS_REQUEST, loadPosts);
}

function* watchAddPost() {
  // 2초동안 여러번 눌러도 1번만 서버에 요청을 보낸다.
  yield takeLatest(ADD_POST_REQUEST, addPost);
}

function* watchRemovePost() {
  // 2초동안 여러번 눌러도 1번만 서버에 요청을 보낸다.
  yield takeLatest(REMOVE_POST_REQUEST, removePost);
}

function* watchLoadUserPosts() {
  // 2초동안 여러번 눌러도 1번만 서버에 요청을 보낸다.
  yield throttle(5000, LOAD_USER_POSTS_REQUEST, loadUserPosts);
}

function* watchLoadHashTagPosts() {
  // 2초동안 여러번 눌러도 1번만 서버에 요청을 보낸다.
  yield throttle(5000, LOAD_HASHTAG_POSTS_REQUEST, loadHashTagPosts);
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
    fork(watchRetweet),
    fork(watchUploadImages),
    fork(watchLikePost),
    fork(watchUnlikePost),
    fork(watchAddPost),
    fork(watchRemovePost),
    fork(watchAddComment),
    fork(watchLoadPost),
    fork(watchLoadPosts),
    fork(watchLoadUserPosts),
    fork(watchLoadHashTagPosts),
  ]);
}
