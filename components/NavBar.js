import { Logo } from "../components/Mini";
import Link from "next/link";
import SearchIcon from "@heroicons/react/outline/SearchIcon";
import HeartIcon from "@heroicons/react/outline/HeartIcon";
import BagIcon from "@heroicons/react/outline/ShoppingBagIcon";
import SettingIcon from "@heroicons/react/outline/CogIcon";
import UserIcon from "@heroicons/react/outline/UserIcon";
import MenuIcon from "@heroicons/react/outline/MenuAlt2Icon";
import Router from "next/router";

import "bulma/css/bulma.css";

import { useState, useEffect, useContext } from "react";
import AuthContext from "../context/AuthContext";
import { magic } from "../lib/magic";
const NavBar = () => {
  const [isScrollingNav, setIsScrollingNav] = useState({
    shadow: "shadow-none",
    color: "bg-secondary",
  });
  const [isOpenMenu, setisOpenMenu] = useState(false);
  const [search, setsearch] = useState("");

  useEffect(() => {
    window.addEventListener("scroll", scrollingNav);
  }, []);
  function scrollingNav() {
    if (window.scrollY > 1) {
      setIsScrollingNav({ shadow: "shadow-md", color: "bg-white" });
    } else {
      setIsScrollingNav({ shadow: "shadow-none", color: "bg-secondary" });
    }
  }
  const { user } = useContext(AuthContext);
  const Search = (event) => {
    event.preventDefault();
    Router.push(`/produits/recherche?slug=${search}`);
  };
  return (
    <div
      className={`fixed z-50 w-screen ${isScrollingNav.shadow} ${isScrollingNav.color}`}
    >
      <div className="flex justify-between  py-3 px-5  items-center nd:px-10">
        <div className="dropdown ">
          <div className="dropdown-trigger">
            <button
              className="text-primary-100 pt-2 pr-3 rounded 
         overflow-visible ml-1 focus:outline-none  hover:text-blue-500
          hover:scale-110 transition duration-100 transform nd:hidden"
            >
              <MenuIcon className="h-6" />
            </button>
          </div>
          <div className="dropdown-menu" id="dropdown-menu3" role="menu">
            <div className="dropdown-content w-[50vw]">
            
               <div className="flex flex-row justify-around ">
               <button
                className="inline-block text-primary-100 
               rounded  overflow-visible ml-2 focus:outline-none  hover:text-blue-500
                hover:scale-110 transition duration-100 transform"
                onClick={() => {
                  user === null ? Router.push("/auth") : Router.push("/compte");
                }}
              >
                <UserIcon className="h-6" />
              </button>
               <button
            className="inline-block text-primary-100 p-1 rounded
           overflow-visible mx-1 focus:outline-none hover:text-blue-500
            hover:scale-110 transition duration-100 transform"
          >
            <SettingIcon className="h-6" />
          </button>
               </div>
         
          <div className="flex flex-row justify-around border-solid border-secondary border-t-2 border-b-2 my-3 py-3">
          <Link href="/">
            <a
              className=" cursor-pointer font-logo font-light
             text-primary-700  hover:font-medium hover:text-blue-700 "
            >
              Accueil
            </a>
          </Link>
          <Link href="/produits">
            <a
              className="cursor-pointer font-logo font-light
             text-primary-700  hover:font-medium hover:text-blue-700 "
            >
              Explorer
            </a>
          </Link>
          </div>
          <div className="dropdown-item dropdown ">
            <div className="dropdown-trigger">
              <a
                className="cursor-pointer font-logo font-light text-primary-700
               hover:font-medium hover:text-blue-700"
              >
                Catégories
              </a>
            </div>
            <div className="dropdown-menu" id="dropdown-menu3" role="menu">
              <div className="dropdown-content">
                <Link href="/categorie/accessoire">
                  <a className="dropdown-item">Accessoires</a>
                </Link>
                <Link href="/categorie/enfant">
                  <a className="dropdown-item">Enfant</a>
                </Link>
                <Link href="/categorie/homme">
                  <a className="dropdown-item">Homme</a>
                </Link>
                <Link href="/categorie/femme">
                  <a className="dropdown-item">Femme</a>
                </Link>
                <Link href="/categorie/epicerie">
                  <a className="dropdown-item">Épicerie</a>
                </Link>
                <Link href="/categorie/electromenager">
                  <a className="dropdown-item">Électroménagers</a>
                </Link>
                <Link href="/categorie/maison">
                  <a className="dropdown-item">Maison</a>
                </Link>
                <Link href="/categorie/sante">
                  <a className="dropdown-item">Santé</a>
                </Link>
                <hr className="dropdown-divider" />
                <Link href="/categorie/autre">
                  <a className="dropdown-item">Autre</a>
                </Link>
              </div>
            </div>
          </div>
          <div className="dropdown is-hoverable">
            <div className="dropdown-trigger">
              <span
                className="cursor-pointer font-logo font-light text-primary-700
               hover:font-medium  hover:text-blue-700"
              >
                Pages
              </span>
            </div>
            <div className="dropdown-menu" id="dropdown-menu3" role="menu">
              <div className="dropdown-content">
                <Link href="/">
                  <a className="dropdown-item">Contactez-Nous</a>
                </Link>
                <Link href="/">
                  <a className="dropdown-item">Apropos de Nous </a>
                </Link>
                <Link href="/">
                  <a className="dropdown-item">{`Q&A`} </a>
                </Link>
                <hr className="dropdown-divider" />
                <Link href="/categories/autre">
                  <a className="dropdown-item">O'B2A pro</a>
                </Link>
              </div>
            </div>
          </div>
        </div>
            </div>
          </div>
  

        <Logo />

        <div className="hidden nd:inline-flex space-x-5 text-xl">
          <Link href="/">
            <a
              className="cursor-pointer font-logo font-light
             text-primary-700  hover:font-medium hover:text-blue-700 "
            >
              Accueil
            </a>
          </Link>
          <Link href="/produits">
            <a
              className="cursor-pointer font-logo font-light
             text-primary-700  hover:font-medium hover:text-blue-700 "
            >
              Explorer
            </a>
          </Link>

          <div className="dropdown is-hoverable">
            <div className="dropdown-trigger">
              <a
                className="cursor-pointer font-logo font-light text-primary-700
               hover:font-medium hover:text-blue-700"
              >
                Catégories
              </a>
            </div>
            <div className="dropdown-menu" id="dropdown-menu3" role="menu">
              <div className="dropdown-content">
                <Link href="/categorie/accessoire">
                  <a className="dropdown-item">Accessoires</a>
                </Link>
                <Link href="/categorie/enfant">
                  <a className="dropdown-item">Enfant</a>
                </Link>
                <Link href="/categorie/homme">
                  <a className="dropdown-item">Homme</a>
                </Link>
                <Link href="/categorie/femme">
                  <a className="dropdown-item">Femme</a>
                </Link>
                <Link href="/categorie/epicerie">
                  <a className="dropdown-item">Épicerie</a>
                </Link>
                <Link href="/categorie/electromenager">
                  <a className="dropdown-item">Électroménagers</a>
                </Link>
                <Link href="/categorie/maison">
                  <a className="dropdown-item">Maison</a>
                </Link>
                <Link href="/categorie/sante">
                  <a className="dropdown-item">Santé</a>
                </Link>
                <hr className="dropdown-divider" />
                <Link href="/categorie/autre">
                  <a className="dropdown-item">Autre</a>
                </Link>
              </div>
            </div>
          </div>
          <div className="dropdown is-hoverable">
            <div className="dropdown-trigger">
              <span
                className="cursor-pointer font-logo font-light text-primary-700
               hover:font-medium  hover:text-blue-700"
              >
                Pages
              </span>
            </div>
            <div className="dropdown-menu" id="dropdown-menu3" role="menu">
              <div className="dropdown-content">
                <Link href="/">
                  <a className="dropdown-item">Contactez-Nous</a>
                </Link>
                <Link href="/">
                  <a className="dropdown-item">Apropos de Nous </a>
                </Link>
                <Link href="/">
                  <a className="dropdown-item">{`Q&A`} </a>
                </Link>
                <hr className="dropdown-divider" />
                <Link href="/categories/autre">
                  <a className="dropdown-item">O'B2A pro</a>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-row w-min">
          <form onSubmit={Search}>
            <div
              className="hidden nd:relative text-gray-600  bg-transparent md:flex 
          flex-row rounded-md px-1 border-green-300 border-solid border-2"
            >
              <input
                className="outline-none p-2 bg-transparent "
                placeholder="Recherche"
                value={search}
                onChange={(event) => setsearch(event.target.value)}
                type="search"
              ></input>
              <button type="submit" className="focus:outline-none mx-3">
                <SearchIcon className="h-6 text-primary-100" />
              </button>
            </div>
          </form>

              <button
                className="hidden nd:inline-block text-primary-100 
               rounded  overflow-visible ml-2 focus:outline-none  hover:text-blue-500
                hover:scale-110 transition duration-100 transform"
                onClick={() => {
                  user === null ? Router.push("/auth") : Router.push("/compte");
                }}
              >
                <UserIcon className="h-6" />
              </button>
          

          <button
            className="relative text-primary-100 p-1 rounded 
           overflow-visible mx-1 focus:outline-none  hover:text-blue-500 
           hover:scale-110 transition duration-100 transform"
          >
            <HeartIcon className="h-6" />
            <span
              className="absolute top-1 right-1 inline-flex items-center
             justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 
             transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full"
            >
              {user?.favoris?.length ?? 0}
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
            justify-center px-1 py-1 text-xs font-bold leading-none text-red-100
            transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full"
            >
              {user?.panier?.length ?? 0}
            </span>
          </button>

          <button
            className="hidden nd:inline-block text-primary-100 p-1 rounded
           overflow-visible mx-1 focus:outline-none hover:text-blue-500
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
