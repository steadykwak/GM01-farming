import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ROUTE_CONFIG_MAIN } from "./routes";
import { ModalProvider } from "./contexts/ModalContext";
import { UserInfoProvider } from "./contexts/UserInfoContext";
import { CookiesProvider } from "react-cookie";

const App = () => {
  return (
    <>
      <CookiesProvider>
        <BrowserRouter>
          <UserInfoProvider>
            <ModalProvider>
              <Routes>
                <Route path="/">
                  {ROUTE_CONFIG_MAIN.map((route, idx) => (
                    <Route {...route} key={idx} />
                  ))}
                </Route>
              </Routes>
            </ModalProvider>
          </UserInfoProvider>
        </BrowserRouter>
      </CookiesProvider>
    </>
  );
};

export default App;
