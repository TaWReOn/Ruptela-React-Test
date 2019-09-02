import React from 'react';
import './styles/styles.scss';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Home from './Pages/Home';
import Posts from './Pages/Posts';
import AddPost from './Pages/AddPost';
import Header from './Header';
import Menu from './Menu';
import Footer from './Footer';
import RightSidebar from './RightSidebar';
import 'react-virtualized/styles.css';

function App() {
  return (
    <Router>
      <div className='app'>
        <Header/>
        <div className='content'>
          <div className='column is-one-fifth'>
            <Menu/>
          </div>
          <div className='column main-content-block'>
            <Route exact path='/' component={Home}/>
            <Route exact path='/posts' component={Posts}/>
            <Route exact path='/add-post' component={AddPost}/>
          </div>
          <div className='column is-one-quarter right-sidebar'>
            <RightSidebar/>
          </div>
        </div>
        <Footer/>
      </div>
    </Router>
  );
}

export default App;
