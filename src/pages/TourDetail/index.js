import { useParams } from "react-router-dom";
import { useEffect } from "react";

// components
import ContactTable from "./ContactTable";
import TourInfo from "./TourInfo";
import TourCarousel from "./TourCarousel";
import ErrorPage from "../../containers/ErrorPage";

// apis
import useAxios from "../../hooks/useAxios";
import { tourApi } from "../../services/apis";

// assets

// hooks
import usePageTitle from "../../hooks/usePageTitle";
//  css
import styles from "./TourDetail.module.css";
import FacebookComment from "../../containers/facebookComment";
import { useTranslation } from "react-i18next";
import Placeholder from "../../components/placeholders/Placeholder";
import { useDispatch } from "react-redux";
import { updateBanner } from "../../store/banner.slice";

function TourDetail() {
  const [sendRequest, isLoading, data, error] = useAxios();
  const dispatch = useDispatch();
  const { tourId } = useParams();
  const { i18n } = useTranslation();

  const tour = data ? data.data.item : null;
  const tourName = tour ? tour.name : "Tour du lịch";

  useEffect(() => {
    if (tour) {
      dispatch(
        updateBanner({
          type: "tourDetail",
          bannerItem: { _id: tour._id, banner: tour.banner },
        })
      );
    }
  }, [tour]);

  useEffect(() => {
    sendRequest(tourApi.getSingleTour(tourId));
  }, [i18n.language, tourId]);

  usePageTitle(`${tourName} || Go Travel`);

  return (
    <>
      <div className={styles.tourDetail + " container-fluid"}>
        {!error && (
          <div>
            <h1 className="text-uppercase my-4 fs-4 fw-bold ">
              {tour && !isLoading && tour?.name}
              {isLoading && <Placeholder height={30} width={"60%"} />}
            </h1>

            <div className="row ">
              <div className="col-12 col-lg-8 mb-4 px-0 px-md-1">
                <TourCarousel tour={tour} isLoading={isLoading} />

                <div className="pt-5 ">
                  <TourInfo tour={tour} isLoading={isLoading} />
                </div>
              </div>

              <div className="col-12 col-lg-4 mb-4">
                <ContactTable tour={tour} isLoading={isLoading} />
              </div>
            </div>

            <div className="pb-5 pt-5">
              {tour && (
                <FacebookComment
                  width="100%"
                  href={`https://travelling-website-funix-v1.web.app/danh-sach-tour/${tourId}`}
                />
              )}
            </div>
          </div>
        )}
        {error && <ErrorPage code={error.httpCode} message={error.message} />}
      </div>
    </>
  );
}

export default TourDetail;
