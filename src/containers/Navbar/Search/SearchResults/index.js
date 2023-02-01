import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import styles from "./SearchResults.module.css";
import SearchItem from "./SearchItem";
import {
  selectEuTours,
  selectTours,
  selectVnTours,
} from "../../../../store/tours.slice";
import { Link } from "react-router-dom";
import StringHandler from "../../../../services/helpers/StringHandler";
import placesMap from "../../../../services/constants/placesMap";

function SearchResults({ inputRef, onHide, searchTerm }) {
  const lang = useTranslation().i18n.language;
  const containerRef = useRef();

  const tours = useSelector(selectTours);
  const euTours = useSelector(selectEuTours);
  const viTours = useSelector(selectVnTours);
  const countries = Array.from(
    new Set(
      euTours
        .reduce((prev, cur) => [...prev, ...cur.destinations], [])
        .map((dest) => dest.country)
    )
  );

  const provinces = Array.from(
    new Set(
      viTours
        .reduce((prev, cur) => [...prev, ...cur.destinations], [])
        .map((dest) => dest.province)
    )
  );

  console.log(countries);

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

    window.addEventListener("click", handler);

    return () => window.removeEventListener("click", handler);
  }, []);

  // *********** HANDLE SEARCH ************
  let str = searchTerm.toLowerCase().trim();
  const hasAccent = StringHandler.hasAccent(str);

  let results = tours;
  if (str) {
    if (hasAccent) {
      results = tours.filter((tour) => tour.name.toLowerCase().includes(str));
    } else {
      results = tours.filter((tour) =>
        StringHandler.removeAccents(tour.name).toLowerCase().includes(str)
      );
    }
  }

  return (
    <div
      className={styles.container + " tours border-bottom p-3"}
      ref={containerRef}
    >
      {str && results.length > 0 && (
        <ul className="list-group">
          {results.map((tour) => (
            <li key={tour.code} className="mb-2 " onClick={onHide}>
              <Link to={`/du-lich/${tour.slug}`} onClick={onHide}>
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
                            return placesMap.get(item.country);
                          return placesMap.get(item.province);
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

      {str && results.length === 0 && (
        <p className="m-0">Not matches anything</p>
      )}

      {!str && (
        <div>
          <div className="border-bottom">
            <h6>Du lịch châu Âu ({euTours.length} tours)</h6>

            <ul>
              {countries.map((country) => (
                <li key={country}>
                  {placesMap.get(country)} (
                  {
                    euTours.filter((tour) =>
                      tour.destinations.some((dest) => dest.country === country)
                    ).length
                  }{" "}
                  tours)
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-3">
            <h6>Du lịch trong nước ({viTours.length} tours)</h6>
            <ul>
              {provinces.map((province) => (
                <li key={province}>
                  {placesMap.get(province)} (
                  {
                    viTours.filter((tour) =>
                      tour.destinations.some(
                        (dest) => dest.province === province
                      )
                    ).length
                  }{" "}
                  tours)
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
