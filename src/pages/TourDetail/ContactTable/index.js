import React, { useState } from "react";
import BookingModal from "./BookingModal";
import { home3 as phonePng } from "../../../assets/images";
import { arrowRight as arrowSvg } from "../../../assets/svgs";
import styles from "./ContactTable.module.css";
import { useTranslation } from "react-i18next";
import Placeholder from "../../../components/placeholders/Placeholder";
import DatePickerModal from "./DatePickerModal";
import { useEffect } from "react";
import ContactModal from "./ContactModal";
import NotificationModal from "./notificationModal/notification";

const translation = {
  fullPackage: {
    en: "Full package: ",
    vi: "Trọn gói: ",
  },
  dest: {
    en: "Destinations: ",
    vi: "Điểm đến: ",
  },
  duration: {
    en: "Duration: ",
    vi: "Thời gian: ",
  },
  days: {
    en: "days",
    vi: "ngày",
  },
  nights: {
    en: "nights",
    vi: "đêm",
  },
  pointOfDeparture: {
    en: "Point of departure: ",
    vi: "Điểm khởi hành: ",
  },
  departureDates: {
    en: "Departure date",
    vi: "Ngày khởi hành",
  },
  book: {
    en: "Book now",
    vi: "Đặt tour",
  },
  contactNow: {
    en: "Contact us",
    vi: "Liên hệ tư vấn",
  },
  contact: {
    en: "Contact:",
    vi: "Thông tin liên hệ",
  },
};

function ContactTable({ tour, isLoading }) {
  const [modalShow, setModalShow] = useState(""); // "" | "pick-date" | "book" | "contact"
  const [selectedDate, setSelectedDate] = useState(null);
  const [successModal, setSuccessModal] = useState(false);

  const { i18n } = useTranslation();
  const lang = i18n.language;

  const success = (succ) => {
    setSuccessModal(succ);
  };
  const pointOfDeparture = tour ? tour.journey.split("-")[0].trim() : "";
  const destinations = tour
    ? tour.journey
        .split("-")
        .map((item) => item.trim())
        .filter((item) => item.toLowerCase() !== pointOfDeparture.toLowerCase())
        .join(" - ")
    : "";

  return (
    <>
      {tour && (
        <BookingModal
          show={modalShow === "book"}
          onHide={() => setModalShow("")}
          tour={tour}
          selectedDate={selectedDate}
          success={success}
        />
      )}

      {tour && (
        <DatePickerModal
          show={modalShow === "pick-date"}
          onHide={() => setModalShow("")}
          tour={tour}
          setSelectedDate={setSelectedDate}
          setModalShow={setModalShow}
        />
      )}

      {successModal && (
        <NotificationModal
          err={false}
          message={"Đặt tour thành công."}
          success={success}
        />
      )}
      <ContactModal
        show={modalShow === "contact"}
        onHide={() => setModalShow("")}
        success={success}
      />

      <div
        className={
          styles.container +
          " d-flex d-lg-block align-items-start flex-column flex-sm-row "
        }
      >
        {tour && !isLoading && (
          <div className={styles.card + " mx-auto"}>
            <ul className={styles.tourInfo}>
              <li>
                <span>{translation.fullPackage[lang]}</span>
                <strong className={styles.price}>
                  {tour.price.toLocaleString()} đ
                </strong>
              </li>
              <li>
                <span>{translation.dest[lang]}</span>
                <strong>{destinations}</strong>
              </li>
              <li>
                <span>{translation.duration[lang]}</span>
                <strong>
                  {tour.duration.days} {translation.days[lang]}{" "}
                  {tour.duration.nights} {translation.nights[lang]}
                </strong>
              </li>
              <li>
                <span>{translation.pointOfDeparture[lang]}</span>
                <strong>{pointOfDeparture}</strong>
              </li>
            </ul>

            <button
              className={styles.orderBtn}
              onClick={() => setModalShow("pick-date")}
            >
              {translation.departureDates[lang]}
              {arrowSvg}
            </button>

            <button
              className={styles.orderBtn}
              onClick={() => setModalShow("book")}
            >
              {translation.book[lang]}
            </button>

            <button
              className={styles.orderBtn}
              onClick={() => setModalShow("contact")}
            >
              {translation.contactNow[lang]}
            </button>
          </div>
        )}

        {isLoading && (
          <div className={styles.card + " mx-auto p-0"}>
            <Placeholder height="300px" width="100%" />
          </div>
        )}

        {!isLoading && (
          <div
            className={
              styles.contactInfo + " row  mt-4 mt-sm-0 mt-lg-4 mx-auto"
            }
          >
            <div className="col-8 ">
              <h4 className="mb-2 fs-6 fw-bold">{translation.contact[lang]}</h4>
              <ul>
                <li>Hotline: 123456789</li>
                <li>Zalo: 123456789</li>
                <li>Email: abcxyz@gmail.com</li>
              </ul>
            </div>
            <div className="col-4 d-flex align-items-center justify-content-center ">
              <img src={phonePng} alt="phone" />
            </div>
          </div>
        )}

        {isLoading && (
          <div
            className={
              styles.contactInfo + " row  mt-4 mt-sm-0 mt-lg-4 mx-auto"
            }
          >
            <div className="col-8 ">
              <h4 className="mb-2 fs-6 fw-bold">
                <Placeholder height="20px" width="150px" />
              </h4>
              <ul>
                <li>
                  <Placeholder height="18px" width="150px" />
                </li>
                <li>
                  <Placeholder height="18px" width="140px" />
                </li>
                <li>
                  <Placeholder height="18px" width="180px" />
                </li>
              </ul>
            </div>
            <div className="col-4 d-flex align-items-center justify-content-center ">
              <Placeholder height="50px" width="50px" circle />
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default ContactTable;
