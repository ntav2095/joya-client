import styles from "./ArticlePlaceholder.module.css";

function ArticlePlaceholder() {
  return (
    <div className={styles.placeholder}>
      <h3 className="card-title placeholder-glow">
        <span className={"placeholder col-6 rounded"}></span>
      </h3>
      <span
        className={styles.datePlaceholder + " placeholder col-3 rounded"}
      ></span>{" "}
      <div className={styles.paragraphPlaceholder}>
        <span className="placeholder col-8 rounded"></span>{" "}
        <span className="placeholder col-9 rounded"></span>{" "}
        <span className="placeholder col-12 rounded"></span>{" "}
        <span className="placeholder col-2 rounded"></span>{" "}
        <span className="placeholder col-4 rounded"></span>{" "}
      </div>
      <div className={styles.paragraphPlaceholder}>
        <span className="placeholder col-8 rounded"></span>{" "}
        <span className="placeholder col-9 rounded"></span>{" "}
        <span className="placeholder col-12 rounded"></span>{" "}
        <span className="placeholder col-2 rounded"></span>{" "}
        <span className="placeholder col-4 rounded"></span>{" "}
      </div>
      <div className={styles.paragraphPlaceholder}>
        <span className="placeholder col-8 rounded"></span>{" "}
        <span className="placeholder col-9 rounded"></span>{" "}
        <span className="placeholder col-12 rounded"></span>{" "}
        <span className="placeholder col-2 rounded"></span>{" "}
        <span className="placeholder col-4 rounded"></span>{" "}
      </div>
      <div className={styles.paragraphPlaceholder}>
        <span className="placeholder col-8 rounded"></span>{" "}
        <span className="placeholder col-9 rounded"></span>{" "}
        <span className="placeholder col-12 rounded"></span>{" "}
        <span className="placeholder col-2 rounded"></span>{" "}
        <span className="placeholder col-4 rounded"></span>{" "}
      </div>
      <div className={styles.paragraphPlaceholder}>
        <span className="placeholder col-8 rounded"></span>{" "}
        <span className="placeholder col-9 rounded"></span>{" "}
        <span className="placeholder col-12 rounded"></span>{" "}
        <span className="placeholder col-2 rounded"></span>{" "}
        <span className="placeholder col-4 rounded"></span>{" "}
      </div>
      <div className={styles.paragraphPlaceholder}>
        <span className="placeholder col-8 rounded"></span>{" "}
        <span className="placeholder col-9 rounded"></span>{" "}
        <span className="placeholder col-12 rounded"></span>{" "}
        <span className="placeholder col-2 rounded"></span>{" "}
        <span className="placeholder col-4 rounded"></span>{" "}
      </div>
    </div>
  );
}

export default ArticlePlaceholder;
