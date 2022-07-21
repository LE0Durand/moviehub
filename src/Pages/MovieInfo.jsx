import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./MovieInfo.css";
import axios from "axios";
import { CircularProgress } from "@mui/material";

const API_KEY = "3a312cb6ea92126c21800352abddddb1";

export default function MovieInfo() {
  const { id } = useParams();
  const [movie, setMovie] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getMovie() {
      try {
        const response = await axios
          .get(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`)
          .then((res) => {
            setMovie(res.data);
            setTimeout(() => {
              setLoading(false);
            }, 1000);
          });
      } catch (e) {
        console.log(e);
      }
    }
    getMovie();
  }, []);

  return (
    <div className="movieInfo">
      <div className="container">
        <div className="row">
          {loading ? (
            <div className="loading__spinner">
              <CircularProgress color="inherit" />
            </div>
          ) : (
            <div className="movie__info--wrapper">
              <figure className="movie__img--wrapper">
                {loading ? (
                  <div className="movie__img--skeleton"></div>
                ) : (
                  <img
                    className="movie__img"
                    src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                    alt=""
                  />
                )}
              </figure>
              <div className="movie__description">
                <div className="movie-info__title"> {movie.title}</div>
                <div className="movie-info__release-date">
                  <span className="red">Release date: </span>
                  {movie.release_date}
                </div>
                <div className="movie-info__runtime">
                  <span className="red">Runtime: </span>
                  {parseInt(movie.runtime / 60)}h{" " + (movie.runtime % 60)}min
                </div>
                <div className="movie-info__rating">
                  <span className="red">Rating: </span>
                  {parseFloat(movie.vote_average).toFixed(1)}/10
                </div>
                <div className="movie-info__overview">
                  <span className="red">Overview: </span>
                  {movie.overview}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
