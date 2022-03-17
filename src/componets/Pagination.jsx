import { useSelector } from "react-redux";
import GridPagination from "../commons/GridPagination";
import { useState } from "react";
import axios from "axios";

const Pagination = () => {
  let products = useSelector((state) => state.productos);
  const [arrCopy, setArrCopy] = useState([]);
  const [page, setPage] = useState(1);
  const [pageRender, setPageRender] = useState(0);
  const prodXpag = 12;

  const maxPage = Math.ceil(products.length / prodXpag);

  window.scrollTo(0, 0);

  if (page !== pageRender && products.length) {
    if (page >= maxPage) {
      setArrCopy(products.slice((page - 1) * prodXpag, products.length));
    } else {
      setArrCopy(products.slice((page - 1) * prodXpag, page * prodXpag));
    }
    setPageRender(page);
  }

  const nextPage = () => {
    if (page < maxPage) {
      setPage(page + 1);
    } else {
    }
    if (page >= maxPage) {
      setArrCopy(products.slice((page - 1) * prodXpag, products.length));
    } else {
      setArrCopy(products.slice((page - 1) * prodXpag, page * prodXpag));
    }
  };

  let item = [];
  for (let i = 1; i <= maxPage; i++) {
    item.push(
      <li key={i}>
        <a
          className="pagination-link is-current"
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
      <GridPagination products={arrCopy} title="ALL PRODUCTS" />
      <div className="container">
        <nav
          className="pagination is-rounded"
          role="navigation"
          aria-label="pagination"
        >
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
          </a>

          <ul className="pagination-list">{item}</ul>
        </nav>
      </div>
    </>
  );
};

export default Pagination;
