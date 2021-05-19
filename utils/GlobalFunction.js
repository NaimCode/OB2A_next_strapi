import { useRouter } from "next/router";
export const ShowNavFooter = () => {
  const router = useRouter();
  switch (router.pathname) {
    case "/inscription":
      return false;
      break;
    case "/connexion":
      return false;
      break;

    default:
      return true;
      break;
  }
};
