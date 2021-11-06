import React, { useState, useEffect } from "react";
//import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import {
  Elements,
  useStripe,
  useElements,
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
      <div className="w-36 overflow-hidden bg-red-200">
        <CardNumberElement
          className="border-2 border-gray-500 py-4 px-2 max-w-md text-6xl"
          options={{}}
          onChange={handleChange}
        />
        <CardCvcElement options={{}} onChange={handleChange} />
        <CardExpiryElement options={{}} onChange={handleChange} />
        {/* ...other ui elements */}
      </div>
    </form>
  );
};
export default CheckoutForm;
