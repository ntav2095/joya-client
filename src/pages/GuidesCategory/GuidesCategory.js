// main
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// components
import ArticleCard from "../../containers/ArticleCard";
import CardPlaceholder from "../../components/placeholders/CardPlaceholder";
import Banner from "../../components/Banner";
import ProductsListLayout from "../../layout/ProductsListLayout";
import ErrorPage from "../../containers/ErrorPage";

// other
import usePageTitle from "../../hooks/usePageTitle";
import { useSelector } from "react-redux";
import {
  selectGuidesError,
  selectGuidesStatus,
} from "../../store/guides.slice";

function GuidesCategory({
  categoryPath,
  label,
  bannerKey,
  pageTitle,
  articles,
}) {
  const { i18n, t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const status = useSelector(selectGuidesStatus);
  const error = useSelector(selectGuidesError);

  let page = new URLSearchParams(location.search).get("page");
  if (!page || isNaN(Number(page))) {
    page = 1;
  }

  const changePageHandler = (num) => {
    navigate(`/guides/${categoryPath}/?page=${num}`);
  };

  const getCategoryLabel = (cat) => {
    if (cat.includes("diem-den")) return t("guidesPage.title.nicePlaces");
    if (cat.includes("trai-nghiem")) return t("guidesPage.title.experiences");
    if (cat.includes("cam-nang")) return t("guidesPage.title.handbooks");
    if (cat.includes("nhat-ky")) return t("guidesPage.title.diaries");
    return "";
  };

  const products =
    articles.length > 0 &&
    articles.map((article) => ({
      component: (
        <ArticleCard
          thumb={article.thumb}
          title={article.title}
          to={`/guides/bai-viet/${article._id}`}
          category={getCategoryLabel(article.category)}
        />
      ),
      id: article._id,
    }));

  usePageTitle(pageTitle);
  return (
    <>
      <Banner
        storedBanner={{
          type: "slider",
          key: bannerKey,
          productType: "article",
        }}
      />

      {!error && (
        <ProductsListLayout
          title={label}
          pagination={{
            pageCount: articles.length,
            currentPage: Number(page),
            changePageHandler: changePageHandler,
          }}
          products={products}
          placeholder={<CardPlaceholder type="article" />}
          isLoading={status === "idle" || status === "pending"}
        />
      )}

      {error && <ErrorPage code={error.httpCode} message={error.message} />}
    </>
  );
}

export default GuidesCategory;
