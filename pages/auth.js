import Head from "next/head";
import router from "next/router";
import Link from "next/link";
import axios from "axios";
import { useEffect, useContext, useState } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth, getUser } from "../Config/firebase";
import { Loading, MiniLoading } from "../components/Loading";
import { API_URL } from "../utils/GetImageUrl";

const SignLog = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [user, setuser] = useState(null);
  const [isLoading, setisLoading] = useState(true);
  useEffect(() => {
    getUser(setuser, setisLoading);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setisLoading(true);

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      await axios.post(`${API_URL}/clients`, {
        nom: "non défini",
        email: email,
        password: password,
        provider: "email-password",
        panier: [],
        commande: [],
      });

      router.back();
    } catch (error) {
      console.log(error.code);
      switch (error.code) {
        case "auth/email-already-in-use":
          try {
            await signInWithEmailAndPassword(auth, email, password);
            router.back();
          } catch (error) {}

          break;

        default:
          console.log(error.code);
          break;
      }
    }
    setisLoading(false);
  };

  return (
    <div>
      <Head>
        <title>Bienvenue sur O'B2A</title>
        <meta
          name="description"
          content="Créer votre boutique dès maintenant"
        />
        <link rel="icon" href="/assets/logo_mini_blue.png" />
      </Head>
      <section className="flex flex-col py-16 md:flex-row h-screen items-center justify-center">
        {disabled ? (
          <Loading />
        ) : (
          <>
            {" "}
            <div className="bg-indigo-600 hidden lg:block w-full md:w-1/2 xl:w-2/3 h-screen">
              <img
                src="/images/imageLog.jpg"
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
            <div
              className="bg-white w-full md:max-w-md lg:max-w-full mx-auto md:mx-0 md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12
      flex items-center justify-center"
            >
              <div className="w-full h-100">
                <div className="text-center">
                  <Link href="/">
                    <a>
                      <span className="hover:animate-pulse text-center font-logo text-6xl text-transparent bg-clip-text bg-gradient-to-br from-primary-100 to-blue-600 font-black">
                        O'B2A
                      </span>
                    </a>
                  </Link>
                </div>
                <form className="mt-6" onSubmit={handleSubmit} method="POST">
                  <div>
                    <input
                      onChange={(event) => setEmail(event.target.value)}
                      type="email"
                      name="email"
                      placeholder="Email"
                      className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                      autoFocus
                      autoComplete="email"
                      required
                    />
                  </div>
                  <div>
                    <input
                      onChange={(event) => setPassword(event.target.value)}
                      type="password"
                      name="password"
                      placeholder="Mot de passe"
                      className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                      autoFocus
                      required
                    />
                  </div>

                  {!isLoading && (
                    <button
                      type="submit"
                      className={` w-full block bg-primary-500 hover:bg-primary-100 focus:bg-primary-100 text-white font-semibold rounded-lg
            px-4 py-3 mt-6`}
                    >
                      Valider
                    </button>
                  )}
                  {isLoading && <MiniLoading />}
                </form>
                <div class="flex justify-between items-center mt-3">
                  <hr class="w-full" />{" "}
                  <span class="p-2 text-gray-400 mb-1">OU</span>
                  <hr class="w-full" />
                </div>{" "}
                <button class="uppercase h-12 mt-3 text-white w-full rounded bg-blue-800 hover:bg-blue-900">
                  <i class="fa fa-facebook mr-2"></i>Facebook
                </button>
                <button class="uppercase h-12 mt-3 text-white w-full rounded bg-red-600 hover:bg-red-700">
                  <i class="fa fa-google mr-2"></i>Google
                </button>
                <hr className="my-6 border-secondary w-full" />
              </div>
            </div>
          </>
        )}
      </section>
    </div>
  );
};
const Loader = () => {
  let circleCommonClasses = "h-2.5 w-2.5 bg-current rounded-full";

  return (
    <div className="flex ">
      <div className={`${circleCommonClasses} mr-1`}></div>
      <div className={`${circleCommonClasses} mr-1`}></div>
      <div className={`${circleCommonClasses}`}></div>
    </div>
  );
};
export default SignLog;
