//import { useSelector } from "react-redux";
import GridPagination from "../commons/GridPagination";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
const PaginationMarca = () => {
  const [productMarca, setProductMarca] = useState([]);
  const marc = useParams();

  useEffect(() => {
    axios
      .get(
        `http://localhost:3001/api/users/search/producto?query=${marc.marca}`
      )
      .then((data) => setProductMarca(data.data));
  }, [marc]);
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
          <a
            className="pagination-previous is-disabled"
            title="This is the first page"
          >
            Previous
          </a>

          <a className="pagination-next">Next page</a>

          <ul className="pagination-list">
            <li>
              <a
                className="pagination-link is-current"
                aria-label="Page 1"
                aria-current="page"
              >
                1
              </a>
            </li>
            <li>
              <a className="pagination-link" aria-label="Goto page 2">
                2
              </a>
            </li>
            <li>
              <a className="pagination-link" aria-label="Goto page 3">
                3
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default PaginationMarca;
