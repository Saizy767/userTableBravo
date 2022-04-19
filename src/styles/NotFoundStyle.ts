import styled from "styled-components";

export const TitleStyled= styled.h1`
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    font-size: 60px;
    width: 100%;
    text-align: center;
    @media screen and (max-width:450px){
        padding: 0% 10%;
        font-size:50px;
    }
`