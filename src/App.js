// main
import { Route, Routes } from "react-router-dom";
import React, { useEffect } from "react";
import GoToTop from "./components/GoToTop";
import { liveChat } from "./containers/Livechat";
import DefaultLayout from "./layout/DefaultLayout";
import routes from "./routes";
import useBanner from "./components/Banner/useBanner";
import useLazyLoading from "./hooks/useLazyLoading";

function App() {
  useEffect(() => {
    setTimeout(() => {
      liveChat();
    }, 2000);
  }, []);

  useLazyLoading();
  useBanner();

  return (
    <>
      <GoToTop />
      <Routes>
        <Route element={<DefaultLayout />}>
          {routes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Route>
      </Routes>
    </>
  );
}

export default App;
