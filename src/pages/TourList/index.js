// main
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import usePageTitle from "../../hooks/usePageTitle";

// components
import TourCard from "../../components/TourCard";
import CardPlaceholder from "../../components/placeholders/CardPlaceholder";
import ErrorPage from "../../containers/ErrorPage";
import Banner from "../../components/Banner";
import ProductsListLayout from "../../layout/ProductsListLayout";
import ErrorBoundary from "../../components/ErrorBoundary";

// apis
import { useSelector } from "react-redux";
import {
  selectEuTours,
  selectToursStatus,
  selectVnTours,
  selectToursError,
} from "../../store/tours.slice";

const PAGE_SIZE = 8;

function TourList() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const location = useLocation();
  const params = new URL(document.location).searchParams;

  const page = params.get("page") || 1;
  const sort = params.get("sort") || "";
  const category = location.pathname
    .toLowerCase()
    .startsWith("/du-lich-trong-nuoc")
    ? "vietnam"
    : "europe";

  const euTours = useSelector(selectEuTours);
  const vnTours = useSelector(selectVnTours);
  const status = useSelector(selectToursStatus);
  const error = useSelector(selectToursError);

  const sortHandler = (e) => {
    let path = location.pathname;
    path += `?page=${page}`;
    if (e.target.value) {
      path += `&sort=${e.target.value}`;
    }
    navigate(path);
  };

  const changePageHandler = (num) => {
    navigate(`${location.pathname}?page=${num}`);
  };

  let total_tours = category === "europe" ? euTours : vnTours;
  let tours = total_tours.slice(
    (page - 1) * PAGE_SIZE,
    (page - 1) * PAGE_SIZE + PAGE_SIZE
  );

  if (sort === "") {
    tours = tours.sort(
      (a, b) =>
        new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
    );
  }

  if (sort === "price-asc") {
    tours = tours.sort((a, b) => b.price - a.price);
  }

  if (sort === "price-desc") {
    tours = tours.sort((a, b) => a.price - b.price);
  }

  if (sort === "duration-asc") {
    tours = tours.sort((a, b) => b.duration.days - a.duration.days);
  }

  if (sort === "duration-asc") {
    tours = tours.sort((a, b) => a.duration.days - b.duration.days);
  }

  const products =
    status === "succeed" &&
    tours.map((tour) => ({
      component: (
        <TourCard
          tour={{
            ...tour,
            to: `/du-lich/${tour.slug}`,
          }}
        />
      ),
      id: tour._id,
    }));

  const page_count = Math.ceil(total_tours.length / PAGE_SIZE);

  // ********** side effects *************
  const title =
    category === "europe"
      ? t("tourPages.euTours.title")
      : t("tourPages.vnTours.title");

  useEffect(() => {
    if (page >= 1) {
      window.scroll({
        top: 500,
        left: 0,
        behavior: "smooth",
      });
    }
  }, [page]);

  usePageTitle(
    category === "europe"
      ? t("pageTitles.tours.euTours")
      : t("pageTitles.tours.vnTours")
  );
  return (
    <>
      <ErrorBoundary>
        <Banner />
      </ErrorBoundary>

      {!error && (
        <ErrorBoundary>
          <ProductsListLayout
            title={title}
            pagination={{
              pageCount: page_count,
              currentPage: Number(page),
              changePageHandler: changePageHandler,
            }}
            products={products}
            onSort={sortHandler}
            placeholder={<CardPlaceholder />}
            status={status}
            sort={sort}
          />
        </ErrorBoundary>
      )}

      {error && <ErrorPage code={error.httpCode} message={error.message} />}
    </>
  );
}

export default TourList;
