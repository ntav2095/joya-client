import { earth as earthSVG } from "../../../assets/svgs";
import i18next from "../../../services/languages/i18n";
import { useTranslation } from "react-i18next";
import Search from "../Search";
import "./NavTopBar.css";

const trans = {
  language: {
    en: "Language:",
    vi: "Ngôn ngữ:",
  },
};

function NavTopBar() {
  const lang = useTranslation().i18n.language;

  const langChangeHandler = (e) => {
    i18next.changeLanguage(e.target.value);
  };
  return (
    <div className="container-fluid travel__topbar d-flex align-items-center justify-content-lg-between">
      <div className="travel__topbar__contact  pe-2">
        <p className="m-0 text-nowrap ">
          <strong>Hotline:</strong>{" "}
          <a className="travel__topbar__tel" href="tel:123.456.789">
            123.456.789
          </a>
        </p>
      </div>
      <div className="ms-2 travel__language">
        <label className="d-flex align-items-center text-nowrap">
          {earthSVG}{" "}
          <span className="d-none d-md-inline">{trans.language[lang]}</span>
          <select onChange={langChangeHandler} value={lang}>
            <option value="vi">Tiếng Việt</option>
            <option value="en">English</option>
          </select>
        </label>
      </div>

      <div className="d-none d-sm-flex d-lg-none justify-content-end  w-100">
        <Search />
      </div>
    </div>
  );
}

export default NavTopBar;
