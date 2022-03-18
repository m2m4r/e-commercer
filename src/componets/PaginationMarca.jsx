//import { useSelector } from "react-redux";
import GridPagination from "../commons/GridPagination";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
const PaginationMarca = () => {
  const [productMarca, setProductMarca] = useState([]);
  const marc = useParams();
  const [page, setPage] = useState(1);
  const [pageRender, setPageRender] = useState(0);
  const prodXpag = 12;

  const maxPage = Math.ceil(productMarca.length / prodXpag);

  window.scrollTo(0, 0);

  useEffect(() => {
    axios
      .post(`/api/users/productos/search?query=${marc.marca}`)
      .then(async (data) => {
        setProductMarca(data.data);
      });
  }, [marc.marca]);

  if (page !== pageRender && productMarca.length) {
    if (page >= maxPage) {
      setProductMarca(
        productMarca.slice((page - 1) * prodXpag, productMarca.length)
      );
    } else {
      setProductMarca(
        productMarca.slice((page - 1) * prodXpag, page * prodXpag)
      );
    }
    setPageRender(page);
  }

  const nextPage = () => {
    if (page < maxPage) {
      setPage(page + 1);
    } else {
    }
    if (page >= maxPage) {
      setProductMarca(
        productMarca.slice((page - 1) * prodXpag, productMarca.length)
      );
    } else {
      setProductMarca(
        productMarca.slice((page - 1) * prodXpag, page * prodXpag)
      );
    }
  };

  let item = [];
  for (let i = 1; i <= maxPage; i++) {
    item.push(
      <li key={i}>
        <a
          className={
            i == page ? "pagination-link is-current" : "pagination-link"
          }
          aria-label="Page 1"
          aria-current="page"
          onClick={() => {
            setPage(i);
          }}
        >
          {i}
        </a>
      </li>
    );
  }
  return (
    <>
      <GridPagination
        products={productMarca}
        title={marc.marca.toUpperCase().replace("&", " ")}
      />
      <div className="container">
        <nav
          className="pagination is-rounded"
          role="navigation"
          aria-label="pagination"
        >
          {maxPage > 1 ? (
            <>
              {" "}
              <a
                className="pagination-previous is-disabled"
                title="This is the first page"
                onClick={() => {
                  if (page > 1) {
                    setPage(page - 1);
                  } else {
                    setPage(1);
                  }
                }}
              >
                Previous
              </a>
              <a className="pagination-next" onClick={nextPage}>
                Next page
              </a>{" "}
            </>
          ) : (
            ""
          )}

          <ul className="pagination-list">{item}</ul>
        </nav>
      </div>
    </>
  );
};

export default PaginationMarca;
