import styles from "./Sidebar.module.css";

function Sidebar() {
  return (
    <div className="pt-4">
      <div className={styles.sidebar}>
        <div className={styles.contactInfo + " mb-4 border-bottom pb-2"}>
          <h6 className="text-center mb-2 fw-bold">Thông tin liên hệ</h6>

          <p className="mb-1">Hotline: 123456789</p>
          <p className="mb-1">Zalo: 123456789</p>
          <p className="mb-1">Email: abcxyz@gmail.com</p>
        </div>

        <p className="text-center fw-bold mb-2">Tư vấn miễn phí</p>
        <label className={styles.input}>
          <input type="tel" placeholder="+84" />
          <span>Tel:</span>
        </label>
        <button>Yêu cầu gọi lại</button>
      </div>
    </div>
  );
}

export default Sidebar;
