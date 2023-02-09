// main
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

// components
import Banner from "../../components/Banner";
import HomeHeader from "./HomeHeader";
import Container from "../../components/Container";
import HomeRow from "./HomeRow";
import ErrorBoundary from "../../components/ErrorBoundary";

// other
import usePageTitle from "../../hooks/usePageTitle";
import {
  selectHotEuTours,
  selectHotVnTours,
  selectToursStatus,
  selectToursError,
  selectHomeSliderTours,
} from "../../store/tours.slice";
import {
  selectGuidesError,
  selectGuidesStatus,
  selectGuides,
} from "../../store/guides.slice";

// css
import styles from "./Home.module.css";

function Home() {
  const { t } = useTranslation();

  // tours
  const hotEuTours = useSelector(selectHotEuTours);
  const hotVnTours = useSelector(selectHotVnTours);
  const status = useSelector(selectToursStatus);
  const error = useSelector(selectToursError);

  // guides
  const hotGuides = useSelector(selectGuides).slice(0, 6);
  const guidesStatus = useSelector(selectGuidesStatus);
  const guidesError = useSelector(selectGuidesError);

  // slider
  const homeSliders = useSelector(selectHomeSliderTours);

  usePageTitle(t("pageTitles.home"));

  useEffect(() => {
    window.scroll({ top: 0 });
  }, []);

  console.log(status);
  return (
    <>
      <ErrorBoundary>
        <Banner
          carousel={{
            items: homeSliders,
            isLoading: status === "idle" || status === "pending",
            error: error,
            type: "tour",
          }}
        />
      </ErrorBoundary>

      <Container>
        <div className={styles.welcome}>
          <ErrorBoundary>
            <HomeHeader />
          </ErrorBoundary>
        </div>

        <ErrorBoundary>
          <HomeRow
            title={t("homePage.products.euTours")}
            rowData={{
              data: hotEuTours,
              status,
              error,
            }}
            type="tour"
            to="/du-lich-chau-au"
          />
        </ErrorBoundary>

        <ErrorBoundary>
          <HomeRow
            title={t("homePage.products.vnTours")}
            rowData={{
              data: hotVnTours,
              status,
              error,
            }}
            type="tour"
            to="/du-lich-trong-nuoc"
          />
        </ErrorBoundary>

        <ErrorBoundary>
          <HomeRow
            title={t("homePage.products.guides")}
            rowData={{
              data: hotGuides,
              status: guidesStatus,
              error: guidesError,
            }}
            type="article"
            to="/guides"
          />
        </ErrorBoundary>
      </Container>
    </>
  );
}
export default Home;
