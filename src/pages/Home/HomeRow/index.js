import { useTranslation } from "react-i18next";
import SliderPortion from "../../../components/SliderPortion";
import CardPlaceholder from "../../../components/placeholders/CardPlaceholder";
import ArticleCard from "../../../containers/ArticleCard";
import TourCard from "../../../components/TourCard";
import { GUIDES_MAP } from "../../../services/constants/productsMap";

function HomeRow({ title, rowData, type, to }) {
  const lang = useTranslation().i18n.language;
  const { status, data, error } = rowData;

  // *************************** handle products ********************************************
  let products = []; // [ { card: <TourCard /> | <ArticleCard />, id: uid } ]
  if (status === "idle" || status === "pending") {
    products = new Array(6).fill(1).map((_, index) => ({
      card: <CardPlaceholder type={type} />,
      id: index,
    }));
  }

  if (status === "succeed") {
    if (type === "article") {
      products = data?.map((article) => ({
        card: (
          <ArticleCard
            title={article.title}
            thumb={article.thumb}
            to={`/guides/bai-viet/${article._id}`}
            category={
              GUIDES_MAP.find((item) =>
                article.category.includes(item.category)
              ).label[lang]
            }
          />
        ),
        id: article._id,
      }));
    }

    if (type === "tour") {
      products = data?.map((tour) => ({
        card: (
          <TourCard tour={{ ...tour, to: `/du-lich/${tour.url_endpoint}` }} />
        ),
        id: tour._id,
      }));
    }
  }

  // ******************************* handle error ****************************************
  let errorMessage = "";
  if (error) {
    errorMessage = error.httpCode
      ? error.httpCode + " - " + error.message
      : error.message;
  }

  return (
    <SliderPortion
      title={title}
      to={!error && to}
      error={errorMessage}
      cards={products}
    />
  );
}

export default HomeRow;
