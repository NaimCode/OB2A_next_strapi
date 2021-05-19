import { Logo } from "../components/Mini";
import Link from "next/link";
import SearchIcon from "@heroicons/react/outline/SearchIcon";
import HeartIcon from "@heroicons/react/outline/HeartIcon";
import BagIcon from "@heroicons/react/outline/ShoppingBagIcon";
import SettingIcon from "@heroicons/react/outline/CogIcon";
import UserIcon from "@heroicons/react/outline/UserIcon";
import MenuIcon from "@heroicons/react/outline/MenuAlt2Icon";
import "bulma/css/bulma.css";

import { useState, useEffect, useContext } from "react";
import AuthContext from "../context/AuthContext";
const NavBar = () => {
  const [isScrollingNav, setIsScrollingNav] = useState({
    shadow: "shadow-none",
    color: "bg-secondary",
  });
  const [isOpenMenu, setisOpenMenu] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", scrollingNav);
  }, []);
  function scrollingNav() {
    console.log("en marche");
    console.log(window.scrollY);
    if (window.scrollY > 1) {
      setIsScrollingNav({ shadow: "shadow-md", color: "bg-white" });
    } else {
      setIsScrollingNav({ shadow: "shadow-none", color: "bg-secondary" });
    }
  }
  const { user } = useContext(AuthContext);
  return (
    <div
      className={`fixed z-50 w-screen ${isScrollingNav.shadow} ${isScrollingNav.color}`}
    >
      <div className="flex justify-between  py-3 px-5  items-center md:px-10">
        <button
          className="text-primary-100 pt-2 pr-3 rounded 
         overflow-visible ml-1 focus:outline-none  hover:text-blue-500
          hover:scale-110 transition duration-100 transform md:hidden"
        >
          <MenuIcon className="h-6" />
        </button>

        <Logo />
        {user !== null ? (
          <Link href="/compte">
            <a>{user}</a>
          </Link>
        ) : (
          "Not Connect"
        )}
        <div className="hidden md:inline-flex space-x-6 ">
          <Link href="/">
            <a
              className="cursor-pointer font-logo font-light
             text-primary-700 text-xl hover:font-medium hover:text-blue-700 "
            >
              Accueil
            </a>
          </Link>

          <div className="dropdown is-hoverable">
            <div className="dropdown-trigger">
              <a
                className="cursor-pointer font-logo font-light text-primary-700
               text-xl hover:font-medium hover:text-blue-700"
              >
                Catégories
              </a>
            </div>
            <div className="dropdown-menu" id="dropdown-menu3" role="menu">
              <div className="dropdown-content">
                <a href="#" className="dropdown-item">
                  Overview
                </a>
                <hr className="dropdown-divider" />
                <a href="#" className="dropdown-item">
                  More
                </a>
              </div>
            </div>
          </div>
          <div className="dropdown is-hoverable">
            <div className="dropdown-trigger">
              <span
                className="cursor-pointer font-logo font-light text-primary-700
               text-xl hover:font-medium  hover:text-blue-700"
              >
                Pages
              </span>
            </div>
            <div className="dropdown-menu" id="dropdown-menu3" role="menu">
              <div className="dropdown-content">
                <a href="#" className="dropdown-item">
                  Overview
                </a>
                <hr className="dropdown-divider" />
                <a href="#" className="dropdown-item">
                  More
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-row w-min">
          <div
            className="hidden md:relative text-gray-600  bg-transparent md:flex 
          flex-row rounded-md px-1 border-green-300 border-solid border-2"
          >
            <input
              className="outline-none p-2 bg-transparent"
              placeholder="Recherche"
              type="search"
            ></input>
            <button type="submit" className="focus:outline-none mx-3">
              <SearchIcon className="h-6 text-primary-100" />
            </button>
          </div>

          <div className="dropdown is-hoverable">
            <div className="dropdown-trigger">
              <button
                className="hidden md:inline-block text-primary-100 pt-2 pr-3
               rounded  overflow-visible ml-5 focus:outline-none  hover:text-blue-500
                hover:scale-110 transition duration-100 transform"
              >
                <UserIcon className="h-6" />
              </button>
            </div>
            <div className="dropdown-menu" id="dropdown-menu3" role="menu">
              <div className="dropdown-content">
                <a href="#" className="dropdown-item">
                  Overview
                </a>
                <hr className="dropdown-divider" />
                <a href="#" className="dropdown-item">
                  More
                </a>
              </div>
            </div>
          </div>

          <button
            className="relative text-primary-100 p-1 rounded 
           overflow-visible mx-2 focus:outline-none  hover:text-blue-500 
           hover:scale-110 transition duration-100 transform"
          >
            <HeartIcon className="h-6" />
            <span
              className="absolute top-1 right-1 inline-flex items-center
             justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 
             transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full"
            >
              0
            </span>
          </button>
          <button
            className="relative text-primary-100 p-1 rounded  overflow-visible mx-2
           focus:outline-none  hover:text-blue-500 hover:scale-110 transition
           duration-100 transform"
          >
            <BagIcon className="h-6" />
            <span
              className="absolute top-1 right-1 inline-flex items-center 
            justify-center px-2 py-1 text-xs font-bold leading-none text-red-100
            transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full"
            >
              4
            </span>
          </button>

          <button
            className="hidden md:inline-block text-primary-100 p-1 rounded
           overflow-visible mx-2 focus:outline-none hover:text-blue-500
            hover:scale-110 transition duration-100 transform"
          >
            <SettingIcon className="h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
