import React from 'react';
import { Link, useHistory, useLocation, useParams } from 'react-router-dom';
import '../App.scss';


const ComicButtons = ({
    comic,
    fetchComic, 
    fetchLatestComic, 
    // fetchRandomComic, 
    latestComicNum, 
    loading
}) => {

    const history = useHistory();
    const location = useLocation();
    const params = useParams();

    return (
        <div className="button-container">
            <button 
                disabled = {loading || comic.num === 1}
                onClick={() => history.push('/1')}
            >
            first
            </button>
            <button 
                disabled = {loading || comic.num <= 1}
                onClick={() => history.push(`/${comic.num - 1}`)}
            >
            previous
            </button>
            {/* <button 
                disabled={loading}
                onClick={() => fetchRandomComic()}>
            Random
            </button> */}
            <button 
                disabled = {loading || comic.num === latestComicNum}
                onClick={() => history.push(`/${comic.num + 1}`)}
            >
            next
            </button>
            <button 
                disabled = {loading || comic.num === latestComicNum}
                onClick={() => history.push(`/`)}
            >
            latest
            </button>
        </div>
    )

};

export default ComicButtons;