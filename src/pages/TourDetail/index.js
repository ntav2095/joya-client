import { useParams } from "react-router-dom";
import { useEffect } from "react";

// components
import ContactTable from "./ContactTable";
import TourInfo from "./TourInfo";
import TourCarousel from "./TourCarousel";
import ErrorPage from "../../containers/ErrorPage";
import ErrorBoundary from "../../components/ErrorBoundary";

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
import Banner from "../../components/Banner";

function TourDetail() {
  const [sendRequest, isLoading, data, error] = useAxios();
  const { tourId } = useParams();
  const { i18n } = useTranslation();

  const tour = data ? data.data.item : null;
  const tourName = tour ? tour.name : "Tour du lịch";

  useEffect(() => {
    sendRequest(tourApi.getSingleTour(tourId));
  }, [i18n.language, tourId]);

  usePageTitle(`${tourName} || Go Travel`);

  return (
    <>
      <ErrorBoundary>
        <Banner
          banner={{
            isLoading,
            error,
            image: tour?.banner,
          }}
        />
      </ErrorBoundary>

      <div className={styles.tourDetail + " container-lg"}>
        {!error && (
          <div>
            <h1 className="text-uppercase my-4 fs-4 fw-bold ">
              {tour && !isLoading && tour?.name}
              {isLoading && <Placeholder height={30} width={"60%"} />}
            </h1>

            <div className="row ">
              <div className="col-12 col-lg-8 mb-4 px-0 px-md-1">
                <ErrorBoundary>
                  <TourCarousel tour={tour} isLoading={isLoading} />
                </ErrorBoundary>

                <div className="pt-5 ">
                  <ErrorBoundary>
                    <TourInfo tour={tour} isLoading={isLoading} />
                  </ErrorBoundary>
                </div>
              </div>

              <div className="col-12 col-lg-4 mb-4">
                <ErrorBoundary>
                  <ContactTable tour={tour} isLoading={isLoading} />
                </ErrorBoundary>
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
