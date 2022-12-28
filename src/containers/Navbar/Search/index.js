import { magnifyingGlass as searchSVG } from "../../../assets/svgs";
import { useEffect } from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useRef } from "react";
import useSearch from "./useSearch";
import styles from "./Search.module.css";
import SearchResults from "./SearchResults";
import { tourApi, postsApi } from "../../../services/apis";

function Search() {
  const [isFocus, setIsFocus] = useState(false);
  const searchRef = useRef();
  const [searchTerm, setSearchTerm] = useState("");
  const location = useLocation();

  const [
    articles,
    isSearchingArticles,
    searchNextArticles,
    countArticles,
    totalArticles,
    hasMoreArticles,
  ] = useSearch({ searchApi: postsApi.get, searchTerm });

  const [
    tours,
    isSearchingTours,
    searchNextTours,
    countTours,
    totalTours,
    hasMoreTours,
  ] = useSearch({ searchApi: tourApi.get, searchTerm });

  // handle click outside
  useEffect(() => {
    if (isFocus) {
      const handler = (e) => {
        if (searchRef.current && !searchRef.current.contains(e.target)) {
          setIsFocus(false);
          setSearchTerm("");

          window.removeEventListener("mousedown", handler);
        }
      };

      window.addEventListener("mousedown", handler);

      return () => window.removeEventListener("mousedown", handler);
    }
  }, [isFocus]);

  useEffect(() => {
    setSearchTerm("");
    setIsFocus(false);
  }, [location]);

  return (
    <div className={styles.searchbar} ref={searchRef}>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onFocus={() => setIsFocus(true)}
      />

      <div className={styles.spinner}>{searchSVG}</div>

      {isFocus && (
        <div className={styles.results}>
          <SearchResults
            title={{ en: "Tours", vi: "Tours" }}
            type="tour"
            results={tours}
            hasMore={hasMoreTours}
            isSearching={isSearchingTours}
            count={countTours}
            totalCount={totalTours}
            searchNext={searchNextTours}
          />

          {/* ***************************** ARTICLE *******************************  */}

          <SearchResults
            title={{ en: "Guides", vi: "Bài viết" }}
            type="guides"
            results={articles}
            hasMore={hasMoreArticles}
            isSearching={isSearchingArticles}
            count={countArticles}
            totalCount={totalArticles}
            searchNext={searchNextArticles}
          />
        </div>
      )}
    </div>
  );
}

export default Search;
