import { Link, useNavigate } from "react-router-dom";
import Container from "../../components/Container";

import styles from "./ErrorPage.module.css";

function ErrorPage({ code, message }) {
  const navigate = useNavigate();
  return (
    <Container>
      <div className={styles.container}>
        {code === 404 && (
          <div>
            <h2>404</h2>
            <h3>Not Found</h3>

            <p>Trang bạn yêu cầu không tồn tại</p>

            <button onClick={() => navigate("/")}>Về trang chủ</button>
            <button onClick={() => navigate(-1)}>Quay lại</button>
          </div>
        )}

        {code !== 404 && (
          <div>
            {code && <h2>{code}</h2>}

            <h3>Đã có lỗi xảy ra</h3>

            <p className="mb-2">{message}</p>

            <button onClick={() => navigate("/")}>Về trang chủ</button>
            <button onClick={() => navigate(-1)}>Quay lại</button>
          </div>
        )}
      </div>
    </Container>
  );
}

export default ErrorPage;
