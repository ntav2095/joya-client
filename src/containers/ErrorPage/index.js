import { Link, useNavigate } from "react-router-dom";
import Container from "../../components/Container";
import { useTranslation } from "react-i18next";

import styles from "./ErrorPage.module.css";

const trans = {
  goHome: {
    en: "Go to home",
    vi: "Về trang chủ",
  },
  goBack: {
    en: "Go back",
    vi: "Quay lại",
  },
  somethingWrongHappened: {
    en: "Something wrong happened",
    vi: "Đã có lỗi xảy ra",
  },
  pageNotFound: {
    en: "Page Not Found",
    vi: "Trang bạn yêu cầu không tồn tại",
  },
};

function ErrorPage({ code, message }) {
  const lang = useTranslation().i18n.language;

  const navigate = useNavigate();
  return (
    <Container>
      <div className={styles.container}>
        {code === 404 && (
          <div>
            <h2>404</h2>
            <h3 className="mb-2">{message || "Not Found"}</h3>

            <button onClick={() => navigate("/")}>{trans.goHome[lang]}</button>
            <button onClick={() => navigate(-1)}>{trans.goBack[lang]}</button>
          </div>
        )}

        {code !== 404 && (
          <div>
            {code && <h2>{code}</h2>}

            <h3 className="mb-2">{message}</h3>

            {/* <p className="mb-2">{message}</p> */}

            <button onClick={() => navigate("/")}>{trans.goHome[lang]}</button>
            <button onClick={() => navigate(-1)}>{trans.goBack[lang]}</button>
          </div>
        )}
      </div>
    </Container>
  );
}

export default ErrorPage;
