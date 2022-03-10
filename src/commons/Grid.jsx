import Card from "./Card";
import "../styles/grid.css";

const Grid = () => {
  const products = [
    {
      img: "https://cdn.flightclub.com/2200/TEMPLATE/280979/1.jpg",
      marca: "Air Jordan",
      model: "AIR JORDAN 1 RETRO HIGH OG 'DRAK MARINA BLUE'",
      price: 194,
      description:
        "Dressing the legendary silhouette in a classic two-tone color block is the Air Jordan 1 Retro High OG 'Dark Marina Blue.' The upper is all-leather and features a black base with contrasting dark blue overlays along the forefoot, heel, collar, and eyestay. A matching blue Swoosh is complemented by a Jordan Wings logo stamped in black on the lateral collar flap. A woven Nike Air tag on the nylon tongue gives the nod to the shoe's retro cushioning technology, which is an Air-sole unit encapsulated in polyurethane nestled in the heel of the rubber cupsole.",
    },
    {
      img: "https://cdn.flightclub.com/2200/TEMPLATE/288272/1.jpg",
      marca: "Air Jordan",
      model: "AIR JORDAN 6 RETRO 'UNC HOME'",
      price: 289,
      description:
        "The Air Jordan 6 Retro 'UNC Home' pays homage to Michael Jordan’s alma mater, bearing a colorway reminiscent of the University of North Carolina. The classic hoops sneakers feature a white leather upper set against University Blue nubuck underlays. Hits of navy appear on the molded TPU heel tab and collar lining. Navy repeats on the midsole, which houses visible Air-sole cushioning. The jock tag on the heel reinforces the shoe’s varsity athletics theme.",
    },
    {
      img: "https://cdn.flightclub.com/2200/TEMPLATE/286336/1.jpg",
      marca: "Air Jordan",
      model: "AIR JORDAN 1 HIGH OG 'BROTHERHOOD'",
      price: 178,
      description:
        "Inspired by the fraternity Michael Jordan joined while at UNC, Omega Psi Phi, is the Air Jordan 1 High Retro OG 'Brotherhood.' The upper features a white leather quarter panel with nubuck overlays in Light Bordeaux. A University Gold leather toe box is matched by wraparound leather overlays at the collar and heel. A leather Nike Air tag is on the nylon tongue, while a classic Wings logo is stamped on the lateral ankle. The high-top is supported by a rubber cupsole with an Air-sole heel unit in lightweight polyurethane.",
    },
    {
      img: "https://cdn.flightclub.com/2200/TEMPLATE/284019/1.jpg",
      marca: "Air Jordan",
      model: "AIR JORDAN 5 RETRO 'RACER BLUE' ",
      price: 253,
      description:
        "Adding some color to the 1990s silhouette designed by Tinker Hatfield and brought to the public by Mars Blackmon is the Air Jordan 5 Retro 'Racer Blue.' It features a black nubuck upper with tonal TPU eyelets, translucent quarter panel netting and a reflective silver tongue. The mid-top's latter has contrasting touches of royal blue on the embroidered Jumpman and interior lining. The blue polyurethane midsole has lightweight cushioning with black shark tooth detailing and visible Air-sole cushioning in the heel. It rides on a translucent rubber outsole for a better grip.",
    },
    {
      img: "https://cdn.flightclub.com/1000/TEMPLATE/296230/1.jpg",
      marca: "Air Jordan",
      model: "AIR JORDAN 3 RETRO 'CARDINAL RED' ",
      price: 257,
      description:
        "The Air Jordan 3 Retro 'Cardinal Red' features a palette inspired by an iconic colorway of the Air Jordan 7. The sneaker pairs a white tumbled leather upper with Cardinal Red accents on the collar lining, molded eyelets and raised Jumpman branding at the heel. A Jumpman logo embroidered in orange appears on the tongue, with signature elephant print overlays positioned on the forefoot and heel. A two-tone polyurethane midsole with visible Air arrives underfoot.",
    },
    {
      img: "https://cdn.flightclub.com/1000/TEMPLATE/248952/1.jpg",
      marca: "Air Jordan",
      model: "AIR JORDAN 11 RETRO 'COOL GREY' 2021 ",
      price: 225,
      description:
        "Released in December 2021, the Air Jordan 11 Retro 'Cool Grey' 2021 brings back a colorway from 2001 and 2010. Faithful to the OG, the shoe's upper is built with leather, finished in grey and supported by a darker grey patent leather mudguard. Tonal webbing eyelets are worked into the lacing system to secure the fit, while underfoot, a contrasting white phylon midsole houses full-length Air for cushioning, with a carbon fiber plate included for added support. An icy translucent rubber outsole provides traction.",
    },
    {
      img: "https://cdn.flightclub.com/2200/TEMPLATE/254492/1.jpg",
      marca: "Nike",
      model: "DUNK LOW 'BLACK WHITE' ",
      price: 250,
      description:
        "The Dunk Low 'Black White' brings a classic two-tone look to its classic basketball construction. The shoe's low-top build emerges in leather, with a white base contrasted by black overlays, with further black on the Swoosh branding. Perforations on the toe box provide breathability, while underfoot, the two-tone look is matched by the tooling, which incorporates a concentric rubber outsole for traction.",
    },
    {
      img: "https://cdn.flightclub.com/1000/TEMPLATE/272669/1.jpg",
      marca: "Air Jordan",
      model: "AIR JORDAN 1 RETRO HIGH OG 'PATENT BRED' ",
      price: 231,
      description:
        "Featuring a classic mix of hues, the Air Jordan 1 Retro High OG 'Patent Bred' also sports an elevated construction. Built entirely with patent leather, the shoe's upper appears in a familiar mix of black and Varsity Red, with perforations on the toe box offering breathability. Underfoot, a white Air midsole provides cushioning and contrast, giving way to a Varsity Red finish on the concentric rubber outsole, which is included for traction.",
    },
  ];
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
