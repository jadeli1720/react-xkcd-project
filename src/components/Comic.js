import React, { useState, useEffect } from 'react';
import axios from 'axios';

import ComicButtons from './ComicButtons'

const Comic = () => {
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

  //randomly fetching nay comic available --> may need to get rid of every place that has random comic
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
 

  if(error) {
    return <div>Oops. I'm sorry but something went wrong!</div>
  }

  //Remember, for the bottom return statement to run (because a react component is just a function that needs to return JSX), comic cannot be null (it must be have a value). If it is, the component stops at the above conditional and we return loading until a comic becomes !null.
  return (
    <div className="app">
      <h1>{loading ? 'Loading...': comic.title}</h1>
      {/* passing of these props can be improved */}
      <ComicButtons 
        comic={comic} 
        fetchComic={fetchComic} 
        fetchLatestComic={fetchLatestComic} 
        fetchRandomComic={fetchRandomComic} 
        latestComicNum={latestComicNum}
        loading={loading}
        />
      { loading
        ?
        <div className="loading">
          <div className="spinner"></div>
        </div>
        :
        <div className="comic" >
          <img  src={comic.img} title={comic.alt} alt={comic.title} />
        </div>
      }
      <ComicButtons 
        comic={comic} 
        fetchComic={fetchComic} 
        fetchLatestComic={fetchLatestComic} 
        fetchRandomComic={fetchRandomComic} 
        latestComicNum={latestComicNum}
        loading={loading}
        />
    </div>
  );
};

export default Comic;