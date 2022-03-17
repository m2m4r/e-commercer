import Card from "./Card";
import "../styles/grid.css";

const Grid = ({ products, title }) => {
  return (
    <div>
      <div className="contenedor">
        <h1 className="is-size-3 has-text-centered">{title}</h1>
        <ul className="grid ">
          {products.map((p, i) => (
            <Card product={p} key={i} />
          ))}
        </ul>
      </div>
    </div>
  );
};
export default Grid;
