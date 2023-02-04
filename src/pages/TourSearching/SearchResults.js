import { useRef } from "react";
import { useSelector } from "react-redux";
import { selectToursStatistic } from "../../store/tours.slice";
import useSearchTour from "../../hooks/useSearchTour";
import placesMap from "../../services/constants/placesMap";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import styles from "./TourSearching.module.css";
import { useTranslation } from "react-i18next";

function SearchResults({ inputRef, onHide, searchTerm }) {
  const lang = useTranslation().i18n.language;
  const containerRef = useRef();
  const statistic = useSelector(selectToursStatistic);
  const results = useSearchTour(searchTerm);
  const hasText = searchTerm.trim();
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
  return (
    <div
      className={styles.searchResults + " tours border-bottom p-3"}
      ref={containerRef}
    >
      {hasText && results.length > 0 && (
        <div>
          <Link to={`/du-lich/tim-kiem/?search=${searchTerm}`} onClick={onHide}>
            <p className="text-secondary mb-2 text-underline">
              <u>
                {lang === "en" ? "See all" : "Xem tất cả"} {results.length}{" "}
                {lang === "en"
                  ? "result" + `${results.length > 1 ? "s" : ""}`
                  : "kết quả"}
              </u>
            </p>
          </Link>
          <ul className="list-group">
            {results.map((tour) => (
              <li key={tour.code} className="mb-2 ">
                <Link
                  to={`/du-lich/${tour.slug}`}
                  onClick={onHide}
                  className={styles.resultItem}
                  title={tour.name}
                >
                  <div className={styles.image}>
                    <img src={tour.thumb} alt={tour.name} />
                  </div>

                  <div className={styles.textBox}>
                    <p className="text-dark m-0">
                      <strong>
                        {tour.name.slice(0, 120)}
                        {tour.name.length >= 120 ? "..." : ""}
                      </strong>
                    </p>
                    <p className="text-secondary m-0">
                      {tour.duration.days} days, {tour.duration.nights} nights
                    </p>
                    <p>{tour.price.toLocaleString()} vnđ</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {hasText && results.length === 0 && (
        <p className="m-0">Not matches anything</p>
      )}

      {!hasText && (
        <div>
          <div className="border-bottom">
            <h6>
              <strong>
                {lang === "en" ? "Europe Travel" : "Du lịch châu Âu"}
              </strong>{" "}
              <span className="fw-normal">
                ({statistic.eu.totalCount} tours)
              </span>
            </h6>

            <ul className="row">
              {statistic.eu.countByPlace.map((country) => (
                <li key={country.place} className="col-4 mb-1">
                  <Link
                    to={`/du-lich/tim-kiem/${country.place}`}
                    className="text-dark"
                    onClick={onHide}
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
                {lang === "en" ? "Domestic Travel" : "Du lịch trong nước"}
              </strong>{" "}
              <span className="fw-normal">
                ({statistic.vn.totalCount} tours)
              </span>
            </h6>
            <ul className="row">
              {statistic.vn.countByPlace.map((province) => (
                <li key={province.place} className="col-4 mb-1">
                  <Link
                    to={`/du-lich/tim-kiem/${province.place}`}
                    className="text-dark"
                    onClick={onHide}
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
      )}
    </div>
  );
}

export default SearchResults;
