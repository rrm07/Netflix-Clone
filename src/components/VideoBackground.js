import React from "react";
import { useSelector } from "react-redux";
import useMovieTrailer from "../customhooks/useMovieTrailer";

const VideoBackground = ({ movieId }) => {

  const trailerVideo = useSelector(store => store.movies?.trailerVideo)

  useMovieTrailer(movieId);

  return (
    <div>
      <iframe className="w-screen h-screen "
        width="560"
        height="315"
        src={`https://www.youtube.com/embed/${trailerVideo?.key}?si=c5sswaR4Y9IfWeQX?&autoplay=1&mute=1&controls=0`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      ></iframe>
    </div>
  );
};

export default VideoBackground;
