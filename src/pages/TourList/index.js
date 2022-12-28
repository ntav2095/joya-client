// main
import { useEffect, useState } from "react";
import useLazyLoading, { loadingImg } from "../../hooks/uselazyLoading";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import useAxios from "../../hooks/useAxios";
import usePageTitle from "../../hooks/usePageTitle";

// components
import TourCard from "../../containers/TourCard";
import CustomPagination from "../../containers/customerPagination";
import CardPlaceholder from "../../components/placeholders/CardPlaceholder";

// apis
import { tourApi } from "../../services/apis";

// css
import "./tours.css";
import ErrorPage from "../../containers/ErrorPage";

function TourList({ cat_params }) {
  const [sendRequest, isLoading, data, error] = useAxios();
  const location = useLocation();
  const [lazy] = useLazyLoading(loadingImg);
  const [search, setSearch] = useState({
    sort: "time-asc",
  });

  const item = {
    title__eu: {
      vi: "Danh sách tour châu Âu",
      en: "EUROPEAN tours",
    },
    title__vi: {
      vi: "Danh sách tour trong nước",
      en: "Viet nam tours",
    },
    sort: {
      option__1: {
        vi: "Mới nhất",
        en: "Newest",
      },
      option__2: {
        en: "Price ascending",
        vi: "Giá tăng dần",
      },
      option__3: {
        en: "Price descending",
        vi: "Giá giảm dần",
      },
      option__4: {
        en: "Duration descending",
        vi: "Số ngày lưu trú giảm dần",
      },
      option__5: {
        en: "Duration ascending",
        vi: "Số ngày lưu trú tăng dần",
      },
    },
  };

  let page = new URLSearchParams(location.search).get("page");
  if (!page || isNaN(Number(page))) {
    page = 1;
  }
  const { i18n } = useTranslation();
  const navigate = useNavigate();

  const hangdleChangeSelect = (e) => {
    setSearch({ sort: e.target.value });
  };
  const changePageHandler = (num) => {
    if (cat_params.cat !== "vi") {
      navigate(`/du-lich-chau-au/?page=${num}`);
    } else {
      navigate(`/du-lich-trong-nuoc/?page=${num}`);
    }
  };
  useEffect(() => {
    if (page > 1) {
      window.scroll({
        top: 500,
        left: 0,
        behavior: "smooth",
      });
    }
    if (new URLSearchParams(location.search).get("page") == 1) {
      window.scroll({
        top: 500,
        left: 0,
        behavior: "smooth",
      });
    }
  }, [page]);

  useEffect(() => {
    sendRequest(
      tourApi.get({
        sort: search.sort,
        page: page,
        page_size: 12,
        ...cat_params,
      })
    );
  }, [i18n.language, location.search, cat_params, search]);

  useEffect(() => {
    lazy();
  }, [isLoading]);

  usePageTitle(`Du lịch Châu Âu || JOYA Travel`);

  return (
    <>
      <div className="tours__list">
        <div className="container__header">
          <div id="title" className={"title text-uppercase fw-bold"}>
            {cat_params?.cat_not === "vi" && item.title__eu[i18n.language]}
            {cat_params?.cat === "vi" && item.title__vi[i18n.language]}
          </div>
          <div className="container__sort">
            <div className="sort">
              <select onChange={hangdleChangeSelect}>
                <option value="time-desc">
                  {item.sort.option__1[i18n.language]}
                </option>
                <option value="price-asc">
                  {item.sort.option__2[i18n.language]}
                </option>
                <option value="price-desc">
                  {item.sort.option__3[i18n.language]}
                </option>
                <option value="duration-desc">
                  {item.sort.option__4[i18n.language]}
                </option>
                <option value="duration-asc">
                  {item.sort.option__5[i18n.language]}
                </option>
              </select>
            </div>
          </div>
        </div>

        <div className="container__tours">
          <div className="row">
            {data &&
              !isLoading &&
              data.data.length > 0 &&
              data.data.map((tour) => (
                <div
                  key={tour._id}
                  className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4"
                >
                  <TourCard tour={tour} />
                </div>
              ))}

            {(!data || isLoading) &&
              new Array(18).fill(1).map((item, index) => (
                <div
                  key={index}
                  className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4"
                >
                  <CardPlaceholder key={index} />
                </div>
              ))}
          </div>

          {data && (
            <div className="container__Slider">
              <CustomPagination
                total={data?.metadata.page_count}
                pagenumber={Number(page)}
                callback={changePageHandler}
              />
            </div>
          )}
        </div>
      </div>
      {error && <ErrorPage code={error.httpCode} message={error.message} />}
    </>
  );
}

export default TourList;
