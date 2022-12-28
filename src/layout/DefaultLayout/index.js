import { Outlet } from "react-router-dom";
import Banner from "../../components/Banner";
import styles from "./Layout.module.css";
import Sidebar from "../../containers/Sidebar";
import Navbar from "../../containers/Navbar";
import Footer from "../../containers/Footer";

function DefaultLayout({ noBanner }) {
  return (
    <>
      <Navbar />
      <div className={styles.main}>
        <Banner />
        <div className={styles.body }>
          <Outlet />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default DefaultLayout;
