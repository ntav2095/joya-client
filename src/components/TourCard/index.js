import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { altThumbnail } from "../../assets/images";
import styles from "./TourCard.module.css";

const trans = {
  days: {
    en: "days",
    vi: "ngày",
  },
  nights: {
    en: "nights",
    vi: "đêm",
  },
  full_package: {
    en: "Full package: ",
    vi: "Trọn gói: ",
  },
};

function TourCard({ tour }) {
  const lang = useTranslation().i18n.language;
  const { to, thumb, name, price, countries, journey, duration } = tour;

  const errorHandler = (e) => {
    e.target.src = altThumbnail;
  };
  return (
    <div className={styles.card}>
      <Link to={to}>
        <div className={styles.img}>
          <img src={thumb} alt={name} lazy={thumb} onError={errorHandler} />
        </div>

        <div className={styles.textBox}>
          <h5 className="text-uppercase">{name}</h5>
          <p>{countries || journey}</p>
          <p>
            {duration.days} {trans.days[lang]} {duration.nights}{" "}
            {trans.nights[lang]}
          </p>
          <p>
            {trans.full_package[lang]}{" "}
            <strong>{price.toLocaleString()} đ</strong>
          </p>
        </div>
      </Link>
    </div>
  );
}

export default TourCard;
