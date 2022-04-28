import "../styles/cardetail.css";
import { useState, useContext } from "react";
import { SizeContext } from "../context/size";

const ButtonSize = (talle) => {
  const [clase, setClase] = useState("");
  const { setSize } = useContext(SizeContext);

  const selected = (e) => {
    if (clase == "selectedBtn") {
      setClase("notSelect");
      setSize(null);
    } else {
      setClase("selectedBtn");
      setSize(e.target.value);
    }
  };

  return (
    <button
      className={`botons ${clase}`}
      value={talle.talle}
      onClick={selected}
    >
      {talle.talle}
    </button>
  );
};

export default ButtonSize;
