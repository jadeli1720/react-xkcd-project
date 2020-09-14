import React from "react";
import { useHistory, useParams } from "react-router-dom";
import "../App.scss";

const ComicButtons = ({
    comic,
    fetchComic,
    fetchLatestComic,
    loading
}) => {
    const history = useHistory();
    const { comicNumber } = useParams();

    return (
        <div className="button-container">
            <button
                disabled={loading || comic.num === 1}
                onClick={() => history.push("/1")}
            >
                first
            </button>
            <button
                disabled={loading || comic.num <= 1}
                onClick={() => history.push(`/${comic.num - 1}`)}
            >
                previous
            </button>

            <button
            disabled={loading}
            onClick={() => history.push('/random')}
            >
            random
            </button>
            <button
                disabled={loading || !comicNumber}
                onClick={() => history.push(`/${comic.num + 1}`)}
            >
                next
            </button>
            <button
                disabled={loading || !comicNumber}
                onClick={() => history.push(`/`)}
            >
                latest
            </button>
        </div>
        );
};

export default ComicButtons;
