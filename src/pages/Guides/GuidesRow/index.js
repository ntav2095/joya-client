// main
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

// components
import SliderPortion from "../../../components/SliderPortion";
import CardPlaceholder from "../../../components/placeholders/CardPlaceholder";

// apis
import useAxios from "../../../hooks/useAxios";
import { postsApi } from "../../../services/apis";
import ArticleCard from "../../../containers/ArticleCard";

// other
import { GUIDES_MAP } from "../../../services/constants/productsMap";

function GuidesRow({ category }) {
  const [sendRequest, isLoading, data, error] = useAxios();
  const location = useLocation();
  const lang = useTranslation().i18n.language;

  const GUIDE_ITEM = GUIDES_MAP.find((item) => item.category === category);
  const title = GUIDE_ITEM.label[lang];

  useEffect(() => {
    sendRequest(postsApi.get({ page_size: 6, cat: category }));
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [lang, location.search]);

  const placeholders = new Array(6).fill(1).map((_, index) => ({
    card: <CardPlaceholder key={index} type="article" />,
    id: index,
  }));

  const products =
    data?.data.map((article) => ({
      card: (
        <ArticleCard
          title={article.title}
          thumb={article.thumb}
          to={`/guides/${GUIDE_ITEM.path}/${article._id}`}
          category={GUIDE_ITEM.label[lang]}
        />
      ),
      id: article._id,
    })) || null;

  let errorMessage = "";
  if (error) {
    errorMessage = error.httpCode
      ? error.httpCode + " - " + error.message
      : error.message;
  }

  const cards = isLoading ? placeholders : products;

  return (
    <SliderPortion
      title={title}
      to={!error && `/guides/${GUIDE_ITEM.path}`}
      error={errorMessage}
      cards={cards}
    />
  );
}

export default GuidesRow;
