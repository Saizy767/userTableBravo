import {FC, useCallback, useRef} from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import TextField from '@mui/material/TextField'
import { Button } from '@mui/material'

import {TiDelete} from 'react-icons/ti'

import { FormStyled } from '../styles/AuthorizationStyle'
import { AlertBackIcon, AlertButtonStyled, AlertTableStyled, 
        AlertTitleStyled, AlertUlStyled } from '../styles/AddingAlert'
        
import { useTypedDispatch } from '../hooks/useTypedDispatch'
import { useOutsideAlerter } from '../hooks/useOutsideAlerter'

import { setVisisbleEditAlert } from '../store/reducers/EditAlertOpenerSlice'
import { userAPI } from '../store/services/userServices'

import { Array } from '../dataLayouts/AddingAlert'
import { tableUser } from '../dataLayouts/TableColumns'

interface EditAlert{
    SelectedRow: tableUser
}
const RedactionAlert:FC<EditAlert> = ({SelectedRow}) =>{
    const dispatch = useTypedDispatch()
    const { register, handleSubmit } = useForm();
    const AddingEditRef = useRef(null)
    useOutsideAlerter(AddingEditRef, setVisisbleEditAlert)
    const [updateUser] = userAPI.usePutUsersMutation()

    //set Age and ID by birthDay and binarySearch
    const onSubmit: SubmitHandler<any> = useCallback(async(data) => {
        let today = new Date();
        let birthDate = new Date(data.BirthdayDate);
        let age = today.getFullYear() - birthDate.getFullYear();
        let m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        data = {...data,'Age': age, 'id': SelectedRow.id}
        await updateUser(data)
        dispatch(setVisisbleEditAlert(false))
    },[dispatch, SelectedRow, updateUser])

    const handleIconClick = useCallback(()=>{
        dispatch(setVisisbleEditAlert(false))
    },[dispatch])

    return(
        <AlertTableStyled ref={AddingEditRef}>
            <AlertBackIcon onClick={handleIconClick}>
                <TiDelete style={{position:'relative', height:'100%', width:'100%'}}/>
            </AlertBackIcon>
            <AlertTitleStyled>EDIT USER</AlertTitleStyled>
            <FormStyled  onSubmit={handleSubmit(onSubmit)}>
            <AlertUlStyled>
                {Array.map((el)=>{
                    return(
                        <li key={el.id}> 
                            <TextField
                                id="outlined-name"
                                type={el.type}
                                label={el.label}
                                defaultValue={(SelectedRow)[el.register as keyof tableUser]}
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
                        type='submit'>
                        Add user
                </Button>
            </AlertButtonStyled>
            </FormStyled>
        </AlertTableStyled>
    )
}

export default RedactionAlert