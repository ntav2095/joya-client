import styles from "../Search.module.css";
import { Link, useNavigate } from "react-router-dom";
import { brokenImage } from "../../../../assets/images";

function SearchItem({ searchItem, type }) {
  const navigate = useNavigate();
  if (type === "tour")
    return (
      <Link to={`/danh-sach-tour/${searchItem._id}`}>
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

  return (
    <Link
      to={`/cam-nang-du-lich/${searchItem._id}`}
      //   onClick={() => {
      //     navigate(`/cam-nang-du-lich/${searchItem._id}`);
      //     setIsFocus(false);
      //     setText("");
      //   }}
    >
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
