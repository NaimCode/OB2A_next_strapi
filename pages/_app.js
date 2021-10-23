import "../styles/globals.css";

import App from "../components/app";
function MyApp({ Component, pageProps }) {
  return <App component={<Component {...pageProps} />} />;
}

export default MyApp;
