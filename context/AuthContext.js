import { createContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Magic } from "magic-sdk";
import { MAGIC_PUBLIC_KEY } from "../utils/GetImageUrl";
const AuthContext = createContext();

export const AuthProvider = (props) => {
  let magic;
  const [user, setuser] = useState(null);
  const router = useRouter();

  const loginUser = async (email) => {
    try {
      await magic.auth.loginWithMagicLink({ email });
      setuser(email);
      router.push("/");
    } catch (err) {
      console.log(err);
      setuser(null);
    }
  };
  const logoutUser = async () => {
    try {
      await magic.user.logout();
      setuser(null);
      router.push("/");
    } catch (err) {
      console.log(err);
    }
  };
  const checkUSerLoggedIn = async () => {
    try {
      const isLoggedIn = await magic.user.isLoggedIn();
      if (isLoggedIn) {
        const { email } = await magic.user.getMetadata();
        setuser(email);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    magic = new Magic(MAGIC_PUBLIC_KEY);
    checkUSerLoggedIn();
  }, []);
  return (
    <AuthContext.Provider value={{ user, loginUser, logoutUser }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
