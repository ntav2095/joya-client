// main
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

// components
import ArticleCard from "../../containers/ArticleCard";
import CardPlaceholder from "../../components/placeholders/CardPlaceholder";
import Banner from "../../components/Banner";
import ProductsListLayout from "../../layout/ProductsListLayout";
import ErrorPage from "../../containers/ErrorPage";
import NotFound from "../../pages/NotFound";

// other
import usePageTitle from "../../hooks/usePageTitle";
import useScroll from "../../hooks/useScroll";
import {
  selectGuides,
  selectGuidesCategory,
  selectGuidesError,
  selectGuidesStatus,
} from "../../store/guides.slice";

const PAGE_SIZE = 12;

function GuidesCategory() {
  const navigate = useNavigate();
  let { category, page } = useParams();

  const status = useSelector(selectGuidesStatus);
  const error = useSelector(selectGuidesError);
  const guidesCategory = useSelector(selectGuidesCategory);
  const guides = useSelector(selectGuides).filter(
    (guide) => guide.category.slug === category.trim()
  );

  const categoryItem = guidesCategory.find(
    (item) => item.slug === category.trim()
  );

  if (!page || isNaN(Number(page))) {
    page = 1;
  }

  const changePageHandler = (num) => {
    navigate(`/guides/${category.trim()}/${num}`);
  };

  const products = guides.map((article) => ({
    component: (
      <ArticleCard
        thumb={article.thumb}
        title={article.title}
        to={`/guides/bai-viet/${article.slug}`}
        category={categoryItem?.name}
      />
    ),
    id: article._id,
  }));

  const filteredProducts = products.slice(
    (page - 1) * PAGE_SIZE,
    (page - 1) * PAGE_SIZE + PAGE_SIZE
  );

  usePageTitle(categoryItem?.name);
  useScroll({
    reScroll: { top: 500 },
    dependencies: [page],
  });

  // không có category phù hợp (not found)
  const notFound = status === "succeed" && !categoryItem;
  return (
    <>
      {notFound && <NotFound />}

      {!notFound && (
        <Banner
          carousel={{
            items: guides.slice(0, 3),
            isLoading: status === "idle" || status === "pending",
            error: error,
            type: "guides",
          }}
        />
      )}

      {!error && !notFound && (
        <ProductsListLayout
          title={categoryItem?.name}
          pagination={{
            pageCount: Math.ceil(guides.length / PAGE_SIZE),
            currentPage: Number(page),
            changePageHandler: changePageHandler,
          }}
          products={filteredProducts}
          placeholder={<CardPlaceholder type="article" />}
          isLoading={status === "idle" || status === "pending"}
          status={status}
        />
      )}

      {error && <ErrorPage code={error.httpCode} message={error.message} />}
    </>
  );
}

export default GuidesCategory;
