import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const compte = () => {
  const { user, logoutUser } = useContext(AuthContext);
  return (
    <div className="h-screen w-screen flex justify-center items-center text-2xl text-primary-300">
      <button
        className="bg-primary-100 focus:outline-none p-3 text-green-50"
        onClick={logoutUser}
      >
        Déconnexion
      </button>
    </div>
  );
};

export default compte;
