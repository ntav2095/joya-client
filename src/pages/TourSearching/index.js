// main
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import usePageTitle from "../../hooks/usePageTitle";

// components
import TourCard from "../../components/TourCard";
import CardPlaceholder from "../../components/placeholders/CardPlaceholder";
import ErrorPage from "../../containers/ErrorPage";
import ProductsListLayout from "../../layout/ProductsListLayout";
import ErrorBoundary from "../../components/ErrorBoundary";
import Search from "../../containers/Navbar/Search";
import useSearchTour from "../../hooks/useSearchTour";

// apis
import { useSelector } from "react-redux";
import {
  selectToursStatus,
  selectToursError,
  selectTours,
} from "../../store/tours.slice";

import SearchBar from "./SearchBar";

const PAGE_SIZE = 8;

function TourSearching() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const location = useLocation();
  const params = new URL(document.location).searchParams;

  const page = params.get("page") || 1;
  const sort = params.get("sort") || "";
  const searchTerm = params.get("search") || "";
  const province = params.get("province");
  const country = params.get("country");

  let total_tours = useSearchTour(searchTerm);

  const status = useSelector(selectToursStatus);
  const error = useSelector(selectToursError);

  if (province) {
    total_tours = total_tours.filter((item) =>
      item.destinations.some((dest) => dest.province === province)
    );
  }

  if (country) {
    total_tours = total_tours.filter((item) =>
      item.destinations.some((dest) => dest.country === country)
    );
  }

  const sortHandler = (e) => {
    let path = location.pathname;
    path += `?page=${page}`;
    if (e.target.value) {
      path += `&sort=${e.target.value}`;
    }
    if (province) {
      path += `&province=${province}`;
    }
    if (country) {
      path += `&country=${country}`;
    }
    navigate(path);
  };

  const changePageHandler = (num) => {
    navigate(`${location.pathname}?page=${num}`);
  };

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

  if (sort === "price-desc") {
    tours = tours.sort((a, b) => b.price - a.price);
  }

  if (sort === "price-asc") {
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
  const title = "Tìm kiếm tour";

  usePageTitle("Tìm kiếm tour");
  return (
    <>
      <div className="mt-4">
        <SearchBar />
      </div>

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

export default TourSearching;
