import { Logo } from "../components/Mini";
import Link from "next/link";
import SearchIcon from "@heroicons/react/outline/SearchIcon";
import HeartIcon from "@heroicons/react/outline/HeartIcon";
import BagIcon from "@heroicons/react/outline/ShoppingBagIcon";
import SettingIcon from "@heroicons/react/outline/CogIcon";
import UserIcon from "@heroicons/react/outline/UserIcon";
import MenuIcon from "@heroicons/react/outline/MenuAlt2Icon";
import Router from "next/router";
import Down from "@heroicons/react/outline/ChevronDownIcon";
import Close from "@heroicons/react/outline/XIcon";
import "bulma/css/bulma.css";

import { useState, useEffect, useContext } from "react";

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

  const Search = (event) => {
    setisOpenMenu(false);
    event.preventDefault();
    Router.push(`/produits/recherche?slug=${search}`);
  };
  return (
    <div className={`fixed z-50 flex flex-col `}>
      <div
        className={`flex w-screen justify-between  py-3 px-5  items-center nd:px-10 ${isScrollingNav.shadow} ${isScrollingNav.color}`}
      >
        <button
          onClick={() => setisOpenMenu(!isOpenMenu)}
          className="text-primary-100 pt-2 pr-3 rounded 
         overflow-visible ml-1 focus:outline-none  hover:text-blue-500
          hover:scale-110 transition duration-100 transform nd:hidden"
        >
          {isOpenMenu ? (
            <Close className="h-6" />
          ) : (
            <MenuIcon className="h-6" />
          )}
        </button>

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
                <Link href="/categorie/accessoires">
                  <a className="dropdown-item">Accessoires</a>
                </Link>
                <Link href="/categorie/beaute-et-cosmetique">
                  <a className="dropdown-item">Beauté et cosmétique</a>
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
                <Link href="/categorie/electromenagers">
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
                <Link href="/page/contact">
                  <a className="dropdown-item">Contactez Nous</a>
                </Link>
                <Link href="/page/apropos-de-nous">
                  <a className="dropdown-item">Apropos de Nous </a>
                </Link>
                <Link href="/page/faq">
                  <a className="dropdown-item">{`FAQ`} </a>
                </Link>
                <hr className="dropdown-divider" />
                <Link href="/page/pro">
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
            className="inline-block text-primary-100 mx-2
               rounded  overflow-visible ml-2 focus:outline-none  hover:text-blue-500
                hover:scale-110 transition duration-100 transform"
            onClick={() => Router.push("/auth")}
          >
            <UserIcon className="h-6" />
          </button>

          <button
            className="relative text-primary-100 p-1 rounded 
             overflow-visible mx-1
           focus:outline-none  hover:text-blue-500 hover:scale-110 transition
           duration-100 transform"
          >
            <BagIcon className="h-6" />
            {/* <span
              className="absolute top-1 right-1 inline-flex items-center 
            justify-center px-2 py-1 text-xs font-bold leading-none text-red-100
            transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full"
            >
              {user===null?"0":user?.panier?.length}
            
            </span> */}
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
      <div
        className={`w-screen flex flex-row ${
          !isOpenMenu && "hidden"
        } duration-200 transition transform `}
      >
        <div className="w-[274px] bg-white">
          <div className="w-full h-[90vh]  p-3 overflow-y-scroll overflow-x-hidden">
            <form onSubmit={Search}>
              <div
                className="relative text-gray-600  bg-transparent flex 
          flex-row rounded-md border-green-300 border-solid border-2 justify-between"
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

            <div
              onClick={() => {
                setisOpenMenu(false);
                Router.push("/");
              }}
              className="hover:bg-secondary cursor-pointer w-full my-2 p-1 rounded
             text-primary-700 text-2xl font-logo"
            >
              Accueil
            </div>
            <div
              onClick={() => {
                setisOpenMenu(false);
                Router.push("/produits");
              }}
              className="hover:bg-secondary cursor-pointer w-full my-2 p-1 rounded
             text-primary-700 text-2xl font-logo"
            >
              Explorer
            </div>
            <div
              className="  w-full mt-2 p-1 rounded
             text-primary-700 text-2xl font-logo flex flex-row items-center justify-between"
            >
              Catégories
              <Down className="h-6 text-primary-700" />
            </div>
            <div className="pl-10 pt-1 pb-3 ">
              <div
                onClick={() => {
                  setisOpenMenu(false);
                  Router.push("/categorie/accessoires");
                }}
                className="hover:bg-secondary cursor-pointer w-full rounded p-1
              text-gray-500 "
              >
                • Accessoires
              </div>
              <div
                onClick={() => {
                  setisOpenMenu(false);
                  Router.push("/categorie/enfant");
                }}
                className="hover:bg-secondary cursor-pointer w-full rounded p-1
              text-gray-500  "
              >
                • Enfant
              </div>
              <div
                onClick={() => {
                  setisOpenMenu(false);
                  Router.push("/categorie/homme");
                }}
                className="hover:bg-secondary cursor-pointer w-full rounded p-1
              text-gray-500 "
              >
                • Homme
              </div>
              <div
                onClick={() => {
                  setisOpenMenu(false);
                  Router.push("/categorie/femme");
                }}
                className="hover:bg-secondary cursor-pointer w-full rounded p-1
             text-gray-500  "
              >
                • Femme
              </div>
              <div
                onClick={() => {
                  setisOpenMenu(false);
                  Router.push("/categorie/epicerie");
                }}
                className="hover:bg-secondary cursor-pointer w-full rounded p-1
             text-gray-500  "
              >
                • Épicerie
              </div>
              <div
                onClick={() => {
                  setisOpenMenu(false);
                  Router.push("/categorie/electromenager");
                }}
                className="hover:bg-secondary cursor-pointer w-full rounded p-1
             text-gray-500  "
              >
                • Électroménagers
              </div>
              <div
                onClick={() => {
                  setisOpenMenu(false);
                  Router.push("/categorie/maison");
                }}
                className="hover:bg-secondary cursor-pointer w-full rounded p-1
             text-gray-500  "
              >
                • Maison
              </div>
              <div
                onClick={() => {
                  setisOpenMenu(false);
                  Router.push("/categorie/autre");
                }}
                className="hover:bg-secondary cursor-pointer w-full rounded p-1
             text-gray-500  "
              >
                • Autre
              </div>
            </div>

            <div
              className="  w-full mt-2 p-1 rounded
             text-primary-700 text-2xl font-logo flex flex-row items-center justify-between"
            >
              Pages
              <Down className="h-6 text-primary-700" />
            </div>
            <div className="pl-10 pt-1 pb-3 ">
              <div
                onClick={() => {
                  setisOpenMenu(false);
                  Router.push("/page/pro");
                }}
                className="hover:bg-secondary cursor-pointer w-full rounded p-1
              text-gray-500 "
              >
                • O'B2A pro
              </div>
              <div
                onClick={() => {
                  setisOpenMenu(false);
                  Router.push("/page/contact");
                }}
                className="hover:bg-secondary cursor-pointer w-full rounded p-1
              text-gray-500 "
              >
                • Contactez Nous
              </div>
              <div
                onClick={() => {
                  setisOpenMenu(false);
                  Router.push("/page/apropos-de-nous");
                }}
                className="hover:bg-secondary cursor-pointer w-full rounded p-1
              text-gray-500 "
              >
                • Apropos de Nous
              </div>
              <div
                onClick={() => {
                  setisOpenMenu(false);
                  Router.push("/page/faq");
                }}
                className="hover:bg-secondary cursor-pointer w-full rounded p-1
              text-gray-500 "
              >
                • FAQ
              </div>
            </div>
          </div>
        </div>
        <div
          onClick={() => setisOpenMenu(!isOpenMenu)}
          className="flex-1 h-screen bg-black bg-opacity-50"
        ></div>
      </div>
    </div>
  );
};

const Menu = ({ isOpen, setIsOpen }) => {
  return (
    <div
      className={`w-screen flex flex-row ${
        !isOpen ? "translate-y-full" : "translate-y-0"
      } duration-200 transition transform`}
    >
      <div className="w-1/2 h-screen bg-white p-3">
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
      </div>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="w-1/2 h-screen bg-black bg-opacity-50"
      ></div>
    </div>
  );
};

export default NavBar;
