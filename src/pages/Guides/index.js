// main
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

// components
import ErrorPage from "../../containers/ErrorPage";
import SliderArticle from "../../containers/SliderArticle";

// apis
import useAxios from "../../hooks/useAxios";
import { postsApi } from "../../services/apis";

// other
import useLazyLoading, { loadingImg } from "../../hooks/uselazyLoading";
import usePageTitle from "../../hooks/usePageTitle";

// css
import styles from "./Guides.module.css";
import "./Guides.css";

function Guides() {
  const [sendRequestNhatKy, isLoading1, dataNhatKy, error1] = useAxios();
  const [sendRequestDiemDen, isLoading2, dataDiemDen, error2] = useAxios();
  const [sendRequestCamNang, isLoading3, dataCamnang, error3] = useAxios();
  const [sendRequestTraiNghiem, isLoading4, dataTraiNgiem, error4] = useAxios();
  const [lazy] = useLazyLoading(loadingImg);
  const location = useLocation();
  const { i18n } = useTranslation();

  useEffect(() => {
    sendRequestDiemDen(postsApi.get({ page_size: 6, cat: "diem-den" }));
    sendRequestTraiNghiem(postsApi.get({ page_size: 6, cat: "trai-nghiem" }));
    sendRequestCamNang(postsApi.get({ page_size: 6, cat: "cam-nang" }));
    sendRequestNhatKy(postsApi.get({ page_size: 6, cat: "nhat-ky" }));

    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [i18n.language, location.search]);

  useEffect(() => {
    lazy();
  }, [isLoading1, isLoading2, isLoading3, isLoading4]);

  usePageTitle(`Cẩm nang du lịch || Go Travel`);

  return (
    <>
      <div className={styles.slider}>
        <SliderArticle
          data={dataDiemDen}
          loading={isLoading1}
          category={"diem-den"}
          error={error1}
        />
        <SliderArticle
          data={dataTraiNgiem}
          loading={isLoading2}
          category={"trai-nghiem"}
          error={error2}
        />
        <SliderArticle
          data={dataCamnang}
          loading={isLoading3}
          category={"cam-nang"}
          error={error3}
        />
        <SliderArticle
          data={dataNhatKy}
          loading={isLoading4}
          category={"nhat-ky"}
          error={error4}
        />
        {error1 && (
          <ErrorPage code={error1.httpCode} message={error1.message} />
        )}
        {error2 && (
          <ErrorPage code={error2.httpCode} message={error2.message} />
        )}
        {error3 && (
          <ErrorPage code={error3.httpCode} message={error3.message} />
        )}
        {error4 && (
          <ErrorPage code={error4.httpCode} message={error4.message} />
        )}
      </div>
    </>
  );
}

export default Guides;
