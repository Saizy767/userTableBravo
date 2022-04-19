import { Link, useNavigate } from "react-router-dom";
import { FC, useCallback, useState } from "react"
import { useForm, SubmitHandler } from "react-hook-form";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";

import {MainStyled , ConteinerStyled , TitleStyled , FormStyled ,
        RegistrationText,
        WritableConteiner} from '../styles/AuthorizationStyle'

import { registrationAPI } from "../store/services/registrationServices";

export interface IFormInput {
    login: string;
    password: any;
  }

export interface IUser {
    login:string,
    password: string,
    id: number,
}

const LoginPage:FC = () => {
    const [isAuth, setIsAuth] = useState(false)
    const [isClicked, setIsClicked] = useState(false)
    const navigate = useNavigate()
    const {data: loginTable, error:errorLogin} = registrationAPI.useFetchAllRegistrationQuery('')

    const { register, handleSubmit, formState:{errors} } = useForm<IFormInput>({mode:'onChange',reValidateMode:'onChange'});

    const sendLogin= useCallback((data: IFormInput)=> {
        try{
            for (let el of loginTable!){
                if(data.login === el.login && data.password === el.password){
                    setIsAuth(true)
                    setIsClicked(true)
                    localStorage.setItem('activated', 'True')
                    localStorage.setItem('name', el.login)
                    navigate('/main')
                    break
                }
                setIsClicked(true) 
                setTimeout(()=>{
                    setIsClicked(false)
                },3000) 
            }
        }
        catch{
            console.log(errorLogin)
        }
    },[navigate, errorLogin, loginTable])
    const onSubmit: SubmitHandler<IFormInput> = useCallback((data) => sendLogin(data),[sendLogin]);

    return(
        <MainStyled >
            {isClicked ? 
                (isAuth ?
                    <Alert severity="success" style={{position:'absolute'}}>Success login</Alert>
                    :<Alert severity="error" style={{position:'absolute'}}>Wrong login or password</Alert> 
            ): ''}
            <ConteinerStyled >
                <WritableConteiner>
                    <TitleStyled >Authorization</TitleStyled >
                    <FormStyled  onSubmit={handleSubmit(onSubmit)}>
                        {errors.login?.type === 'required' ? 
                            <TextField  error
                                        defaultValue="Login"
                                        id="outlined-error-helper-text"
                                        label="Error"
                                        helperText="Incorrect entry."
                                        {...register("login", { required: true })}
                                        style={{marginTop:'5%'}}
                                        />
                                        :<TextField
                                        id="outlined-name"
                                        label="Login"
                                        {...register("login", { required: true })}
                                        style={{margin:'5% 0'}}
                                        />}
                        {errors.password?.type === 'required' ? 
                            <TextField  error
                                        type='password'
                                        id="outlined-error-helper-text"
                                        label="Error"
                                        defaultValue="Password"
                                        helperText="Incorrect entry."
                                        {...register("password", { required: true })}
                                        style={{marginTop:'5%'}}
                                        /> : 
                                        <TextField
                                        type='password'
                                        id="outlined-name"
                                        label="Password"
                                        {...register("password", { required: true })}
                                        style={{margin:'5% 0'}}
                                        />}
                        <Button variant="contained" type='submit'>
                            Login
                        </Button>
                    </FormStyled >
                    <RegistrationText>
                        <Link to='./registrate'>    
                            Registration
                        </Link>
                    </RegistrationText>
                </WritableConteiner>
            </ConteinerStyled >
        </MainStyled >
    )
}

export default LoginPage