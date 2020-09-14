import React from "react";
import { Switch, Route, Link } from "react-router-dom";

import Comic from "./components/Comic";
import About from "./components/About";
import Blog from "./components/Blog";

import "./App.scss";

function App() {
  return (
    <div className="app">
      <nav>
        <Link to="/">Comic</Link>
        <Link to="/about">About</Link>
        <Link to="/blog">Blog</Link>
      </nav>
      <Switch>
        <Route path="/blog">
          <Blog />
        </Route>
        <Route path="/about" component={About} />
        <Route path="/:comicNumber?" component={Comic} />
      </Switch>
    </div>
  );
}

export default App;
