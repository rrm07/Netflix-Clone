import React, { useEffect } from "react";
import { auth } from "../utils/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { NETFLIX_LOGO, USER_ICON } from "../utils/constants";
import { toggleGptSearchView } from "../utils/gptSlice";
import { useTranslation } from "react-i18next";
import { changeLang } from "../utils/langSlice";

const Header = () => {
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const { t, i18n } = useTranslation();

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        navigate("/error");
      });
  };

  const handleGptSearch = () => {
    dispatch(toggleGptSearchView());
  };

  const handleLanguageChange = (e) => {
    i18n.changeLanguage(e.target.value);
    dispatch(changeLang(e.target.value));
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName } = user;
        dispatch(addUser({ uid: uid, email: email, displayName: displayName }));
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="absolute w-screen px-[3rem] py-2 bg-gradient-to-b from-black z-10 flex justify-between">
      <img className="w-44" src={NETFLIX_LOGO} alt="logo" />

      {user && (
        <div className="flex">
          <button
            onClick={handleGptSearch}
            className="p-2 m-4 mx-2 bg-gradient-to-r from-red-600 to-red-400 hover:to-red-600 text-white rounded-full shadow-md transform hover:scale-105 transition duration-300 ease-in-out border-2 border-red-900"
          >
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 15.75l-2.489-2.489m0 0a3.375 3.375 0 10-4.773-4.773 3.375 3.375 0 004.774 4.774zM21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </button>

          <img className="w-12 h-11 mt-4 p-1" src={USER_ICON} alt="usericon" />
          <div className="group relative text-white font-bold px-2 my-2 mt-7 w-8 ">
            <button className="rounded-full bg-gradient-to-r from-red-600 to-red-400 hover:to-red-600 text-white transform shadow-md hover:scale-105 hover:rotate-180 transition duration-300 ease-in-out border-2 border-red-900">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            <div
              className="group-hover:block absolute hidden p-1 px-2 mt-2 ml-[-5rem] bg-white text-black rounded-lg
            bg-gradient-to-r from-green-600 to-black-400 transform hover:scale-105 transition duration-300 ease-in-out"
            >
              <ul>
                <li>
                  <button
                    onClick={handleSignOut}
                    className="px-1 m-1 text-white"
                  >
                    {t("LogOut")}
                  </button>
                </li>

                <li>
                  <select
                    className="hover:scale-105 rounded-lg  bg-gradient-to-r from-black-600 to-black-400 "
                    onChange={handleLanguageChange}
                  >
                    <optgroup label={t("Select Language")}>
                      <option value="en">{t("English")}</option>
                      <option value="fr">{t("French")}</option>
                    </optgroup>
                  </select>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
