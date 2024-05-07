import React, { useEffect, useState } from 'react';
import './row.css';
import axios from '../../../utils/axios';
import movieTrailer from 'movie-trailer';
import YouTube from 'react-youtube';

const Row = ({ title, fetchUrl, isLargeRow }) => {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState('');

  const base_url = 'https://image.tmdb.org/t/p/original';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const request = await axios.get(fetchUrl);
        setMovies(request.data.results);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchData();
  }, [fetchUrl]);

  const handleClick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl(''); // Toggle off trailer
    } else {
      movieTrailer(movie?.title || movie?.name || movie?.original_name)
        .then((url) => {
          if (url) {
            try {
                console.log("url: ",url)
              const urlParams = new URLSearchParams(new URL(url).search);
              console.log(
                "params ",urlParams
              )
              const videoId = urlParams.get('v');
              console.log("VideoID: ",videoId)
              if (videoId) {
                setTrailerUrl(videoId);
              } else {
                console.error('Video ID not found in URL:', url);
              }
            } catch (err) {
              console.error('Error parsing trailer URL:', err);
            }
          } else {
            console.error('Received empty URL from movieTrailer.');
          }
        })
        .catch((error) => {
          console.error('Error fetching trailer:', error);
        });
    }
  };

  const opts = {
    height: '390',
    width: '100%',
    playerVars: {
      autoplay: 1,
    },
  };

  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row__posters">
        {movies.map((movie, index) => (
          <img
            key={index}
            src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
            alt={movie.name}
            className={`row__poster ${isLargeRow && 'row__posterLarge'}`}
            onClick={() => handleClick(movie)}
          />
        ))}
      </div>
      {trailerUrl && (
        <div style={{ padding: '40px' }}>
          <YouTube videoId={trailerUrl} opts={opts} />
        </div>
      )}
    </div>
  );
};

export default Row;
