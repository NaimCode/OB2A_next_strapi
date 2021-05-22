import Router from 'next/router'
import Head from 'next/head'
import MiniCardProduct from '../../components/MiniCardProduct';
import { API_URL } from '../../utils/GetImageUrl';
const recherche = ({filter,query}) => {
    const produits=filter;
    return (
        <div className="py-20 px-3">
                <Head>
        <title>{`Recherche: ${query}`}</title>
        <meta
          name="description"
          content={`Trouvez tous les produits correspondant à ${query}`}
        />
        <link rel="icon" href="/assets/logo_mini_blue.png" />
      </Head>
           <section className="text-gray-600 body-font px-4 ">
               <div>
                  <h2 className="text-2xl ">
                  {produits.length==0? `Aucun résultat pour : ${query}`:  `${produits.length} résultats trouvés :`}
                  </h2>
                  <hr className="bg-secondary"/>
               </div>
        <div className="container  py-16 mx-auto">
         
            
        <div className="flex flex-wrap -m-4">
           {produits.map((produit) => (
             <MiniCardProduct
               key={produit.id}
               keyP={produit.id}
               produit={produit}
             />
           ))}
         </div>
       
        </div>
      </section>
        </div>
    )
}

function filterList(q, list) {
    function escapeRegExp(s) {
      return s.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&");
    }
    const words = q
      .split(/\s+/g)
      .map(s => s.trim())
      .filter(s => !!s);
    const hasTrailingSpace = q.endsWith(" ");
    const searchRegex = new RegExp(
      words
        .map((word, i) => {
          if (i + 1 === words.length && !hasTrailingSpace) {
            // The last word - ok with the word being "startswith"-like
            return `(?=.*\\b${escapeRegExp(word)})`;
          } else {
            // Not the last word - expect the whole word exactly
            return `(?=.*\\b${escapeRegExp(word)}\\b)`;
          }
        })
        .join("") + ".+",
      "gi"
    );
    return list.filter(item => {
      return searchRegex.test(item.titre);
    });
  }
export async function getServerSideProps(context){
    const produits_res=await fetch(`${API_URL}/produits`);
    const produits=await produits_res.json();
    const listQuery=context.query.slug.split(" ");
    let filter=filterList(context.query.slug,produits);
    // produits.map(produit=>{
    //     if(produit.titre.toLowerCase().includes(context.query.slug.toLowerCase()))
    //      filter.push(produit);
    // })
    
    const query=context.query.slug;
    console.log(filter)
    return {
        props:{
        filter,query
        }
    }
}
export default recherche

