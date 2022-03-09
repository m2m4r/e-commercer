import "../styles/cardetail.css";
const CardDetail = () => {
  const product = {
    img: "https://cdn.flightclub.com/2200/TEMPLATE/288272/1.jpg",
    marca: "Air Jordan",
    model: "AIR JORDAN 6 RETRO 'UNC HOME'",
    price: 289,
    description:
      "The Air Jordan 6 Retro 'UNC Home' pays homage to Michael Jordan’s alma mater, bearing a colorway reminiscent of the University of North Carolina. The classic hoops sneakers feature a white leather upper set against University Blue nubuck underlays. Hits of navy appear on the molded TPU heel tab and collar lining. Navy repeats on the midsole, which houses visible Air-sole cushioning. The jock tag on the heel reinforces the shoe’s varsity athletics theme.",
  };

  return (
    <div className="cardetail">
      <div className="foto">
        <img className="fotito" src={product.img} alt="" />
      </div>
      <div className="desc">
        <div className="nose">
          <span>{product.marca}</span>
          <h1>{product.model}</h1>
          <p>{product.description}</p>
        </div>
      </div>
    </div>
  );
};

export default CardDetail;
