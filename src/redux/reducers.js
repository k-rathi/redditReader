import { combineReducers } from 'redux'
import {
  ADD_SUBREDDIT,
  REQUEST_POSTS, RECEIVE_POSTS, REMOVE_SUBREDDIT
} from './actions'

function selectedSubreddit(state = {val: 'all', arr:[]}, action) {
  switch (action.type) {
  case ADD_SUBREDDIT:
    state.arr.push(action.subreddit);
    if(state.val === 'all') {
      return {val: action.subreddit, arr: state.arr};
    }
    return {val: `${state.val}+${action.subreddit}`, arr: state.arr};
  case REMOVE_SUBREDDIT:
    var index = state.arr.indexOf(action.subreddit)
    if(index !== -1) {
      if(state.val.length === action.subreddit.length) {
        return {val: 'all', arr: []}
      }
      state.arr.splice(index, 1);
      return {val: state.arr.join('+'), arr: state.arr};
    }
    break;
  default:
    return state;
  }
}


function posts(state = {
  isFetching: false,
  items: [],
  before: null,
  after: null,
  selector: 'top'
}, action) {
  switch (action.type) {
    case REQUEST_POSTS:
      return {
        ...state,
        isFetching: true
      };
    case RECEIVE_POSTS:
      return {
        ...state,
        isFetching: false,
        items: action.posts,
        after: action.after,
        before: action.before,
        selector: action.selector
      };
    default:
      return state
  }
}

function postsBySubreddit(state = { }, action) {
  switch (action.type) {
    case RECEIVE_POSTS:
    case REQUEST_POSTS:
      return {
        ...state,
        after: action.after,
        before: action.before,
        selector: action.selector,
        [action.subreddit]: posts(state[action.subreddit], action)
      };
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  postsBySubreddit,
  selectedSubreddit
})

export default rootReducer
