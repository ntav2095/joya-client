import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import styles from "./ArticleCard.module.css";

const CATEGORY_MAPS = new Map([
  ["diem-den", { en: "Nice places", vi: "Điểm đến hấp dẫn" }],
  ["trai-nghiem", { en: "Experiences", vi: "Trải nghiệm" }],
  ["cam-nang", { en: "Travel handbook", vi: "Cẩm nang du lịch" }],
  ["nhat-ky", { en: "Travel diary", vi: "Nhật ký hành trình" }],
]);

function ArticleCard({ article }) {
  const lang = useTranslation().i18n.language;
  const getArticleType = (categoryArr) => {
    return ["cam-nang", "nhat-ky", "trai-nghiem", "diem-den"].find((item) =>
      categoryArr.includes(item)
    );
  };

  return (
    <div className={styles.card}>
      <Link to={`/guides/${getArticleType(article.category)}/${article._id}`}>
        <div className={styles.image}>
          <img src={article.thumb} alt={article.title} />
        </div>
        <div className={styles.textBox}>
          <h2>{article.title}</h2>
          <p>{CATEGORY_MAPS.get(getArticleType(article.category))[lang]}</p>
        </div>
      </Link>
    </div>
  );
}

export default ArticleCard;
