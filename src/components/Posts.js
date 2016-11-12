import React from 'react'

function isUrl(s) {
  //imported from @MarkRedman at http://stackoverflow.com/questions/1701898/how-to-detect-whether-a-string-is-in-url-format-using-javascript
   var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
   return regexp.test(s);
}

export default (props) => {
  return (
    <div>
      {props.posts.map((post, i) =>
        {
        if(!isUrl(post.thumbnail)) {
          post.thumbnail = 'http://icons.iconarchive.com/icons/chrisbanks2/cold-fusion-hd/128/reddit-icon.png'
        }
        return (
          <div className="post" key={i}>
            <div className="post-upvotes">
              {post.score}
            </div>
            <img className="post-image" src={post.thumbnail} alt="reddit"></img>
            <div className="post-text">
              <div className="post-title">
              <a href={post.url}>
                {post.title}
              </a>
              <span className="post-domain">
              {` (${post.domain})`}
              </span>
              </div>
              <div className="post-info">
                {`submitted ${window.moment(post.created_utc * 1000).toNow(true)} ago by`}
                <a href={`http://www.reddit.com/u/${post.author}`}> {`${post.author}`}
                </a>
              </div>
              <a href={'http://www.reddit.com' + post.permalink}>
                <div className="post-comments">
                  {`${post.num_comments} comments`}
                </div>
              </a>
            </div>
          </div>
          );
      }
      )}
    </div>
  )
}
