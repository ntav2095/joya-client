// main
import { Link, useParams } from "react-router-dom";
import { format } from "date-fns";
// components
import ErrorPage from "../../containers/ErrorPage";
// hooks
import usePageTitle from "../../hooks/usePageTitle";

// css
import styles from "./TravelHandbookDetail.module.css";

// mock
import { useEffect, useRef } from "react";
import { postsApi } from "../../services/apis";
import useAxios from "../../hooks/useAxios";
import quillGetHTML from "../../services/helpers/quillGetHTML";
import ArticlePlaceholder from "../../components/placeholders/ArticlePlaceholder";
import CardPlaceholder from "../../components/placeholders/CardPlaceholder";
import { useTranslation } from "react-i18next";
import { brokenImage } from "../../assets/images";
import { useDispatch } from "react-redux";
import { updateBanner } from "../../store/banner.slice";

function TravelHandbookDetail() {
  const { i18n } = useTranslation();
  const dispatch = useDispatch();
  const [sendRequest, isLoading, data, error] = useAxios();
  const quill = useRef();
  const { articleId } = useParams();
  useEffect(() => {
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
    sendRequest(postsApi.getSingleArticle(articleId));
  }, [i18n.language, articleId]);

  useEffect(() => {
    if (data) {
      dispatch(
        updateBanner({
          type: "articleDetail",
          bannerItem: {
            _id: data.data.item._id,
            banner: data.data.item.banner,
          },
        })
      );
    }
  }, [data]);

  useEffect(() => {
    if (quill.current) {
      if (data && !isLoading) {
        quill.current.innerHTML = quillGetHTML(data.data.item.content);
      } else {
        quill.current.innerHTML = "";
      }
    }
  }, [data, isLoading, quill.current]);

  usePageTitle(`${data?.data.item.title} || Cẩm nang du lịch || Go Travel`);

  const article = data ? data.data.item : null;
  const relatedArtilces = data ? data.data.relatedItems : null;
  return (
    <>
      {!error && (
        <div className="row">
          <div className={styles.containner + " col-12 col-lg-12"}>
            {article && !isLoading && (
              <div className={styles.storyHeader + " pt-4"}>
                <h1 className="mb-4 pb-1">{article.title}</h1>
                <p className={styles.date}>
                  Posted on{" "}
                  <span>
                    {format(new Date(article.createdAt), "dd/MM/yyyy")}
                  </span>{" "}
                  by <Link to="/admin">{article.author}</Link>
                </p>
              </div>
            )}

            <div className={styles.storyContent}>
              <div className={styles.quillContent} ref={quill}></div>
            </div>

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
                      <div className={styles.relatedArticle}>
                        <Link to={`/cam-nang-du-lich/${item._id}`}>
                          <div className={styles.image}>
                            <img
                              src={item.thumb}
                              alt={item.title}
                              onError={(e) => (e.target.src = brokenImage)}
                            />
                          </div>

                          <div className={styles.textBox}>
                            <h6>{item.title}</h6>
                            <p>{item.lead.slice(0, 60)}...</p>
                          </div>
                        </Link>
                      </div>
                    </div>
                  ))}

                {isLoading &&
                  new Array(3).fill(1).map((item, index) => (
                    <li key={index} className="col-12 col-sm-6 col-lg-4">
                      <CardPlaceholder />
                    </li>
                  ))}
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
