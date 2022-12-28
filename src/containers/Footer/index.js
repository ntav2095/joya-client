import { Link } from "react-router-dom";
import FooterGroup from "./FooterGroup";
import styles from "./Footer.module.css";
import { useTranslation } from "react-i18next";

const footerItems = {
  contact: {
    title: {
      vi: "CÔNG TY CỔ PHẦN JOYA",
      en: "JOYA JOINT STOCK COMPANY",
    },
    classes: "col-12 col-sm-9 col-lg-5",
    items: [
      {
        url: "",
        label: {
          en: `Address: Hoa Sua 11-52 Vinhomes Riveside, Long Bien, Ha Noi.`,
          vi: `Địa chỉ: Hoa Sữa 11-52 Vinhomes Riveside, Long Biên, Hà Nội.`,
        },
      },
      {
        url: "",
        label: {
          vi: `Điện thoại: 123456789 | Hotline : 123456789`,
          en: `Phone number: 123456789 | Hotline : 123456789`,
        },
      },
      {
        url: "",
        label: {
          en: `Email: info@joya.vn`,
          vi: `Email: info@joya.vn`,
        },
      },
      {
        url: "",
        label: {
          en: `Website: joya.vn`,
          vi: `Website: joya.vn`,
        },
      },
    ],
  },
  business_registration: {
    title: {
      vi: "GIẤY PHÉP KINH DOANH DỊCH VỤ LỮ HÀNH QUỐC TẾ",
      en: "INTERNATIONAL FESTIVAL SERVICE BUSINESS LICENSE",
    },
    classes: "col-12 col-lg-5",
    items: [
      {
        url: "",
        label: {
          vi: `Số GP/No: 79-042/2022/TCDL - GP LHQT`,
          en: `License number: 79-042/2022/TCDL - GP LHQT`,
        },
      },
      {
        url: "",
        label: {
          vi: `Do TCDL cấp ngày 30/10/2022`,
          en: `Issued by TCDL on October 30, 2022`,
        },
      },
    ],
  },
  services: {
    title: {
      vi: "DU LỊCH",
      en: "TRAVEL",
    },
    classes: "col-12 col-sm-3 col-lg-2",
    items: [
      {
        url: "",
        path: "/tours-chau-au",
        label: {
          vi: `Du lịch châu Âu`,
          en: "Europe tours",
        },
      },
      {
        url: "",
        path: "/tours-trong-nuoc",
        label: {
          vi: `Du lịch trong nước`,
          en: "Vietnam tours",
        },
      },
      {
        url: "",
        path: "/cam-nang-du-lich",
        label: {
          vi: `Guides`,
          en: `Guides`,
        },
      },
      {
        url: "",
        path: "/dich-vu-visa",
        label: {
          vi: `Dịch vụ visa`,
          en: "Visa services",
        },
      },
    ],
  },
  terms: {
    title: {
      vi: "ĐIỀU KHOẢN",
      en: "TERMS",
    },
    classes: "col-12  col-sm-9 col-lg-3",
    items: [
      {
        url: "",
        path: "/dieu-khoan/dieu-kien-dang-ky",
        label: {
          vi: `Điều kiện đăng ký`,
          en: `Registration Conditions`,
        },
      },
      {
        url: "",
        path: "/dieu-khoan/dieu-kien-huy-doi",
        label: {
          vi: `Điều kiện hủy đổi`,
          en: "Cancellation policy",
        },
      },
      {
        url: "",
        path: "/dieu-khoan/luu-y",
        label: {
          vi: `Thông tin cần lưu ý`,
          en: `Notes`,
        },
      },
      {
        url: "",
        path: "/dieu-khoan/phuong-thuc-thanh-toan",
        label: {
          vi: `Phương thức thanh toán`,
          en: "Payment method",
        },
      },
      {
        url: "",
        path: "/dieu-khoan/chinh-sach-bao-mat",
        label: {
          vi: `Bảo mật dữ liệu khách hàng`,
          en: "Privacy policy",
        },
      },
    ],
  },
  links: {
    title: {
      vi: "LIÊN KẾT",
      en: "LINKS",
    },
    classes: "col-12  col-sm-3 col-lg-2",
    items: [
      {
        url: "https://www.facebook.com",
        path: "",
        icon: <i className="fab fa-facebook"></i>,
        label: {
          vi: `Facebook`,
          en: `Facebook`,
        },
      },
      {
        url: "https://www.instagram.com",
        path: "",
        icon: <i className="fab fa-instagram"></i>,
        label: {
          vi: `Instagram`,
          en: `Instagram`,
        },
      },
      {
        url: "https://www.youtube.com",
        path: "",
        icon: <i className="fab fa-youtube"></i>,
        label: {
          vi: `Youtube`,
          en: `Youtube`,
        },
      },
    ],
  },
};

export default function Footer() {
  return (
    <div className={styles.footer}>
      <div className="container-fluid  pt-5">
        <div className={styles.inner + " d-flex justify-content-between"}>
          <div>
            <FooterGroup footerItem={footerItems.contact} />
            <FooterGroup footerItem={footerItems.business_registration} />
          </div>

          <div>
            <FooterGroup footerItem={footerItems.services} />
          </div>

          <div>
            <FooterGroup footerItem={footerItems.terms} />
          </div>

          <div>
            <FooterGroup footerItem={footerItems.links} />
          </div>
        </div>
      </div>
    </div>
  );
}
