import styles from "../Search.module.css";
import { Link, useNavigate } from "react-router-dom";
import { brokenImage } from "../../../../assets/images";
import {
  TOUR_MAP,
  GUIDES_MAP,
} from "../../../../services/constants/productsMap";

function SearchItem({ searchItem, type }) {
  if (type === "tour") {
    const path = TOUR_MAP.find((item) =>
      searchItem.category.includes(item.category)
    ).path;
    return (
      <Link to={`/${path}/${searchItem._id}`}>
        <div className={styles.image}>
          <img
            src={searchItem.thumb}
            onError={(e) => (e.target.src = brokenImage)}
          />
        </div>
        <div className={styles.textbox}>
          <p>
            {searchItem.name} [{searchItem.code}]
          </p>
          {searchItem.countries && (
            <em className="d-block">{searchItem.countries}</em>
          )}
          {searchItem.journey && (
            <em className="d-block">{searchItem.journey}</em>
          )}
        </div>
      </Link>
    );
  }

  const path = GUIDES_MAP.find((item) =>
    searchItem.category.includes(item.category)
  ).path;
  return (
    <Link to={`/guides/${path}/${searchItem._id}`}>
      <div className={styles.image}>
        <img
          src={searchItem.thumb}
          onError={(e) => (e.target.src = brokenImage)}
        />
      </div>
      <div className={styles.textbox}>
        <p>{searchItem.title}</p>
        <em>{searchItem.lead.slice(0, 30)}...</em>
      </div>
    </Link>
  );
}

export default SearchItem;
