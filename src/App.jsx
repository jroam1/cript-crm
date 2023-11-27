import { useEffect, useState } from 'react'
import styled from "@emotion/styled"
import Form from "./components/Form"
import Result from './components/Result'
import Spinner from './components/Spinner'
import ImagenCripto from './assets/imagen-criptos.png'

const Contenedor = styled.div`
  max-width:900px;
  margin: 0 auto;
  width:90%;
  @media (min-width: 992px) {
    display:grid;
    grid-template-columns: repeat(2,1fr);
    column-gap: 2rem;
  }
`
const Heading = styled.h1`
  font-family: 'Lato', sans-serif;
  color: #FFF;
  text-align: center;
  font-weight: 700;
  margin-top: 80px;
  margin-bottom: 50px;
  font-size: 34px;

  &::after {
    content: '';
    width: 100px;
    height: 6px;
    background-color: #66A2FE;
    display: block;
    margin: 10px auto 0 auto
  }
`
const Imagen = styled.img`
  max-width: 400px;
  width: 80%;
  margin: 100px auto 0 auto;
  display: block;
`
// Se pueden usar igualmente elementos HTML vacíos. Los styled
// útiles para dar estilos a elementos particulares del componente

function App() {
  const [ coin_selected, set_selectedCoin ] = useState({})
  const [ price, setPrice ] = useState({})
  const [ loading, setLoading ] = useState(false)

  useEffect(()=>{
    if (Object.keys(coin_selected).length > 0){
      const {coins_state, cripto_state} = coin_selected
    
      const getCoinPrice = async () => {
        setLoading(true)
        setPrice({})
        // Petición para recuperar el precio
        // const url = `https://min-api.cryptocompare.com/data/price?fsym=${cripto_state}&tsyms=${coins_state}`
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cripto_state},ETH&tsyms=${coins_state}`
        const response = await fetch(url)
        const response_price = await response.json()
        setPrice(response_price.DISPLAY[cripto_state][coins_state])
        setLoading(false)
      }
      getCoinPrice()
    }
  }, [coin_selected])

  return (
    <>
      <Contenedor>
        <Imagen
          src={ImagenCripto} 
          alt="Criptomonedas"
        ></Imagen>
        <div>
          <Heading>Cotiza Criptomonedas al Instante</Heading>
          <Form 
            set_selectedCoin={set_selectedCoin}
          />
          {loading && <Spinner/>}          
          {price.PRICE && <Result result={price}/>}
        </div>
      </Contenedor>
    </>
  )
}

export default App
