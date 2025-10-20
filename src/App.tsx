import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ROUTE_CONFIG_MAIN } from "./routes";
import { ModalProvider } from "./contexts/ModalContext";
import { useCookieHandler } from "./hooks/useCookieHandler";
import { useUserInfo } from "./contexts/UserInfoContext";
// import { useFetch } from "./hooks/useFetch";
// import type { StudentInfo } from "./apis/types";

const App = () => {
  const { cookies } = useCookieHandler("uu");
  const { handleUserInfo } = useUserInfo();

  // const { error, fetchData } = useFetch<StudentInfo>({
  //   action: "getstudentinfo",
  // });

  useEffect(() => {
    if (cookies.uu) {
      console.log(cookies.uu);
      handleUserInfo({
        name: cookies.uu.name,
        phone: cookies.uu.phone,
        goldLeft: cookies.uu.goldLeft,
      });
      // const c = cookies.uu;
      // const getUserStatus = async () => {
      //   try {
      //     if (c.name && c.phone) {
      //       const data = await fetchData(`name=${c.name}&phone=${c.phone}`);
      //       if (error) throw new Error(error);
      //       handleUserInfo({
      //         name: c.name,
      //         phone: c.phone,
      //         goldLeft: data?.goldLeft || 0,
      //       });
      //     }
      //   } catch (e) {
      //     console.error("Failed to parse user info from cookies:", e);
      //   }
      // };
      // getUserStatus();
    }
  }, []);

  return (
    <>
      <BrowserRouter>
        <ModalProvider>
          <Routes>
            <Route path="/">
              {ROUTE_CONFIG_MAIN.map((route, idx) => (
                <Route {...route} key={idx} />
              ))}
            </Route>
          </Routes>
        </ModalProvider>
      </BrowserRouter>
    </>
  );
};

export default App;
