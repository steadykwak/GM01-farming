import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ROUTE_CONFIG_MAIN } from "./routes";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            {ROUTE_CONFIG_MAIN.map((route, idx) => (
              <Route {...route} key={idx} />
            ))}
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
