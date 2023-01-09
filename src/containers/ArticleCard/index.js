import { Link } from "react-router-dom";
import styles from "./ArticleCard.module.css";
import { altThumbnail, lazyImg } from "../../assets/images";

function ArticleCard({ thumb, title, to, category }) {
  return (
    <Link className={styles.cartItem} to={to}>
      <div className={styles.image}>
        <div className={styles.imageInner}>
          <img
            src={lazyImg}
            lazy={thumb}
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
