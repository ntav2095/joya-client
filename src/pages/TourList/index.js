// main
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import useAxios from "../../hooks/useAxios";
import usePageTitle from "../../hooks/usePageTitle";

// components
import TourCard from "../../components/TourCard";
import CardPlaceholder from "../../components/placeholders/CardPlaceholder";
import ErrorPage from "../../containers/ErrorPage";
import Banner from "../../components/Banner";
import ProductsListLayout from "../../layout/ProductsListLayout";
import ErrorBoundary from "../../components/ErrorBoundary";

// apis
import { tourApi } from "../../services/apis";

function TourList({ cat_params }) {
  const [sendRequest, isLoading, data, error] = useAxios();
  const [search, setSearch] = useState({
    sort: "time-asc",
  });
  const location = useLocation();
  const navigate = useNavigate();
  const { i18n, t } = useTranslation();

  let page = new URLSearchParams(location.search).get("page");
  if (!page || isNaN(Number(page))) {
    page = 1;
  }

  const filterHandler = (e) => {
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

  const title =
    cat_params.cat !== "vi"
      ? t("tourPages.euTours.title")
      : t("tourPages.vnTours.title");

  usePageTitle(
    cat_params.cat !== "vi"
      ? t("pageTitles.tours.euTours")
      : t("pageTitles.tours.vnTours")
  );

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
      <ErrorBoundary>
        <Banner
          storedBanner={{
            key: cat_params.cat !== "vi" ? "euTours" : "vnTours",
            type: "slider",
            productType: "tour",
          }}
        />
      </ErrorBoundary>

      {!error && (
        <ErrorBoundary>
          <ProductsListLayout
            title={title}
            pagination={{
              pageCount: data?.metadata.page_count,
              currentPage: Number(page),
              changePageHandler: changePageHandler,
            }}
            products={products}
            onFilter={filterHandler}
            placeholder={<CardPlaceholder />}
            isLoading={isLoading}
          />
        </ErrorBoundary>
      )}

      {error && <ErrorPage code={error.httpCode} message={error.message} />}
    </>
  );
}

export default TourList;
