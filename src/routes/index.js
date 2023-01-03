import Home from "../pages/Home";
import TourList from "../pages/TourList";
import TourDetail from "../pages/TourDetail";
import About from "../pages/About";
import Visa from "../pages/Visa";
import VisaProducts from "../pages/VisaProducts";
import Guides from "../pages/Guides";
import GuidesCategory from "../pages/GuidesCategory";
import Article from "../pages/Article";
import Term from "../pages/Term";
import NotFound from "../pages/NotFound";

export default [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/du-lich-chau-au",
    element: <TourList cat_params={{ cat_not: "vi" }} />,
  },
  {
    path: "/du-lich-trong-nuoc",
    element: <TourList cat_params={{ cat: "vi" }} />,
  },
  {
    path: "/du-lich-chau-au/:tourId",
    element: <TourDetail />,
  },
  {
    path: "/du-lich-trong-nuoc/:tourId",
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
    path: "/guides/:categoryPath",
    element: <GuidesCategory />,
  },
  {
    path: "/guides/:categoryPath/:articleId",
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
