export const REQUEST_POSTS = 'REQUEST_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const ADD_SUBREDDIT = 'SELECT_SUBREDDIT'
export const REMOVE_SUBREDDIT = 'REMOVE_SUBREDDIT'

export function addSubreddit(subreddit) {
  return {
    type: ADD_SUBREDDIT,
    subreddit
  }
}

export function removeSubreddit(subreddit) {
  return {
    type: REMOVE_SUBREDDIT,
    subreddit
  }
}

function requestPosts(subreddit) {
  return {
    type: REQUEST_POSTS,
    subreddit
  }
}

function receivePosts(subreddit, json) {
  return {
    type: RECEIVE_POSTS,
    subreddit,
    posts: json.data.children.map(child => child.data),
    before: json.data.before,
    after: json.data.after
  }
}

function fetchPosts(subreddit, direction, postVal, selector) {
  console.log(selector);
  return dispatch => {
    dispatch(requestPosts(subreddit))
    var url = `http://www.reddit.com/r/${subreddit}/`;
    if(selector) {
      url = url.concat(`${selector.trim()}/`);
    }
    url = url.concat('.json');
    if(direction) {
      url = url.concat(`?limit=25&${direction}=${postVal}`);
    }
    console.log(url);
    return fetch(url)
      .then(response => response.json())
      .then(json => dispatch(receivePosts(subreddit, json)))
  }
}

function shouldFetchPosts(state, subreddit) {
  const posts = state.postsBySubreddit[subreddit]
  if (posts && posts.isFetching) {
    return false
  } else {
    return true;
  }
}

export function fetchPostsIfNeeded(subreddit, direction, postVal, selector) {
  return (dispatch, getState) => {
    if (shouldFetchPosts(getState(), subreddit)) {
      return dispatch(fetchPosts(subreddit, direction, postVal, selector))
    }
  }
}
