import Head from "next/head";
const contact = ({ email, adresse }) => {
  return (
    <div className="bg-secondary flex flex-col items-center py-24">
      <Head>
        <title>Contact</title>
        <meta
          name="description"
          content="Besoin des informations? Ou pour un partenariat?"
        />
        <link rel="icon" href="/assets/logo_mini_blue.png" />
      </Head>{" "}
      <h1 className=" leading-normal  hover:animate-pulse  text-center font-logo font-light text-3xl md:text-5xl ">
        CONTACTEZ-NOUS
      </h1>
      <p class="leading-relaxed my-5 text-gray-600">
        Besoin des informations? Ou pour un partenariat?
      </p>
      <section class="text-gray-600 body-font relative ">
        <div class=" bg-white shadow-2xl container px-5 py-10 mx-auto flex md:flex-row flex-col md:justify-between space-x-4">
          <div class="flex-grow bg-gray-300 rounded-lg overflow-hidden sm:mr-10 p-10 flex items-end justify-start relative">
            <div class="mapouter ">
              <div className="gmap_canvas  ">
                <iframe
                  width="741"
                  height="500"
                  id="gmap_canvas"
                  src="https://maps.google.com/maps?q=caen&t=&z=17&ie=UTF8&iwloc=&output=embed"
                  frameborder="0"
                  scrolling="no"
                  marginheight="0"
                  marginwidth="0"
                ></iframe>
                <a href="https://putlocker-is.org"></a>
                <br />

                <a href="https://www.embedgooglemap.net">
                  embed google map in html
                </a>

                <style jsx>{`
                  .gmap_canvas {
                    overflow: hidden;
                    background: none !important;
                    height: 350px;
                    width: 741px;
                  }
                `}</style>
              </div>
            </div>
          </div>
          <div className="w-8 h-6"></div>
          <div class="w-20 bg-white flex flex-col md:ml-auto  md:py-8 mt-8 md:mt-0">
            <div class="relative mb-4">
              <label for="name" class="leading-7 text-sm text-gray-600">
                Nom
              </label>
              <input
                type="text"
                id="name"
                name="name"
                class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <div class="relative mb-4">
              <label for="email" class="leading-7 text-sm text-gray-600">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <div class="relative mb-4">
              <label for="email" class="leading-7 text-sm text-gray-600">
                Objet
              </label>
              <input
                type="text"
                id="email"
                name="text"
                class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <div class="relative mb-4">
              <label for="message" class="leading-7 text-sm text-gray-600">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
              ></textarea>
            </div>
            <button class="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">
              Envoyer
            </button>
            <p class="text-xs text-gray-500 mt-3"></p>
          </div>
        </div>
      </section>
    </div>
  );
};

export async function getStaticProps() {
  return {
    props: {
      adresse: "name@gmal",
      email: "fdfdfdfd",
    },
  };
}
export default contact;
