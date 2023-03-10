import React from "react";
import usePageTitle from "../../hooks/usePageTitle";

import VisaProduct from "./VisaProduct";
import useAxios from "../../hooks/useAxios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./Visa.module.css";
import { useTranslation } from "react-i18next";
import VisaSteps from "../Visa/VisaSteps";
import { visaApi } from "../../services/apis";

function Visa() {
  const [sendRequest, isLoading, data, error, resetStates] = useAxios();
  const { visaCountry } = useParams();
  const lang = useTranslation().i18n.language;

  useEffect(() => {
    sendRequest(visaApi.getVisaProductsAccordingToCountry(visaCountry));
  }, [lang]);
  usePageTitle(`Dịch vụ làm visa Ý || Joya`);

  const products = data ? data.data : null;
  return (
    <div className="bg-light">
      <div className="container-lg pt-3">
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
                      <VisaProduct product={product} />
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
