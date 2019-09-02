import React, {Component} from 'react';
import {connect} from 'react-redux';
import PostView from './PostView';

export class RightSidebar extends Component {
  render() {
    return (
      <div>
        {this.props.isLoading ?
          <h3 className='has-text-centered'>Loading</h3> : (
            this.props.sidebarPosts.length ?
              this.props.sidebarPosts.map(post => (
                  <PostView post={post} type={'right-sidebar'} key={post.id}/>
                )
              ) : <h3
                className={`has-text-centered ${this.props.failedToLoad ? 'has-text-weight-bold has-text-danger' : ''}`}>
                There are no posts yet {this.props.failedToLoad ? '(Network error)' : ''}
              </h3>
          )}
      </div>
    );
  }
}

const mapStateToProps = ({sidebarPosts, isLoading, failedToLoad}) => ({
  sidebarPosts,
  isLoading,
  failedToLoad
});

export default connect(mapStateToProps)(RightSidebar);
