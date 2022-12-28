import {
  SlickArrowLeft,
  SlickArrowRight,
} from "../../../components/slickArrows";

export const sliderSettings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  initialSlide: 0,
  nextArrow: <SlickArrowRight slidesToScroll={1} slidesToShow={4} />,
  prevArrow: <SlickArrowLeft />,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 2,
        infinite: false,
        dots: false,
        nextArrow: <SlickArrowRight slidesToScroll={2} slidesToShow={3} />,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: false,
        dots: false,
        nextArrow: <SlickArrowRight slidesToScroll={3} slidesToShow={3} />,
      },
    },
    {
      breakpoint: 576,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 0,
        nextArrow: <SlickArrowRight slidesToScroll={2} slidesToShow={2} />,
      },
    },
    {
      breakpoint: 400,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 0,
        nextArrow: <SlickArrowRight slidesToScroll={1} slidesToShow={1} />,
      },
    },
  ],
};
