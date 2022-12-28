import { Link } from "react-router-dom";
import styles from "./ProductItem.module.css";

function ProductItem({ to, image, text, oldPrice, curPrice }) {
  let classes = styles.productItem;
  if (!oldPrice && !curPrice) {
    classes += " " + styles.noPrice;
  }
  return (
    <Link className={classes} to={to}>
      <div className={styles.image}>
        <img src={image} />
      </div>

      <div className={styles.info}>
        <div className={styles.title}>
          <p>{text}</p>
        </div>

        <div className={styles.price}>
          {oldPrice && (
            <p className={styles.oldPrice}>
              {oldPrice.toLocaleString()} <span>đ</span>
            </p>
          )}
          {curPrice && (
            <p className={styles.curPrice}>
              {curPrice.toLocaleString()} <span>đ</span>
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}

export default ProductItem;
