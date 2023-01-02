import {
  Image,
  Failure,
  Pending,
  BannerContainer,
  React,
  Slider,
  useSelector,
  getPath,
  settings,
  createMsg,
  SliderItem,
  styles,
} from "./Banner.import";

import "./Banner.override.css";

// storedBanner: key, productType, type
// là banner lấy trong store
// type: slider | image
// key: key của state trong banner slice: homeSliders vnTours euTours guides experience destination diary handbook visa tourDetail articleDetail visaCountry
// productType: tour | article

// banner: {image, isLoading, error}
// banner nhập từ ngoài vào: cái bài chi tiết tour / bài viết
function Banner({ storedBanner, banner }) {
  let content;

  const banners = useSelector((state) => state.banner);

  // not store banner
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

  // store banner
  if (storedBanner) {
    const { type, productType, key } = storedBanner;
    const { status, error } = banners;
    console.log(type, productType, key);

    if (status === "pending") {
      content = <Pending />;
    }

    if (status === "failed") {
      content = <Failure msg={createMsg(error.httpCode, error.message)} />;
    }

    if (status !== "pending" && status !== "failed" && type === "image") {
      content = <Image src={banners[key].banner} />;
    }

    if (status !== "pending" && status !== "failed" && type === "slider") {
      const prods = banners[key];
      content = (
        <Slider {...settings}>
          {prods.map((item) => (
            <SliderItem
              key={item._id}
              to={`${getPath(productType, item)}/${item._id}`}
              image={item.banner}
              alt={item.name || item.title}
            />
          ))}
        </Slider>
      );
    }
  }

  return <BannerContainer>{content}</BannerContainer>;
}

export default React.memo(Banner);
