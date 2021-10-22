import Head from "next/head";
import Link from "next/link";
import { useEffect, useContext, useState } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "./Config/firebase";

const SignLog = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [user, setuser] = useState({});
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        console.log(user);
        setuser(user);
        // ...
      } else {
        // User is signed out
        // ...
      }
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const auth = getAuth();
    try {
      const user = signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.log(error.message);
    }
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
      <div className="p-36">{user.email}</div>
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

                  {disabled ? (
                    <button
                      type="submit"
                      disabled={true}
                      className={` w-full block bg-primary-500 hover:bg-primary-100 focus:bg-primary-100 text-white font-semibold rounded-lg
            px-4 py-3 mt-6`}
                    >
                      ooo
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className={` w-full block bg-primary-500 hover:bg-primary-100 focus:bg-primary-100 text-white font-semibold rounded-lg
            px-4 py-3 mt-6`}
                    >
                      Valider
                    </button>
                  )}
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
