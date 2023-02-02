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
    path: "/du-lich-chau-au",
    element: <TourList />,
  },
  {
    path: "/du-lich-trong-nuoc",
    element: <TourList />,
  },
  {
    path: "/du-lich/tim-kiem",
    element: <TourSearching />,
  },
  {
    path: "/du-lich/:urlEndpoint",
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
