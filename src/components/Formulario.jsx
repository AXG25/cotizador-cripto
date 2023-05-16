import styled from "@emotion/styled";
import useSelectMonedas from "../hooks/useSelectMonedas";
import { MONEDAS } from "../data/monedas";
import { useEffect, useState } from "react";
import Errores from "./Error";
const Boton = styled.input`
  background-color: #9497ff;
  border: none;
  width: 100%;
  padding: 10px;
  color: #fff;
  font-weight: 700;
  font-size: 20px;
  border-radius: 5px;
  text-transform: uppercase;
  transition: background-color 0.3s ease;
  margin-top: 30px;

  &:hover {
    cursor: pointer;
    background-color: #7a7dfe;
  }
`;

const Formulario = ({setMonedas}) => {
  const [criptos, setCriptos] = useState([]);
  const [error, setError] = useState(false);

  const [moneda, SelectMonedas] = useSelectMonedas("Elige tu Moneda", MONEDAS);
  const [criptomoneda, SelectCriptomoneda] = useSelectMonedas(
    "Elige tu Cripto Moneda",
    criptos
  );

  useEffect(() => {
    const consultarAPI = async () => {
      const url =
        "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD";
      const respuesta = await fetch(url);
      const resultado = await respuesta.json();

      const arrayCriptos = resultado.Data.map((cripto) => {
        const obj = {
          id: cripto.CoinInfo.Name,
          nombre: cripto.CoinInfo.FullName,
        };
        return obj;
      });
      setCriptos(arrayCriptos);
    };
    consultarAPI();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if ([moneda, criptomoneda].includes("")) {
      setError(true);
      return;
    }
    setError(false);
    setMonedas({moneda, criptomoneda})
  };

  return (
    <>
      {error && <Errores>todos los campos son obligatorios</Errores>}
      <form onSubmit={handleSubmit}>
        <SelectMonedas />
        <SelectCriptomoneda />
        <Boton type="submit" value="Cotizar" />
      </form>
    </>
  );
};

export default Formulario;
