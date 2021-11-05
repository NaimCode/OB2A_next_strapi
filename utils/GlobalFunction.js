import { useRouter } from "next/router";
export const ShowNavFooter = () => {
  const router = useRouter();
  switch (router.pathname) {
    case "/auth":
      return false;
      break;

    default:
      return true;
      break;
  }
};
