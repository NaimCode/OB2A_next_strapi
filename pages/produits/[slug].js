import {
  API_URL,
  getImageUrl,
  getImageUrlSmall,
} from "../../utils/GetImageUrl";
import { useState, useEffect } from "react";
import Head from "next/head";
import { onAuthStateChanged } from "@firebase/auth";
import { auth, getUser } from "../Config/firebase";
import axios from "axios";
import router from "next/router";
import { MiniLoading } from "../../components/Loading";
import { BsCartPlusFill, BsCartXFill } from "react-icons/bs";
import { MdPayments } from "react-icons/md";
const slug = ({ produit }) => {
  const [isLoading, setisLoading] = useState(false);
  const [user, setuser] = useState(null);
  const [userStrapi, setuserStrapi] = useState(null);

  const [imagePrincipal, setimagePrincipal] = useState(produit.image[0]);
  ///
  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      user ? setuser(user) : setuser(null);
      if (user) {
        const res = await axios.get(`${API_URL}/clients?email=${user.email}`);
        setuserStrapi(res.data[0]);
      }
    });
  }, []);
  ///
  const removeFromPanier = () => {
    setisLoading(true);
    axios
      .put(`${API_URL}/clients/${userStrapi.id}`, {
        panier: userStrapi.panier.filter((p) => p.id != produit.id),
      })
      .then((res) => router.reload())
      .catch((error) => console.log(error));
    setisLoading(false);
  };
  //
  const addToPanier = () => {
    setisLoading(true);
    axios
      .put(`${API_URL}/clients/${userStrapi.id}`, {
        panier: [...userStrapi.panier, produit],
      })
      .then((res) => router.reload())
      .catch((error) => console.log(error));
    setisLoading(false);
  };
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
            <div className="lg:w-1/2  w-full h-[300px] md:h-[500px] md:pr-8 rounded">
              <img
                alt="ecommerce"
                className={`w-full ${
                  produit.image.length === 1 ? " h-full" : "h-4/5"
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
                  ${produit.prix}
                </span>

                <button
                  onClick={() => {}}
                  class="  ml-auto font-logo text-black bg-secondary border-0 py-1 px-3 focus:outline-none rounded transition-all duration-300 hover:scale-110"
                >
                  <span className="flex flex-row gap-2 items-center justify-center">
                    <MdPayments className=" mr-2" />
                    Acheter
                  </span>
                </button>
                {/* {isLoading ? (
                  <button class="button is-loading">Loading button</button>
                ) : ( */}

                {isLoading ? (
                  <MiniLoading />
                ) : userStrapi &&
                  userStrapi.panier.some((p) => p.id === produit.id) ? (
                  <button
                    onClick={removeFromPanier}
                    class="  ml-auto font-logo text-black bg-secondary border-0 py-1 px-3 focus:outline-none rounded transition-all duration-300 hover:scale-110"
                  >
                    <span className="flex flex-row gap-2 items-center justify-center">
                      <BsCartXFill className="mb-1 mr-2" />
                      Retirer du panier
                    </span>
                  </button>
                ) : (
                  <button
                    onClick={addToPanier}
                    class="  ml-auto font-logo text-black bg-secondary border-0 py-1 px-3 focus:outline-none rounded transition-all duration-300 hover:scale-110"
                  >
                    <span className="flex flex-row gap-2 items-center justify-center">
                      <BsCartPlusFill className="mb-1 mr-2" /> Ajouter au Panier
                    </span>
                  </button>
                )}
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
