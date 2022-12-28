//

import { Link } from "react-router-dom";
import Slider from "react-slick";
import styles from "./Visa.module.css";
import settings from "./responsiveCarousel";
import usePageTitle from "../../hooks/usePageTitle";
import SignupConsultModal from "./SignupConsultModal";
import { useRef, useState } from "react";
import SearchResults from "./SearchResults";
import { useSelector } from "react-redux";
import accentsRemover from "../../services/helpers/accentsRemover";
import { countriesImages } from "./mockImages";
import VisaSteps from "./VisaSteps";

function VisaService() {
  const [show, setShow] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const handleClose = () => setShow(false);
  const visa = useSelector((state) => state.visa);

  usePageTitle(`Dịch vụ visa || Go Travel`);

  const results = searchInput.trim()
    ? visa.availableCountries.filter((item) => {
        return accentsRemover(item.name).match(
          new RegExp(accentsRemover(searchInput), "i")
        );
      })
    : null;

  return (
    <>
      <SignupConsultModal handleClose={handleClose} show={show} />

      <div className="container-lg">
        <div className={styles.container}>
          <div className="p-2">
            <form
              className={styles.searchForm + " shadow p-3 mt-3 bg-white border"}
            >
              <h5>Nhập tên nước bạn muốn làm visa</h5>
              <input
                className={styles.searchInput}
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                type="text"
                placeholder="Nhập tên nước bạn muốn làm visa"
              />
              <div className={styles.searchResults}>
                {results && results.length > 0 && (
                  <ul className="list-group list-group-flush shadow border w-100 p-2 bg-white">
                    {results.map((item) => (
                      <li
                        key={item.code}
                        className="list-group-item list-group-item-action"
                      >
                        <Link
                          to={`/dich-vu-visa/${item.code}`}
                          className="d-block"
                        >
                          Dịch vụ visa {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}

                {results && results.length === 0 && (
                  <p className="list-group list-group-flush shadow border w-100 p-2 bg-white">
                    Không có sản phẩm nào
                  </p>
                )}
              </div>
            </form>
          </div>

          {/* quick visa  */}
          <div className={styles.quickVisa}>
            <h2 className="mb-2 pb-0">Làm visa nhanh</h2>

            <div className={styles.chooseVisa}>
              <Slider {...settings}>
                {visa.availableCountries.map((item, index) => (
                  <Link key={index} to={`/dich-vu-visa/${item.code}`}>
                    <div className={styles.visaProduct}>
                      <div className={styles.inner}>
                        <div
                          className={styles.image}
                          style={{
                            backgroundImage: `url(${
                              countriesImages[item.code]
                            })`,
                          }}
                        />
                        <div className={styles.textBox}>
                          <p className={styles.name}>
                            Dịch vụ visa {item.name}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </Slider>
            </div>
          </div>
        </div>

        <VisaSteps />
      </div>
    </>
  );
}

export default VisaService;
