// main
import { Route, Routes, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import React, { useEffect } from "react";
import GoToTop from "./components/GoToTop";
import { liveChat } from "./containers/Livechat";
import DefaultLayout from "./layout/DefaultLayout";
import routes from "./routes";
// import useLazyLoading from "./hooks/useLazyLoading";
import { fetchTours } from "./store/tours.slice";
import { fetchGuides } from "./store/guides.slice";
import { useTranslation } from "react-i18next";

function App() {
  const dispatch = useDispatch();
  const lang = useTranslation().i18n.language;

  useEffect(() => {
    setTimeout(() => {
      liveChat();
    }, 2000);
  }, []);

  // useLazyLoading();

  // useEffect(() => {
  //   window.scroll({
  //     top: 0,
  //     // behavior: "smooth",
  //   });
  // }, [location]);

  useEffect(() => {
    dispatch(fetchTours());
    dispatch(fetchGuides());
  }, [lang]);

  return (
    <>
      <GoToTop />
      <Routes>
        <Route element={<DefaultLayout />}>
          {routes.map((route) => {
            if (route.path) {
              return (
                <Route
                  key={route.path}
                  path={route.path}
                  element={route.element}
                />
              );
            } else {
              return route.paths.map((path) => (
                <Route key={path} path={path} element={route.element} />
              ));
            }
          })}
        </Route>
      </Routes>
    </>
  );
}

export default App;
