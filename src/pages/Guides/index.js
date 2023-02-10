// main
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

// components
import Banner from "../../components/Banner";
import Container from "../../components/Container";
import GuidesRow from "./GuidesRow";
import SliderPortion from "../../components/SliderPortion";
import CardPlaceholder from "../../components/placeholders/CardPlaceholder";
import ErrorPage from "../../containers/ErrorPage";

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

  const placeholders = new Array(6).fill(1).map((_, index) => ({
    card: <CardPlaceholder key={index} type="article" />,
    id: index,
  }));

  const rowPlaceholder = (
    <SliderPortion
      title={
        <span className="placeholder  bg-secondary col-4 col-sm-3 col-md-2 p-3 rounded" />
      }
      error={null}
      cards={placeholders}
    />
  );

  console.log(error);
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

          {(status === "idle" || status === "pending") && (
            <>
              {rowPlaceholder}
              {rowPlaceholder}
              {rowPlaceholder}
              {rowPlaceholder}
            </>
          )}

          {error && <ErrorPage code={error.httpCode} message={error.message} />}
        </div>
      </Container>
    </>
  );
}

export default Guides;
