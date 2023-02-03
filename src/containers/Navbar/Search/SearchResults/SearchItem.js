import { Link } from "react-router-dom";

import placesMap from "../../../../services/constants/placesMap";
import { useTranslation } from "react-i18next";
import styles from "./SearchItem.module.css";

function SearchItem({ tour }) {
  const lang = useTranslation().i18n.language;
  return (
    <Link className={styles.searchItem} to={`/du-lich/${tour.slug}`}>
      <div className={styles.image}>
        <img src={tour.thumb} alt={tour.name} />
      </div>

      <div className={styles.textBox}>
        <p className={styles.tourName}>
          <strong>{tour.name}</strong>
        </p>
        <p className="text-secondary m-0 text-nowrap">
          {/* {tour.destinations
            .map((item) => {
              if (tour.is_eu_tour) return placesMap.get(item.country)[lang];
              return placesMap.get(item.province)[lang];
            })
            .join(", ")} */}
          {tour.price.toLocaleString()} vnđ
        </p>
      </div>
    </Link>
  );
}

export default SearchItem;
