import QuillReader from "../QuillReader";
import styles from "./Overview.module.css";
function Overview({ tour }) {
  return (
    <div className={styles.overview}>
      <div className={styles.item}>
        <h6>• Hành trình:</h6>
        <p>
          {tour.name} [mã tour: {tour.code}]
        </p>
      </div>
      <div className={styles.item}>
        <h6>• Lộ trình:</h6>
        <p>{tour.journey}</p>
      </div>
      <div className={styles.item}>
        <h6>• Thời gian:</h6>
        <p>
          {tour.duration.days} ngày {tour.duration.nights} đêm
        </p>
      </div>
      <div className={styles.item}>
        <h6>• Giá trọn gói:</h6>
        <p>{tour.price.toLocaleString()} đ</p>
      </div>
      <div className={styles.item}>
        <h6>• Tổng quan:</h6>
        <p>{tour.description}</p>
      </div>
      <div className={styles.item}>
        <h6>• Điểm nhấn:</h6>
        <div>
          <QuillReader delta={tour.highlights} />
        </div>
      </div>
    </div>
  );
}

export default Overview;
