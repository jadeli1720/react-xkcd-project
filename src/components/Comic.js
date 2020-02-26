import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";

import ComicButtons from "./ComicButtons";

const Comic = props => {
  console.log("Comic Props", props);
  const comicNumber = props.match.params.comicNumber;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [comic, setComic] = useState(null);
  // const [latestComicNum, setLatestComicNum] = useState(null);

  //dynamically fetching different comics at will by a specific comic number  (comic.num)
  const fetchComic = number => {
    setLoading(true);
    setError(null);
    axios
      .get(
        `https://cors-anywhere.herokuapp.com/http://xkcd.com/${number}/info.0.json`
      )
      .then(res => {
        setComic(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.log("Oops! An error occurred", err);
        setError(error);
        setLoading(false);
      });
  };

  //randomly fetching nay comic available 
  const fetchRandomComic = () => {
    setLoading(true);
    setError(null);
    axios
      .get("https://cors-anywhere.herokuapp.com/http://xkcd.com/info.0.json")
      .then(res => {
        const latest = res.data.num
        const random = Math.floor(Math.random() * (latest - 1)) + 1;
        props.history.replace(`/${random}`)
        setLoading(false);
      })
      .catch(err => {
        console.log("Oops! An error occurred", err);
        setError(error);
        setLoading(false);
      });
  }

  //callback function: being explicit to what this function is doing --> fecthing the latest comic
  const fetchLatestComic = () => {
    setLoading(true);
    setError(null);
    axios
      .get("https://cors-anywhere.herokuapp.com/http://xkcd.com/info.0.json")
      .then(res => {
        setComic(res.data);
        // setLatestComicNum(res.data.num);
        setLoading(false);
      })
      .catch(err => {
        console.log("Oops! An error occurred", err);
        setError(error);
        setLoading(false);
      });
  };

  //IMPORTANT:To avoid being banned or paused in making a network request of a public, put it inside useEffect so the request isn't being made on every render. Or put it in as a callback function that you trigger as well.
  useEffect(() => {
    //Remember, useEffect() takes in a callback
    if (comicNumber === undefined) {
      fetchLatestComic();
    } else if (comicNumber === 'random') {
      fetchRandomComic()
    }
    else {
      fetchComic(comicNumber);
    }
  }, [comicNumber]);

  console.log(comic);

  if (error) {
    if (
      error.response &&
      error.response.status === 404 &&
      comicNumber !== undefined
    ) {
      return <Redirect to="/" />;
    }
    return <div>{error.message}</div>;
  }

  //Remember, for the bottom return statement to run (because a react component is just a function that needs to return JSX), comic cannot be null (it must be have a value). If it is, the component stops at the above conditional and we return loading until a comic becomes !null.
  return (
    <div className="app">
      <h1>{loading ? "Loading..." : comic.title}</h1>
      <ComicButtons
        comic={comic}
        fetchComic={fetchComic}
        fetchLatestComic={fetchLatestComic}
        loading={loading}
      />
      {loading ? (
        <div className="loading">
          <div className="spinner"></div>
        </div>
      ) : (
        <div className="comic">
          <img src={comic.img} title={comic.alt} alt={comic.title} />
        </div>
      )}
      <ComicButtons
        comic={comic}
        fetchComic={fetchComic}
        fetchLatestComic={fetchLatestComic}
        // fetchRandomComic={fetchRandomComic}
        // latestComicNum={latestComicNum}
        loading={loading}
      />
    </div>
  );
};

export default Comic;
