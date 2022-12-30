import { useEffect } from "react";
import axios from "../services/axios";
import {
  setProducts,
  setProductsStatus,
  setProductsError,
} from "../store/home.slice";
import { tourApi, postsApi } from "../services/apis";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

function useFetchHomeData() {
  const homeData = useSelector((state) => state.home);
  const dispatch = useDispatch();
  const vnToursStatus = homeData.vnTours.status;
  const euToursStatus = homeData.euTours.status;
  const guidesStatus = homeData.guides.status;
  const lang = useTranslation().i18n.language;

  useEffect(() => {
    if (euToursStatus !== "idle") return;

    const fetchEuTours = async () => {
      try {
        dispatch(setProductsStatus({ type: "euTours", status: "pending" }));
        dispatch(setProductsError({ type: "euTours", error: "" }));
        const data = await axios(tourApi.get({ cat: "europe" }));
        dispatch(setProducts({ type: "euTours", data: data.data.data }));
        dispatch(setProductsStatus({ type: "euTours", status: "succeed" }));
      } catch (error) {
        console.error(error);
        if (error.response) {
          dispatch(
            setProductsError({
              type: "euTours",
              error: {
                httpCode: error.response.data.code,
                message: error.response.data.message[lang],
              },
            })
          );
        } else {
          dispatch(
            setProductsError({
              type: "euTours",
              error: {
                httpCode: null,
                message: error.message,
              },
            })
          );
        }

        dispatch(setProductsStatus({ type: "euTours", status: "failed" }));
      }
    };

    fetchEuTours();
  }, [euToursStatus]);

  useEffect(() => {
    if (vnToursStatus !== "idle") return;

    const fetchVnTours = async () => {
      try {
        dispatch(setProductsStatus({ type: "vnTours", status: "pending" }));
        dispatch(setProductsError({ type: "vnTours", error: "" }));
        const data = await axios(tourApi.get({ cat_not: "europe" }));
        dispatch(setProducts({ type: "vnTours", data: data.data.data }));
        dispatch(setProductsStatus({ type: "vnTours", status: "succeed" }));
      } catch (error) {
        console.error(error);
        if (error.response) {
          dispatch(
            setProductsError({
              type: "vnTours",
              error: {
                httpCode: error.response.data.code,
                message: error.response.data.message[lang],
              },
            })
          );
        } else {
          dispatch(
            setProductsError({
              type: "vnTours",
              error: {
                httpCode: null,
                message: error.message,
              },
            })
          );
        }
        dispatch(setProductsStatus({ type: "vnTours", status: "failed" }));
      }
    };
    fetchVnTours();
  }, [vnToursStatus]);

  useEffect(() => {
    if (guidesStatus !== "idle") return;

    const fetchGuides = async () => {
      try {
        dispatch(setProductsStatus({ type: "guides", status: "pending" }));
        dispatch(setProductsError({ type: "guides", error: "" }));
        const data = await axios(postsApi.get());
        dispatch(setProducts({ type: "guides", data: data.data.data }));
        dispatch(setProductsStatus({ type: "guides", status: "succeed" }));
      } catch (error) {
        console.error("from home: ", error);
        if (error.response) {
          dispatch(
            setProductsError({
              type: "guides",
              error: {
                httpCode: error.response.data.code,
                message: error.response.data.message[lang],
              },
            })
          );
        } else {
          dispatch(
            setProductsError({
              type: "guides",
              error: {
                httpCode: null,
                message: error.message,
              },
            })
          );
        }
        dispatch(setProductsStatus({ type: "guides", status: "failed" }));
      }
    };

    fetchGuides();
  }, [guidesStatus]);
}

export default useFetchHomeData;
