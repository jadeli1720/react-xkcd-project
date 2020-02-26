import React, { useState, useEffect } from 'react';
import { Route, Link } from 'react-router-dom';

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
      <Route path="/blog">
        <Blog/>
      </Route>
      <Route path="/about" component={About} />
      <Route path="/comic" component={Comic} />
    </div>
  );
};

export default App;
