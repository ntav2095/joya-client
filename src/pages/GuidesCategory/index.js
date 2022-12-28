// main
import { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";

// components
import usePageTitle from "../../hooks/usePageTitle";
import ArticleCard from "../../containers/ArticleCard";
import CardPlaceholder from "../../components/placeholders/CardPlaceholder";

// apis
import useAxios from "../../hooks/useAxios";

// css
import "./article.css";
import { useTranslation } from "react-i18next";
import { postsApi } from "../../services/apis";
import CustomPagination from "../../containers/customerPagination";

function ArticleCategory() {
  const [sendRequest, isLoading, data, error] = useAxios();
  const location = useLocation();
  const { id } = useParams();
  let page = new URLSearchParams(location.search).get("page");
  if (!page || isNaN(Number(page))) {
    page = 1;
  }
  const { i18n } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    sendRequest(postsApi.get({ page: page, page_size: 12, cat: id }));
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [i18n.language, location.search, id]);

  const changePageHandler = (num) => {
    navigate(`/cam-nang-du-lich/danh-muc/nhat-ky?page=${num}&`);
  };

  usePageTitle(`Danh sách bài viết || Go Travel`);

  return (
    <>
      <div className="containerArticle">
        <h1 className="fs-4 text-uppercase pb-2 fw-bold">
          {id === "diem-den" && "Điểm Đến hấp dẫn"}
          {id === "nhat-ky" && "Nhật ký hành trình"}
          {id === "cam-nang" && "Cẩm nang du lịch"}
          {id === "trai-nghiem" && "trãi nghiệm - khám phá"}
        </h1>
        <div className="row">
          {data &&
            !isLoading &&
            data.data.length > 0 &&
            data.data.map((article) => (
              <div
                key={article._id}
                className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4"
              >
                <ArticleCard article={article} />
              </div>
            ))}

          {isLoading &&
            new Array(18).fill(1).map((item, index) => (
              <div
                key={index}
                className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4"
              >
                <CardPlaceholder key={index} />
              </div>
            ))}
        </div>

        {data && (
          <div className="container__Slider">
            <CustomPagination
              total={data?.metadata.page_count}
              pagenumber={Number(page)}
              callback={changePageHandler}
            />
          </div>
        )}
      </div>
    </>
  );
}

export default ArticleCategory;
