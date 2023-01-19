import { magnifyingGlass as searchSVG } from "../../../assets/svgs";
import { useEffect } from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useRef } from "react";
import SearchResults from "./SearchResults";
import styles from "./Search.module.css";

function Search() {
  const [isFocus, setIsFocus] = useState(false);
  const searchRef = useRef();
  const [searchTerm, setSearchTerm] = useState("");
  const location = useLocation();

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
      />

      <div className={styles.spinner}>{searchSVG}</div>

      <div className={styles.results}>hehe</div>
    </div>
  );
}

export default Search;
