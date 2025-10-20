import { useCookieHandler } from "@/hooks/useCookieHandler";
import type { PropsWithChildren } from "react";

export type UserInfoType = {
  name: string;
  phone: string;
  goldLeft: number;
};

export interface UserInfoContextType {
  userInfo: UserInfoType;
  handleUserInfo: (info: UserInfoType) => void;
  removeUserInfo: () => void;
}

const UserInfoContext = createContext<UserInfoContextType>({
  userInfo: { name: "", phone: "", goldLeft: 0 },
  handleUserInfo: () => {},
  removeUserInfo: () => {},
});

export const UserInfoProvider = ({ children }: PropsWithChildren) => {
  const { setCookie, removeCookie } = useCookieHandler("uu");
  const [userInfo, setUserInfo] = useState<UserInfoType>({
    name: "",
    phone: "",
    goldLeft: 0,
  });
  const handleUserInfo = (info: UserInfoType) => {
    console.log(info);
    setUserInfo((prev) => ({ ...prev, ...info }));
    setCookie(JSON.stringify(info));
  };

  const removeUserInfo = () => {
    setUserInfo({ name: "", phone: "", goldLeft: 0 });
    removeCookie();
  };

  return (
    <UserInfoContext.Provider
      value={{ userInfo, handleUserInfo, removeUserInfo }}
    >
      {children}
    </UserInfoContext.Provider>
  );
};

export const useUserInfo = () => {
  const ctx = useContext(UserInfoContext);
  if (!ctx) throw new Error("ContextError: UserInfo context is not defined");

  return ctx;
};
