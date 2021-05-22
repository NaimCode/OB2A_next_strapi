import { createContext, useEffect, useState } from "react";
import { magic } from "../lib/magic";
import Router from "next/router";
import Head from "next/head";
import { API_URL } from "../utils/GetImageUrl";
const AuthContext = createContext();

export const AuthProvider = (props) => {
  const [user, setUser] = useState(null);
  const [isLoading, setisLoading] = useState(true);

  // If isLoggedIn is true, set the UserContext with user data
  // Otherwise, redirect to /login and set UserContext to { user: null }
  useEffect(() => {
    magic.user.isLoggedIn().then(async (isLoggedIn) => {
      if (isLoggedIn) {
        const tokenId = await magic.user.getIdToken();
        const user_res = await fetch(`${API_URL}/users/me`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + tokenId,
          },
        });
        const user_data = await user_res.json();

        setUser(user_data);
        setisLoading(false);
      } else {
        // Router.push('/login');
        setUser(null);
        setisLoading(false);
      }
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, setisLoading }}>
      {/* {isLoading ? <Loading /> : props.children} */}
      { props.children}
    </AuthContext.Provider>

  );
};

export default AuthContext;

export const Loading = () => {
  return (
    <div>
      <Head>
        <title>Veuillez Patienter</title>
        <meta
          name="description"
          content="Créer votre boutique dès maintenant"
        />
        <link rel="icon" href="/assets/logo_mini_blue.png" />
        <link
          rel="stylesheet"
          href="https://pagecdn.io/lib/font-awesome/5.10.0-11/css/all.min.css"
          integrity="sha256-p9TTWD+813MlLaxMXMbTA7wN/ArzGyW/L7c5+KkjOkM="
          crossorigin="anonymous"
        />
      </Head>

      <div class="w-screen h-screen bg-white opacity-75 flex justify-center items-center">
        <span class="opacity-75 m-auto ">
          <img
            src="/assets/logo_mini_blue.png"
            class="fas fa-circle-notch fa-spin fa-5x  h-24 opacity-60"
          />
        </span>
      </div>
    </div>
  );
};
