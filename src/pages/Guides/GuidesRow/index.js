// main

// components
import SliderPortion from "../../../components/SliderPortion";
import CardPlaceholder from "../../../components/placeholders/CardPlaceholder";

// apis
import ArticleCard from "../../../containers/ArticleCard";
import { useSelector } from "react-redux";

// selectors
import {
  selectGuidesStatus,
  selectGuidesError,
  selectGuides,
} from "../../../store/guides.slice";

function GuidesRow({ category }) {
  const guides = useSelector(selectGuides);
  const status = useSelector(selectGuidesStatus);
  const error = useSelector(selectGuidesError);

  const title = category.name;
  // const title = GUIDE_ITEM.title;

  const placeholders = new Array(6).fill(1).map((_, index) => ({
    card: <CardPlaceholder key={index} type="article" />,
    id: index,
  }));

  const products = guides
    .filter((guide) => guide.category.slug === category.slug)
    .slice(0, 6)
    .map((article) => ({
      card: (
        <ArticleCard
          title={article.title}
          thumb={article.thumb}
          to={`/guides/bai-viet/${article.slug}`}
          category={category.name}
        />
      ),
      id: article._id,
    }));

  let errorMessage = "";
  if (error) {
    errorMessage = error.httpCode
      ? error.httpCode + " - " + error.message
      : error.message;
  }

  const cards =
    status === "idle" || status === "pending" ? placeholders : products;

  if (products.length === 0) return null;

  return (
    <SliderPortion
      title={title}
      to={`/guides/${category.slug}`}
      error={errorMessage}
      cards={cards}
    />
  );
}

export default GuidesRow;
