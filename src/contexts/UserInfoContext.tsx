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
  const [userInfo, setUserInfo] = useState<UserInfoType>({
    name: "",
    phone: "",
    goldLeft: 0,
  });
  const handleUserInfo = (info: Partial<UserInfoType>) => {
    setUserInfo((prev) => ({ ...prev, ...info }));
  };
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
