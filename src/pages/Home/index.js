// main
import React, { useEffect } from "react";
import i18next from "i18next";
import { useTranslation } from "react-i18next";

// components
import HomeHeader from "./HomeHeader";
import Slider from "./HomeSlider";
import ErrorPage from "../../containers/ErrorPage";

// apis
import useAxios from "../../hooks/useAxios";
import { postsApi, tourApi } from "../../services/apis";

// other
import useLazyLoading, { loadingImg } from "../../hooks/uselazyLoading";

// css
import "./home.css";

function HomeNew() {
  const { i18n } = useTranslation();
  const [lazy] = useLazyLoading(loadingImg);

  const [
    sendRequestTourTrongNuoc,
    isLoadingTourTrongNuoc,
    dataTourTrongNuoc,
    errorTourTrongNuoc,
  ] = useAxios();

  const [sendRequestGuides, isLoadingGuides, dataGuides, errorGuides] =
    useAxios();

  useEffect(() => {
    sendRequestTourTrongNuoc(tourApi.get({ page: 1, page_size: 6 }));
    sendRequestGuides(postsApi.get({ page: 1, page_size: 6 }));
  }, [i18n.language]);

  useEffect(() => {
    lazy();
  }, [isLoadingGuides, isLoadingTourTrongNuoc]);
  return (
    <>
      <div className="containerHomeabout">
        <HomeHeader />
      </div>

      <div className="containerHomeabout">
        <Slider
          title={i18next.t("homeMain.titleTourChauAu")}
          data={dataTourTrongNuoc?.data}
          loadingCard={true}
          naviga={"/du-lich-chau-au"}
          page={"home"}
        />
      </div>

      <div className="containerHomeabout">
        <Slider
          title={i18next.t("homeMain.titleTourTrongNuoc")}
          data={dataTourTrongNuoc?.data}
          loadingCard={true}
          naviga={"/du-lich-trong-nuoc"}
          page={"home"}
        />
      </div>

      <div className="containerHomeabout">
        <Slider
          title={i18next.t("homeMain.titleCamNang")}
          data={dataGuides?.data}
          loadingCard={true}
          naviga={"/guides"}
          page={"article"}
        />
      </div>

      {errorTourTrongNuoc && (
        <ErrorPage
          code={errorTourTrongNuoc.httpCode}
          message={errorTourTrongNuoc.message}
        />
      )}
    </>
  );
}
export default HomeNew;
