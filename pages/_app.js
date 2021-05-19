import "../styles/globals.css";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { useRouter } from "next/router";
import { ShowNavFooter } from "../utils/GlobalFunction";
import { AuthProvider } from "../context/AuthContext";

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <content>
        {ShowNavFooter() && <NavBar />}
        <Component {...pageProps} />
        {ShowNavFooter() && <Footer />}
      </content>
    </AuthProvider>
  );
}

export default MyApp;
