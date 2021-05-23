import { API_URL, getImageUrl, getImageUrlSmall } from "../../utils/GetImageUrl";
import {useState,useContext} from 'react'
import Head from 'next/head';

import AuthContext from "../../context/AuthContext";
const slug = ({produit}) => {
const {user} = useContext(AuthContext);

   const [imagePrincipal, setimagePrincipal] = useState(produit.image[0])
    return (
        <div className="py-24 px-2">
           <Head>
        <title>{produit.titre}</title>
        <meta
          name="description"
          content={produit.meta_description}
        />
        <link rel="icon" href={getImageUrlSmall(produit.image)} />
      </Head>

 <section class="text-gray-600 body-font overflow-hidden px-4 md:px-1 ">
  <div class="container  mx-auto">
    <div class="lg:w-11/12 mx-auto flex flex-wrap justify-center">
      <div className="lg:w-1/2  w-full h-[500px] md:pr-8 rounded">
    <img alt="ecommerce" className={`w-full ${produit.image.length===1?"h-full":"h-4/5"} object-cover object-center rounded shadow-md`} src={getImageUrl(imagePrincipal)}/>
    {
      produit.image.length!==1&&(<div className=" w-full h-1/5  py-3 flex flex-row space-x-2 rounded">
     
      {produit.image.map(image=>(
        <button className="focus:outline-none" onClick={(event)=>setimagePrincipal(image)}>
        <img src={getImageUrlSmall(image)} className="h-full max-w-20 shadow"/>
        </button>
      ))}
      </div>)
    }
    </div>
      <div class="lg:w-1/2 w-full">
        <h1 class="text-primary-700 text-3xl lg:text-4xl title-font font-logo font-medium mb-4">{produit.titre}</h1>
        <p class="leading-relaxed mb-4">{produit.description}</p>
        {produit.couleur!==null&& (<div class="flex border-t border-gray-200 py-2">
          <span class="text-gray-500">Couleur</span>
          <span class="ml-auto text-gray-900">{produit.couleur}</span>
        </div>)}
        {produit.taille!==null&& (<div class="flex border-t border-gray-200 py-2">
          <span class="text-gray-500">Taille</span>
          <span class="ml-auto text-gray-900">{produit.taille}</span>
        </div>)}
      <div class="flex border-t border-gray-200 py-2">
          <span class="text-gray-500">Expédition</span>
          <span class="ml-auto text-gray-900">{produit.prixLivraison===null||produit.prixLivraison==0?"gratuite":"$"+ produit.prixLivraison}</span>
        </div>
       <div class="flex border-t border-gray-200 py-2">
          <span class="text-gray-500">Vendeur</span>
          <span class="ml-auto text-gray-900">{produit.vendeur===null?"O'B2A":produit.vendeur}</span>
        </div>
        <div class="flex py-3 px-2 border-secondary border-solid border-2 my-3">
          <span class="title-font font-medium text-2xl text-gray-900">$58.00</span>
          <button class="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">Button</button>
          <button class="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
            <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
              <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
            </svg>
          </button>
        </div>
      </div>
   
    </div>
  </div>
</section>
            
        </div>
    )
}
export async function getStaticPaths() {
    const produits_res=await fetch(`${API_URL}/produits`);

    const produits=await produits_res.json();
    const paths=produits.map(produit=>({
        params: { slug: produit.slug },
      }))
    return {
      paths,
      fallback: false // See the "fallback" section below
    };
  }

  export async function getStaticProps({params}){
      const produit_res=await fetch(`${API_URL}/produits?slug=${params.slug}`);
      const found=await produit_res.json();
      const produit=found[0];

      return{
          props:{
              produit
          }
      }
  }

export default slug

 
