import Card from "./Card";
import "../styles/grid.css";
import { useSelector } from "react-redux";

const Grid = () => {
  const products = useSelector((state) => state.productos); //Esto es lo que se tiene que usar

  return (
    <div>
      <div className="contenedor">
        <h1 className="is-size-3 has-text-centered">NEW RELEASES</h1>
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
