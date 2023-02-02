// main
import { useRef } from "react";
import { useState } from "react";
import SearchResults from "./SearchResults";

import styles from "./TourSearching.module.css";

function SearchBar() {
  const [isSearching, setIsSearching] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const inputRef = useRef();

  return (
    <div className={styles.searchBar}>
      <input
        placeholder="Quốc gia, tỉnh, thành phố, địa điểm du lịch"
        ref={inputRef}
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onFocus={() => setIsSearching(true)}
      />

      {isSearching && (
        <div className={styles.resultsContainer}>
          <SearchResults
            onHide={() => setIsSearching(false)}
            inputRef={inputRef}
            searchTerm={searchTerm}
          />
        </div>
      )}
    </div>
  );
}

export default SearchBar;
