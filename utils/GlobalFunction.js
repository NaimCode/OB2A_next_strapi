import { useRouter } from "next/router";
export const ShowNavFooter = () => {
  const router = useRouter();
  switch (router.pathname) {
    case "/payment":
    case "/auth":
      return false;

    default:
      return true;
  }
};
