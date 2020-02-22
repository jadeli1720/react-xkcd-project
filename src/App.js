import React, { useState, useEffect } from 'react';
import './App.scss';
import axios from 'axios';

function App() {
  const [loading, setLoading] = useState(true);
  const [comic, setComic] = useState(null);

  //IMPORTANT:To avoid being banned or paused in making a network request of a public, put it inside useEffect so the request isn't being made on every render. Or put it in as a callback function that you trigger as well.
  useEffect(() => {
    setLoading(true)
    axios.get('https://cors-anywhere.herokuapp.com/http://xkcd.com/info.0.json')
      .then(res => {
        setComic(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.log("Oops! An error occurred",err);
        setLoading(false);
      });
  }, []);


//dynamically fetching different comics at will by a specific comic number  (comic.num)
  const fetchComic = (number) => {
    setLoading(true)
    axios.get(`https://cors-anywhere.herokuapp.com/http://xkcd.com/${number}/info.0.json`)
      .then(res => setComic(res.data))
      .catch(err => console.log("Oops! An error occurred",err))
      //when either .then() or .catch is done, wrap it up with setLoading to be false
      .finally(() =>  setLoading(false));
  };

  console.log(comic)
  if(loading) {
    //loading spinner can go here!
    return <div>loading...</div>;
  };

  if(!comic) {
    return <div>Oops. I'm sorry but something went wrong!</div>
  }

  //Remember, for the bottom return statement to run (because a react component is just a function that needs to return JSX), comic cannot be null (it must be have a value). If it is, the component stops at the above conditional and we return loading until a comic becomes !null.
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
