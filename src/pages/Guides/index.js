// main
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

// components
import Banner from "../../components/Banner";
import Container from "../../components/Container";
import GuidesRow from "./GuidesRow";

// other
import {
  selectGuides,
  selectGuidesCategory,
  selectGuidesStatus,
  selectGuidesError,
} from "../../store/guides.slice";
import usePageTitle from "../../hooks/usePageTitle";
import useScroll from "../../hooks/useScroll";

function Guides() {
  useScroll();
  const { t } = useTranslation();
  usePageTitle(t("pageTitles.guides.guides"));
  const guidesCategory = useSelector(selectGuidesCategory);
  const status = useSelector(selectGuidesStatus);
  const error = useSelector(selectGuidesError);
  const guides = useSelector(selectGuides);
  return (
    <>
      <Banner
        carousel={{
          items: guides.slice(0, 3),
          isLoading: status === "pending" || status === "idle",
          error: error,
          type: "guides",
        }}
      />

      <Container>
        <div className="pt-5">
          {guidesCategory.map((item) => (
            <GuidesRow key={item.slug} category={item} />
          ))}
        </div>
      </Container>
    </>
  );
}

export default Guides;
