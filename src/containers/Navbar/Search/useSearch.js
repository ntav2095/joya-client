import useAxios from "../../../hooks/useAxios";
import { useEffect, useState } from "react";
import { debounce } from "debounce";

// chưa handle error
function useSearch({ searchApi, searchTerm }) {
  const [page, setPage] = useState(1);
  const [search, isSearching, data, error, resetSearch] = useAxios();
  const [results, setResults] = useState(null);

  const searchNext = () => {
    setPage((prev) => prev + 1);
  };

  // search lần đầu:
  // user nhập search term và nhấn enter
  const searchFirstTime = debounce((text) => {
    setPage(1);
    setResults(null);
    search(searchApi({ search: text })); // không set page tức là page = 1 (server handle việc này)
  }, 300);

  // khi user thay đổi search term
  useEffect(() => {
    // nếu thay đổi search term thì search lần đầu
    if (searchTerm.trim()) {
      searchFirstTime(searchTerm);
      return () => searchFirstTime.clear();
    }

    // nếu xóa hết search term thì xóa hết data
    if (!searchTerm.trim()) {
      resetSearch();
      setResults(null);
    }
  }, [searchTerm]);

  // khi page thay đổi và > 1 thì search tiếp
  useEffect(() => {
    if (searchTerm && page > 1) {
      search(searchApi({ search: searchTerm, page }));
    }
  }, [page]);

  // fetched được data thì push/thêm vô mảng kết quả
  // tùy vào search từ đầu hay search tiếp mà push hoặc set
  useEffect(() => {
    if (data) {
      // nếu results là null => search lần đầu => set data
      if (!results) {
        setResults(data.data);
      } else {
        // nếu results !== null => search lần 2,3... => push data
        setResults((prev) => [...prev, ...data.data]);
      }
    }
  }, [data]);

  const total = data?.metadata.total_count;
  const count = results?.length;
  const hasMore = data?.metadata.has_more;

  return [results, isSearching, searchNext, count, total, hasMore, error];
}

export default useSearch;
