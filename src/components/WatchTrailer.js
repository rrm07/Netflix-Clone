import React, { useEffect, useState } from 'react';
import { useParams } from "react-router";
import { API_OPTIONS } from '../utils/constants';

const WatchTrailer = () => {

    const { movieId } = useParams();

    const [video, setVideo] = useState(null);

    useEffect(() => {
      fetchMovieVideo();
    }, []);

    const fetchMovieVideo = async () => {
        const data = await fetch(
          "https://api.themoviedb.org/3/movie/" +
            movieId +
            "/videos?language=en-US",
          API_OPTIONS
        );

        const json = await data.json();
        setVideo(json.results[0]);
      
    };
    
  return (
    <div>
        <div className=' mt-1 px-2 w-[98vw] absolute aspect-video hidden md:block'>
            <iframe
                className=' p-2'
                width='100%'
                height='100%'
                src={
                "https://www.youtube.com/embed/" +
                video?.key +
                "?autoplay=1&mute=1"
                } 
                title='YouTube video player'
                allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                >
            </iframe>
        </div>
    </div>
  )
}

export default WatchTrailer
