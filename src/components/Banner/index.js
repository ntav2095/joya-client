import {
  selectEuSliderTours,
  selectHomeSliderTours,
  selectToursStatus,
  selectToursError,
  selectVnSliderTours,
} from "../../store/tours.slice";
import {
  selectGuidesSliders,
  selectHandbookSliders,
  selectExperienceSliders,
  selectDiarySliders,
  selectNicePlaceSliders,
  selectGuidesStatus,
  selectGuidesError,
} from "../../store/guides.slice";
import {
  Image,
  Failure,
  Pending,
  BannerContainer,
  React,
  useLocation,
  Slider,
  useSelector,
  getPath,
  settings,
  createMsg,
  SliderItem,
  styles,
} from "./Banner.import";

import "./Banner.override.css";

// banner: {image, isLoading, error}
// banner nhập từ ngoài vào: cái bài chi tiết tour / bài viết
function Banner({ banner }) {
  // ************* DECLARATIONS ***********
  let content;

  const homeSliderTours = useSelector(selectHomeSliderTours);
  const euSliderTours = useSelector(selectEuSliderTours);
  const vnSliderTours = useSelector(selectVnSliderTours);
  const status = useSelector(selectToursStatus);
  const error = useSelector(selectToursError);
  const location = useLocation();

  const sliderGuides = useSelector(selectGuidesSliders);
  const sliderHandbooks = useSelector(selectHandbookSliders);
  const sliderExperiences = useSelector(selectExperienceSliders);
  const sliderDiaries = useSelector(selectDiarySliders);
  const sliderNicePlaces = useSelector(selectNicePlaceSliders);
  const guidesStatus = useSelector(selectGuidesStatus);
  const guidesError = useSelector(selectGuidesError);

  // ************* BANNER LÀ HÌNH TRUYỀN TỪ NGOÀI VÀO (KHÔNG PHẢI SLIDER) ***********
  if (banner) {
    const { isLoading, error, image } = banner;
    content = <Pending />;

    if (error) {
      content = <Failure msg={createMsg(error.httpCode, error.message)} />;
    }

    if (!isLoading && !error && image) {
      content = <Image src={image} />;
    }
  }

  if (content) return <BannerContainer>{content}</BannerContainer>;
  // ************* END ***********

  // ************* SLIDER ***********

  if (status === "pending" || status === "idle") {
    content = <Pending />;
  }

  if (status === "failed") {
    content = <Failure msg={createMsg(error.httpCode, error.message)} />;
  }

  if (status === "succeed") {
    let products = [];
    const pathname = location.pathname;

    // home
    if (pathname === "/") {
      products = homeSliderTours;
    }

    // tours
    if (pathname.toLowerCase().startsWith("/du-lich-trong-nuoc")) {
      products = vnSliderTours;
    }

    if (pathname.toLowerCase().startsWith("/du-lich-chau-au")) {
      products = euSliderTours;
    }

    // guides
    if (pathname.toLowerCase().startsWith("/guides")) {
      products = sliderGuides;
    }

    if (pathname.toLowerCase().startsWith("/guides/trai-nghiem-kham-pha")) {
      products = sliderExperiences;
    }

    if (pathname.toLowerCase().startsWith("/guides/diem-den-hap-dan")) {
      products = sliderNicePlaces;
    }

    if (pathname.toLowerCase().startsWith("/guides/cam-nang-du-lich")) {
      products = sliderHandbooks;
    }

    if (pathname.toLowerCase().startsWith("/guides/nhat-ky-hanh-trinh")) {
      products = sliderDiaries;
    }

    let basePath = "/du-lich";
    if (pathname.toLowerCase().startsWith("/guides")) {
      basePath = "/guides/bai-viet";
    }

    content = (
      <Slider {...settings}>
        {products.map((item) => (
          <SliderItem
            key={item._id}
            to={`${basePath}/${item.slug || item._id}`}
            image={item.banner}
            alt={item.name || item.title}
          />
        ))}
      </Slider>
    );
  }

  return <BannerContainer>{content}</BannerContainer>;
}

export default React.memo(Banner);
