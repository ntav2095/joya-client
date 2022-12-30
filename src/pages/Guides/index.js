// main
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

// components
import ErrorPage from "../../containers/ErrorPage";
import Banner from "../../components/Banner";
import Container from "../../components/Container";
import GuidesRow from "./GuidesRow";

// other
import usePageTitle from "../../hooks/usePageTitle";

function Guides() {
  const location = useLocation();
  const lang = useTranslation().i18n.language;

  useEffect(() => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [lang, location.search]);

  usePageTitle(`Guides || Go Travel`);

  return (
    <>
      <Banner
        storedBanner={{
          key: "guides",
          type: "slider",
          productType: "article",
        }}
      />

      <Container>
        <div className="pt-5">
          <GuidesRow category="diem-den" />
          <GuidesRow category="cam-nang" />
          <GuidesRow category="nhat-ky" />
          <GuidesRow category="trai-nghiem" />
        </div>
      </Container>
    </>
  );
}

export default Guides;
