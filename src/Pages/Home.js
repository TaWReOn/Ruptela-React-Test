import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { test } from '../redux/actions';

export class Home extends Component {
  render() {
    const { test, testText } = this.props;

    return (
      <div>
        <p>Hello,</p>
        <p>
          Welcome to the Ruptela React Test. This test is designed to test your
          basic React, Redux and working with REST API skills.
        </p>
        <p>
          For your convenience this, App was bootstrapped using "Create React
          App", "Bulma" and "Redux". It also comes preinstalled with "React
          Router" and "Axios", but you can use library of your choice of HTTP
          client.
        </p>
        <p>
          This component is connected to redux. To test redux setup{' '}
          <button onClick={test}>click here</button>. You should see the message
          change here: {testText}.
        </p>
        <p>
          This React app imitates a website with articles or posts. On the left
          you have a menu to navigate between this page ("Home"), page that
          lists all the post ("Posts"), and the page that adds posts ("Add
          posts").
        </p>
        <p>
          Also, to complete this test you will require an API. You can start the
          API by running <code>yarn api</code> or <code>npm run api</code>. To
          use the api you will make a <code>GET</code> request to{' '}
          <code>http://localhost:3050/posts</code> to get all the posts and a{' '}
          <code>POST</code> request to the same URL to create a new post.
        </p>
        <p>
          Although this website looks pretty, you don't have to pay attention to
          styling, and only focus on the acceptance criteria described below. So
          please don't use any UI libraries like "react-material".
        </p>
        <p>Acceptance criteria:</p>
        <ul>
          <li>
            Implement the "Posts" page.
            <ul>
              <li>It should display all the posts by querying the API.</li>
              <li>Post id, title and content should be visible.</li>
            </ul>
          </li>
          <li>
            Implement the "Add posts" page:
            <ul>
              <li>It should have an input field for post title</li>
              <li>It should have an text area field for post content</li>
              <li>It should have a submit button</li>
              <li>It should submit the post to the API</li>
              <li>
                It has a "Preview post" are where user sees the live preview of
                how the post will look as he types it.
              </li>
            </ul>
          </li>
          <li>
            Implement the "RightSideBar":
            <ul>
              <li>
                RightSidebar is the area visible on the right across all of the
                pages
              </li>
              <li>
                It should display posts like the "Posts" page, except that it
                should display only 3 latest posts from the API
              </li>
            </ul>
          </li>
          <li>
            Edit the page Header to display the total count of posts. (Anywhere
            in the header is fine)
          </li>
        </ul>
        <p>
          Once finished, push to you repo on github, and sent us a link without creating a Pull request.
        </p>
      </div>
    );
  }
}

Home.propTypes = {
  testText: PropTypes.string,
  test: PropTypes.func
};

const mapStateToProps = state => {
  return {
    testText: state.test
  };
};

const mapDispatchToProps = dispatch => {
  return {
    test: () => {
      dispatch(test('test ' + Math.random()));
    }
  };
};

const ConnectedHome = connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);

export default ConnectedHome;
