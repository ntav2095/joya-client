import React, { useEffect } from "react";
import { layoutApi } from "../../services/apis";

import { useDispatch, useSelector } from "react-redux";
import {
  setBannerStatus,
  setBanners,
  setBannerError,
} from "../../store/banner.slice";
import axios from "../../services/axios";
import { useTranslation } from "react-i18next";

function useBanner() {
  const dispatch = useDispatch();
  const lang = useTranslation().i18n.language;

  useEffect(() => {
    const sendRequest = async () => {
      try {
        dispatch(setBannerStatus("pending"));
        const data = await axios(layoutApi.get());
        dispatch(setBanners(data.data.data));
        dispatch(setBannerStatus("succeed"));
      } catch (error) {
        if (error.response) {
          console.log(error.response);
          dispatch(
            setBannerError({
              message: error.response.data.message[lang],
              httpCode: error.response.data.code,
            })
          );
        } else {
          dispatch(
            setBannerError({
              message: error.message,
              httpCode: null,
            })
          );
        }
        dispatch(setBannerStatus("failed"));
      }
    };

    sendRequest();
  }, []);
}

export default useBanner;
