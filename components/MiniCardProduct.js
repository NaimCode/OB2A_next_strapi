import { getImageUrlSmall, API_URL } from "../utils/GetImageUrl";
const MiniCardProduct = ({ produit, keyP }) => {
  return (
    <div
      key={keyP}
      className="inline-block w-1/2 lg:w-1/4 md:w-1/2 p-4 group
     hover:border-secondary hover:border-solid hover:scale-105 transition duration-300 transform overflow-hidden"
    >
      <a className="block relative h-56 rounded overflow-hidden md:h-80">
        <img
          alt={produit.titre}
          className="object-cover object-center w-full h-full block
          group-hover:scale-110 transition duration-300 transform overflow-hidden"
          src={getImageUrlSmall(produit.image)}
        />
      </a>
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

        <h2 className="text-primary-300 title-font text-lg font-medium group-hover:font-bold group-hover:text-blue-600">
          {produit.titre}
        </h2>
        <p className="mt-1 group-hover:text-xl">${produit.prix}</p>
      </div>
    </div>
  );
};

export default MiniCardProduct;
