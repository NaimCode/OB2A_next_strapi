import SignLog from "../components/SignLog";
const inscription = () => {
  return (
    <div>
      <SignLog
        head={{
          title: "Création d'un compte",
          desciption:
            "Devenez d'un maintenant membre pro pour pouvoir vendre vos produits",
        }}
        connexion={false}
      />
    </div>
  );
};

export default inscription;
