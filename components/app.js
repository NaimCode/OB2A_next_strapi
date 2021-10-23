import { Children, useEffect, useState } from "react";
import { getUser } from "../Config/firebase";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { useRouter } from "next/router";
import { ShowNavFooter } from "../utils/GlobalFunction";

import NextNprogress from "nextjs-progressbar";
import { Loading } from "./Loading";

const App = ({ component }) => {
  const [user, setuser] = useState(null);
  const [isLoading, setisLoading] = useState(true);
  useEffect(() => {
    getUser(setuser, setisLoading);
  }, []);
  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        <content>
          <NextNprogress
            color="#29D"
            startPosition={0.5}
            stopDelayMs={100}
            height="3"
          />
          {ShowNavFooter() && <NavBar user={user} />}
          {component}
          {ShowNavFooter() && <Footer />}
        </content>
      )}
    </div>
  );
};

export default App;
