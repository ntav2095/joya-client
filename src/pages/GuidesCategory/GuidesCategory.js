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
import { postsApi } from "../../services/apis";
import usePageTitle from "../../hooks/usePageTitle";
import useAxios from "../../hooks/useAxios";

function GuidesCategory({
  category,
  categoryPath,
  label,
  bannerKey,
  pageTitle,
}) {
  const [sendRequest, isLoading, data, error] = useAxios();
  const { i18n, t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

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

  usePageTitle(`Guides || Go Travel`);
  useEffect(() => {
    sendRequest(postsApi.get({ page: page, page_size: 12, cat: category }));
  }, [i18n.language, location.search, category]);

  const products =
    data &&
    !isLoading &&
    data.data.length > 0 &&
    data.data.map((article) => ({
      component: (
        <ArticleCard
          thumb={article.thumb}
          title={article.title}
          to={`/guides/${categoryPath}/${article._id}`}
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
            pageCount: data?.metadata.page_count,
            currentPage: Number(page),
            changePageHandler: changePageHandler,
          }}
          products={products}
          placeholder={<CardPlaceholder type="article" />}
          isLoading={isLoading}
        />
      )}

      {error && <ErrorPage code={error.httpCode} message={error.message} />}
    </>
  );
}

export default GuidesCategory;
