import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import FooterGroup from "./FooterGroup";
import styles from "./Footer.module.css";

export default function Footer() {
  const { t } = useTranslation();
  const company = useSelector((state) => state.company.company);
  const status = useSelector((state) => state.company.status);
  const error = useSelector((state) => state.company.error);

  let footerItems = {
    contact: {
      title: company.name,
      classes: "col-12 col-sm-9 col-lg-5",
      items: [
        {
          url: "",
          label: `${t("general.address")}: ${company.address}`,
        },
        {
          url: "",
          label: (
            <span>
              {t("general.phoneNumber")}:{" "}
              <a href={`tel: ${company.phone}`}>{company.phone}</a> | Hotline :{" "}
              <a href={`tel: ${company.hotline}`}>{company.hotline}</a>
            </span>
          ),
        },
        {
          url: "",
          label: `Email: ${company.email}`,
        },
        {
          url: "",
          label: `Website: ${company.website}`,
        },
      ],
    },
    business_registration: {
      title: company.license_name,
      classes: "col-12 col-lg-5",
      items: [
        {
          url: "",
          label: `${t("general.licenseNumber")}: ${company.license_number}`,
        },
        {
          url: "",
          label: `${t("footer.other.issuedBy")} ${company.license_agency} ${t(
            "footer.other.issuedOn"
          )} ${company.license_date}`,
        },
      ],
    },
    services: {
      title: t("footer.services.title"),
      classes: "col-12 col-sm-3 col-lg-2",
      items: [
        {
          url: "",
          path: "/du-lich-chau-au",
          label: t("footer.services.content.euTours"),
        },
        {
          url: "",
          path: "/du-lich-trong-nuoc",
          label: t("footer.services.content.vnTours"),
        },
        {
          url: "",
          path: "/guides",
          label: t("footer.services.content.guides"),
        },
        {
          url: "",
          path: "/dich-vu-visa",
          label: t("footer.services.content.visa"),
        },
      ],
    },
    terms: {
      title: t("footer.terms.title"),
      classes: "col-12  col-sm-9 col-lg-3",
      items: [
        {
          url: "",
          path: "/dieu-khoan/dieu-kien-dang-ky",
          label: t("footer.terms.content.registration"),
        },
        {
          url: "",
          path: "/dieu-khoan/dieu-kien-huy-doi",
          label: t("footer.terms.content.cancellation"),
        },
        {
          url: "",
          path: "/dieu-khoan/luu-y",
          label: t("footer.terms.content.notes"),
        },
        {
          url: "",
          path: "/dieu-khoan/phuong-thuc-thanh-toan",
          label: t("footer.terms.content.payment"),
        },
        {
          url: "",
          path: "/dieu-khoan/chinh-sach-bao-mat",
          label: t("footer.terms.content.privacy"),
        },
      ],
    },
    links: {
      title: t("footer.links.title"),
      classes: "col-12  col-sm-3 col-lg-2",
      items: [
        {
          url: "https://www.facebook.com",
          path: "",
          icon: <i className="fab fa-facebook"></i>,
          label: t("footer.links.content.facebook"),
        },
        {
          url: "https://www.instagram.com",
          path: "",
          icon: <i className="fab fa-instagram"></i>,
          label: t("footer.links.content.instagram"),
        },
        {
          url: "https://www.youtube.com",
          path: "",
          icon: <i className="fab fa-youtube"></i>,
          label: t("footer.links.content.youtube"),
        },
      ],
    },
  };

  if (status === "idle" || status === "pending") {
    footerItems = {
      ...footerItems,
      contact: {
        title: <span className="placeholder col-4 p-2" />,
        classes: "col-12 col-sm-9 col-lg-5",
        items: [
          {
            url: "",
            label: <span className="placeholder col-8" />,
          },
          {
            url: "",
            label: <span className="placeholder col-6" />,
          },
          {
            url: "",
            label: <span className="placeholder col-3" />,
          },
          {
            url: "",
            label: <span className="placeholder col-4" />,
          },
        ],
      },
      business_registration: {
        title: <span className="placeholder col-8 p-2" />,
        classes: "col-12 col-lg-5",
        items: [
          {
            url: "",
            label: <span className="placeholder col-6" />,
          },
          {
            url: "",
            label: <span className="placeholder col-4" />,
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
