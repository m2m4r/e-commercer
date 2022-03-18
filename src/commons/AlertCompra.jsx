import { useSelector } from "react-redux";
const AlertCompra = ({ display }) => {
  const user = useSelector((state) => state.user);

  return (
    <div
      className="notification as-text-centred"
      style={{
        width: "40vw",
        top: "1rem",
        margin: "0 auto",
        zIndex: "50",
        display: display.display ? "block" : "none",
      }}
    >
      <button
        className="delete"
        onClick={() => {
          display.setDisplay(false);
        }}
      ></button>
      <strong>
        {user.id
          ? "Producto agregado al carrito"
          : "Debes loguearte para añadir tu compra al carrito"}
      </strong>
    </div>
  );
};

export default AlertCompra;
//display: display.display ? "block" : "none",
