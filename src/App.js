import React, { useState, useEffect } from 'react';
import './App.scss';
import axios from 'axios';

function App() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [comic, setComic] = useState(null);
  const [latestComicNum, setLatestComicNum] = useState(null);


  //dynamically fetching different comics at will by a specific comic number  (comic.num)
  const fetchComic = (number) => {
    setLoading(true)
    axios.get(`https://cors-anywhere.herokuapp.com/http://xkcd.com/${number}/info.0.json`)
      .then(res => {
        setComic(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.log("Oops! An error occurred",err);
        setError(error)
        setLoading(false);
    });
  };

  //randomly fetching nay comic available
  const fetchRandomComic = () => {
    const num = Math.floor(Math.random() * (latestComicNum - 1)) + 1;
    fetchComic(num);
  }
  
  //callback function: being explicit to what this function is doing --> fecthing the latest comic
  const fetchLatestComic = () => {
    setLoading(true)
    axios.get('https://cors-anywhere.herokuapp.com/http://xkcd.com/info.0.json')
      .then(res => {
        setComic(res.data);
        setLatestComicNum(res.data.num);
        setLoading(false);
      })
      .catch(err => {
        console.log("Oops! An error occurred",err);
        setError(error)
        setLoading(false);
      });
  }

  //IMPORTANT:To avoid being banned or paused in making a network request of a public, put it inside useEffect so the request isn't being made on every render. Or put it in as a callback function that you trigger as well.
  useEffect(() => {
    //Remember, useEffect() takes in a callback
    fetchLatestComic();
  }, []);


  console.log(comic)
  if(loading) {
    //loading spinner can go here!
    return <div>loading...</div>;
  };

  if(!comic || error) {
    return <div>Oops. I'm sorry but something went wrong!</div>
  }

  //Remember, for the bottom return statement to run (because a react component is just a function that needs to return JSX), comic cannot be null (it must be have a value). If it is, the component stops at the above conditional and we return loading until a comic becomes !null.
  return (
    <div className="app">
      {comic.title}
      <button 
        disabled = {comic.num === 1}
        onClick={() => fetchComic(1)}>
        first
      </button>
      <button 
        disabled = {comic.num <= 1}
        onClick={() => fetchComic(comic.num - 1)}>
        previous
      </button>
      {/* fetchRandomComic */}
      <button 
        onClick={() => fetchRandomComic()}>
        Random
      </button>
      <button 
        disabled = {comic.num === latestComicNum}
        onClick={() => fetchComic(comic.num + 1)}>
        next
      </button>
      <button 
        disabled = {comic.num === latestComicNum}
        onClick={() => fetchLatestComic()}>
        latest
      </button>
      <img src={comic.img} alt={comic.alt} />
    </div>
  );
};

export default App;
