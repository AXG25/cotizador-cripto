import styled from "@emotion/styled"

const Errores = styled.div`
    background-color: #ff5c5cd6;
    color: white;
    padding: 15px;
    margin-bottom: 2rem;
    text-align: center;
    font-size: 20px;
    text-transform: uppercase;
    font-weight: 700;
    border-radius: 5px;
    font-family: 'Lato', sans-serif;

`


const Error = ({children}) => {
  return (
    <Errores>
      {children}
    </Errores>
  )
}

export default Error
