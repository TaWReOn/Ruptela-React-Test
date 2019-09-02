import React, {Component} from 'react';
import {connect} from 'react-redux';

export class Header extends Component {

  render() {
    return (
      <section className='hero is-info'>
        <div className='hero-body'>
          <div className='container'>
            <h1 className='title'>
              Ruptela React Test
            </h1>
            <h2 className='subtitle'>
              You can do it!
            </h2>
          </div>
        </div>

        <div className={'post-counter has-text-centered'}>
          {this.props.isLoading ?
            <span className='has-text-centered'>Loading</span> : (this.props.failedToLoad ?
              <span className={'has-text-weight-bold has-text-danger'}>N/A</span> :
              <span>{this.props.countPosts}</span>)
          }
        </div>

      </section>
    );
  }
}

const mapStateToProps = ({countPosts, failedToLoad, isLoading}) => ({
  countPosts,
  failedToLoad,
  isLoading
});

export default connect(mapStateToProps)(Header);
