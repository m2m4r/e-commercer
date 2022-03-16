import "../styles/card.css";
import { ProductContext } from "../context/product";
import { useContext } from "react";
import { useNavigate } from "react-router";

const Card = (product) => {
  const { setProducto } = useContext(ProductContext);
  const navigate = useNavigate();
  const productClick = () => {
    setProducto(product.product);
    navigate(`/detail/${product.product.id}`);
  };
  return (
    <li className="card" onClick={productClick}>
      <img
        src={product.product.image_url[0]}
        alt={product.product.model}
        className="cardImage"
        width={270}
        height={345}
      />
      <p>{product.product.marca}</p>

      <h3>{product.product.modelo}</h3>
    </li>
  );
};

export default Card;
