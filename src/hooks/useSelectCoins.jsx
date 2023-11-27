import { useState } from "react"
import styled from "@emotion/styled"

const LabelCoins = styled.label`
    color: #FFF;
    display: block;
    font-family: 'Lato', sans-serif;
    font-size: 24px;
    font-weight: 700;
    margin: 15px 0;
`
const Select = styled.select`
    width: 100%;
    font-size: 18px;
    padding: 14px;
    border-radius: 10px;
`

const useSelectCoins = (label, options) => {

    const [ state, setState] = useState('')

    const SelectCoins = () => (
        <>
            <LabelCoins>{label}</LabelCoins>
            <Select
                value={ state }
                onChange={e => setState(e.target.value)}
            >
                <option value="">Seleccione</option>
                {options.map(opcion => (
                    <option
                        key={opcion.id}
                        value={opcion.id}
                    >{opcion.name}</option>
                ))}
            </Select>

        </>
    )
    return [ state, SelectCoins ]
}

export default useSelectCoins
