import {
  API_URL,
  getImageUrl,
  getImageUrlSmall,
} from "../../utils/GetImageUrl";
import { useState, useContext } from "react";
import Head from "next/head";
import BagShop from "@heroicons/react/solid/ShoppingBagIcon";
import Fav from "@heroicons/react/solid/HeartIcon";

import AuthContext from "../../context/AuthContext";
const slug = ({ produit }) => {
  const { user } = useContext(AuthContext);

  const [imagePrincipal, setimagePrincipal] = useState(produit.image[0]);
  return (
    <div className="py-24 px-2">
      <Head>
        <title>{produit.titre}</title>
        <meta name="description" content={produit.meta_description} />
        <link rel="icon" href={getImageUrlSmall(produit.image)} />
      </Head>

      <section class="text-gray-600 body-font overflow-hidden px-4 md:px-1 ">
        <div class="container  mx-auto">
          <div class="lg:w-11/12 mx-auto flex flex-wrap justify-center">
            <div className="lg:w-1/2  w-full h-[500px] md:pr-8 rounded">
              <img
                alt="ecommerce"
                className={`w-full ${
                  produit.image.length === 1 ? "h-full" : "h-4/5"
                } object-cover object-center rounded shadow-md`}
                src={getImageUrl(imagePrincipal)}
              />
              {produit.image.length !== 1 && (
                <div className=" w-full h-1/5  py-3 flex flex-row space-x-2 rounded">
                  {produit.image.map((image) => (
                    <button
                      className="focus:outline-none"
                      onClick={(event) => setimagePrincipal(image)}
                    >
                      <img
                        src={getImageUrlSmall(image)}
                        className="h-full max-w-20 shadow"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div class="lg:w-1/2 w-full lg:h-[500px] flex flex-col justify-between ">
              <h1 class="text-primary-700 text-3xl lg:text-4xl title-font  font-medium mb-8">
                {produit.titre}
              </h1>

              {produit.couleur !== null && (
                <div class="flex border-t border-gray-200 py-2">
                  <span class="text-gray-500">Couleur</span>
                  <span class="ml-auto text-gray-900">{produit.couleur}</span>
                </div>
              )}
              {produit.taille !== null && (
                <div class="flex border-t border-gray-200 py-2">
                  <span class="text-gray-500">Taille</span>
                  <span class="ml-auto text-gray-900">{produit.taille}</span>
                </div>
              )}
              {produit.stock !== null && (
                <div class="flex border-t border-gray-200 py-2">
                  <span class="text-gray-500">Stock</span>
                  {produit.stock <= 0 ? (
                    <span class="ml-auto text-red-400">Rupture</span>
                  ) : (
                    <span class="ml-auto text-blue-400">Disponible</span>
                  )}
                </div>
              )}
              <div class="flex border-t border-gray-200 py-2">
                <span class="text-gray-500">Expédition</span>
                <span class="ml-auto text-gray-900">
                  {produit.prixLivraison === null || produit.prixLivraison == 0
                    ? "gratuite"
                    : "$" + produit.prixLivraison}
                </span>
              </div>
              <div class="flex border-t border-gray-200 py-2">
                <span class="text-gray-500">Vendeur</span>
                <span class="ml-auto text-gray-900">
                  {produit.vendeur === null ? "O'B2A" : produit.vendeur}
                </span>
              </div>
              <div class="flex items-center py-3 px-2 border-secondary border-solid border-2 my-3">
                <span class="title-font font-medium text-2xl text-gray-900">
                  $58.00
                </span>
                <button class="flex ml-auto text-white bg-blue-400 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">
                Acheter
                </button>
                <div class="h-full  py-1 flex flex-col justify-center sm:py-1">
                  <div class="group  relative ">
                    <button class="mx-2 group focus:outline-none hover:scale-x-110 duration-150 transition transform">
                      <BagShop className="h-9 text-primary-100 group-hover:text-primary-300" />
                    </button>
                    <div class="opacity-0 w-36 bg-primary-100 text-green-200 text-center text-xs rounded-lg py-2 absolute z-10 group-hover:opacity-100 bottom-full -left-1/2 ml-14 px-3 pointer-events-none">
                      Ajouter au Panier
                    </div>
                  </div>
                </div>
                <div class="h-full  py-1 flex flex-col justify-center sm:py-1">
                  <div class="group  relative ">
                <button class="group focus:outline-none hover:scale-x-110 duration-150 transition transform">
                  <Fav className="h-9 text-red-300 group-hover:text-red-600" />
                </button>
                <div class="opacity-0 w-36 bg-primary-100 text-green-200 text-center text-xs rounded-lg py-2 absolute z-10 group-hover:opacity-100 bottom-full -right-1/2 ml-14 px-3 pointer-events-none">
                      Ajouter aux Favoris
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="">
              <h2 class="text-primary-700 text-xl lg:text-2xl title-font  font-medium mb-4 mt-4">
                Description
              </h2>
              <p class="leading-relaxed mb-4">{produit.description}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
export async function getStaticPaths() {
  const produits_res = await fetch(`${API_URL}/produits`);

  const produits = await produits_res.json();
  const paths = produits.map((produit) => ({
    params: { slug: produit.slug },
  }));
  return {
    paths,
    fallback: false, // See the "fallback" section below
  };
}

export async function getStaticProps({ params }) {
  const produit_res = await fetch(`${API_URL}/produits?slug=${params.slug}`);
  const found = await produit_res.json();
  const produit = found[0];

  return {
    props: {
      produit,
    },
  };
}

export default slug;
