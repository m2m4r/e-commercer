import { Routes, Route } from "react-router";
import Navbar from "./componets/Navbar";
//import Grid from "./commons/Grid";

/* Renderizado condicional, admin y carrito si no hay un User loggeado */

function App() {
  return (
    <div className="App">
      <Navbar/>
      {"Navbar"}
      {/* <Grid /> EL grid queda aca de prueba hasta que este el home component */}
      {"Footer re cheto"}
      </div>
    
  );
}

export default App;


/*
Las routes quedan aca hasta que estén listos los componentes a renderizar 
<Routes>
        <Route path="/home" element={"home"} />
        <Route path="/register" element={"register"} />
        <Route path="/login" element={"login"} />
        <Route path="/admin" element={"admin"} />
        <Route path="/cart" element={"cart"} />

        <Route path="/sku" element={"productCard"} />
</Routes>
*/
