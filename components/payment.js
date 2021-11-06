import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";

import { stripePromise } from "../utils/stripe";
// Make sure to call loadStripe outside of a component’s render to avoid recreating the Stripe object on every render.
// Specicy Stripe Publishable API key here

// Initialize Stripe Elements
const Pay = ({ client, prix }) => {
  return (
    <div
      onClick={() => {}}
      className=" bg-white py-5 px-5 rounded-xl shadow-2xl"
    >
      <Elements stripe={stripePromise}>
        <CheckoutForm client={client} prix={prix} />
      </Elements>
    </div>
  );
};
export default Pay;
