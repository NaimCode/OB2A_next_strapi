import PropTypes from 'prop-types'
import Link from 'next/link'
import MiniCardProduct from '../../components/MiniCardProduct';
import { API_URL, getImageUrlSmall } from '../../utils/GetImageUrl';
import Head from 'next/head'
const index = ({produits}) => {
    return (
        <div className="py-32 bg-secondary">
             <Head>
        <title>{`Explorer nos produits`}</title>
        <meta
          name="description"
          content={`Faisons le tour du monde sur un panda`}
        />
        <link rel="icon" href="/assets/logo_mini_blue.png" />
      </Head> <h1 className=" leading-normal  hover:animate-pulse  text-center font-logo font-light text-3xl md:text-5xl ">
        TOUS NOS PRODUITS
      </h1>
             <section className="text-gray-600 body-font">
        <div className="container px-5 py-16 mx-auto">
          <div className="bg-white shadow-2xl flex flex-wrap -m-4 ">
            {produits.map((produit) => (
              <div
              key={produit.id}
              className="inline-block w-1/2 lg:w-1/4 md:w-1/2 p-4 group
             hover:border-secondary hover:border-solid "
            >
              <Link href={`/produits/${produit.slug}`}>
              <a className="block relative h-56 rounded overflow-hidden md:h-64 ">
                <img
                  alt={produit.titre}
                  className="object-cover object-center w-full h-full block
                  group-hover:scale-110 transition duration-300 transform overflow-hidden"
                  src={getImageUrlSmall(produit.image)}
                />
              </a>
              </Link>
              <div className="mt-4">
                <div className="inline-flex space-x-4">
                  {produit.categories.map((categorie) => (
                    <h3
                      key={categorie.id}
                      className="text-gray-500 group-hover:text-blue-600 text-xs tracking-widest title-font mb-1 "
                    >
                      {categorie.titre}
                    </h3>
                  ))}
                </div>
        
                <h2 className="text-primary-300 title-font text-lg font-medium  group-hover:text-blue-600">
                  {produit.titre}
                </h2>
                <p className="mt-1 ">${produit.prix}</p>
              </div>
            </div>
            ))}
          </div>
        </div>
      </section>
        </div>
    )
}

export async function getServerSideProps(context) {
    
    const produits_res=await fetch(`${API_URL}/produits`);
    const produits=await produits_res.json();
    // const filter= produits.filter((produit)=>produit.categories.includes(cat))
    // console.log(filter)
    
    return {
        props: {
            produits
        }
    };
}


export default index
