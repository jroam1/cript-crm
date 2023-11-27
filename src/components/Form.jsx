import styled from "@emotion/styled"
import { useEffect, useState } from "react"
import Error from "./Error"
import useSelectCoins from "../hooks/useSelectCoins"
import { coins } from "../data/coins"

const InputSubmit = styled.input`
    background-color: #9497FF;
    border: none;
    width: 100%;
    padding: 10px;
    color: #FFF;
    font-weight: 700;
    text-transform: uppercase;
    font-size: 20px;
    border-radius: 5px;
    margin-top: 30px;
    transition: background-color .3s ease;

    &:hover {
        background-color: #7A7DFE;
        cursor: pointer;
    }
`

const Form = ({set_selectedCoin}) => {
    const [criptos, setCriptos] = useState([])
    const [error, setError] = useState(false)

    // Hooks personalizados
    const [ coins_state, SelectCoins ] = useSelectCoins('Elige tu moneda', coins);
    const [ cripto_state, SelectCripto ] = useSelectCoins('Elige tu criptomoneda', criptos);

    useEffect (() => {
        const consultAPI = async () => {
            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD'
            const response = await fetch(url)
            const cripto_elements = await response.json()

            const array_criptos = cripto_elements.Data.map( cripto => {
                const object_cripto = {
                    id: cripto.CoinInfo.Name,
                    name: cripto.CoinInfo.FullName
                }
                return object_cripto
            })
            setCriptos(array_criptos)
        }
        consultAPI()
    }, [])
    
    const handleSubmit = e => {
        e.preventDefault()
        
        if ([coins_state, cripto_state].includes('')){
            setError(true)
            return
        }
        setError(false)
        set_selectedCoin({
            coins_state,
            cripto_state
        })
    }

    return (
        <>
            {error && <Error>Todos los campos son obligatorios</Error>}
            <form
                onSubmit={handleSubmit}
            >
                <SelectCoins/>
                <SelectCripto/> 
                <InputSubmit type="submit" value="Cotizar"/>
            </form>
        </>
    )
}

export default Form
