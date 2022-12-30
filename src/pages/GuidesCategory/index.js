// main
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";

// components
import ArticleCard from "../../containers/ArticleCard";
import CardPlaceholder from "../../components/placeholders/CardPlaceholder";
import Banner from "../../components/Banner";
import NotFound from "../NotFound";
import ProductsListLayout from "../../layout/ProductsListLayout";
import ErrorPage from "../../containers/ErrorPage";

// other
import { postsApi } from "../../services/apis";
import usePageTitle from "../../hooks/usePageTitle";
import useAxios from "../../hooks/useAxios";
import { GUIDES_MAP } from "../../services/constants/productsMap";

function GuidesCategory() {
  const [sendRequest, isLoading, data, error] = useAxios();
  const { i18n } = useTranslation();
  const lang = i18n.language;
  const navigate = useNavigate();
  const location = useLocation();
  const { typeOfGuides } = useParams();

  const guideItem = GUIDES_MAP.find((item) => item.path === typeOfGuides);
  const title = guideItem.label[lang];
  const cat = guideItem.category;

  let page = new URLSearchParams(location.search).get("page");
  if (!page || isNaN(Number(page))) {
    page = 1;
  }

  useEffect(() => {
    sendRequest(postsApi.get({ page: page, page_size: 12, cat: cat }));
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [i18n.language, location.search, typeOfGuides]);

  const changePageHandler = (num) => {
    navigate(`/guides/${typeOfGuides}/?page=${num}`);
  };

  usePageTitle(`Danh sách bài viết || Go Travel`);

  const BANNER_MAPS = new Map([
    ["diem-den-hap-dan", "destination"],
    ["nhat-ky-hanh-trinh", "diary"],
    ["cam-nang-du-lich", "handbook"],
    ["trai-nghiem-kham-pha", "experience"],
  ]);

  if (!GUIDES_MAP.map((item) => item.path).includes(typeOfGuides))
    return <NotFound />;

  const products =
    data &&
    !isLoading &&
    data.data.length > 0 &&
    data.data.map((article) => ({
      component: (
        <ArticleCard
          thumb={article.thumb}
          title={article.title}
          to={`/guides/${typeOfGuides}/${article._id}`}
          category={
            GUIDES_MAP.find((item) => article.category.includes(item.category))
              .label[lang]
          }
        />
      ),
      id: article._id,
    }));

  console.log(error);

  return (
    <>
      <Banner
        storedBanner={{
          type: "slider",
          key: BANNER_MAPS.get(typeOfGuides),
          productType: "article",
        }}
      />

      {!error && (
        <ProductsListLayout
          title={title}
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
