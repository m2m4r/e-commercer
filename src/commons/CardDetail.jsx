import "../styles/cardetail.css";
import { ProductContext } from "../context/product";
import { useContext } from "react";
import ButtonSize from "./ButtonSize";
import userReducer from "../states/usario";

const CardDetail = () => {
  const { producto, setProducto } = useContext(ProductContext);

  return (
    <div className="cardetail">
      <div className="foto">
        <img className="fotito" src={producto.image_url} alt="" />
      </div>
      <div className="desc">
        <div className="nose">
          <span>{producto.marca}</span>
          <h1>{producto.modelo}</h1>
          <div className="gridButton">
            {producto.inventarios.map((t, i) => (
              <ButtonSize key={i} talle={t.talle} />
            ))}
          </div>

          <div>
            <h3>Precio ${producto.price}</h3>
            <button className="boton"> Añadir al Carrito</button>
          </div>
          <p>{producto.descripcion}</p>
        </div>
      </div>
    </div>
  );
};

export default CardDetail;
