import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { magic } from "../lib/magic";
import Router from 'next/router'
const compte = (event) => {
  const {setUser,user}=useContext(AuthContext)
  console.log(user);
  const logout = () => {
    magic.user.logout().then(() => {
      setUser(null);
      Router.push('/');
    });}
  return (
    <div className="h-screen w-screen flex justify-center items-center text-2xl text-primary-300">
      <button
        className="bg-primary-100 focus:outline-none p-3 text-green-50"
        onClick={logout}
      >
      {user?.email}
      </button>
    </div>
  );
};

export default compte;
