// main
import { Route, Routes } from "react-router-dom";
import React, { useEffect } from "react";

import useAxios from "./hooks/useAxios";
import { visaApi } from "./services/apis";
import { useDispatch } from "react-redux";
import { setVisaTypes } from "./store/visa.slice";

import GoToTop from "./components/GoToTop";
import { liveChat } from "./containers/Livechat";
import DefaultLayout from "./layout/DefaultLayout";

import routes from "./routes";

import useBanner from "./components/Banner/useBanner";

function App() {
  const dispatch = useDispatch();
  // ******************** handle visa *********************************
  const [sendRequest, isLoading, data, error, resetStates] = useAxios();

  useEffect(() => {
    sendRequest(visaApi.getVisasCountries());
  }, []);

  useEffect(() => {
    if (data) dispatch(setVisaTypes(data.data));
  }, [data]);
  // ******************** handle visa end *********************************

  useEffect(() => {
    setTimeout(() => {
      liveChat();
    }, 2000);
  }, []);

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
