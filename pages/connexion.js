import SignLog from "../components/SignLog";
const connexion = () => {
  return (
    <div>
      <SignLog
        head={{
          title: "Connexion",
          desciption: "Veuillez-vous connecter à votre compte",
        }}
        connexion={true}
      />
    </div>
  );
};

export default connexion;
