import Router from "next/router";

import { useEffect, useState } from "react";
import { getUser, logOut } from "./Config/firebase";
const compte = () => {
  const [user, setuser] = useState();
  const [isLoading, setisLoading] = useState(true);
  useEffect(() => {
    getUser(setuser, setisLoading);
  }, []);
  console.log(user);
  const logout = async () => {
    await Router.push("/");
    logOut();
  };
  return (
    <div className="h-screen w-screen flex justify-center items-center text-2xl text-primary-300">
      <button
        className="bg-primary-100 focus:outline-none p-3 text-green-50"
        onClick={logout}
      >
        {user && user.email}
      </button>
    </div>
  );
};

export default compte;
