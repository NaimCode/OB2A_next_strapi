import MiniCardProduct from "../../components/MiniCardProduct";
import {
  API_URL,
  getImageUrl,
  getImageUrlSmall,
} from "../../utils/GetImageUrl";
import Head from "next/head";
import Link from "next/link";
const Cat = ({ cat }) => {
  const produits = cat.produits;
  return (
    <div className="py-[60px]">
      <Head>
        <title>{`Catégorie: ${cat.titre}`}</title>
        <meta
          name="description"
          content={`Trouvez tous les produits <${cat.titre}>`}
        />
        <link rel="icon" href="/assets/logo_mini_blue.png" />
      </Head>
      <div className="w-full h-[250px] relative group overflow-hidden ">
        <div className="w-full h-full bg-black bg-opacity-50 absolute top-0  flex justify-center items-center z-10">
          <h1 className="m-auto text-5xl text-white font-logo">{cat.titre}</h1>
        </div>
        <img
          alt="ecommerce"
          className={`w-full h-full object-cover object-center rounded shadow-md group-hover:scale-105 duration-500 transition transform`}
          src={getImageUrl(cat.image)}
        />
      </div>
      <div className="container  py-16 mx-auto px-5">
        {produits.length === 0 ? (
          <h2 className="my-16 mx-auto text-center text-gray-400">
            Pas de produit pour cette catégorie pour l'instant
          </h2>
        ) : (
          <div className="flex flex-wrap -m-4">
            {produits.map((produit) => (
              <div
                key={produit.id}
                className="inline-block w-1/2 lg:w-1/4 md:w-1/2 p-4 group
            hover:border-secondary hover:border-solid hover:scale-105 transition duration-300 transform overflow-hidden"
              >
                <Link href={`/produits/${produit.slug}`}>
                  <a className="block relative h-56 rounded overflow-hidden md:h-80">
                    <img
                      alt={produit.titre}
                      className="object-cover object-center w-full h-full block
                 group-hover:scale-110 transition duration-300 transform overflow-hidden"
                      src={getImageUrlSmall(produit.image)}
                    />
                  </a>
                </Link>
                <div className="mt-4">
                  <h2 className="text-primary-300 title-font text-lg font-medium group-hover:font-bold group-hover:text-blue-600">
                    {produit.titre}
                  </h2>
                  <p className="mt-1 group-hover:text-xl">${produit.prix}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
export async function getStaticPaths() {
  const cats_res = await fetch(`${API_URL}/categories`);

  const cats = await cats_res.json();
  const paths = cats.map((c) => ({
    params: { cat: c.slug },
  }));
  return {
    paths,
    fallback: false, // See the "fallback" section below
  };
}

export async function getStaticProps({ params }) {
  const cat_res = await fetch(`${API_URL}/categories?slug=${params.cat}`);
  const found = await cat_res.json();
  const cat = found[0];
  //  const produits_res=await fetch(`${API_URL}/produits`);

  // const produits=await produits_res.json();

  // const filter= await produits.filter(produit=>produit.categories.includes(produit.categories.find(pr=>pr.slug===params.cat)))

  return {
    props: {
      cat,
    },
  };
}

function findCat(produit, cat) {
  console.log(produit.categories);
  if (
    produit.categories.includes((catt) => {
      console.log(catt.slug);
      if (catt.slug === cat) {
        console.log(catt.slug);
        console.log(yes);
        return true;
      } else return false;
    })
  )
    return true;
  else false;
}
export default Cat;
