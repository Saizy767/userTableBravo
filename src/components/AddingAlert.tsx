import {FC, useCallback, useRef} from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import TextField from '@mui/material/TextField'
import { Button } from '@mui/material'

import {TiDelete} from 'react-icons/ti'

import { FormStyled } from '../styles/AuthorizationStyle'
import { AlertBackIcon, AlertButtonStyled, AlertTableStyled, 
        AlertTitleStyled, AlertUlStyled } from '../styles/AddingAlert'

import { Array } from '../dataLayouts/AddingAlert'

import { useTypedSelector } from '../hooks/useTypedSelector'
import { useTypedDispatch } from '../hooks/useTypedDispatch'
import { useOutsideAlerter } from '../hooks/useOutsideAlerter'

import { setVisisbleAddingAlert } from '../store/reducers/AddingAlertOpenerSlice'
import { allTableUser, userAPI } from '../store/services/userServices'


const AddingAlert:FC = () =>{
    const {value} = useTypedSelector(state => state.missingID)
    const dispatch = useTypedDispatch()
    const AddingAlertRef = useRef(null)

    const { register, handleSubmit } = useForm();
    const [createUser] = userAPI.usePostUsersMutation()
    
    useOutsideAlerter(AddingAlertRef, setVisisbleAddingAlert)
    //set Age and ID by birthDay(binarySearch)
    const onSubmit: SubmitHandler<any> = useCallback(async(data: allTableUser) => {
        let today = new Date();
        let birthDate = new Date(data.BirthdayDate);
        let age = today.getFullYear() - birthDate.getFullYear();
        let m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        data = {...data,'Age': age, 'id': value}
        await createUser(data)
        dispatch(setVisisbleAddingAlert(false))
    },[value, dispatch, createUser])

    const handleIconClick = useCallback(()=>{
        dispatch(setVisisbleAddingAlert(false))
    },[dispatch])

    return(
        <AlertTableStyled ref={AddingAlertRef}>
            <AlertBackIcon onClick={handleIconClick}>
                <TiDelete style={{position:'relative', height:'100%', width:'100%'}}/>
            </AlertBackIcon>
            <AlertTitleStyled>ADDING USER</AlertTitleStyled>
            <FormStyled  onSubmit={handleSubmit(onSubmit)}>
            <AlertUlStyled>
                {Array.map((el)=>{
                    return(
                        <li key={el.id}> 
                            <TextField
                                id="outlined-name"
                                type={el.type}
                                label={el.label}
                                {...register(`${el.register}`, { required: true })}
                                style={{margin:'3% 1%'}}
                                sx={{ width: 220 }}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </li>
                    )
                })}
            </AlertUlStyled>
            <AlertButtonStyled>
                <Button variant="contained" 
                        color="success"
                        type='submit'
                        >
                        Add user
                </Button>
            </AlertButtonStyled>
            </FormStyled>
        </AlertTableStyled>
    )
}

export default AddingAlert

