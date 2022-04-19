import { Link }from "react-router-dom"
import { FC, useCallback, useState } from "react"
import { useForm, SubmitHandler } from "react-hook-form";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";

import {MdDoubleArrow} from 'react-icons/md'

import {MainStyled , ConteinerStyled , TitleStyled,
        FormStyled, BackButtonStyled, TextButtonIcon, WritableConteiner} from '../styles/AuthorizationStyle'

import { IFormInput } from "./LoginPage";

import { registrationAPI } from "../store/services/registrationServices";


const RegistrationPage:FC = () => {
    const [isPassword, setIsPassword] = useState('')
    const [repeatPassword, setRepeatPassword] = useState('')
    const [isClicked, setIsClicked] = useState(false)
    const [errorRepeatLogin, setErrorRepeatLogin] = useState(false)
    
    const { register, handleSubmit, formState:{errors} } = useForm<IFormInput>();
    const {data: registrationTable, error:errorRegistration} = registrationAPI.useFetchAllRegistrationQuery('')
    const [postRegistrationUsers] = registrationAPI.usePostRegistrationMutation()

    const sendRegistration= useCallback((data: IFormInput) => {
        try{
            if (registrationTable!.filter((el:IFormInput) => el.login === data.login).length > 0) {
                setErrorRepeatLogin(true)
                setTimeout(()=> setErrorRepeatLogin(false),3000)
            }
            else if(registrationTable!.filter((el:IFormInput) => el.login === data.login).length === 0){
                postRegistrationUsers(data)
                setIsClicked(true)
                setTimeout(()=> setIsClicked(false),3000)
            }
                }
        catch
        {
            return errorRegistration
        }}
        ,[errorRegistration, postRegistrationUsers, registrationTable])

    const onSubmit: SubmitHandler<IFormInput> = data => {
        if((errors.password?.type === 'required') || (isPassword === repeatPassword)){
            sendRegistration(data);
        }}

    const passwordChangeHangler = useCallback(
        (element:React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>)=>{
        setIsPassword(element.target.value)
    },[])

    const repeatPasswordChangeHandler = useCallback(
        (element:React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>)=>{
        setRepeatPassword(element.target.value)
    },[])

    return(
        <MainStyled >
            {errorRepeatLogin ? <Alert severity="error" style={{position:'absolute'}}>
                        This user already exists
                        </Alert> : ''}
            {isClicked ? <Alert severity="success" style={{position:'absolute'}}>
                            Success registration
                        </Alert> : ''}
            <ConteinerStyled>
                <Link to='/'>
                    <BackButtonStyled >
                        <MdDoubleArrow style={{rotate:'180deg', color: 'black'}}/>
                        <TextButtonIcon>Back</TextButtonIcon>
                    </BackButtonStyled >
                </Link>
                <WritableConteiner>
                    <TitleStyled >Registration</TitleStyled >
                    <FormStyled  onSubmit={handleSubmit(onSubmit)}>
                        {errors.login?.type === 'required' ? 
                            <TextField  error
                                        id="outlined-error-helper-text"
                                        label="Error"
                                        defaultValue="Login"
                                        helperText="Incorrect entry."
                                        {...register("login", { required: true })}
                                        style={{marginTop:'5%'}}
                            />:
                            <TextField
                                        id="outlined-name"
                                        label="Login"
                                        {...register("login", { required: true })}
                                        style={{margin:'5% 0'}}
                            />
                        }
                        {errors.password?.type === 'required' 
                            || !(isPassword === repeatPassword) 
                            || !(isPassword === isPassword.replace(/\s/g, ""))? 
                            <TextField  error
                                        type='password'
                                        id="outlined-error-helper-text"
                                        label="Error"
                                        defaultValue="Password"
                                        helperText="Incorrect entry."
                                        value={isPassword} 
                                        onChange={(e)=>passwordChangeHangler(e)} 
                                        style={{marginTop:'5%'}}
                            />: 
                            <TextField  type='password'
                                        id="outlined-name"
                                        label="Password"
                                        {...register("password", { required: true })}
                                        value={isPassword}
                                        onChange={(e)=> passwordChangeHangler(e)}
                                        style={{margin:'5% 0'}}
                            />
                        }
                        {errors.password?.type === 'required'
                            || !(isPassword === repeatPassword)
                            || !(isPassword === isPassword.replace(/\s/g, "")) ? 
                            <TextField  error
                                        type='password'
                                        id="outlined-error-helper-text"
                                        label="Error"
                                        defaultValue="Repeat password"
                                        helperText="Incorrect entry."
                                        value={repeatPassword}
                                        onChange={(e)=> repeatPasswordChangeHandler(e)}
                                        style={{marginTop:'5%'}}
                            /> : 
                            <TextField  type='password'
                                        id="outlined-name"
                                        label="Repeat password"
                                        {...register("password", { required: true })}
                                        value={repeatPassword}
                                        onChange={(e)=> repeatPasswordChangeHandler(e)}
                                        style={{margin:'5% 0'}}
                            />
                        }
                        <Button variant="contained" type='submit'>
                            Registration
                        </Button>
                    </FormStyled >
                </WritableConteiner>
            </ConteinerStyled >
        </MainStyled>
    )
}

export default RegistrationPage