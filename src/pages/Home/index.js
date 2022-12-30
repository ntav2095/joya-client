// main
import { useSelector } from "react-redux";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";

// components
import Banner from "../../components/Banner";
import HomeHeader from "./HomeHeader";
import Container from "../../components/Container";
import HomeRow from "./HomeRow";

// other
import useLazyLoading, { loadingImg } from "../../hooks/uselazyLoading";
import useFetchHomeData from "../../hooks/useFetchHomeData";

// css
import styles from "./Home.module.css";

const trans = {
  euTours: {
    title: {
      en: "Europe Tours",
      vi: "Du lịch châu Âu",
    },
  },
  vnTours: {
    title: {
      en: "Vietnam Tours",
      vi: "Du lịch trong nước",
    },
  },
};

function Home() {
  const { euTours, vnTours, guides } = useSelector((state) => state.home);
  const lang = useTranslation().i18n.language;
  const [lazy] = useLazyLoading(loadingImg);
  useFetchHomeData();
  useEffect(() => {
    lazy();
  }, []);

  return (
    <>
      <Banner
        storedBanner={{
          key: "homeSliders",
          type: "slider", // slider | image
          productType: "tour", // tour | article
        }}
      />

      <Container>
        <div className={styles.welcome}>
          <HomeHeader />
        </div>

        <HomeRow
          title={trans.euTours.title[lang]}
          rowData={euTours}
          to="/du-lich-chau-au"
          type="tour"
        />

        <HomeRow
          title={trans.vnTours.title[lang]}
          rowData={vnTours}
          to="/du-lich-trong-nuoc"
          type="tour"
        />

        <HomeRow
          title={trans.euTours.title[lang]}
          rowData={guides}
          to="/guides"
          type="article"
        />
      </Container>
    </>
  );
}
export default Home;
