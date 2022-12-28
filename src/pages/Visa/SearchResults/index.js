import styles from "./SearchResults.module.css";
import { Link } from "react-router-dom";
import { earth } from "../../../assets/svgs";
import { searchResults } from "../mock";

function SearchResults() {
  return (
    <div className={styles.searcModal}>
      <p className={styles.title}>{earth} Dịch vụ visa</p>
      <ul>
        {searchResults.map((item) => (
          <li key={item.id}>
            <Link to={`/dich-vu-vi-sa/1`}>
              <div className={styles.imageWrapper}>
                <div
                  style={{
                    backgroundImage: `url(${item.image})`,
                  }}
                  className={styles.image}
                ></div>
              </div>
              <span>{item.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SearchResults;
