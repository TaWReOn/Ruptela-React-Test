import React, {Component} from 'react';

class PostView extends Component {
  render() {
    return (
      <div className={`post-instance-wrapper`}>
        <article className={`post ${this.props.type}`}>
          <div className='post-header'>
            <span className='post-title'>{this.props.post.title}</span>
            {this.props.post.id && <span className='post-id'>ID: {this.props.post.id}</span>}
          </div>
          <div className='post-body'>
            <span className='post-body-text'>
              {this.props.post.content}
            </span>
          </div>
        </article>
      </div>
    );
  }
}

export default PostView;
