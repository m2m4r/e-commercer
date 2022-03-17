import Grid from "../commons/Grid";
import { useSelector } from "react-redux";
const Home = () => {
  const products = useSelector((state) => state.productos); //Esto es lo que se tiene que usar
  const masVendidos = products.filter(
    (p) => p.categorias.length && p.categorias[0].cat == "Mas Vendidos"
  );

  const newReleases = products.filter((p) => !p.categorias.length).slice(0, 8);

  const airJordan = products.filter((p) => p.marca == "Air Jordan").slice(0, 8);

  return (
    <main>
      <div>
        <img src="https://cms-cdn.flightclub.com/3500/7b7aae73d570-e878-ce11-29c9-0db74c95.jpg" />
      </div>

      <Grid products={newReleases} title="NEW RELEASES" />

      <Grid products={masVendidos} title="TRENDING" />

      <Grid products={airJordan} title="AIR JORDAN" />
    </main>
  );
};
export default Home;
