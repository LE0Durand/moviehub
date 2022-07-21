import React from "react";
import "./NoResults.css";
import NoResultsImg from "../assets/no_results.svg";

const Noresults = () => {
  return (
    <div className="no-results">
      <span className="no-results__title">
        Oooppss, we can't find what you are looking for, please try something
        else.
      </span>

      <figure className="no-results__img--wrapper">
        <img src={NoResultsImg} alt="" />
      </figure>
    </div>
  );
};

export default Noresults;
