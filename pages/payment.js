import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/CheckoutForm";

import { stripePromise } from "../utils/stripe";
// Make sure to call loadStripe outside of a component’s render to avoid recreating the Stripe object on every render.
// Specicy Stripe Publishable API key here

// Initialize Stripe Elements
export default function App() {
  return (
    <div className=" items-center justify-center">
      <div className="max-w-md bg-blue-100">
        <Elements stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      </div>
    </div>
  );
}
