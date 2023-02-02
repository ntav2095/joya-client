// main
import { useRef } from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import SearchResults from "./SearchResults";

import styles from "./TourSearching.module.css";

function SearchBar() {
  const [isSearching, setIsSearching] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const lang = useTranslation().i18n.language;

  const inputRef = useRef();

  const placeholder =
    lang === "en"
      ? "Country, province, city, place"
      : "Quốc gia, tỉnh, thành phố, địa điểm du lịch";
  return (
    <div className={styles.searchBar}>
      <input
        placeholder={placeholder}
        ref={inputRef}
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onFocus={() => setIsSearching(true)}
      />

      {isSearching && (
        <div className={styles.resultsContainer}>
          <SearchResults
            onHide={() => {
              setIsSearching(false);
              setSearchTerm("");
            }}
            inputRef={inputRef}
            searchTerm={searchTerm}
          />
        </div>
      )}
    </div>
  );
}

export default SearchBar;
