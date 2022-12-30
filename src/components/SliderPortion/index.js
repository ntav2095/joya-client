import styles from "./SliderPortion.module.css";
import CardCarousel from "../../containers/CardCarousel";
import { useTranslation } from "react-i18next";
import RoundedButton from "../RoundedButton";

const seeAll = {
  en: "See all",
  vi: "Xem tất cả",
};

function SliderPortion({ title, cards, error, to }) {
  console.log(cards);
  const lang = useTranslation().i18n.language;
  return (
    <div className={styles.container}>
      <h2 className={styles.margin}>{title}</h2>

      {cards && <CardCarousel cards={cards} />}

      {!error && (
        <div className={styles.button + " " + styles.margin}>
          {<RoundedButton to={to}>{seeAll[lang]}</RoundedButton>}
        </div>
      )}

      {error && (
        <div
          className={
            styles.error +
            " " +
            styles.margin +
            " bg-secondary d-flex align-items-center justify-content-center"
          }
        >
          <p className="text-light">Error: {error}</p>
        </div>
      )}
    </div>
  );
}

export default SliderPortion;
