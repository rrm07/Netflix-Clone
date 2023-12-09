import React, { useRef, useState } from "react";
import openai from "../utils/openAI";
import { API_OPTIONS } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addGptMovieResult } from "../utils/gptSlice";
import { useTranslation } from "react-i18next";

const GptSearchBar = () => {
  const [searchButtonClicked, setSearchButtonClicked] = useState(false);

  const searchText = useRef(null);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const searchMovieTMDB = async (movie) => {
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        movie +
        "&include_adult=false&language=en-US&page=1",
      API_OPTIONS
    );
    const json = await data.json();
    return json.results;
  };

  const handleGptSearchClick = async () => {
    setSearchButtonClicked(true);

    const gptQuery =
      "Act as a movie recommendation system and suggest some movies for the query : " +
      searchText.current.value +
      ".only give me names of 5 movies, comma seprated like the example given ahead. Example Result: Jawan, Gadar, Don, Sholay, Golmaal";

    const gptResults = await openai.chat.completions.create({
      messages: [{ role: "user", content: gptQuery }],
      model: "gpt-3.5-turbo",
    });

    if (!gptResults.choices) console.log("Error");

    const gptMovies = gptResults.choices?.[0]?.message?.content.split(",");
    const promiseArray = gptMovies.map((movie) => searchMovieTMDB(movie));
    const tmdbResults = await Promise.all(promiseArray);
    dispatch(
      addGptMovieResult({ movieNames: gptMovies, movieResults: tmdbResults })
    );

    setSearchButtonClicked(false);
  };

  return (
    <div className="pt-[15%] flex justify-center">
      <form
        className="bg-black w-1/2 grid grid-cols-12"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <input
          ref={searchText}
          type="text"
          className="p-4 m-4 rounded-lg col-span-9"
          placeholder={t("What would you like to watch today?")}
        />

        {searchButtonClicked ? (
          <button
            onClick={handleGptSearchClick}
            className="p-4 m-6 py-2 col-span-3 bg-gradient-to-r from-purple-600 to-purple-400 hover:to-purple-600 text-white rounded-lg shadow-md transform hover:scale-105 transition duration-300 ease-in-out border-2 border-black-900"
          >
            <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            {t("Searching")}
          </button>
        ) : (
          <button
            onClick={handleGptSearchClick}
            className="p-4 m-6 py-2 col-span-3 bg-gradient-to-r from-purple-600 to-purple-400 hover:to-purple-600 text-white rounded-lg shadow-md transform hover:scale-105 transition duration-300 ease-in-out border-2 border-black-900"
          >
            {t("Search")}
          </button>
        )}
      </form>
    </div>
  );
};

export default GptSearchBar;
