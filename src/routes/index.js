import Home from "../pages/Home";

// tour
import TourList from "../pages/TourList";
import TourDetail from "../pages/TourDetail";
import TourSearching from "../pages/TourSearching";

// about
import About from "../pages/About";

// visa
import Visa from "../pages/Visa";
import VisaProducts from "../pages/VisaProducts";

// guides
import Guides from "../pages/Guides";
import GuidesCategory from "../pages/GuidesCategory";
import Article from "../pages/Article";

// term
import Term from "../pages/Term";

// not found
import NotFound from "../pages/NotFound";

export default [
  {
    path: "/",
    element: <Home />,
  },
  {
    paths: ["/du-lich-chau-au", "/du-lich-chau-au/:page"],
    element: <TourList />,
  },
  {
    paths: ["/du-lich-trong-nuoc", "/du-lich-trong-nuoc/:page"],
    element: <TourList />,
  },
  {
    paths: [
      "/du-lich/tim-kiem",
      "/du-lich/tim-kiem/:placeOrPage",
      "/du-lich/tim-kiem/:place/:page",
    ],
    element: <TourSearching />,
  },
  {
    path: "/du-lich/:slug",
    element: <TourDetail />,
  },
  {
    path: "/dich-vu-visa",
    element: <Visa />,
  },
  {
    path: "/dich-vu-visa/:visaCountry",
    element: <VisaProducts />,
  },
  {
    path: "/guides",
    element: <Guides />,
  },
  {
    paths: [
      "/guides/cam-nang-du-lich",
      "/guides/trai-nghiem-kham-pha",
      "/guides/nhat-ky-hanh-trinh",
      "/guides/diem-den-hap-dan",
      "/guides/cam-nang-du-lich/:page",
      "/guides/trai-nghiem-kham-pha/:page",
      "/guides/nhat-ky-hanh-trinh/:page",
      "/guides/diem-den-hap-dan/:page",
    ],
    element: <GuidesCategory />,
  },
  {
    path: "/guides/bai-viet/:slug",
    element: <Article />,
  },
  {
    path: "/dieu-khoan/:typeOfTerm",
    element: <Term />,
  },
  {
    path: "/gioi-thieu",
    element: <About />,
  },
  {
    path: "/*",
    element: <NotFound />,
  },
];
