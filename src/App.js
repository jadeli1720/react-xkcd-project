import React, { useState, useEffect } from 'react';
import Comic from './components/Comic';
import About from './components/About';
import Blog from './components/Blog';
import './App.scss';



function App() {
  return (
    <div className="app">
      <Comic/>
    </div>
  );
};

export default App;
