import { useCookies } from "react-cookie";

export const useCookieHandler = (key: string) => {
  const [cookies, set, remove] = useCookies([key]);
  const setCookie = (data: string) => {
    console.log(data);
    set(key, data, { path: "/", maxAge: 60 * 60 * 24 * 7 }); // 7 days
  };
  const removeCookie = () => {
    remove(key, { path: "/" });
  };
  return { cookies, setCookie, removeCookie };
};
