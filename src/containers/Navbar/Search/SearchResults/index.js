import { useTranslation } from "react-i18next";
import styles from "../Search.module.css";
import SearchItem from "./SearchItem";

const trans = {
  tours: {
    en: "Tours",
    vi: "Tours",
  },
  articles: {
    en: "Articles",
    vi: "Bài viết",
  },
  not_matches: {
    en: "Not matches anything",
    vi: "Không tìm thấy kết quả phù hợp",
  },
  search_for: {
    en: "Search for",
    vi: "Tìm kiếm",
  },
  search_for_articles: {
    en: "Search for articles",
    vi: "Tìm kiếm bài viết",
  },
  search_more: {
    en: "Search more",
    vi: "Tìm kiếm thêm",
  },
  is_searching: {
    en: "Is searching",
    vi: "Đang tìm kiếm",
  },
  results: {
    en: "results",
    vi: "kết quả",
  },
  of: {
    en: "of",
    vi: "của",
  },
};

function SearchResults({
  title,
  type,
  results,
  hasMore,
  isSearching,
  count,
  totalCount,
  searchNext,
}) {
  const lang = useTranslation().i18n.language;
  const stats = `${count} ${trans.of[lang]} ${totalCount} ${trans.results[lang]}`;

  return (
    <div className="tours border-bottom py-2">
      <h6>
        {title[lang]} {results && <em>({stats})</em>}
      </h6>
      {results && results.length > 0 && (
        <ul className={styles.itemsList}>
          {results.map((result) => (
            <li key={result._id}>
              <SearchItem type={type} searchItem={result} />
            </li>
          ))}
        </ul>
      )}

      {results && results.length === 0 && (
        <em className="m-0">{trans.not_matches[lang]}</em>
      )}

      {!results && !isSearching && (
        <em>
          {trans.search_for[lang]} {title[lang].toLowerCase()}
        </em>
      )}

      {isSearching && <em>{trans.is_searching[lang]}</em>}
      {results && hasMore && (
        <button className={styles.searchMoreBtn} onClick={searchNext}>
          {trans.search_more[lang]}
        </button>
      )}
    </div>
  );
}

export default SearchResults;
