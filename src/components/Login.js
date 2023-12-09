import React, { useState, useRef } from 'react'
import { checkValidateData } from '../utils/validate';
import Header from './Header'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../utils/firebase';
import { NETFLIX_BANNER } from '../utils/constants';

const Login = () => {

    const [isSignInForm, setIsSignInForm] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);

    const name = useRef(null);
    const email = useRef(null)
    const password = useRef(null)

    const handleSignInSignUp = ()=>{

        const msg = checkValidateData(email.current.value, password.current.value)
        setErrorMessage(msg)

        if (msg) return

        if (!isSignInForm){
            createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
            .then((userCredential) => {
            const user = userCredential.user;
            console.log(user);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setErrorMessage(errorCode + "-" + errorMessage)
            });
        }else{
            signInWithEmailAndPassword(auth, email.current.value, password.current.value)
            .then((userCredential) => {
              const user = userCredential.user;
              console.log(user);
            })
            .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
              setErrorMessage(errorCode + "-" + errorMessage)
            });
        }
    }

    const toggleSignInform = ()=>{
        setIsSignInForm(!isSignInForm)
    }

  return (
    <div>
      <Header />
        <div className="absolute">
            <img 
            src= {NETFLIX_BANNER}
            alt="logo" />
        </div>

        <form onSubmit={(e)=> {e.preventDefault()}}
        className="w-3/12 absolute p-12 mt-[5.8rem] bg-black my-28 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80">
            <h1 className='font-bold text-3xl py-2'>{isSignInForm ? "Sign In" : "Sign Up"}</h1>

            {!isSignInForm &&
            <input ref={name}
            type="text" placeholder="Full Name" className="p-2 my-4 w-full bg-gray-700"/>
            }   

            <input ref={email}
            type="text" placeholder="Email Address" className="p-2 my-4 w-full bg-gray-700"/>

            <input ref={password}
            type="password" placeholder="Password" className="p-2 my-4 w-full bg-gray-700"/>

            <p className='text-red-600 font-bold'>{errorMessage}</p>

            <button className="p-4 my-6 bg-red-700 w-full rounded-lg" onClick={handleSignInSignUp}>
                {isSignInForm ? "Sign In" : "Sign Up"}
            </button>

            <p onClick={toggleSignInform} className='cursor-pointer'>
                {isSignInForm ? "New to Netflix?Sign Up Now" : "Already User?Sign In Now"}
            </p>
        </form>

    </div>
  )
}

export default Login
