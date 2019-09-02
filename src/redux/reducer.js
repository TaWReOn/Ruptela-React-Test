import {
  REQUEST_POSTS,
  TEST,
  RECEIVE_POSTS,
  COUNT_POSTS,
  RECEIVE_POSTS_FAIL,
  PRODUCE_SIDEBAR_POSTS,
  INCREMENT_POSTS_COUNT,
  REFRESH_SIDEBAR_POSTS,
  ADD_POST
} from './actionTypes';

const initialState = {
  test: '',
  posts: [],
  sidebarPosts: [],
  failedToLoad: false,
  isLoading: false,
  countPosts: 0
};

export function reducer(state = initialState, action) {
  switch (action.type) {
    case TEST:
      return {
        ...state,
        test: action.text
      };
    case REQUEST_POSTS:
      return {
        ...state,
        isLoading: true
      };
    case RECEIVE_POSTS:
      return {
        ...state,
        posts: action.posts,
        isLoading: false
      };
    case RECEIVE_POSTS_FAIL:
      return {
        ...state,
        failedToLoad: true,
        isLoading: false
      };
    case PRODUCE_SIDEBAR_POSTS:
      return {
        ...state,
        sidebarPosts: action.sidebarPosts
      };
    case COUNT_POSTS:
      return {
        ...state,
        countPosts: action.postsLength
      };
    case INCREMENT_POSTS_COUNT:
      return {
        ...state,
        countPosts: state.countPosts + 1
      };
    case REFRESH_SIDEBAR_POSTS:

      let newSidebarPostsState = [...state.sidebarPosts, action.newPost];

      if (newSidebarPostsState.length > 3) {
        newSidebarPostsState.shift();
      }

      return {
        ...state,
        sidebarPosts: newSidebarPostsState
      };
    case ADD_POST:

      let newPostsState = [...state.posts, action.newPost];

      return {
        ...state,
        posts: newPostsState
      };

    default:
      return state;
  }
}

