import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const VideoTitle = ({original_title, overview}) => {

  const navigate = useNavigate();

  const {t} = useTranslation();

  const handlePlayVideo = () => {
    navigate("/watch")
  }


  return (
    <div className='pt-[5rem] px-[4rem] absolute'>
      <h1 className='text-4xl font-bold mt-[10rem] text-white'>{original_title}</h1>
      <p className='py-6 text-lg w-1/3 text-white'>{overview.split(["."])[0]}</p>
      <div className='flex'>
        <button onClick={handlePlayVideo}
        className='bg-white text-black px-8 p-2 rounded-lg flex font-bold hover:bg-opacity-50'>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
          </svg>
          {t("Play")}
        </button>
        <button
        className='mx-2 bg-gray-500 text-white px-8 p-2 rounded-lg flex font-bold hover:bg-opacity-50'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
          </svg>
          {t("More Info")}
        </button>
      </div>
    </div>
  )
}

export default VideoTitle
