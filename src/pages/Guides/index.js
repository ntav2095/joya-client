// main
import { useTranslation } from "react-i18next";

// components
import Banner from "../../components/Banner";
import Container from "../../components/Container";
import GuidesRow from "./GuidesRow";

// other
import usePageTitle from "../../hooks/usePageTitle";

function Guides() {
  const { t } = useTranslation();

  usePageTitle(t("pageTitles.guides.guides"));
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
