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
  const { typeOfTerm } = useParams();
  const [sendRequest, isLoading, data, error, resetStates] = useAxios();
  const lang = useTranslation().i18n.language;

  const delta = useMemo(
    () => (data ? data.data.content : [{ insert: "/n" }]),
    [data]
  );

  useEffect(() => {
    sendRequest({
      method: "GET",
      url: `http://localhost:5000/term/${TERM_ITEMS.get(typeOfTerm).code}`,
    });
  }, [typeOfTerm, lang]);

  return (
    <div className="container-lg py-5">
      <h1 className="text-center fs-3 mb-4">
        {TERM_ITEMS.get(typeOfTerm).title[lang]}
      </h1>
      <div className={Styles.content + " bg-light border p-4"}>
        <QuillReader className delta={delta} />
      </div>
    </div>
  );
}

export default Term;
