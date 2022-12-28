import { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import { useTranslation } from "react-i18next";
import QuillReader from "../../components/QuillReader";
import Styles from "./Term.module.css";

const TERM_ITEMS = new Map([
  [
    "luu-y",
    {
      code: "notes",
      title: {
        en: "Notes",
        vi: "Thông tin cần lưu ý",
      },
    },
  ],
  [
    "dieu-kien-dang-ky",
    {
      code: "registration",
      title: {
        en: "Registration policy",
        vi: "Điều kiện đăng ký",
      },
    },
  ],
  [
    "phuong-thuc-thanh-toan",
    {
      code: "payment",
      title: {
        en: "Payment methods",
        vi: "Phương thức thanh toán",
      },
    },
  ],
  [
    "chinh-sach-bao-mat",
    {
      code: "privacy",
      title: {
        en: "Privacy policies",
        vi: "Chính sách bảo mật",
      },
    },
  ],
  [
    "dieu-kien-huy-doi",
    {
      code: "cancellation",
      title: {
        en: "Cancellation policies",
        vi: "Điều kiện hủy đổi",
      },
    },
  ],
]);

function Term() {
  // luu-y | dieu-kien-dang-ky | phuong-thuc-thanh-toan | chinh-sach-bao-mat | dieu-kien-dang-ky
  const { type } = useParams();
  const [sendRequest, isLoading, data, error, resetStates] = useAxios();
  const lang = useTranslation().i18n.language;

  const delta = useMemo(
    () => (data ? data.data.content : [{ insert: "/n" }]),
    [data]
  );

  useEffect(() => {
    sendRequest({
      method: "GET",
      url: `http://localhost:5000/term/${TERM_ITEMS.get(type).code}`,
    });
  }, [type, lang]);

  return (
    <div className=" p-0 m-0">
      <div className="container-lg pt-5">
        <h1 className={Styles.h1 + " fs-3 mb-4"}>
          {TERM_ITEMS.get(type).title[lang]}
        </h1>
        <div className={Styles.content + " bg-light"}>
          <QuillReader className delta={delta} />
        </div>
      </div>
    </div>
  );
}

export default Term;
