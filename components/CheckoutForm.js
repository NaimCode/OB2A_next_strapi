import React, { useState, useEffect } from "react";
//import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import {
  useStripe,
  useElements,
  Elements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";
import { MiniLoading } from "./Loading";
import router from "next/router";
const CheckoutForm = ({ client, prix }) => {
  // 1️⃣ Setup state to track client secret, errors and checkout status
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState("");
  const [isLoading, setisLoading] = useState(true);
  const [tel, settel] = useState("");
  const [name, setname] = useState("");
  const [ville, setville] = useState("");
  const [codePostal, setcodePostal] = useState("");
  const [adresse, setadresse] = useState("");
  const [step, setstep] = useState(1);
  // 2️⃣ Store reference to Stripe
  const stripe = useStripe();
  const elements = useElements();
  useEffect(() => {
    // 3️⃣ Create PaymentIntent and fetch client secret as soon as the page loads
    window
      .fetch("http://localhost:4000/paymentIntent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prix, client }),
      })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setClientSecret(data.clientSecret);
        setisLoading(false);
      })
      .catch((error) => console.log(error));
  }, []);
  const makeOrder = (payload) => {
    window
      .fetch("http://localhost:4000/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          payload,
          name,
          tel,
          adresse,
          ville,

          codePostal,
          client,

          prix,
        }),
      })
      .then((response) => console.log("Succes"))
      .catch((error) => setError(error));
  };
  const handleChange = async (event) => {
    // 4️⃣ Listen for changes in the CardElement and display any errors as the customer types their card details
    setDisabled(event.empty);
    setError(event.error ? "Erreur de paiement, réessayer" : "");
  };
  const handleSubmit = async (ev) => {
    ev.preventDefault();
    setProcessing(true);
    // 5️⃣ Confirm Card Payment.
    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardNumberElement),
      },
    });
    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`);
      setProcessing(false);
    } else {
      console.log(payload);
      makeOrder(payload);
      setError(null);
      setProcessing(false);

      setSucceeded(true);
    }
  };
  // 6️⃣ Construct UI.
  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      {isLoading ? (
        <div className="flex items-center justify-center w-[200px] h-72">
          <MiniLoading />
        </div>
      ) : (
        <>
          <div class="w-96 h-56 m-auto bg-red-100 rounded-xl relative text-white shadow-lg ">
            <img
              class="relative object-cover w-full h-full rounded-xl"
              src="https://i.imgur.com/kGkSg1v.png"
            />

            <div class="w-full px-8 absolute top-8">
              <div class="flex justify-between">
                <div class="">
                  <p class="font-light">Nom</p>
                  <p class="font-medium tracking-widest">{"xxxx xxxx"}</p>
                </div>
                <img class="w-14 h-14" src="https://i.imgur.com/bbPHJVe.png" />
              </div>
              <div class="pt-1">
                <p class="font-light">Numéro de carte</p>
                <p class="font-medium tracking-more-wider">
                  xxxx xxxx xxxx xxxx
                </p>
              </div>
              <div class="pt-4">
                <div class="flex justify-between items-center">
                  <div class="">
                    <p class="font-light  text-xs">Expiration</p>
                    <p class="font-medium tracking-wider text-sm">xx / xx</p>
                  </div>

                  <div class="">
                    <p class="font-light text-xs">CVC</p>
                    <p class="font-bold tracking-more-wider text-sm">xxx</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {step == 1 ? (
            <div className="py-5 flex flex-col gap-3">
              <h2>Adresse de livraison</h2>
              <div className="flex flex-row gap-6">
                <input
                  type="text"
                  name="name"
                  placeholder="Nom"
                  required
                  onChange={(even) => setname(even.target.value)}
                  className="border-2 border-gray-300 px-5 py-2 rounded-md w-full"
                />
                <input
                  type="tel"
                  name="tel"
                  placeholder="Tel"
                  required
                  onChange={(value) => settel(value.target.value)}
                  className="border-2 border-gray-300 px-5 py-2 rounded-md w-full"
                />
              </div>
              <div className="flex flex-row gap-6">
                <input
                  type="text"
                  name="ville"
                  placeholder="Ville"
                  required
                  onChange={(value) => setville(value.target.value)}
                  className="border-2 border-gray-300 px-5 py-2 rounded-md flex-grow"
                />
                <input
                  type="number"
                  name="codePostal"
                  placeholder="Code Postal"
                  required
                  onChange={(value) => setcodePostal(value.target.value)}
                  className="border-2 border-gray-300 px-5 py-2 rounded-md flex-grow"
                />
              </div>
              <textarea
                name="adresse"
                placeholder="Adresse"
                required
                onChange={(value) => setadresse(value.target.value)}
                className="border-2 border-gray-300 px-5 py-2 rounded-md h-20"
              />
            </div>
          ) : (
            <div className="py-5">
              <h2>Paiement par carte</h2>
              <CardNumberElement
                className="border-2 border-gray-400 px-5 py-2 rounded-md"
                // {/* Specify styles here */}
                options={{}}
                onChange={handleChange}
              />
              <div className="flex flex-row items-center gap-6 py-3">
                <CardExpiryElement
                  className="flex-grow border-2 border-gray-400 px-5 py-2 rounded-md"
                  // {/* Specify styles here */}
                  options={{}}
                  onChange={handleChange}
                />
                <CardCvcElement
                  className="flex-grow border-2 border-gray-400 px-5 py-2 rounded-md"
                  // {/* Specify styles here */}
                  options={{}}
                  onChange={handleChange}
                />
              </div>
            </div>
          )}
          {step == 1 ? (
            <button
              onClick={() => {
                if (
                  name != "" &&
                  ville != "" &&
                  codePostal != "" &&
                  adresse != "" &&
                  tel != ""
                )
                  setstep(2);
              }}
              className="bg-yellow-300 w-full py-2 rounded-md text-xl font-logo"
            >
              Suivant
            </button>
          ) : (
            <div className="flex flex-row gap-4 items-center">
              <button
                onClick={() => setstep(1)}
                className="bg-secondary w-full py-2 rounded-md text-xl font-logo"
              >
                Retour
              </button>
              {processing ? (
                <MiniLoading />
              ) : (
                <button
                  disabled={processing || disabled || succeeded}
                  id="submit"
                  className="bg-yellow-300 w-full py-2 rounded-md text-xl font-logo flex-grow"
                >
                  Valider
                </button>
              )}
            </div>
          )}

          {error && (
            <div className="pt-2" role="alert">
              {error}
            </div>
          )}
          {/* Show a success message upon completion */}
          <p className={succeeded ? "result-message" : "result-message hidden"}>
            Payment succeeded!
          </p>
        </>
      )}
    </form>
  );
};
export default CheckoutForm;
