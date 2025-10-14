import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ROUTE_CONFIG_MAIN } from "./routes";
import { ModalProvider } from "./contexts/ModalContext";
import { UserInfoProvider } from "./contexts/UserInfoContext";

const App = () => {
  return (
    <>
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
    </>
  );
};

export default App;
