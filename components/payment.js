import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";

import { stripePromise } from "../utils/stripe";
// Make sure to call loadStripe outside of a component’s render to avoid recreating the Stripe object on every render.
// Specicy Stripe Publishable API key here

// Initialize Stripe Elements
const Pay = () => {
  return (
    <div className="w-[500px] bg-white p-12 rounded-xl shadow-2xl">
      <div className="w-full ">
        <Elements stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      </div>
    </div>
  );
};
export default Pay;
