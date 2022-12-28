import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Slider from "react-slick";
import { Col } from "react-bootstrap";

// components
import CardPlaceholder from "../../../components/placeholders/CardPlaceholder";
import { altThumbnail } from "../../../assets/images";
import { placeholder } from "../../../assets/images";

// other
import { sliderSettings as settings } from "./SliderCard.import";

// css
import "./Slider.css";
import styles from "./slider.module.css";

const trans = {
  days: {
    en: "days",
    vi: "ngày",
  },
  nights: {
    en: "nights",
    vi: "đêm",
  },
  full_package: {
    en: "Full package: ",
    vi: "Trọn gói: ",
  },
};

function HomeSlider(props) {
  // page= home hoặc page=article sẽ hiển thị nút xem tất cả
  const { title, data, naviga, page, loadingCard } = props;
  const { i18n } = useTranslation();
  const lang = i18n.language;

  const handlerBrokenImg = (e) => {
    e.target.src = altThumbnail;
  };

  const textCategory = (item) => {
    if (item == "diem-den") {
      return "Điểm đến hấp đẫn";
    } else if (item == "trai-nghiem") {
      return "Trải nghiệm - khám phá";
    } else if (item == "cam-nang") {
      return "Cẩm nang du lịch";
    } else {
      return "Nhật kí hành trình";
    }
  };

  const getArticleType = (categoryArr) => {
    return ["cam-nang", "nhat-ky", "trai-nghiem", "diem-den"].find((item) =>
      categoryArr.includes(item)
    );
  };

  return (
    <>
      {loadingCard && (
        <div className="Slider">
          <div className={styles.title}>
            <p className="fs-5 text-uppercase">{title}</p>
          </div>
          <div className={styles.container}>
            <Slider {...settings}>
              {data &&
                data.length > 0 &&
                data.map((item, id) => (
                  <div key={id} className={styles.carouselItem}>
                    <Link
                      to={
                        page == "article"
                          ? `/guides/${getArticleType(item.category)}/${
                              item._id
                            }`
                          : `${naviga}/${item._id}`
                      }
                    >
                      <div className={styles.img}>
                        <img
                          src={placeholder}
                          alt={item.name}
                          lazy={item.thumb}
                          onError={handlerBrokenImg}
                        />
                      </div>

                      <div className={styles.content}>
                        {page == "article" ? (
                          <>
                            <h5 className="text-uppercase">{item.title}</h5>
                            <p>{textCategory(item.category[0])}</p>
                          </>
                        ) : (
                          <>
                            <h5 className="text-uppercase">{item.name}</h5>
                            <p>{item.countries || item.journey}</p>
                            <p>
                              {item.duration.days} {trans.days[lang]}{" "}
                              {item.duration.nights} {trans.nights[lang]}
                            </p>
                            <p>
                              {trans.full_package[lang]}{" "}
                              <strong>{item.price.toLocaleString()} đ</strong>
                            </p>
                          </>
                        )}
                      </div>
                    </Link>
                  </div>
                ))}

              {(!data || data.length == 0) &&
                new Array(6).fill(1).map((item, index) => (
                  <Col key={index} className="mb-4">
                    <CardPlaceholder />
                  </Col>
                ))}
            </Slider>
          </div>

          {(page == "home" || page == "article") && (
            <Link className={styles.tourdetail} to={naviga}>
              {i18n.language == "vi" ? "Xem tất cả" : "ALL"}
            </Link>
          )}
        </div>
      )}
    </>
  );
}
export default HomeSlider;
