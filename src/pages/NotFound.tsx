import { FC, useEffect } from "react";
import { useNavigate } from "react-router";
import { TitleStyled } from "../styles/NotFoundStyle";

interface Props{
    text: string
}
const NotFound: FC<Props> = ({text}) => {
    const navigation = useNavigate()
    useEffect(()=>{
        if (localStorage.length && text === 'Please, login to open user table'){
            window.location.reload()
        }
        setTimeout(()=> navigation('/'), 3000)
    },[text, navigation])
    return(
        <TitleStyled>{text}</TitleStyled>
    )
}
export default NotFound