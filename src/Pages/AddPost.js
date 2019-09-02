import React, {Component} from 'react';
import axios from 'axios';
import {incrementPostsCount, refreshSidebarPosts, addPost} from '../redux/actions';
import {connect} from 'react-redux';
import PostView from '../PostView';

export class AddPost extends Component {

  constructor(props) {
    super(props);

    this.state = {
      title: '',
      content: '',
      postMessage: '',
      postClassName: '',
      showToast: false,
      startPost: false
    };

  }

  render() {
    return (
      <div className={'post-page-add'}>

        {this.state.showToast && <div className={`notification ${this.state.postClassName}`}>
          {this.state.postMessage}
        </div>}

        <form onSubmit={this.handleSubmit} className={'post-page-form'}>

          <div className="field">
            <label className="label" htmlFor="title">Title</label>
            <div className="control">
              <input
                autoComplete='off'
                className={`input ${this.state.title ? 'is-success' : ''}`}
                id="title"
                name="title"
                type="text"
                value={this.state.title}
                placeholder="Enter title here"
                onChange={this.handleInputChange}
              />
            </div>
          </div>

          <div className="field">
            <label className="label" htmlFor="content">Content</label>
            <div className="control">
              <textarea
                autoComplete='off'
                id='content'
                className={`textarea ${this.state.content ? 'is-success' : ''}`}
                placeholder="Enter content here"
                name="content"
                value={this.state.content}
                onChange={this.handleInputChange}
              />
            </div>
          </div>

          <button
            className={`button is-rounded is-fullwidth ${this.state.startPost ? 'is-loading' : ''}`}
            type="submit"
            value="Submit"
            onChange={this.handleSubmit}
            disabled={!(this.state.title && this.state.content)}
          >
            Submit
          </button>

        </form>
        {
          (this.state.title || this.state.content)
          && <PostView
            type='preview'
            post={{title: this.state.title, content: this.state.content}}
          />
        }

      </div>

    );
  }

  handleInputChange = (event) => {

    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value.charAt(0).toUpperCase() + value.slice(1)
    });

  };

  handleSubmit = (ev) => {

    ev.preventDefault();

    this.setState({
      startPost: true
    });

    // setTimeout is only added for demonstration purposes - to imitate response from a server;

    this._cancelDemoSpinnerSubscription = setTimeout(() => {

      axios({
        method: 'POST',
        url: 'http://localhost:3050/posts',
        cancelToken: this._cancelToken.token,
        data: {
          title: this.state.title,
          content: this.state.content
        }
      })
        .then((res) => {

          let {statusText, data} = res;
          this.props.incrementPostsCount();
          this.props.addPost(data);
          this.props.refreshSidebarPosts(data);

          this.setState({
            title: '',
            content: '',
            postMessage: statusText,
            postClassName: 'is-success'
          });

        })
        .catch((error) => {

          console.error(error);

          this.setState({
            postMessage: 'Failed to save post',
            postClassName: 'is-danger'
          });

        })
        .finally(() => {

          this.setState({
            showToast: true,
            startPost: false
          }, () => {
            this._cancelToasterSubscription = setTimeout(() =>
              this.setState({showToast: false, postMessage: '', postClassName: ''}), 2000);
          });

        });

    }, 2000);

  };

  componentDidMount() {
    this._cancelToken = axios.CancelToken.source();
    this._cancelToasterSubscription = '';
    this._cancelDemoSpinnerSubscription = '';
  }

  componentWillUnmount() {
    this._cancelToken.cancel('Operation canceled due to component unmount.');
    clearTimeout(this._cancelDemoSpinnerSubscription);
    clearTimeout(this._cancelToasterSubscription);
  }

}

const mapDispatchToProps = (dispatch) => {
  return {
    incrementPostsCount: () => {
      dispatch(incrementPostsCount());
    },
    refreshSidebarPosts: (post) => {
      dispatch(refreshSidebarPosts(post));
    },
    addPost: (post) => {
      dispatch(addPost(post));
    }
  };
};

export default connect(null, mapDispatchToProps)(AddPost);


