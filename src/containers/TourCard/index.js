// main
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

// assets
import { altThumbnail, placeholder } from "../../assets/images";

// css
import styles from "./TourCard.module.css";

function TourCard({ tour }) {
  const { i18n } = useTranslation();
  const lang = i18n.language;

  const translation = {
    days: {
      en: "days",
      vi: "ngày",
    },
    nights: {
      en: "nights",
      vi: "đêm",
    },
    full_services: {
      en: "Service package:",
      vi: "Trọn gói",
    },
  };

  const errorHandler = (e) => {
    e.target.src = altThumbnail;
  };

  const to = tour.category.includes("europe")
    ? `/du-lich-chau-au/${tour._id}`
    : `/du-lich-trong-nuoc/${tour._id}`;

  return (
    <div className={styles.card}>
      <Link to={to}>
        <div className={styles.image}>
          <img
            src={placeholder}
            lazy={tour.thumb}
            alt={tour.name}
            onError={errorHandler}
          />
        </div>
        <div className={styles.textBox}>
          <h2>{tour.name}</h2>

          <p>{tour.countries || tour.journey}</p>
          <p>
            {tour.duration.days} {translation.days[lang]} {tour.duration.nights}{" "}
            {translation.nights[lang]}
          </p>
          <p>
            {translation.full_services[lang]}{" "}
            <strong>{tour.price.toLocaleString()} đ</strong>
          </p>
        </div>
      </Link>
    </div>
  );
}

export default TourCard;
