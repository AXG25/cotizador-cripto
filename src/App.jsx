import styled from "@emotion/styled";
import ImagenCripto from "./assets/imagen-criptos.png";
import Formulario from "./components/Formulario";
import { useEffect, useState } from "react";
import Resultado from "./components/Resultado";
import Spinner from "./components/Spinner";

const Contenedor = styled.div`
  max-width: 900px;
  margin: 0 auto;
  width: 90%;
  padding: 40px;
  box-shadow: 20px 40px 40px rgba(0, 0, 0, 0.2);
  @media (min-width: 992px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
    border: 2px solid gold;
    border-radius: 8px;
    margin: 40px auto;
  }
`;

const Imagen = styled.img`
  max-width: 400px;
  width: 80%;
  margin: 0 auto 0 auto;
  display: block;
`;

const Heading = styled.h1`
  font-family: "Lato", sans-serif;
  color: #fff;
  text-align: center;
  font-weight: 700;
  margin-bottom: 50px;
  font-size: 30px;

  &::after {
    content: "";
    width: 100px;
    height: 6px;
    background-color: #66a2fe;
    display: block;
    margin: 10px auto 0 auto;
  }
`;

function App() {

  const [monedas, setMonedas] = useState({});
  const [resultado, setResultado] = useState({});
  const [cargando, setCargando] = useState(false);




  useEffect(() => {
    if (Object.keys(monedas).length === 0) return;
    const cotizarCripto = async () => {
      setCargando(true);
      setResultado({});
      const { moneda, criptomoneda } = monedas;
      const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;
      const respuesta = await fetch(url);
      const resultado = await respuesta.json();
      setResultado(resultado.DISPLAY[criptomoneda][moneda]);
      setCargando(false);
    }
    cotizarCripto();
  }, [monedas]);

  return (
    <Contenedor>
      <Imagen src={ImagenCripto} alt="imagen cripto" />
      <div>
        <Heading>Cotiza Criptos al Instante</Heading>
        <Formulario setMonedas={setMonedas} />
        {cargando && <Spinner />}
        {resultado.PRICE && <Resultado resultado={resultado} />}
      </div>
    </Contenedor>
  );
}

export default App;
