import React, {Component} from 'react';
import {connect} from 'react-redux';
import {AutoSizer, List} from 'react-virtualized';
import PostView from '../PostView';

export class Posts extends Component {

  constructor(props) {
    super(props);

    this.state = {
      listRowHeight: 110,
      overscanRowCount: 5,
      showScrollingPlaceholder: false,
      useDynamicRowHeight: false
    };

  }

  render() {

    const {
      listRowHeight,
      overscanRowCount
    } = this.state;

    return (
      <div className={'posts-list-page'}>

        {this.props.isLoading ? <h3 className='has-text-centered'>Loading</h3> :
          <div className={'post-list-wrapper'}>
            <AutoSizer>
              {({width, height}) => (
                <List
                  ref="List"
                  className={'posts-list'}
                  height={height}
                  overscanRowCount={overscanRowCount}
                  noRowsRenderer={this._noRowsRenderer}
                  rowCount={this.props.posts.length}
                  rowHeight={listRowHeight}
                  rowRenderer={this._rowRenderer}
                  width={width}
                />
              )}
            </AutoSizer>
          </div>
        }

      </div>
    );
  }

  _getData = index => this.props.posts[index];

  _noRowsRenderer = () => {
    return <h3 className={`has-text-centered ${this.props.failedToLoad ? 'has-text-weight-bold has-text-danger' : ''}`}>
      There are no posts yet {this.props.failedToLoad ? '(Network error)' : ''}
    </h3>;
  };

  _rowRenderer = ({index, isScrolling, key, style}) => {
    const {showScrollingPlaceholder} = this.state;

    if (showScrollingPlaceholder && isScrolling) {
      return (
        <div
          key={key}
          style={style}>
          Scrolling...
        </div>
      );
    }

    const post = this._getData(index);

    return (
      <div className={'message-row'} key={key} style={style}>
        <PostView type='post-list' post={post}/>
      </div>
    );
  };

}

const mapStateToProps = ({posts, isLoading, failedToLoad}) => ({
  posts,
  isLoading,
  failedToLoad
});

export default connect(mapStateToProps)(Posts);
