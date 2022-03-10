import "../styles/card.css";
const Card = (product) => {
  return (
    <li className="card">
      <img
        src={product.product.img}
        alt={product.product.model}
        className="cardImage"
        width={270}
        height={345}
      />
      <p>{product.product.marca}</p>

      <h3>{product.product.model}</h3>
    </li>
  );
};

export default Card;
