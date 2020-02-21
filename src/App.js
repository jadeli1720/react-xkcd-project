import React, { useState, useEffect } from 'react';
import './App.scss';
import axios from 'axios';

function App() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [comic, setComic] = useState(null);
  const [latestComicNum, setLatestComicNum] = useState(null);

  const fetchComic = (number) => {
    setLoading(true);
    axios.get(`https://cors-anywhere.herokuapp.com/http://xkcd.com/${number}/info.0.json`)
      .then(response => setComic(response.data))
      .catch(error => {
        console.log('error', error);
        setError(error);
      })
      .finally(() => setLoading(false));
  };

  const fetchRandomComic = () => {
    const num = Math.floor(Math.random() * (latestComicNum - 1)) + 1;
    fetchComic(num);
  };

  const fetchLatestComic = () => {
    setLoading(true);
    axios.get('https://cors-anywhere.herokuapp.com/http://xkcd.com/info.0.json')
      .then(response => {
        setComic(response.data);
        setLatestComicNum(response.data.num);
        setLoading(false);
      })
      .catch(error => {
        console.log('error', error);
        setError(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchLatestComic();
  }, []);

  console.log(comic);
  console.log(comic && comic.num, latestComicNum);

  // if (loading) {
  //   return (
  //     <div className="loading">
  //       <div className="spinner"></div>
  //     </div>
  //   );
  // }

  if (error) {
    return <div>error</div>;
  }

  return (
    <div className="app">
    <h1>{loading ? 'Loading...' : comic.title}</h1>
      <ComicButtons
        comic={comic}
        fetchComic={fetchComic}
        latestComicNum={latestComicNum}
        fetchRandomComic={fetchRandomComic}
        fetchLatestComic={fetchLatestComic}
        loading={loading}
      />
      {loading
       ? <div className="loading"><div className="spinner"/></div>
       : (
         <div className="comic">
           <img src={comic.img} title={comic.alt} alt={comic.title} />
         </div>
       )
      }
      <ComicButtons
        comic={comic}
        fetchComic={fetchComic}
        latestComicNum={latestComicNum}
        fetchRandomComic={fetchRandomComic}
        fetchLatestComic={fetchLatestComic}
        loading={loading}
      />
    </div>
  );
};

const ComicButtons = ({
  comic,
  fetchComic,
  latestComicNum,
  fetchRandomComic,
  fetchLatestComic,
  loading,
}) => {
  return (
    <div className="buttons">
      <button
        disabled={loading || comic.num === 1}
        onClick={() => fetchComic(1)}
      >
        first
      </button>
      <button
        disabled={loading || comic.num <= 1}
        onClick={() => fetchComic(comic.num - 1)}
      >
        previous
      </button>
      <button
        disabled={loading}
        onClick={() => fetchRandomComic()}
      >
        random
      </button>
      <button
        disabled={loading || comic.num === latestComicNum}
        onClick={() => fetchComic(comic.num + 1)}
      >
        next
      </button>
      <button
        disabled={loading || comic.num === latestComicNum}
        onClick={() => fetchLatestComic()}
      >
        latest
      </button>
    </div>
  );
};

export default App;
