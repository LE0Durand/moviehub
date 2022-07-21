import React from "react";
import axios from "axios";
import "./Results.css";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import SkeletonMovieCard from "../components/SkeletonMovieCard";
import Moviecard from "../components/MovieCard";
import Noresults from "../components/NoResults";

const API_KEY = "3a312cb6ea92126c21800352abddddb1";

export default function Results() {
  const location = useLocation();
  const movieTitle = location.state.name.inputValue;
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getMovies() {
      try {
        const response = await axios
          .get(
            `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${movieTitle}`
          )
          .then((res) => {
            const completedMovies = res.data.results.filter(
              (movie) => movie.poster_path !== ""
            );
            setMovies(completedMovies);
            setMovies(
              res.data.results.filter((movie) => movie.poster_path !== null)
            );
            setLoading(false);
          });
      } catch (e) {
        console.log(e);
      }
    }
    getMovies();
  }, []);

  function filterMovies(filter) {
    if (filter === "RATING") {
      setMovies(movies.slice().sort((a, b) => b.vote_average - a.vote_average));
    } else if (filter === "OLDEST") {
      setMovies(
        movies
          .slice()
          .sort((a, b) => new Date(a.release_date) - new Date(b.release_date))
      );
    } else if (filter === "LATEST") {
      setMovies(
        movies
          .slice()
          .sort((a, b) => new Date(b.release_date) - new Date(a.release_date))
      );
    }
  }

  return (
    <div className="results">
      <div className="container">
        <div className="row">
          {movies.length > 0 && (
            <div className="results__header--wrapper">
              <h2 className="results__header--title">
                Search results : {movieTitle}
              </h2>
              <select
                defaultValue="DEFAULT"
                name="sort"
                className="results__header--select"
                onChange={(event) => filterMovies(event.target.value)}
              >
                <option disabled value="DEFAULT">
                  Sort
                </option>
                <option value="RATING">Rating</option>
                <option value="OLDEST">Release date: Oldest</option>
                <option value="LATEST">Release date: Latest</option>
              </select>
            </div>
          )}
          <div className="movies--wrapper">
            {loading ? (
              <>
                <SkeletonMovieCard />
                <SkeletonMovieCard />
                <SkeletonMovieCard />
              </>
            ) : movies.length > 0 ? (
              movies.map((movie, index) => (
                <Moviecard key={index} movie={movie} />
              ))
            ) : (
              <Noresults />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
