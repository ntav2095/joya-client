import React, { useRef, useState } from "react";
import usePageTitle from "../../hooks/usePageTitle";

import VisaProduct from "./VisaProduct";
import useAxios from "../../hooks/useAxios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./Visa.module.css";
import { useTranslation } from "react-i18next";
import VisaSteps from "../Visa/VisaSteps";

function Visa() {
  const [color, setColor] = useState({
    choose: "#000",
    book: "#ec4325",
  });
  const [sendRequest, isLoading, data, error, resetStates] = useAxios();
  const { visaCountry } = useParams();
  const lang = useTranslation().i18n.language;

  useEffect(() => {
    sendRequest({
      method: "GET",
      url: `http://localhost:5000/visa/country/${visaCountry}`,
    });
  }, [lang]);
  usePageTitle(`Visa --- đang cập nhật || Go Travel`);

  const products = data ? data.data : null;
  return (
    <div className="bg-light">
      <div className="container-lg pt-3">
        <div className=" d-flex gap-5 mb-3 border p-2 bg-white">
          <p className="m-0 fw-bold">Chỉnh màu các nút:</p>
          <div className="d-flex gap-2 align-items-center">
            <p className="m-0">Nút 'CHỌN'</p>
            <input
              type="color"
              onChange={(e) =>
                setColor((prev) => ({ ...prev, choose: e.target.value }))
              }
            />
          </div>

          <div className="d-flex gap-2 align-items-center">
            <p className="m-0">Nút 'ĐẶT'</p>
            <input
              type="color"
              onChange={(e) =>
                setColor((prev) => ({ ...prev, book: e.target.value }))
              }
            />
          </div>
        </div>

        <h1 className="fs-3">Dịch vụ làm visa Ý</h1>

        <div className="p-1">
          <VisaSteps />
          <div className="Body-content-2 container">
            <div>
              <h5 className={styles.chooseProductTitle}>Chọn gói dịch vụ</h5>

              <ul className={styles.products}>
                {products &&
                  products.length > 0 &&
                  products.map((product) => (
                    <li key={product._id}>
                      <VisaProduct product={product} color={color} />
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Visa;
