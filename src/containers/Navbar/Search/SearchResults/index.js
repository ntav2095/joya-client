import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import styles from "./SearchResults.module.css";
import useSearchTour from "../../../../hooks/useSearchTour";
import {
  selectToursError,
  selectToursStatistic,
  selectToursStatus,
} from "../../../../store/tours.slice";
import { Link } from "react-router-dom";
import placesMap from "../../../../services/constants/placesMap";
import SearchItem from "./SearchItem";

function SearchResults({ inputRef, onHide, searchTerm }) {
  const lang = useTranslation().i18n.language;
  const containerRef = useRef();

  const status = useSelector(selectToursStatus);
  const error = useSelector(selectToursError);

  const statistic = useSelector(selectToursStatistic);

  useEffect(() => {
    const handler = (e) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(e.target) &&
        containerRef.current &&
        !containerRef.current.contains(e.target)
      ) {
        onHide();
      }
    };

    window.addEventListener("mousedown", handler);

    return () => window.removeEventListener("mousedown", handler);
  }, []);

  // *********** HANDLE SEARCH ************
  const results = useSearchTour(searchTerm);
  const hasText = searchTerm.trim();

  // content
  let content;
  const isLoading = status === "pending" || status === "idle";

  if (isLoading) {
    content = (
      <div className="d-flex justify-content-center">
        <div className="spinner-border spinner-border-sm" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    const message = error.httpCode
      ? error.httpCode + " - " + error.message
      : error.message;

    content = <p className="m-0">{message}</p>;
  }

  if (!error && hasText && results.length === 0 && !isLoading) {
    <p className="m-0">Not matches anything</p>;
  }

  if (!error && hasText && results.length > 0 && !isLoading) {
    content = (
      <div>
        <Link
          className="text-secondary pb-1 d-block"
          to={`/du-lich/tim-kiem/?search=${searchTerm}`}
        >
          <u>
            <i>
              {lang === "en" && `See all ${results.length} results`}
              {lang !== "en" && `Xem tất cả ${results.length} kết quả`}
            </i>
          </u>
        </Link>
        <ul className="list-group">
          {results.map((tour) => (
            <li key={tour.code} className="mb-2 ">
              <SearchItem tour={tour} />
            </li>
          ))}
        </ul>
      </div>
    );
  }

  if (!error && !isLoading && !hasText) {
    content = (
      <div className={styles.catalogue}>
        <div className="border-bottom">
          <h6>
            <strong>
              {lang === "vi" ? "Du lịch châu Âu" : "Europe Travel"} (
              {statistic.eu.totalCount} tours)
            </strong>
          </h6>

          <ul className="row ">
            {statistic.eu.countByPlace.map((country) => (
              <li
                key={country.place}
                className="col-6 col-sm-4 mb-1 text-nowrap"
              >
                <Link
                  to={`/du-lich/tim-kiem/${country.place}`}
                  className="text-dark"
                >
                  <strong>{placesMap.get(country.place)[lang]}</strong> (
                  {country.toursCount}{" "}
                  {country.toursCount > 1 ? "tours" : "tour"})
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="pt-3">
          <h6>
            <strong>
              {lang === "vi" ? "Du lịch trong nước" : "Domestic Travel"} (
              {statistic.vn.totalCount} tours)
            </strong>
          </h6>
          <ul className="row">
            {statistic.vn.countByPlace.map((province) => (
              <li
                key={province.place}
                className="col-6 col-sm-4 mb-1 text-nowrap"
              >
                <Link
                  to={`/du-lich/tim-kiem/${province.place}`}
                  className="text-dark"
                >
                  <strong>{placesMap.get(province.place)[lang]}</strong> (
                  {province.toursCount}{" "}
                  {province.toursCount > 1 ? "tours" : "tour"})
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  return (
    <div
      className={styles.container + " tours border-bottom p-3"}
      ref={containerRef}
    >
      {content}
    </div>
  );
}

export default SearchResults;
