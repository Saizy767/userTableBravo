import styled from "styled-components";

export const MainStyled = styled.main`
  position: absolute;
  width: 100%;
  height: 100%; 
  display: flex;
  justify-content: center;
  background-color: rgb(177, 177, 177);
`;
export const ConteinerStyled  = styled.div`
    position: relative;
    width: 500px;
    height: 450px;
    background-color: rgb(247, 245, 255);
    display: flex;
    flex-direction: column;
    padding: 2% 2%;
    top: 50%;
    transform: translateY(-50%);
    border-radius: 20px;
    @media screen and (max-width:450px){
        width:100%;
        height:100%;
        border-radius: 0;
    }
`;
export const TitleStyled  = styled.h1`
    position: relative;
    text-align: center;
    margin: 5% 0%;
    font-size: 40px;
    @media screen and (min-width:1920px){
        margin:2% 0%
    }
    @media screen and (max-width:450px){
        margin-top:15%;
        font-size: 35px;
    }
`;
export const FormStyled  = styled.form`
    position:relative;
    display:flex;
    flex-direction: column;
`;
export const LabelStyled  = styled.label`
    font-size: 20px;
    margin-top:2%;
`;
export const InputStyled  = styled.div`
    width: 100%;
    margin: 2% 0px;
    height: 35px;
    padding-left: 10px;
    font-size: 25px;
    border-radius: 10px;
`;
export const InputSubmitStyled  = styled.input`
    position: relative;
    width: 50%;
    left: 50%;
    transform: translate(-50%);
    margin-top: 20px;
    padding: 10px 25px;
    border: 2px solid white;
    cursor: pointer;
    border-radius: 5px;
    background-color: rgba(0,0,0,0);
    font-size: 18px;
`;
export const RegistrationText = styled.span`
    position: relative;
    width: 100%;
    margin-top: 20px;
    display: flex;
    justify-content: center;
    font-size: 25px;
`
export const BackButtonStyled  = styled.div`
    position: absolute;
    top:5%;
    left:5%;
    font-size: 20px;
    cursor:pointer;
    display:flex;
    align-items: center;
    z-index:100;
    @media screen and (max-width:450px){
        top:2%;
        left:2%;
        font-size:18px;
    }
`;
export const TextButtonIcon = styled.span`
    position: relative;
    color: black;
    @media screen and (max-width:450px){
        margin-top:2%;
    }
`;
export const WritableConteiner = styled.div`
    position: relative;
    padding: 0% 15%;
`