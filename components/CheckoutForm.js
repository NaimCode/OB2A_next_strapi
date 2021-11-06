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
const CheckoutForm = () => {
  // 1️⃣ Setup state to track client secret, errors and checkout status
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState("");
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
        body: JSON.stringify({ prix: 30000 }),
      })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setClientSecret(data.clientSecret);
      });
  }, []);
  const handleChange = async (event) => {
    // 4️⃣ Listen for changes in the CardElement and display any errors as the customer types their card details
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
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
      setError(null);
      setProcessing(false);
      setSucceeded(true);
    }
  };
  // 6️⃣ Construct UI.
  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <div class="w-96 h-56 m-auto bg-red-100 rounded-xl relative text-white shadow-2xl ">
        <img
          class="relative object-cover w-full h-full rounded-xl"
          src="https://i.imgur.com/kGkSg1v.png"
        />

        <div class="w-full px-8 absolute top-8">
          <div class="flex justify-between">
            <div class="">
              <p class="font-light">Name</p>
              <p class="font-medium tracking-widest">Karthik P</p>
            </div>
            <img class="w-14 h-14" src="https://i.imgur.com/bbPHJVe.png" />
          </div>
          <div class="pt-1">
            <p class="font-light">Card Number</p>
            <p class="font-medium tracking-more-wider">4642 3489 9867 7632</p>
            <CardNumberElement
              // className="border-2 border-gray-400 px-5 py-2 rounded-md"
              // {/* Specify styles here */}
              options={{}}
              onChange={handleChange}
            />
          </div>
          <div class="pt-6 pr-6">
            <div class="flex justify-between">
              <div class="">
                <p1 class="font-light text-xs">Valid</p1>
                <p class="font-medium tracking-wider text-sm">11/15</p>
              </div>
              <div class="">
                <p class="font-light  text-xs">Expiry</p>
                <p class="font-medium tracking-wider text-sm">03/25</p>
              </div>

              <div class="">
                <p class="font-light text-xs">CVV</p>
                <p class="font-bold tracking-more-wider text-sm">···</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <label>Numero de carte</label>

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

      <button disabled={processing || disabled || succeeded} id="submit">
        <span id="button-text">
          {processing ? <div className="spinner" id="spinner"></div> : "Pay"}
        </span>
      </button>
      {/* Show any error that happens when processing the payment */}
      {error && (
        <div className="card-error" role="alert">
          {error}
        </div>
      )}
      {/* Show a success message upon completion */}
      <p className={succeeded ? "result-message" : "result-message hidden"}>
        Payment succeeded!
      </p>
    </form>
  );
};
export default CheckoutForm;
