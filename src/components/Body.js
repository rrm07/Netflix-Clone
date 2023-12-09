import React from 'react'
import Login from './Login'
import Browse from './Browse'
import { RouterProvider, createBrowserRouter} from 'react-router-dom'
import WatchPage from './WatchPage'
import WatchTrailer from './WatchTrailer'

const Body = () => {

    const appRouter = createBrowserRouter([
        {
            path : "/",
            element : <Login/>
        },
        {
            path : "/browse",
            element : <Browse/>
        },
        {
            path : "/watch",
            element : <WatchPage />
        },
        {
            path: "/browse/:movieId",
            element : <WatchTrailer />
        },
    ])

  return (
    <div>
        <RouterProvider router={appRouter}/>
    </div>
  )
}

export default Body
