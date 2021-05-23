import "../styles/globals.css";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { useRouter } from "next/router";
import { ShowNavFooter } from "../utils/GlobalFunction";
import { AuthProvider } from "../context/AuthContext";
import NextNprogress from 'nextjs-progressbar';
function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <content>
      <NextNprogress
  color="#29D"
  startPosition={0.5}
  stopDelayMs={200}
  height="3"
/>
        {ShowNavFooter() && <NavBar />}
        <Component {...pageProps} />
        {ShowNavFooter() && <Footer />}
      </content>
    </AuthProvider>
  );
}

export default MyApp;
