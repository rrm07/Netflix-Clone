import React from 'react'
import MovieCard from './MovieCard'
import { useTranslation } from 'react-i18next';

const MovieList = ({title, movies}) => {

  const {t} = useTranslation();
  
  return (
    <div className='pl-14 p-5'>
        <h1 className='text-3xl py-2 text-white'>{t(title)}</h1>
        <div className='flex overflow-x-scroll no-scrollbar'>
            <div className='flex'>
                {
                    movies?.map(movie => <MovieCard key={movie.id} id={movie?.id} title={title} posterPath={movie.poster_path} 
                        movieVote={movie.vote_count} />)
                }
            </div>
        </div>
    </div>
  )
}

export default MovieList
