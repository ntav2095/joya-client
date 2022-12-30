// main
import { useEffect, useState } from "react";
import useLazyLoading, { loadingImg } from "../../hooks/uselazyLoading";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import useAxios from "../../hooks/useAxios";
import usePageTitle from "../../hooks/usePageTitle";

// components
import TourCard from "../../components/TourCard";
import CardPlaceholder from "../../components/placeholders/CardPlaceholder";
import ErrorPage from "../../containers/ErrorPage";
import Banner from "../../components/Banner";

// apis
import { tourApi } from "../../services/apis";

// css
import ProductsListLayout from "../../layout/ProductsListLayout";

const trans = {
  title: {
    euTours: {
      en: "Europe Tours",
      vi: "Du lịch châu Âu",
    },
    vnTours: {
      en: "Vietnam Tours",
      vi: "Du lịch trong nước",
    },
  },
};

const FILTER_LIST = [
  {
    label: {
      en: "Newest",
      vi: "Mới nhất",
    },
    value: "time-desc",
  },
  {
    label: {
      en: "Price ascending",
      vi: "Giá tăng dần",
    },
    value: "price-asc",
  },
  {
    label: {
      en: "Price descending",
      vi: "Giá giảm dần",
    },
    value: "price-desc",
  },
  {
    label: {
      en: "Duration descending",
      vi: "Số ngày lưu trú giảm dần",
    },
    value: "duration-desc",
  },
  {
    label: {
      en: "Duration ascending",
      vi: "Số ngày lưu trú tăng dần",
    },
    value: "duration-asc",
  },
];

function TourList({ cat_params }) {
  const [sendRequest, isLoading, data, error] = useAxios();
  const [lazy] = useLazyLoading(loadingImg);
  const [search, setSearch] = useState({
    sort: "time-asc",
  });
  const location = useLocation();
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const lang = i18n.language;

  let page = new URLSearchParams(location.search).get("page");
  if (!page || isNaN(Number(page))) {
    page = 1;
  }

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

  const title =
    cat_params.cat !== "vi"
      ? trans.title.euTours[lang]
      : trans.title.vnTours[lang];

  usePageTitle(`${title} || JOYA Travel`);

  const products =
    (data &&
      !isLoading &&
      data.data.length > 0 &&
      data.data.map((tour) => ({
        component: (
          <TourCard
            tour={{
              ...tour,
              to: tour.category.includes("europe")
                ? `/du-lich-chau-au/${tour._id}`
                : `/du-lich-trong-nuoc/${tour._id}`,
            }}
          />
        ),
        id: tour._id,
      }))) ||
    null;

  return (
    <>
      <Banner
        storedBanner={{
          key: cat_params.cat !== "vi" ? "euTours" : "vnTours",
          type: "slider",
          productType: "tour",
        }}
      />

      {!error && (
        <ProductsListLayout
          title={title}
          pagination={{
            pageCount: data?.metadata.page_count,
            currentPage: Number(page),
            changePageHandler: changePageHandler,
          }}
          products={products}
          filter={{
            changeFilterHandler: hangdleChangeSelect,
            filterList: FILTER_LIST.map((item) => {
              return { value: item.value, label: item.label[lang] };
            }),
          }}
          placeholder={<CardPlaceholder />}
          isLoading={isLoading}
        />
      )}

      {error && <ErrorPage code={error.httpCode} message={error.message} />}
    </>
  );
}

export default TourList;
