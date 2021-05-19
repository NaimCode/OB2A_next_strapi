import Head from "next/head";
import Link from "next/link";
import { useEffect, useContext } from "react";
import { useRouter } from "next/router";
import AuthContext from "../context/AuthContext";
const SignLog = ({ head, connexion }) => {
  return (
    <div>
      <Head>
        <title>{head.title}</title>
        <meta name="description" content={head.description} />
        <link rel="icon" href="/assets/logo_mini_blue.png" />
      </Head>

      <section className="flex flex-col py-16 md:flex-row h-screen items-center ">
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
            <h1 className="text-center text-primary-700 uppercase font-logo text-2xl md:text-2xl leading-tight mt-12">
              {connexion
                ? "Connecter à votre compte"
                : "Créer un nouveau compte"}
            </h1>
            {connexion ? <ConnexionSection /> : <InscriptionSection />}
          </div>
        </div>
      </section>
    </div>
  );
};

const ConnexionSection = () => {
  return (
    <>
      <form className="mt-6" action="#" method="POST">
        <div>
          <input
            type="email"
            name=""
            placeholder="Email"
            className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
            autoFocus
            autoComplete="email"
            required
          />
        </div>

        <div className="mt-4">
          <input
            type="password"
            name=""
            placeholder="Mot de Passe"
            minLength="6"
            className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500
                focus:bg-white focus:outline-none"
            required
          />
        </div>

        <div className="text-right mt-2">
          <Link href="/bientot">
            <a className="text-sm font-medium  text-gray-700 hover:text-blue-700 focus:text-blue-700">
              Mot de Passe oublié?
            </a>
          </Link>
        </div>

        <button
          type="submit"
          className="w-full block bg-primary-500 hover:bg-primary-100 focus:bg-primary-100 text-white font-semibold rounded-lg
              px-4 py-3 mt-6"
        >
          Connexion
        </button>
      </form>

      <hr className="my-6 border-secondary w-full" />

      <p className="mt-8">
        Besoin d'un compte?
        <Link href="/inscription">
          <a className="text-blue-500 hover:text-blue-700 font-semibold mx-2">
            Créer un compte
          </a>
        </Link>
      </p>
    </>
  );
};

const InscriptionSection = () => {
  const { user, loginUser } = useContext(AuthContext);
  const Router = useRouter();
  var password, confirm_password, emailU;
  useEffect(() => {
    emailU = document.getElementById("emailI");
    password = document.getElementById("password");
    confirm_password = document.getElementById("confirm_password");

    function validatePassword() {
      if (password.value != confirm_password.value) {
        confirm_password.setCustomValidity("Mot de Passe différent");
      } else {
        confirm_password.setCustomValidity("");
      }
    }

    function customValidate() {
      if (!emailU.checkValidity()) {
        emailU.setCustomValidity("Email invalide");
      }
    }
    emailU.onkeyup = customValidate;
    password.onchange = validatePassword;
    confirm_password.onkeyup = validatePassword;
  }, []);
  const inscriptionOnSubmit = (event) => {
    event.preventDefault();
    console.log(emailU.value), console.log(password.value);
    loginUser(emailU.value);
  };
  return (
    <>
      <form className="mt-6" onSubmit={inscriptionOnSubmit} method="POST">
        <div>
          <input
            type="email"
            id="emailI"
            name=""
            placeholder="Email"
            className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
            autoFocus
            autoComplete="email"
            required
          />
        </div>

        <div className="mt-4">
          <input
            type="password"
            id="password"
            name=""
            placeholder="Mot de Passe"
            minLength="6"
            className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500
                focus:bg-white focus:outline-none"
            required
          />
        </div>
        <div className="mt-4">
          <input
            type="password"
            id="confirm_password"
            name=""
            placeholder="Confirmation du Mot de Passe"
            minLength="6"
            className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500
                focus:bg-white focus:outline-none"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full block bg-primary-500 hover:bg-primary-100 focus:bg-primary-100 text-white font-semibold rounded-lg
              px-4 py-3 mt-6"
        >
          Inscription
        </button>
      </form>
      <div class=" bg-gray-300">
        <div class="container h-screen flex justify-center items-center">
          <div class="p-8 bg-white rounded-lg max-w-6xl pb-10">
            <div class="flex justify-center mb-4">
              <img src="https://i.imgur.com/f6Tb5U1.png" width="70" />
            </div>
            <input
              type="text"
              class="h-12 rounded w-full border px-3 focus:text-black focus:border-blue-100"
              placeholder="Email"
            />
            <input
              type="text"
              class="h-12 mt-3 rounded w-full border px-3 focus:text-black focus:border-blue-100"
              placeholder="Password"
            />
            <div class="flex justify-end items-center mt-2">
              {" "}
              <a href="#" class="text-gray-400 hover:text-gray-600">
                Forgot password?
              </a>{" "}
            </div>{" "}
            <button class="uppercase h-12 mt-3 text-white w-full rounded bg-red-700 hover:bg-red-800">
              login
            </button>
            <div class="flex justify-between items-center mt-3">
              <hr class="w-full" />{" "}
              <span class="p-2 text-gray-400 mb-1">OR</span>
              <hr class="w-full" />
            </div>{" "}
            <button class="uppercase h-12 mt-3 text-white w-full rounded bg-blue-800 hover:bg-blue-900">
              <i class="fa fa-facebook mr-2"></i>Facebook
            </button>
            <button class="uppercase h-12 mt-3 text-white w-full rounded bg-red-800 hover:bg-red-900">
              <i class="fa fa-google mr-2"></i>Google
            </button>
          </div>
        </div>
      </div>
      <hr className="my-6 border-secondary w-full" />

      <p className="mt-8">
        Vous avez un compte?
        <Link href="/connexion">
          <a className="focus:outline-none text-blue-500 hover:text-blue-700 font-semibold mx-2">
            Se connecter
          </a>
        </Link>
      </p>
    </>
  );
};

export default SignLog;
