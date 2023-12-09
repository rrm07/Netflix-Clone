import React from "react";
import { IMG_CDN_URL } from "../utils/constants";
import { Link } from "react-router-dom";
import WatchPage from "./WatchPage";

const MovieCard = ({ id, title, posterPath, movieVote }) => {
  if (!posterPath) return null;

  return (
    <div className="w-36 pr-4">
      <Link to={"/browse/" + id}>
        <img
          className="rounded-lg transform transition duration-100 hover:scale-110 cursor-pointer"
          src={IMG_CDN_URL + posterPath}
          alt="moviecard"
        />
      </Link>
    </div>
  );
};

export default MovieCard;
