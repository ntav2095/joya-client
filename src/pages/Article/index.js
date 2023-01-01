// main
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useEffect, useRef } from "react";
import { format } from "date-fns";

// components
import ErrorPage from "../../containers/ErrorPage";
import Banner from "../../components/Banner";
import ArticlePlaceholder from "../../components/placeholders/ArticlePlaceholder";
import CardPlaceholder from "../../components/placeholders/CardPlaceholder";
import Container from "../../components/Container";
import ArticleCard from "../../containers/ArticleCard";

// other
import usePageTitle from "../../hooks/usePageTitle";
import { postsApi } from "../../services/apis";
import useAxios from "../../hooks/useAxios";
import { brokenImage } from "../../assets/images";
import QuillReader from "../../components/QuillReader";
import { GUIDES_MAP } from "../../services/constants/productsMap";

// css
import styles from "./Article.module.css";

function TravelHandbookDetail() {
  const { i18n } = useTranslation();
  const [sendRequest, isLoading, data, error] = useAxios();
  const { articleId } = useParams();
  const lang = useTranslation().i18n.language;

  useEffect(() => {
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
    sendRequest(postsApi.getSingleArticle(articleId));
  }, [i18n.language, articleId]);

  usePageTitle(`${data?.data.item.title} || Cẩm nang du lịch || Go Travel`);

  const article = data ? data.data.item : null;
  const relatedArtilces = data ? data.data.relatedItems : null;
  return (
    <>
      <Banner
        banner={{
          isLoading,
          error,
          image: article?.banner,
        }}
      />

      {!error && (
        <div className="container-lg mx-auto pt-5">
          <div className="row">
            <div className={styles.containner + " col-12 col-lg-12"}>
              {article && !isLoading && (
                <div className={styles.storyHeader + " pt-4"}>
                  <h1 className="mb-4 pb-1 text-dark fw-bold">
                    {article.title}
                  </h1>
                  <p className={styles.date}>
                    Posted on{" "}
                    <span>
                      {format(new Date(article.createdAt), "dd/MM/yyyy")}
                    </span>{" "}
                    by {article.author}
                  </p>
                </div>
              )}

              {article && !isLoading && <QuillReader delta={article.content} />}

              {isLoading && <ArticlePlaceholder />}

              <div className="mt-4 border-top pt-4 pb-5">
                <h5 className={styles.relatedStoriesTitle + " mb-3"}>
                  Bài viết liên quan
                </h5>
                <div className="row">
                  {relatedArtilces &&
                    !isLoading &&
                    relatedArtilces.map((item) => (
                      <div
                        key={item._id}
                        className="col-12 col-sm-4 col-lg-4 mb-4"
                      >
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
              </div>
            </div>
          </div>
        </div>
      )}

      {error && <ErrorPage code={error.httpCode} message={error.message} />}
    </>
  );
}

export default TravelHandbookDetail;
