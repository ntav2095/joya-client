import usePageTitle from "../../hooks/usePageTitle";
import styles from "./NotFound.module.css";

function NotFound() {
  usePageTitle("Trang không tồn tại || Go Travel");
  return (
    <div>
      <div className={styles.notFound}>
        <h1>Page Not Found</h1>
      </div>
    </div>
  );
}

export default NotFound;
