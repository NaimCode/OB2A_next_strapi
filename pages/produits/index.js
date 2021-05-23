import PropTypes from 'prop-types'
import { API_URL } from '../../utils/GetImageUrl';

const index = () => {
    return (
        <div className="py-32">
            Produits
        </div>
    )
}

export async function getServerSideProps(context) {
    const cat=context.query.categorie;
    const produits_res=await fetch(`${API_URL}/produits`);
    const produits=await produits_res.json();
    const filter= produits.filter((produit)=>produit.categories.includes(cat))
    console.log(filter)
    
    return {
        props: {}
    };
}


export default index
