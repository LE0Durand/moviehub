import axios from "axios";
import React, { useEffect, useState } from "react";
import SkeletonMovieCard from "./SkeletonMovieCard";
import Moviecard from "./MovieCard";
import "./TopRatedMovies.css";

const API_KEY = "3a312cb6ea92126c21800352abddddb1";

export default function TopRatedMovies() {
  const [topRatedMovies, setTopRatedMovies] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getTopRatedMovies() {
      try {
        const response = await axios
          .get(
            `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}`
          )
          .then((res) => {
            setTopRatedMovies(res.data.results.slice(0, 9));
          });
        setLoading(false);
      } catch (e) {
        console.log(e);
      }
    }
    getTopRatedMovies();
  }, []);
  return (
    <section id="top-rated-movies">
      <div className="container">
        <div className="row">
          <h2 className="section__title">Top Rated Movies</h2>
          <div className="movies--wrapper">
            {loading ? (
              <SkeletonMovieCard />
            ) : (
              topRatedMovies.map((movie, index) => (
                <Moviecard key={index} movie={movie} />
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
