import { useEffect } from "react";

const test = () => {
  useEffect(() => {
    fetch("http://localhost:4000/payment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        stripe: "payload",
        name: "naim",
        tel: "0700",
      }),
    }).catch((error) => console.log(error));
  }, []);
  return <div></div>;
};

export default test;
