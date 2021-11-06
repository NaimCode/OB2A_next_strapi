import { loadStripe } from "@stripe/stripe-js";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
export const stripePromise = loadStripe(
  "pk_test_51JoXgfFxlWbadRCP4yqyb92pis2jRp73g19HExuxWBNv3vRRqOatJZnrlc5CuxhvgMuhPvIs5JBn5MJacRRseecJ00iOeImYYm"
);
