import { MyHead } from "../components/Mini";
import Image from "next/image";
import { API_URL, getImageUrl } from "../utils/GetImageUrl";
import Link from "next/link";

import MiniCardProduct from "../components/MiniCardProduct";
import { useState, useEffect } from "react";

export default function Home(props) {
  console.log(props.collections);
  return (
    <div>
      <MyHead />
      <Hero />
      <CategorieSection />
      <ProductsListNouveau produits={props.produits} />

      <ProductsListPromotion produits={props.produits} />
      <CollectionsSection collections={props.collections} />
    </div>
  );
}
const CategorieSection = () => {
  return (
    <div>
      <div className=" mb-2 bg-white w-screen h-1"></div>
      <div className=" mb-2 bg-secondary w-screen h-1"></div>
      <h1 className=" leading-normal pt-8 hover:animate-pulse  text-center font-logo font-light text-4xl md:text-6xl ">
        TENDANCE
      </h1>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-16 mx-auto">
          <div className="flex flex-wrap -m-4 ">
            <div className="group w-screen md:w-1/3">
              <div className=" h-[400px]  m-4 cursor-pointer  bg-secondary overflow-hidden md:h-[500px]">
                <img
                  alt="gallery"
                  className="w-full object-cover h-full object-center block  
              inset-0 group-hover:scale-110 transition duration-300 transform"
                  src="/images/womenFashion.png"
                />
              </div>
              <h3 className="text-xl text-primary-100 group-hover:text-primary-300 font-logo text-center md:text-3xl">
                Femme
              </h3>
            </div>
            <div className="group w-screen md:w-1/3">
              <div className=" h-[350px]  m-4 cursor-pointer  bg-secondary overflow-hidden md:h-[500px]">
                <img
                  alt="gallery"
                  className="w-full object-cover h-full object-center block  
              inset-0 group-hover:scale-110 transition duration-300 transform"
                  src="/images/menFashion.png"
                />
              </div>
              <h3 className="text-xl text-primary-100 group-hover:text-primary-300 font-logo text-center md:text-3xl">
                Homme
              </h3>
            </div>
            <div className="group w-screen md:w-1/3">
              <div className=" h-[350px]  m-4 cursor-pointer  bg-secondary overflow-hidden md:h-[500px]">
                <img
                  alt="gallery"
                  className="w-full object-cover h-full object-center block  
              inset-0 group-hover:scale-110 transition duration-300 transform"
                  src="/images/kidFashion.png"
                />
              </div>
              <h3 className="text-xl text-primary-100 group-hover:text-primary-300 font-logo text-center md:text-3xl">
                Enfant
              </h3>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
const ProductsListPromotion = ({ produits }) => {
  const produitsFilter = produits.slice(0, 4);

  return (
    <>
      <div className=" mb-2 bg-secondary w-screen h-1"></div>
      <div className="bg-secondary pt-10">
        <h1 className=" leading-normal hover:animate-pulse  text-center font-logo font-light text-4xl md:text-6xl ">
          PROMOTIONS
        </h1>
        <section className="text-gray-600 body-font">
          <div className="container px-5 py-16 mx-auto">
            <div className="flex flex-wrap -m-4">
              {produitsFilter.map((produit) => (
                <MiniCardProduct
                  key={produit.id}
                  keyP={produit.id}
                  produit={produit}
                  hoverColor="bg-white"
                />
              ))}
            </div>
          </div>
        </section>
      </div>
      <div className=" mt-2 bg-white w-screen h-1"></div>
      <div className=" mb-2 bg-secondary w-screen h-1"></div>
    </>
  );
};
const ProductsListNouveau = ({ produits }) => {
  return (
    <div>
      <h1 className=" leading-normal pt-8 hover:animate-pulse  text-center font-logo font-light text-4xl md:text-6xl ">
        NOUVEAUX PRODUITS
      </h1>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-16 mx-auto">
          <div className="flex flex-wrap -m-4">
            {produits.map((produit) => (
              <MiniCardProduct
                key={produit.id}
                keyP={produit.id}
                produit={produit}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
const CollectionsSection = ({ collections }) => {
  return (
    <div>
      <h1 className=" leading-normal mt-12 hover:animate-pulse  text-center font-logo font-light text-5xl md:text-6xl ">
        COLLECTIONS
      </h1>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-12 mx-auto flex flex-wrap">
          <div className="lg:w-4/5 mx-auto overflow-hidden">
            <Link href="#">
              <a>
                <div className="group w-full bg-black py-16 relative  overflow-hidden mb-4 cursor-pointer ">
                  <img
                    alt="gallery"
                    className="w-full object-cover h-full object-center block opacity-50 absolute 
              inset-0 group-hover:scale-105 transition duration-300 transform"
                    src={getImageUrl(collections[0].image)}
                  />
                  <div
                    className="text-center relative z-10 w-full group-hover:scale-110
             transition duration-200 transform"
                  >
                    <h2 className="text-xl md:text-4xl font-logo text-white font-medium title-font mb-2 ">
                      {collections[0].titre}
                    </h2>
                    <p className=" leading-relaxed text-green-300 text-base md:text-lg m-auto w-3/4 md:w-3/5 ">
                      {collections[0].description}
                    </p>
                  </div>
                </div>
              </a>
            </Link>
          </div>
          <div className="lg:w-4/5 mx-auto overflow-hidden grid grid-cols-2 gap-4 justify-center items-center">
            <Link href="#" className="">
              <a>
                <div className="group w-full bg-black py-16 relative  overflow-hidden mb-4 cursor-pointer ">
                  <img
                    alt="gallery"
                    className="w-full object-cover h-full object-center block opacity-50 absolute 
              inset-0 group-hover:scale-105 transition duration-300 transform"
                    src={getImageUrl(collections[1].image)}
                  />
                  <div
                    className="text-center relative z-10 w-full group-hover:scale-110
             transition duration-200 transform"
                  >
                    <h2 className="text-xl md:text-4xl font-logo text-white font-medium title-font mb-2 ">
                      {collections[1].titre}
                    </h2>
                    <p className=" leading-relaxed text-green-300 text-base md:text-lg m-auto w-3/4 md:w-3/5 ">
                      {collections[1].description}
                    </p>
                  </div>
                </div>
              </a>
            </Link>

            <Link href="#" className="">
              <a>
                <div className="group w-full bg-black py-16 relative  overflow-hidden mb-4 cursor-pointer ">
                  <img
                    alt="gallery"
                    className="w-full object-cover h-full object-center block opacity-50 absolute 
              inset-0 group-hover:scale-105 transition duration-300 transform"
                    src={getImageUrl(collections[2].image)}
                  />
                  <div
                    className="text-center relative z-10 w-full group-hover:scale-110
             transition duration-200 transform"
                  >
                    <h2 className="text-xl md:text-4xl font-logo text-white font-medium title-font mb-2 ">
                      {collections[2].titre}
                    </h2>
                    <p className=" leading-relaxed text-green-300 text-lg m-auto w-3/4 md:w-3/5 ">
                      {collections[2].description}
                    </p>
                  </div>
                </div>
              </a>
            </Link>
          </div>
        </div>
      </section>
      <div className=" mt-2 bg-secondary w-screen h-1"></div>
      <div className=" mb-2 bg-white w-screen h-1"></div>
    </div>
  );
};
const Hero = () => {
  return (
    <section className="text-gray-600 body-font bg-secondary">
      <div className="container mx-auto flex px-5 py-20 md:flex-row flex-col items-center md:pt-12 ">
        <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
          <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
            Before they sold out
            <br className="hidden lg:inline-block" />
            readymade gluten
          </h1>
          <p className="mb-8 leading-relaxed">
            Copper mug try-hard pitchfork pour-over freegan heirloom neutra air
            plant cold-pressed tacos poke beard tote bag. Heirloom echo park
            mlkshk tote bag selvage hot chicken authentic tumeric truffaut
            hexagon try-hard chambray.
          </p>
          <div className="flex justify-center">
            <button className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">
              Acheter
            </button>
          </div>
        </div>
        <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
          <img
            className="object-cover object-center rounded hover:scale-110 transition duration-300 transform"
            alt="hero"
            src="/images/heroImage.png"
          />
        </div>
      </div>
    </section>
  );
};

export async function getStaticProps() {
  const collection_res = await fetch(`${API_URL}/collections/`);
  const produit_res = await fetch(`${API_URL}/produits/`);
  const collections = await collection_res.json();
  const produits = await produit_res.json();
  return {
    props: {
      produits,
      collections,
    },
  };
}
