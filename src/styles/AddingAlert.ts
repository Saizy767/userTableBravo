import styled from "styled-components";

export const AlertTableStyled = styled.div`
    z-index: 20;
    position: absolute;
    background-color: rgb(187, 255, 255);
    width: 40%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    @media screen and (max-width:450px){
        width:80%
    }
`
export const AlertTitleStyled = styled.h2`
    position: relative;
    text-align: center;
    margin: 2% 0%;
`
export const AlertUlStyled =styled.ul`
    display: flex;
    flex-flow:wrap;
    list-style:none;
    justify-content:center;
    gap:0.5rem
`
export const AlertButtonStyled = styled.div`
    position: relarive;
    display: flex;
    justify-content: center;
    margin: 5% 0%;
`
export const AlertBackIcon = styled.div`
    width: auto;
    max-height: 32px;
    min-height: 32px;
    right: 5px;
    position: absolute;
    top: 5px;
    max-width: 32px;
    min-width: 32px;
    cursor: pointer;
    z-index: 21;
    &:hover{
        color: #ad2010;
    }
`