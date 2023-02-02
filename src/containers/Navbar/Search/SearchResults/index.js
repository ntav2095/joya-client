import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import styles from "./SearchResults.module.css";
import useSearchTour from "../../../../hooks/useSearchTour";
import { selectToursStatistic } from "../../../../store/tours.slice";
import { Link } from "react-router-dom";
import placesMap from "../../../../services/constants/placesMap";

function SearchResults({ inputRef, onHide, searchTerm }) {
  const lang = useTranslation().i18n.language;
  const containerRef = useRef();

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

  return (
    <div
      className={styles.container + " tours border-bottom p-3"}
      ref={containerRef}
    >
      {hasText && results.length > 0 && (
        <ul className="list-group">
          {results.map((tour) => (
            <li key={tour.code} className="mb-2 ">
              <Link to={`/du-lich/${tour.slug}`}>
                <div className="row">
                  <div className="col-2">
                    <div>
                      <img
                        className="img-fluid"
                        src={tour.thumb}
                        alt={tour.name}
                      />
                    </div>
                  </div>
                  <div className="col-10">
                    <p className="text-dark m-0">{tour.name}</p>
                    <p className="text-secondary m-0">
                      {tour.destinations
                        .map((item) => {
                          if (tour.is_eu_tour)
                            return placesMap.get(item.country)[lang];
                          return placesMap.get(item.province)[lang];
                        })
                        .join(", ")}
                    </p>
                  </div>
                </div>
              </Link>{" "}
            </li>
          ))}
        </ul>
      )}

      {hasText && results.length === 0 && (
        <p className="m-0">Not matches anything</p>
      )}

      {!hasText && (
        <div>
          <div className="border-bottom">
            <h6>
              <strong>
                {lang === "vi" ? "Du lịch châu Âu" : "Europe Travel"} (
                {statistic.eu.totalCount} tours)
              </strong>
            </h6>

            <ul className="row">
              {statistic.eu.countByPlace.map((country) => (
                <li key={country.name} className="col-4 mb-1">
                  <Link
                    to={`/du-lich/tim-kiem/?country=${country.place}`}
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
                <li key={province.place} className="col-4 mb-1">
                  <Link
                    to={`/du-lich/tim-kiem/?province=${province.place}`}
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
      )}
    </div>
  );
}

export default SearchResults;
