// main
import { useSelector } from "react-redux";
import React from "react";
import { useTranslation } from "react-i18next";

// components
import Banner from "../../components/Banner";
import HomeHeader from "./HomeHeader";
import Container from "../../components/Container";
import HomeRow from "./HomeRow";
import ErrorBoundary from "../../components/ErrorBoundary";

// other
import useFetchHomeData from "../../hooks/useFetchHomeData";

// css
import styles from "./Home.module.css";
import usePageTitle from "../../hooks/usePageTitle";

function Home() {
  const { euTours, vnTours, guides } = useSelector((state) => state.home);
  const { t } = useTranslation();
console.log('home')
  useFetchHomeData();
  
  usePageTitle(t("pageTitles.home"));
  return (
    <>
      <ErrorBoundary>
        <Banner
          storedBanner={{
            key: "homeSliders",
            type: "slider", // slider | image
            productType: "tour", // tour | article
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
            rowData={euTours}
            to="/du-lich-chau-au"
            type="tour"
          />
        </ErrorBoundary>

        <ErrorBoundary>
          <HomeRow
            title={t("homePage.products.vnTours")}
            rowData={vnTours}
            to="/du-lich-trong-nuoc"
            type="tour"
          />
        </ErrorBoundary>

        <ErrorBoundary>
          <HomeRow
            title={t("homePage.products.guides")}
            rowData={guides}
            to="/guides"
            type="article"
          />
        </ErrorBoundary>
      </Container>
    </>
  );
}
export default Home;
