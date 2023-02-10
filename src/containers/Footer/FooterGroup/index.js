import { useTranslation } from "react-i18next";
import LLink from "../../../components/LLink";

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
              <LLink
                className="d-block mb-1 "
                to={item.path}
                onClick={() =>
                  window.scroll({
                    top: 0,
                    left: 0,
                  })
                }
              >
                {item.icon} {item.label[lang]}
              </LLink>
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
