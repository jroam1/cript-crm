import styled from "@emotion/styled"

const ResultDiv = styled.div`
    color: #FFFF;
    font-family: 'Lato', sans-serif;

    display: flex;
    align-items: start;
    gap: 1rem;
    margin-top: 30px; 
`

const ImgResult = styled.img`
    display: block;
    width: 150px;
`

const ResultText = styled.p`
    font-size: 18px;
    span {
        font-weight: 700;
    }
`

const ResultPrice = styled.p`
    font-size: 24px;
    span {
        font-weight: 700;
    }
`

function Result({result}) {
    const { PRICE, HIGHDAY, LOWDAY, CHANGEPCT24HOUR, IMAGEURL, LASTUPDATE} = result
    console.log(IMAGEURL)
    return (
        <ResultDiv>
            <ImgResult src={`https://cryptocompare.com/${IMAGEURL}`} alt="imagen cripto" />
            <div>
                <ResultPrice>El precio es de: <span>{PRICE}</span></ResultPrice>
                <ResultText>Precio más alto del día: <span>{HIGHDAY}</span></ResultText>
                <ResultText>Precio más bajo del día: <span>{LOWDAY}</span></ResultText>
                <ResultText>Variación últimas 24 horas: <span>{CHANGEPCT24HOUR}</span></ResultText>
                <ResultText>Última actualización: <span>{LASTUPDATE}</span></ResultText>
            </div>
        </ResultDiv>
    )
}

export default Result
