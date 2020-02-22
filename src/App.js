import React, { useState, useEffect } from 'react';
import './App.scss';
import axios from 'axios';

function App() {
  const [comic, setComic] = useState(null);

  //IMPORTANT:To avoid being banned or paused in making a network request of a public, put it inside useEffect so the request isn't being made on every render. Or put it in as a callback function that you trigger as well.
  useEffect(() => {
    axios.get('https://cors-anywhere.herokuapp.com/http://xkcd.com/info.0.json')
      .then(res => setComic(res.data))
      .catch(err => console.log("Oops! An error occurred",err));
  }, []);


//dynamically fetching different comics at will by a specific comic number
  const fetchComic = (number) => {
    axios.get(`https://cors-anywhere.herokuapp.com/http://xkcd.com/${number}/info.0.json`)
      .then(res => setComic(res.data))
      .catch(err => console.log("Oops! An error occurred",err));
  };

  console.log(comic)
  if(!comic) {
    //loading spinner can go here!
    return <div>loading...</div>;
  };

  return (
    <div className="app">
      {comic.title}
      <button onClick={() => fetchComic(comic.num - 1)}>
        previous
      </button>
      <img src={comic.img} alt={comic.alt} />
    </div>
  );
};

export default App;
