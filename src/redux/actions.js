import {
  TEST,
  REQUEST_POSTS,
  RECEIVE_POSTS,
  RECEIVE_POSTS_FAIL,
  PRODUCE_SIDEBAR_POSTS,
  COUNT_POSTS,
  INCREMENT_POSTS_COUNT,
  REFRESH_SIDEBAR_POSTS,
  ADD_POST
} from './actionTypes';
import axios from 'axios';

export function test(text) {
  return {
    type: TEST,
    text
  };
}

export const requestPosts = () => ({
  type: REQUEST_POSTS
});

export const incrementPostsCount = () => ({
  type: INCREMENT_POSTS_COUNT
});

export const receivePostsFail = () => ({
  type: RECEIVE_POSTS_FAIL
});

export const receivePosts = (posts) => ({
  type: RECEIVE_POSTS,
  posts
});

export const refreshSidebarPosts = (newPost) => ({
  type: REFRESH_SIDEBAR_POSTS,
  newPost
});

export const countPosts = (postsLength) => ({
  type: COUNT_POSTS,
  postsLength
});

export const produceSidebarPosts = (sidebarPosts) => ({
  type: PRODUCE_SIDEBAR_POSTS,
  sidebarPosts
});

export const addPost = (newPost) => ({
  type: ADD_POST,
  newPost
});

export function fetchPosts() {

  return function (dispatch) {

    dispatch(requestPosts());

    //The point of using validateStatus option is to get status code on request end
    //And then manually parse every status as you want.

    return axios({
      method: 'GET',
      url: 'http://localhost:3050/posts',
      validateStatus: false
    })
      .then(response => {

        let {status, data, statusText} = response;

        //For simplicity I'm not checking every api server status

        if (status < 300) {
          let slicePosts = Array.prototype.slice.call(data, -3);
          dispatch(receivePosts(data));
          dispatch(produceSidebarPosts(slicePosts));
          dispatch(countPosts(data.length));
        } else {
          console.error(`Error while fetching posts - ${statusText} with a code of ${status}`);
          dispatch(receivePostsFail());
        }

      })
      .catch(err => {
        console.error(err);
        dispatch(receivePostsFail());
      })

  };
}

