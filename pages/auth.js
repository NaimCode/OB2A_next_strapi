import Head from "next/head";
import Link from "next/link";
import { useEffect, useContext, useState } from "react";
import { useRouter } from "next/router";
import Router from "next/router";
import AuthContext, { Loading } from "../context/AuthContext";
import { API_URL } from "../utils/GetImageUrl";
import { magic } from "../lib/magic";
const SignLog = () => {
  const [email, setEmail] = useState("");
  const [disabled, setDisabled] = useState(false);
  const {user, setUser} = useContext(AuthContext);

  // Redirec to /profile if the user is logged in
  useEffect(() => {
    user?.issuer && Router.push("/compte");
  }, [user]);

  async function handleLoginWithEmail(email) {
    try {
      setDisabled(true); // disable login button to prevent multiple emails from being triggered

      // Trigger Magic link to be sent to user
      let didToken = await magic.auth.loginWithMagicLink(
        {email }// optional redirect back to your app after magic link is clicked
      );
console.log(didToken);
      // Validate didToken with server
      const res = await fetch(`${API_URL}/users/me`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + didToken,
        },
      });
     const user=await res.json();
     console.log(user);
      if (res.status === 200) {
        // Set the UserContext to the now logged in user
        let userMetadata = await magic.user.getMetadata();
        await setUser(userMetadata);
        Router.push("/");
        setDisabled(false);

      }
    } catch (error) {
      setDisabled(false); // re-enable login button - user may have requested to edit their email
      console.log(error);
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    handleLoginWithEmail(email);
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
         <Loading/>
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
                    value={email}
                    onChange={(event)=>setEmail(event.target.value)}
                      type="email"
                      name=""
                      placeholder="Email"
                      className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                      autoFocus
                      autoComplete="email"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className=" w-full block bg-primary-500 hover:bg-primary-100 focus:bg-primary-100 text-white font-semibold rounded-lg
            px-4 py-3 mt-6"
                  >
                    Inscription
                  </button>
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
