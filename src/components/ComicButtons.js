import React from'react';
import '../App.scss';

const ComicButtons = ({comic, fetchComic, fetchLatestComic, fetchRandomComic, latestComicNum}) => {
    return (
        <div className="button-container">
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
      </div>
    )

};

export default ComicButtons;