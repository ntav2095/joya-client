import { Link } from "react-router-dom";
import { altThumbnail } from "../../assets/images";
import styles from "./ArticleCard.module.css";

function ArticleCard({ thumb, title, to, category }) {
  return (
    <Link className={styles.cartItem} to={to}>
      <div className={styles.image}>
        <div className={styles.imageInner}>
          <img
            src={thumb}
            alt={title}
            onError={(e) => (e.target.src = altThumbnail)}
          />
        </div>
      </div>
      <div className={styles.textBox}>
        <h5>{title}</h5>
        <p>{category}</p>
      </div>
    </Link>
  );
}

export default ArticleCard;
