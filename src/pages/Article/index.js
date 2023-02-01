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
import { selectGuides } from "../../store/guides.slice";

function Article() {
  const [sendRequest, isLoading, data, error] = useAxios();
  const { i18n, t } = useTranslation();
  const { slug } = useParams();

  const guides = useSelector(selectGuides);
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

  usePageTitle(`${data?.data.title} || Joya Travel`);

  return (
    <>
      {!foundArticle && <h1>404 ne</h1>}
      {!error && foundArticle && (
        <div className="container-md mx-auto py-5">
          <div className="row">
            <div className="col-12 col-lg-10 mx-auto">
              {/* ==================== title ========================  */}
              <h1 className="mb-4 pb-1 text-dark fw-bold text-center">
                {article && !isLoading && article.title}
                {isLoading && <span className="placeholder col-8"></span>}
              </h1>

              {/* ==================== breadcrumb ========================  */}
              <h6 className="text-dark">
                {article && !isLoading && (
                  <>
                    <Link
                      className={styles.breadCrumb + " text-dark"}
                      to="/guides"
                    >
                      Guides
                    </Link>{" "}
                    / {categoryLabel}
                  </>
                )}

                {isLoading && <span className="placeholder col-4" />}
              </h6>

              {/* ==================== banner ========================  */}
              <div className={styles.banner}>
                <div className={styles.inner}>
                  {article && !isLoading && (
                    <img src={article.banner} alt={article.title} />
                  )}
                  {isLoading && <div className="bg-secondary h-100"></div>}
                </div>
              </div>

              {/* ==================== author ========================  */}
              <div className={styles.author}>
                <div
                  className={
                    styles.nameLetter + " " + (isLoading && "bg-secondary")
                  }
                >
                  {article && article.author.slice(0, 1)}
                </div>
                <div className={styles.info}>
                  <p className={styles.name}>
                    {article && !isLoading && article.author}
                    {isLoading && <span className="placeholder col-4 " />}
                  </p>
                  <p className={styles.time}>
                    {article &&
                      !isLoading &&
                      format(
                        new Date(article.createdAt || article.updatedAt),
                        "dd/MM/yyyy"
                      )}
                    {isLoading && <span className="placeholder col-2" />}
                  </p>
                </div>
              </div>
            </div>

            {/* ==================== content ========================  */}
            <div className="col-12 col-lg-7 mx-auto">
              <div className={styles.content}>
                {article && !isLoading && (
                  <QuillReader delta={article.content} />
                )}
                {isLoading && <ArticleContentPlaceholder />}
              </div>
            </div>
          </div>

          {/* ==================== related artilces ========================  */}

          {/* <div className="mt-4 border-top pt-4 pb-5">
            <h5 className={styles.relatedStoriesTitle + " mb-3"}>
              Bài viết liên quan
            </h5>
            <div className="row">
              {relatedArtilces &&
                !isLoading &&
                relatedArtilces.map((item) => (
                  <div key={item._id} className="col-12 col-sm-4 col-lg-4 mb-4">
                    <ArticleCard
                      thumb={item.thumb}
                      title={item.title}
                      to={`/guides/${
                        GUIDES_MAP.find((g) =>
                          item.category.includes(g.category)
                        ).path
                      }/${item._id}`}
                      category={
                        GUIDES_MAP.find((g) =>
                          item.category.includes(g.category)
                        ).label[lang]
                      }
                    />
                  </div>
                ))}

              {isLoading &&
                new Array(3).fill(1).map((_, index) => (
                  <li key={index} className="col-12 col-sm-6 col-lg-4">
                    <CardPlaceholder type="article" />
                  </li>
                ))}
            </div>
          </div> */}
        </div>
      )}

      {error && foundArticle && (
        <ErrorPage code={error.httpCode} message={error.message} />
      )}
    </>
  );
}

export default Article;
