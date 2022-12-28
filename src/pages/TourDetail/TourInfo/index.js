import React from "react";

import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

import "./TourInfo.module.css";
import { useTranslation } from "react-i18next";
import "./tourinfo_override.css";
import Overview from "./Overview";
import DropdownItems from "./DropdownItems";
import Itinerary from "./Itinerary";
import styles from "./TourInfo.module.css";
import Rating from "./Rating";

const trans = {
  tabTitle: {
    overview: {
      en: "OVERVIEW",
      vi: "MÔ TẢ",
    },
    itinerary: {
      en: "ITINERARY",
      vi: "LỊCH TRÌNH",
    },
    price: {
      en: "PRICE",
      vi: "BẢNG GIÁ",
    },
    terms: {
      en: "TERMS",
      vi: "ĐIỀU KHOẢN",
    },
    rating: {
      en: "RATING",
      vi: "ĐÁNH GIÁ",
    },
  },
  tabContent: {
    overview: {
      tour_name: {
        en: "Tour's name:",
        vi: "Tên hành trình:",
      },
      itinerary: {
        en: "Itinerary:",
        vi: "Lộ trình:",
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
      description: {
        en: "Description: ",
        vi: "Mô tả: ",
      },
      highlights: {
        en: "Highlights:",
        vi: "Điểm nổi bật: ",
      },
      points_of_departure: {
        en: "Points of departure:",
        vi: "Khởi hành:",
      },
    },
    price: {
      price_includes: {
        en: "Price includes",
        vi: "Giá bao gồm",
      },
      price_excludes: {
        en: "Price excludes",
        vi: "Giá không bao gồm",
      },
    },
    terms: {
      cancellation_policy: {
        en: "Cancellation Policy",
        vi: "Điều kiện hoàn hủy",
      },
    },
  },
};
{
}

const TourInfo = ({ tour, isLoading }) => {
  const lang = useTranslation().i18n.language;

  const pricePolicies = tour
    ? [
        {
          id: "includes",
          title: "Giá bao gồm",
          content: tour.price_policies.includes,
        },
        {
          id: "excludes",
          title: "Giá không bao gồm",
          content: tour.price_policies.excludes,
        },
        {
          id: "other",
          title: "Trẻ em và phụ thu",
          content: tour.price_policies.other,
        },
      ]
    : [];

  const terms = tour
    ? [
        {
          id: "registration",
          title: "Điều khoản đăng ký",
          content: tour.terms.registration,
        },
        {
          id: "cancellation",
          title: "Điều kiện hoàn hủy",
          content: tour.terms.cancellation,
        },
        {
          id: "payment",
          title: "Phương thức thanh toán",
          content: tour.terms.payment,
        },
      ]
    : [];

  const itinerary = tour ? tour.itinerary : [];

  return (
    <div className={styles.tourInfo + " tourInfo"}>
      {isLoading && (
        <div className={styles.placeholder}>
          <div className={styles.tabs}></div>
          <div className={styles.content}></div>
        </div>
      )}

      {/* ==================================================================  */}
      <Tabs
        defaultActiveKey="overview"
        className={styles.tabs + " mb-0 border-0"}
      >
        <Tab eventKey="overview" title={trans.tabTitle.overview[lang]}>
          <div className="p-3 border rounded-0">
            {tour && <Overview tour={tour} />}
          </div>
        </Tab>
        <Tab eventKey="itinerary" title={trans.tabTitle.itinerary[lang]}>
          <div className="p-3 border rounded-0">
            <Itinerary data={itinerary} />
          </div>
        </Tab>
        <Tab eventKey="price" title={trans.tabTitle.price[lang]}>
          <div className="p-3 border rounded-0">
            <DropdownItems data={pricePolicies} />
          </div>
        </Tab>

        <Tab eventKey="terms" title={trans.tabTitle.terms[lang]}>
          <div className="p-3 border rounded-0">
            <DropdownItems data={terms} />
          </div>
        </Tab>
        <Tab eventKey="rating" title={trans.tabTitle.rating[lang]}>
          <div className="p-3 border rounded-0">
            {tour && <Rating tour={tour} />}
          </div>
        </Tab>
      </Tabs>
    </div>
  );
};

export default TourInfo;
