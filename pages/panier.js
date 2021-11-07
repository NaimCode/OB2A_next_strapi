import { API_URL, getImageUrl, getImageUrlSmall } from "../utils/GetImageUrl";
import { useState, useEffect } from "react";
import Head from "next/head";
import { onAuthStateChanged } from "@firebase/auth";
import { auth } from "../Config/firebase";
import axios from "axios";
import router from "next/router";
import { MiniLoading } from "../components/Loading";
import StripeCheckout from "react-stripe-checkout";
import Pay from "../components/payment";
import Close from "@heroicons/react/outline/XIcon";
const stripeKey = process.env.STRIPE_PUBLIC_KEY;

const Panier = () => {
  const [isLoading, setisLoading] = useState(false);
  const [user, setuser] = useState(null);
  const [userStrapi, setuserStrapi] = useState(null);
  const [totalPrice, settotalPrice] = useState(0.0);
  const [isPay, setisPay] = useState(false);
  ///
  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      user ? setuser(user) : setuser(null);
      if (user) {
        const res = await axios.get(`${API_URL}/clients?email=${user.email}`);
        setuserStrapi(res.data[0]);

        let prix = 0.0;
        for (let i = 0; i < res.data[0].panier.length; i++) {
          prix += res.data[0].panier[i].prix;
        }
        settotalPrice(prix);
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
    <div className="relative">
      {isPay && (
        <div className="fixed  h-screen w-screen flex flex-col items-center justify-center bg-black bg-opacity-50 z-50 top-0 left-0">
          <div
            onClick={() => setisPay(false)}
            className="h-screen w-screen absolute z-[-1]"
          ></div>

          <Pay client={userStrapi} prix={totalPrice} />
        </div>
      )}
      <div className=" flex flex-col md:flex-row py-28 h-screen w-screen px-12 relative">
        <div className="flex-grow h-96  w-full mx-4">
          <h1 className="text-4xl font-semibold">Mon panier</h1>
          <div className="flex flex-col gap-3 pt-8">
            {!userStrapi ? (
              <MiniLoading />
            ) : (
              userStrapi.panier.map((p) => {
                return (
                  <div className="flex p-2 h-[100px] w-full border-2 border-gray-300 rounded-xl">
                    <img
                      src={getImageUrlSmall(p.image)}
                      alt=""
                      className="h-full object-cover w-[100px]"
                    />
                  </div>
                );
              })
            )}
          </div>
        </div>
        <div className="w-1/3 shadow-xl mx-4 bg-secondary flex flex-col justify-between">
          <h3 className="text-xl">Validation</h3>
          <span className="text-lg font-bold">
            {totalPrice.toString() + "€"}
          </span>
          {!userStrapi ? (
            <MiniLoading />
          ) : (
            <button
              onClick={() => setisPay(true)}
              className="bg-yellow-400 w-full py-2 rounded-lg"
            >
              passer au paiement
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Panier;
