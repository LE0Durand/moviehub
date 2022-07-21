import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Landing.css";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const API_KEY = "3a312cb6ea92126c21800352abddddb1";

export default function Landing() {
  let navigate = useNavigate();

  const [randomMovie, setRandomMovie] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getRandomMovie() {
      try {
        const response = await axios
          .get(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`)
          .then((res) => {
            const randomNumber = Math.floor(Math.random() * 20);
            setRandomMovie(res.data.results[randomNumber]);
            setLoading(false);
          });
      } catch (e) {
        console.log(e);
      }
    }
    getRandomMovie();
  }, []);

  function onSearch(e) {
    if (inputValue === "") {
      alert("The search field cannot be empty !");
    } else {
      navigate("/results", { state: { name: { inputValue } } });
    }
  }

  return (
    <section className="landing">
      <h1 className="title">Find your movie</h1>
      <figure className="landing__img--wrapper">
        {loading ? (
          <div className="skeleton"></div>
        ) : (
          <img
            className="landing__img"
            src={`https://image.tmdb.org/t/p/original${randomMovie.backdrop_path}`}
            alt=""
          />
        )}
      </figure>
      <div className="landing__input--wrapper">
        <input
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
          placeholder={loading ? "Enter a movie title" : `${randomMovie.title}`}
          className="landing__input"
          type="text"
          onKeyPress={(event) => {
            if (event.key === "Enter") {
              onSearch(event);
            }
          }}
        />
        <SearchIcon
          onClick={(event) => onSearch(event)}
          className="search-icon"
        />
      </div>
      <a href="#top-rated-movies" className="go-down--icon">
        &#8964;
      </a>
    </section>
  );
}
