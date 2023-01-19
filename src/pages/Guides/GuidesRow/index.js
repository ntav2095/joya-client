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
import { useSelector } from "react-redux";

// selectors
import {
  selectGuidesHandbooks,
  selectGuidesExperiences,
  selectGuidesNicePlaces,
  selectGuidesDiaries,
  selectGuidesStatus,
  selectGuidesError,
} from "../../../store/guides.slice";

function GuidesRow({ category }) {
  const location = useLocation();
  const lang = useTranslation().i18n.language;
  const { t } = useTranslation();

  const handbooks = useSelector(selectGuidesHandbooks);
  const experiences = useSelector(selectGuidesExperiences);
  const nicePlaces = useSelector(selectGuidesNicePlaces);
  const diaries = useSelector(selectGuidesDiaries);
  const status = useSelector(selectGuidesStatus);
  const error = useSelector(selectGuidesError);

  const guidesMap = [
    {
      category: "diem-den",
      title: t("guidesPage.title.nicePlaces"),
      path: "diem-den-hap-dan",
      articles: nicePlaces,
    },
    {
      category: "cam-nang",
      title: t("guidesPage.title.handbooks"),
      path: "cam-nang-du-lich",
      articles: handbooks,
    },
    {
      category: "trai-nghiem",
      title: t("guidesPage.title.experiences"),
      path: "trai-nghiem-kham-pha",
      articles: experiences,
    },
    {
      category: "nhat-ky",
      title: t("guidesPage.title.diaries"),
      path: "nhat-ky-hanh-trinh",
      articles: diaries,
    },
  ];

  const GUIDE_ITEM = guidesMap.find((item) => item.category === category);
  const title = GUIDE_ITEM.title;

  useEffect(() => {
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
    GUIDE_ITEM.articles.map((article) => ({
      card: (
        <ArticleCard
          title={article.title}
          thumb={article.thumb}
          to={`/guides/bai-viet/${article._id}`}
          category={GUIDE_ITEM.title}
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

  const cards =
    status === "idle" || status === "pending" ? placeholders : products;

  return (
    <SliderPortion
      title={title}
      to={!error && `/guides/${GUIDE_ITEM.path}`}
      error={error}
      cards={cards}
    />
  );
}

export default GuidesRow;
