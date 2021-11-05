import { API_URL, getImageUrl, getImageUrlSmall } from "../utils/GetImageUrl";
import { useState, useEffect } from "react";
import Head from "next/head";
import { onAuthStateChanged } from "@firebase/auth";
import { auth } from "../Config/firebase";
import axios from "axios";
import router from "next/router";
import { MiniLoading } from "../components/Loading";
import StripeCheckout from "react-stripe-checkout";

const stripeKey = process.env.STRIPE_PUBLIC_KEY;

const Panier = () => {
  const [isLoading, setisLoading] = useState(false);
  const [user, setuser] = useState(null);
  const [userStrapi, setuserStrapi] = useState(null);
  const [totalPrice, settotalPrice] = useState(0.0);

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
  const onToken = (token) => {
    axios
      .post("http://localhost:4000/payment", {
        card: token.card,
        client: userStrapi,
        prix: totalPrice,
      })
      .then((response) => console.log(response.data))
      .catch((error) => console.log(error));
  };

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
        <span className="text-lg font-bold">{totalPrice.toString() + "€"}</span>
        {!userStrapi ? (
          <MiniLoading />
        ) : (
          <StripeCheckout
            email={userStrapi.email}
            name="Paiement" // the pop-in header title
            description="Veuillez completer les champs" // the pop-in header subtitle
            image="/assets/logo_mini_blue.png" // the pop-in header image (default none)
            ComponentClass="div"
            panelLabel="Payer" // prepended to the amount in the bottom pay button
            amount={totalPrice * 100} // cents
            currency="EUR"
            stripeKey="pk_test_51JoXgfFxlWbadRCP4yqyb92pis2jRp73g19HExuxWBNv3vRRqOatJZnrlc5CuxhvgMuhPvIs5JBn5MJacRRseecJ00iOeImYYm"
            locale="fr"
            // Note: Enabling either address option will give the user the ability to
            // fill out both. Addresses are sent as a second parameter in the token callback.
            shippingAddress
            token={onToken} // submit callback
          >
            <button className="bg-yellow-400 w-full py-2 rounded-lg">
              passer au paiement
            </button>
          </StripeCheckout>
        )}
      </div>
    </div>
  );
};

export default Panier;
