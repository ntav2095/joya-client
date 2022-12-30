// main
import useAxios from "./hooks/useAxios";
import { visaApi } from "./services/apis";
import { useDispatch } from "react-redux";
import { setVisaTypes } from "./store/visa.slice";

import { Route, Routes } from "react-router-dom";
import React, { Suspense, useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";
import GoToTop from "./components/GoToTop";
import { liveChat } from "./containers/Livechat";
import DefaultLayout from "./layout/DefaultLayout";

import Spinner from "./components/Spinner";
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
      <ErrorBoundary
        fallbackRender={({ error }) => (
          <h1 style={{ color: "red", margin: "30px" }}>{error.message}</h1>
        )}
      >
        <Suspense fallback={<Spinner show={true} />}>
          <Routes>
            <Route element={<DefaultLayout />}>
              {routes.map((route) => (
                <Route
                  key={route.path}
                  path={route.path}
                  element={route.element}
                />
              ))}
            </Route>
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </>
  );
}

export default App;
