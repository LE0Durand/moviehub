import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Discover.css";
import Moviecard from "../components/MovieCard";
import SkeletonMovieCard from "../components/SkeletonMovieCard";

const API_KEY = "3a312cb6ea92126c21800352abddddb1";

export default function Discover() {
  const [popularMovies, setPopularMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getAllMovies() {
      try {
        const responsePopularMovies = await axios
          .get(
            `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&page=1`
          )
          .then((res) => {
            setPopularMovies(res.data.results.slice(0, 6));
          });
        const responseUpcomingMovies = await axios
          .get(
            `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&page=1`
          )
          .then((res) => {
            setUpcomingMovies(res.data.results.slice(0, 6));
          });
        const responseLatestMovies = await axios
          .get(
            `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=fr&page=1`
          )
          .then((res) => {
            setNowPlayingMovies(res.data.results.slice(0, 6));
          });
        setLoading(false);
      } catch (e) {
        console.log(e);
      }
    }
    getAllMovies();
  }, []);
  return (
    <div className="discover">
      <div className="container">
        <div className="row">
          <div className="discover__wrapper">
            <div className="discover__movie--wrapper">
              <h2 className="discover__title">Popular movies</h2>
              <div className="discover__movie-card--wrapper">
                {loading ? (
                  <>
                    <SkeletonMovieCard />
                    <SkeletonMovieCard />
                  </>
                ) : (
                  popularMovies.map((movie, index) => (
                    <Moviecard key={index} movie={movie} />
                  ))
                )}
              </div>
            </div>
            <div className="discover__movie--wrapper">
              <h2 className="discover__title">Upcoming movies</h2>
              <div className="discover__movie-card--wrapper">
                {loading ? (
                  <>
                    <SkeletonMovieCard />
                    <SkeletonMovieCard />
                  </>
                ) : (
                  upcomingMovies.map((movie, index) => (
                    <Moviecard key={index} movie={movie} />
                  ))
                )}
              </div>
            </div>
            <div className="discover__movie--wrapper">
              <h2 className="discover__title">Now playing movies</h2>
              <div className="discover__movie-card--wrapper">
                {loading ? (
                  <>
                    <SkeletonMovieCard />
                    <SkeletonMovieCard />
                  </>
                ) : (
                  nowPlayingMovies.map((movie, index) => (
                    <Moviecard key={index} movie={movie} />
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
