import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

function FooterGroup({ footerItem }) {
  const lang = useTranslation().i18n.language;

  return (
    <div className="mb-4">
      <h6>{footerItem.title[lang]}</h6>

      <ul>
        {footerItem.items.map((item, index) => (
          <li key={index}>
            {item.url ? (
              <a className="d-block mb-1 " href={item.url}>
                {item.icon} {item.label[lang]}
              </a>
            ) : item.path ? (
              <Link
                className="d-block mb-1 "
                to={item.path}
                onClick={() =>
                  window.scroll({
                    top: 0,
                    left: 0,
                    behavior: "smooth",
                  })
                }
              >
                {item.icon} {item.label[lang]}
              </Link>
            ) : (
              <p className="mb-1 ">
                {item.icon} {item.label[lang]}
              </p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FooterGroup;
