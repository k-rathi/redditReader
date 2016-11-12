import React, { Component} from 'react';
import { connect } from 'react-redux';
import { addSubreddit, removeSubreddit, fetchPostsIfNeeded} from '../redux/actions';
import Subreddits from './Subreddits';
import Posts from './Posts';
import RedditNavbar from './RedditNavbar';
class AsyncApp extends Component {
  constructor(props) {
    super(props);
    this.changeType = this.changeType.bind(this);
    this.addSubreddit = this.addSubreddit.bind(this);
    this.removeSubreddit = this.removeSubreddit.bind(this);
    this.previousPage = this.previousPage.bind(this);
    this.nextPage = this.nextPage.bind(this);
  }

  componentDidMount() {
    const { dispatch, selectedSubreddit } = this.props;
    dispatch(fetchPostsIfNeeded(selectedSubreddit.val));
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedSubreddit.val !== this.props.selectedSubreddit.val) {
      const { dispatch, selectedSubreddit } = nextProps;
      dispatch(fetchPostsIfNeeded(selectedSubreddit.val));
    }
  }

  addSubreddit(newSubreddit) {
    this.props.dispatch(addSubreddit(newSubreddit));
  }

  removeSubreddit(subreddit) {
    this.props.dispatch(removeSubreddit(subreddit));
  }

  previousPage() {
    const { dispatch, selectedSubreddit, before, selector } = this.props;
    dispatch(fetchPostsIfNeeded(selectedSubreddit.val, "before", before, selector));
  }
  nextPage() {
    const { dispatch, selectedSubreddit, after, selector } = this.props
    dispatch(fetchPostsIfNeeded(selectedSubreddit.val, "after", after, selector));
  }
  changeType(selector) {
    const { dispatch, selectedSubreddit} = this.props;
    dispatch(fetchPostsIfNeeded(selectedSubreddit.val, undefined, undefined, selector));
  }
  render() {
    const { selectedSubreddit, posts, isFetching } = this.props
    return (
      <div className="app">
        <Subreddits
          value={selectedSubreddit.val}
          onAdd={this.addSubreddit}
          onRemove={this.removeSubreddit}
        />
        <div className="center">

        {isFetching && posts.length === 0 &&
          <h2>Loading...</h2>
        }
        {!isFetching && posts.length === 0 &&
          <h2>Empty.</h2>
        }
        </div>

        {posts.length > 0 &&
          <div style={{ opacity: isFetching ? 0.5 : 1 }}>
            <RedditNavbar changeType={this.changeType} />
            <Posts posts={posts} />
            <div className="navigate-page">
              <div onClick={this.previousPage} className="page-select">prev</div>
              <div onClick={this.nextPage} className="page-select">next</div>
            </div>
          </div>
        }
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { selectedSubreddit, postsBySubreddit } = state;
  const {
    isFetching,
    lastUpdated,
    items: posts,
    after,
    before,
    selector
  } = postsBySubreddit[selectedSubreddit.val] || {
    isFetching: true,
    items: [],
    after: null,
    before: null,
    selector: 'top'
  }

  return {
    selectedSubreddit,
    posts,
    after,
    before,
    selector,
    isFetching,
    lastUpdated
  }
}

export default connect(mapStateToProps)(AsyncApp)
