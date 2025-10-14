import { useCookieHandler } from "@/hooks/useCookieHandler";
import type { PropsWithChildren } from "react";

export type UserInfoType = {
  name: string;
  phone: string;
  goldLeft: number;
};

export interface UserInfoContextType {
  userInfo: UserInfoType;
  handleUserInfo: (info: Partial<UserInfoType>) => void;
}

const UserInfoContext = createContext<UserInfoContextType>({
  userInfo: { name: "", phone: "", goldLeft: 0 },
  handleUserInfo: () => {},
});

export const UserInfoProvider = ({ children }: PropsWithChildren) => {
  const { cookies, setCookie } = useCookieHandler("uu");
  const [userInfo, setUserInfo] = useState<UserInfoType>({
    name: "",
    phone: "",
    goldLeft: 0,
  });
  const handleUserInfo = (info: Partial<UserInfoType>) => {
    setUserInfo((prev) => ({ ...prev, ...info }));
    setCookie(JSON.stringify({ ...userInfo, ...info }));
  };

  useEffect(() => {
    if (cookies.uu) {
      try {
        setUserInfo(cookies.uu);
      } catch (e) {
        console.error("Failed to parse user info from cookies:", e);
      }
    }
  }, []);

  return (
    <UserInfoContext.Provider value={{ userInfo, handleUserInfo }}>
      {children}
    </UserInfoContext.Provider>
  );
};

export const useUserInfo = () => {
  const ctx = useContext(UserInfoContext);
  if (!ctx) throw new Error("ContextError: UserInfo context is not defined");

  return ctx;
};
