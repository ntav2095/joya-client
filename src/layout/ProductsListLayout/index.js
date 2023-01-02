import styles from "./ProductsListLayout.module.css";
import Container from "../../components/Container";
import CustomPagination from "../../containers/customerPagination";

function ProductsListLayout({
  pagination,
  title,
  filter,
  products,
  placeholder,
  isLoading,
}) {
  const { pageCount, currentPage, changePageHandler } = pagination;
  return (
    <Container>
      <div className={styles.header}>
        <h1>{title}</h1>

        {filter && (
          <div className={styles.filter}>
            <select onChange={filter.changeFilterHandler}>
              {filter.filterList.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      <div className="row">
        {products &&
          !isLoading &&
          products.length > 0 &&
          products.map(({ component, id }) => (
            <div
              key={id}
              className={
                styles.product + " col-12 col-sm-6 col-md-4 col-lg-3 mb-4"
              }
            >
              {component}
            </div>
          ))}

        {(!products || isLoading) &&
          new Array(18).fill(1).map((item, index) => (
            <div key={index} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
              {placeholder}
            </div>
          ))}
      </div>

      {products && (
        <CustomPagination
          total={pageCount}
          pagenumber={currentPage}
          callback={changePageHandler}
        />
      )}
    </Container>
  );
}

export default ProductsListLayout;
