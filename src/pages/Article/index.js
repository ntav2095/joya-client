// main
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { format } from "date-fns";

// components
import ErrorPage from "../../containers/ErrorPage";

import ArticleContentPlaceholder from "./ArticleContentPlaceholder";

// other
import usePageTitle from "../../hooks/usePageTitle";
import { fetchSingleArtile } from "../../services/apis";
import useAxios from "../../hooks/useAxios";
import QuillReader from "../../components/QuillReader";

// css
import styles from "./Article.module.css";
import { useSelector } from "react-redux";
import {
  selectGuides,
  selectGuidesError,
  selectGuidesStatus,
} from "../../store/guides.slice";
import useScroll from "../../hooks/useScroll";

function Article() {
  const [sendRequest, isLoading, data, error] = useAxios();
  const { i18n, t } = useTranslation();
  const lang = i18n.language;
  const { slug } = useParams();

  useScroll();

  if (!data) {
    window.scroll({
      top: 0,
      left: 0,
      behavior: "auto",
    });
  }
  const guides = useSelector(selectGuides);
  const status = useSelector(selectGuidesStatus);
  const fetchGuidesError = useSelector(selectGuidesError);
  const foundArticle = guides.find((item) => item.slug === slug);

  const articleId = foundArticle?._id;

  let article = data ? data.data : null;

  let categoryLabel = "";
  if (article) {
    if (article.category.includes("cam-nang")) {
      categoryLabel = t("general.handbooks");
    }
    if (article.category.includes("diem-den")) {
      categoryLabel = t("general.nicePlaces");
    }
    if (article.category.includes("nhat-ky")) {
      categoryLabel = t("general.diaries");
    }
    if (article.category.includes("trai-nghiem")) {
      categoryLabel = t("general.experiences");
    }
  }

  useEffect(() => {
    if (articleId) {
      sendRequest(fetchSingleArtile(articleId));
    }
  }, [i18n.language, articleId]);

  let title = data?.data.title || "";
  usePageTitle(`${title + " || "}Joya Travel`);

  const loading = isLoading || status === "idle" || status === "pending";

  if (fetchGuidesError) {
    return (
      <ErrorPage
        code={fetchGuidesError.httpCode}
        message={fetchGuidesError.message}
      />
    );
  }

  if (!foundArticle && status === "succeed") {
    const errorMessage =
      lang === "en" ? "Artilce Not Found" : "Không tìm thấy bài viết";
    return <ErrorPage code="404" message={errorMessage} />;
  }

  if (error) {
    return <ErrorPage code={error.httpCode} message={error.message} />;
  }

  return (
    <div className="container-md mx-auto py-5">
      <div className="row">
        <div className="col-12 col-lg-10 mx-auto">
          {/* ==================== title ========================  */}
          <h1 className="mb-4 pb-1 text-dark fw-bold text-center">
            {article && !loading && article.title}
            {loading && <span className="placeholder col-8"></span>}
          </h1>

          {/* ==================== breadcrumb ========================  */}
          <h6 className="text-dark">
            {article && !loading && (
              <>
                <Link className={styles.breadCrumb + " text-dark"} to="/guides">
                  Guides
                </Link>{" "}
                / {categoryLabel}
              </>
            )}

            {loading && <span className="placeholder col-4" />}
          </h6>

          {/* ==================== banner ========================  */}
          <div className={styles.banner}>
            <div className={styles.inner}>
              {article && !loading && (
                <img src={article.banner} alt={article.title} />
              )}
              {loading && <div className="bg-secondary h-100"></div>}
            </div>
          </div>

          {/* ==================== author ========================  */}
          <div className={styles.author}>
            <div
              className={styles.nameLetter + " " + (loading && "bg-secondary")}
            >
              {article && article.author.slice(0, 1)}
            </div>
            <div className={styles.info}>
              <p className={styles.name}>
                {article && !loading && article.author}
                {loading && <span className="placeholder col-4 " />}
              </p>
              <p className={styles.time}>
                {article &&
                  !loading &&
                  format(
                    new Date(article.createdAt || article.updatedAt),
                    "dd/MM/yyyy"
                  )}
                {loading && <span className="placeholder col-2" />}
              </p>
            </div>
          </div>
        </div>

        {/* ==================== content ========================  */}
        <div className="col-12 col-lg-7 mx-auto">
          <div className={styles.content}>
            {article && !loading && <QuillReader delta={article.content} />}
            {loading && <ArticleContentPlaceholder />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Article;
