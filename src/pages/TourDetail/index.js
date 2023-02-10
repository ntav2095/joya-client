// main
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

// components
import ContactTable from "./ContactTable";
import TourInfo from "./TourInfo";
import TourCarousel from "./TourCarousel";
import ErrorPage from "../../containers/ErrorPage";
import ErrorBoundary from "../../components/ErrorBoundary";
import Placeholder from "../../components/placeholders/Placeholder";
import Banner from "../../components/Banner";
import FacebookComment from "../../containers/facebookComment";

// apis
import useAxios from "../../hooks/useAxios";
import { fetchSingleTour } from "../../services/apis";

// other
import usePageTitle from "../../hooks/usePageTitle";
import useLazyImgs from "../../hooks/uselazyLoading";
import {
  selectTours,
  selectToursError,
  selectToursStatus,
} from "../../store/tours.slice";

//  css
import styles from "./TourDetail.module.css";

function TourDetail() {
  const [sendRequest, isLoading, data, error] = useAxios();
  const { slug } = useParams();
  const { i18n, t } = useTranslation();
  const tours = useSelector(selectTours);
  const fetchToursError = useSelector(selectToursError);
  const tourId = tours.find((item) => item.slug === slug)?._id;
  const status = useSelector(selectToursStatus);

  const tour = data?.data || null;
  const tourName = tour?.name || "Tour du lịch";

  useEffect(() => {
    if (tourId) {
      sendRequest(fetchSingleTour(tourId));
    }
  }, [i18n.language, tourId]);

  useLazyImgs([data]);
  usePageTitle(`${tourName} | Joya Travel`);

  useEffect(() => {
    window.scroll({
      top: 0,
      left: 0,
    });
  }, [slug]);

  if (fetchToursError) {
    return (
      <ErrorPage
        code={fetchToursError.httpCode}
        message={fetchToursError.message}
      />
    );
  }

  if (!tourId && status === "succeed") {
    return (
      <ErrorPage code={404} message={t("tourDetailPage.errors.notFound")} />
    );
  }

  if (error) {
    return <ErrorPage code={error.httpCode} message={error.message} />;
  }

  // handle slider data
  // handle data
  let slider = [];
  if (tour) {
    const images = tour.itinerary.reduce(
      (acc, cur) => [...acc, ...cur.images],
      []
    );
    if (images.every((item) => !item.isSlider)) {
      slider = images;
    } else {
      slider = images.filter((item) => item.isSlider);
    }
  }

  const loading = isLoading || status === "idle" || status === "pending";

  return (
    <>
      <ErrorBoundary>
        <Banner
          banner={{
            isLoading: loading,
            error,
            image: tour?.banner,
          }}
        />
      </ErrorBoundary>

      <div className={styles.tourDetail + " container-lg"}>
        {!error && (
          <div>
            <h1 className="text-uppercase my-4 fs-4 fw-bold ">
              {tour && !loading && tour?.name + " [" + tour?.code + "]"}
              {loading && <Placeholder height={30} width={"60%"} />}
            </h1>

            <div className="row ">
              <div className="col-12 col-lg-8 mb-4 px-0 px-md-1">
                <ErrorBoundary>
                  <TourCarousel slider={slider} isLoading={loading} />
                </ErrorBoundary>

                <div className="pt-5 ">
                  <ErrorBoundary>
                    <TourInfo tour={tour} isLoading={loading} />
                  </ErrorBoundary>
                </div>
              </div>

              <div className="col-12 col-lg-4 mb-4">
                <ErrorBoundary>
                  <ContactTable tour={tour} isLoading={loading} />
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
      </div>
    </>
  );
}

export default TourDetail;
