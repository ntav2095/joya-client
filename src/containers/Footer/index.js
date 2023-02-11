import { useSelector } from "react-redux";
import FooterGroup from "./FooterGroup";
import styles from "./Footer.module.css";

export default function Footer() {
  const company = useSelector((state) => state.company.company);
  const status = useSelector((state) => state.company.status);
  const error = useSelector((state) => state.company.error);
  let footerItems = {
    contact: {
      title: {
        vi: company.name,
        en: company.name,
      },
      classes: "col-12 col-sm-9 col-lg-5",
      items: [
        {
          url: "",
          label: {
            en: `Address: ${company.address}`,
            vi: `Địa chỉ: ${company.address}`,
          },
        },
        {
          url: "",
          label: {
            vi: `Điện thoại: ${company.phone} | Hotline : ${company.hotline}`,
            en: `Phone number: ${company.phone} | Hotline : ${company.hotline}`,
          },
        },
        {
          url: "",
          label: {
            en: `Email: ${company.email}`,
            vi: `Email: ${company.email}`,
          },
        },
        {
          url: "",
          label: {
            en: `Website: ${company.website}`,
            vi: `Website: ${company.website}`,
          },
        },
      ],
    },
    business_registration: {
      title: {
        vi: company.license_name,
        en: company.license_name,
      },
      classes: "col-12 col-lg-5",
      items: [
        {
          url: "",
          label: {
            vi: `Số GP/No: ${company.license_number}`,
            en: `License number: ${company.license_number}`,
          },
        },
        {
          url: "",
          label: {
            vi: `Do ${company.license_agency} cấp ngày ${company.license_date}`,
            en: `Issued by ${company.license_agency} on ${company.license_date}`,
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
          path: "/du-lich-chau-au",
          label: {
            vi: `Du lịch châu Âu`,
            en: "Europe tours",
          },
        },
        {
          url: "",
          path: "/du-lich-trong-nuoc",
          label: {
            vi: `Du lịch trong nước`,
            en: "Vietnam tours",
          },
        },
        {
          url: "",
          path: "/guides",
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

  if (status === "idle" || status === "pending") {
    const placeholder = <span className="placeholder col-6" />;
    footerItems = {
      ...footerItems,
      contact: {
        title: {
          vi: <span className="placeholder col-4 p-2" />,
          en: <span className="placeholder col-4 p-2" />,
        },
        classes: "col-12 col-sm-9 col-lg-5",
        items: [
          {
            url: "",
            label: {
              vi: <span className="placeholder col-8" />,
              en: <span className="placeholder col-8" />,
            },
          },
          {
            url: "",
            label: {
              vi: <span className="placeholder col-6" />,
              en: <span className="placeholder col-6" />,
            },
          },
          {
            url: "",
            label: {
              vi: <span className="placeholder col-3" />,
              en: <span className="placeholder col-3" />,
            },
          },
          {
            url: "",
            label: {
              vi: <span className="placeholder col-4" />,
              en: <span className="placeholder col-4" />,
            },
          },
        ],
      },
      business_registration: {
        title: {
          vi: <span className="placeholder col-8 p-2" />,
          en: <span className="placeholder col-8 p-2" />,
        },
        classes: "col-12 col-lg-5",
        items: [
          {
            url: "",
            label: {
              vi: <span className="placeholder col-6" />,
              en: <span className="placeholder col-6" />,
            },
          },
          {
            url: "",
            label: {
              vi: <span className="placeholder col-4" />,
              en: <span className="placeholder col-4" />,
            },
          },
        ],
      },
    };
  }
  return (
    <div className={styles.footer}>
      <div className="container-fluid  pt-5">
        <div className={styles.inner + " d-flex justify-content-between"}>
          <div>
            <FooterGroup footerItem={footerItems.contact} />
            <FooterGroup footerItem={footerItems.business_registration} />
          </div>

          <div className={styles.smallColumn}>
            <FooterGroup footerItem={footerItems.terms} />
          </div>

          <div className={styles.smallColumn}>
            <FooterGroup footerItem={footerItems.services} />
          </div>

          <div className={styles.smallColumn}>
            <FooterGroup footerItem={footerItems.links} />
          </div>
        </div>
      </div>
    </div>
  );
}
