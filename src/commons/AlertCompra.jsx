const AlertCompra = (display) => {
  console.log(display.display);
  return (
    <div
      className="notification"
      style={{
        width: "40vw",
        top: "1rem",
        margin: "0 auto",
        zIndex: "50",
        display: display.display ? "block" : "none",
      }}
    >
      <button className="delete"></button>
      <strong>Producto agregado al carrito</strong>
    </div>
  );
};

export default AlertCompra;
