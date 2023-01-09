import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { altThumbnail, lazyImg } from "../../assets/images";
import styles from "./TourCard.module.css";

function TourCard({ tour }) {
  const { to, thumb, name, price, countries, journey, duration } = tour;
  const { t } = useTranslation();

  const errorHandler = (e) => {
    e.target.src = altThumbnail;
  };
  return (
    <div className={styles.card}>
      <Link to={to}>
        <div className={styles.img}>
          <img src={lazyImg} alt={name} lazy={thumb} onError={errorHandler} />
        </div>

        <div className={styles.textBox}>
          <h5 className="text-uppercase">{name}</h5>
          <p>{countries || journey}</p>
          <p>
            {duration.days}{" "}
            {duration.days > 1 ? t("general.days") : t("general.day")}{" "}
            {duration.nights}{" "}
            {duration.nights > 1 ? t("general.nights") : t("general.night")}
          </p>
          <p>
            {t("general.fullPackage")}:{" "}
            <strong>{price.toLocaleString()} đ</strong>
          </p>
        </div>
      </Link>
    </div>
  );
}

export default TourCard;
