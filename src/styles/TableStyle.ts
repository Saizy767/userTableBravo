import styled from "styled-components";

export const MainStyled = styled.main`
  position: absolute;
  width: 100%;
  justify-content: center;
`;
export const TitleStyled  = styled.h1`
    position: relative;
    text-align: center;
    margin: 2% 0%;
    font-size: 40px;
    @media screen and (max-width:800px){
      margin-top:5%;
      margin-bottom:3%;
    }
    @media screen and (max-width:450px){
      margin-top:15%;
      margin-bottom:5%;
    }
`;
export const LogOutStyled = styled.div`
    position: absolute;
    right: 5%;
    top: 2%;
    font-size: 22px;
    color: rgb(56, 116, 203);
    display:flex;
    z-index: 100;
    &:hover{
      filter: brightness(0.8);
    }
    @media screen and (max-width:600px){
      font-size: 18px;
    }
`
export const LoaderStyled = styled.div`
  position:absolute;
  top: 50%;
  left: 50%;
  margin: -35px 0 0 -35px;  
  border: 16px solid #f3f3f3; /* Light grey */
  border-top: 16px solid #3498db; /* Blue */
  border-radius: 50%;
  width: 120px;
  height: 120px;
  animation: spin 2s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`
export const DataGridBoxStyled = styled.div`
    height: 650px;
    width: 100%;
`
export const DataGridPlaceStyled = styled.div`
  display: flex;
  height: 100%;
`