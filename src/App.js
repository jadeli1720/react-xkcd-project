import React, { useState, useEffect } from 'react';
import { Switch, Route, Link } from 'react-router-dom';

import Comic from './components/Comic';
import About from './components/About';
import Blog from './components/Blog';

import './App.scss';



function App() {
  return (
    <div className="app">
      <nav>
        {/* If we want the links to show which page we are on, use NavLink. We can set specific styles when on that page*/}
        <Link to="/comic" >Comic</Link>
        <Link to="/about" >About</Link>
        <Link to="/blog" >Blog</Link>
      </nav>
      <Switch>
        <Route path="/blog">
          <Blog/>
        </Route>
        <Route path="/about" component={About} />
        <Route path="/:comicNumber" component={Comic} />
        {/* Because of the way switch works with exact matching, any routes attempted that do not match the above will automatically revert to the below Route. great way to insert a 404 page. However it won't work when using the slug/url parameter above (placeholder) */}
        {/* <Route path="/">
          <h1>404</h1>
        </Route> */}
      </Switch>
    </div>
  );
};

export default App;
