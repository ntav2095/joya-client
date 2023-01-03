import { useTranslation } from "react-i18next";
import SliderPortion from "../../../components/SliderPortion";
import { GUIDES_MAP } from "../../../services/constants/productsMap";
import CardPlaceholder from "../../../components/placeholders/CardPlaceholder";
import ArticleCard from "../../../containers/ArticleCard";
import TourCard from "../../../components/TourCard";

function HomeRow({ title, to, rowData, type }) {
  const lang = useTranslation().i18n.language;

  // placeholder
  const placeholders = new Array(6).fill(1).map((_, index) => ({
    card: <CardPlaceholder type={type} />,
    id: index,
  }));

  // data
  const { status, data, error } = rowData;
  let products;
  if (type === "article") {
    products = data?.map((product) => ({
      card: (
        <ArticleCard
          title={product.title}
          thumb={product.thumb}
          to={`${to}/${
            GUIDES_MAP.find((item) => product.category.includes(item.category))
              .path
          }/${product._id}`}
          category={
            GUIDES_MAP.find((item) => product.category.includes(item.category))
              .label[lang]
          }
        />
      ),
      id: product._id,
    }));
  } else {
    products = data?.map((product) => ({
      card: <TourCard tour={{ ...product, to: `${to}/${product._id}` }} />,
      id: product._id,
    }));
  }

  const cards =
    status === "idle" || status === "pending" ? placeholders : products;

  // error
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
      cards={cards}
    />
  );
}

export default HomeRow;
