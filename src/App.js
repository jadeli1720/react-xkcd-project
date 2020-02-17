import React, { useState, useEffect } from 'react';
import './App.scss';
import axios from 'axios';

function App() {
  const [comic, setComic] = useState(null);
  const [latestNum, setLatestNum] = useState(null);
  const [error, setError] = useState(null);

  const fetchLatestComic = () => {
    setComic(null);
    setError(null);
    axios.get('https://cors-anywhere.herokuapp.com/https://xkcd.com/info.0.json')
      .then(res => {
        setComic(res.data);
        setLatestNum(res.data.num);
      })
      .catch(err => setError(err));
  };

  const fetchComic = (num) => {
    setComic(null);
    setError(null);
    axios.get(`https://cors-anywhere.herokuapp.com/https://xkcd.com/${num}/info.0.json`)
      .then(res => setComic(res.data))
      .catch(err => setError(err));
  };

  useEffect(() => {
    fetchLatestComic();
  }, []);

  if (error) {
    return (
      <div className="app">
        {error.message}
      </div>
    );
  }

  return (
    <div className="app">
    <h1>{comic ? comic.title : 'Loading...'}</h1>
      <Buttons
        fetchComic={fetchComic}
        fetchLatestComic={fetchLatestComic}
        currentNum={comic ? comic.num : 0}
        latestNum={latestNum}
        loading={!comic}
      />
      <div className='comic-container'>
        {comic
         ? (
           <img src={comic.img} alt={comic.transcript} title={comic.alt} />
         )
         : (
           <div className="loading" />
         )
        }
      </div>
      <Buttons
        fetchComic={fetchComic}
        currentNum={comic ? comic.num : 0}
        latestNum={latestNum}
        fetchLatestComic={fetchLatestComic}
        loading={!comic}
      />
    </div>
  );
}

const Buttons = ({
  fetchComic,
  fetchLatestComic,
  currentNum,
  latestNum,
  loading,
}) => {
  const fetchRandom = () => {
    const num = Math.floor((Math.random() * (latestNum - 1)) + 1);
    fetchComic(num);
  };

  return (
    <div className="buttons-row">
      <button
        disabled={loading || currentNum === 1}
        onClick={() => fetchComic(1)}>
        {'|<'}
      </button>
      <button
        disabled={loading || currentNum === 1}
        onClick={() => fetchComic(currentNum-1)}>
        {'<'}
      </button>
      <button
        disabled={loading}
        onClick={() => fetchRandom()}>
        random
      </button>
      <button
        disabled={loading || currentNum === latestNum}
        onClick={() => fetchComic(currentNum+1)}>
        {'>'}
      </button>
      <button
        disabled={loading || currentNum === latestNum}
        onClick={() => fetchLatestComic()}>
        {'>|'}
      </button>
    </div>
  );
};

export default App;
