import {FC, useCallback, useState} from 'react'
import { Link } from 'react-router-dom';

import { DataGrid, GridSelectionModel} from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';

import {ImExit} from 'react-icons/im'
import {GoTrashcan} from 'react-icons/go'
import {AiOutlinePlus} from 'react-icons/ai'
import {BsPencilSquare} from 'react-icons/bs'

import { useTypedDispatch } from '../hooks/useTypedDispatch';
import { useTypedSelector } from '../hooks/useTypedSelector';

import { setMissingId } from '../store/reducers/findIDSlice';
import { setVisisbleEditAlert } from '../store/reducers/EditAlertOpenerSlice';
import { setVisisbleAddingAlert } from '../store/reducers/AddingAlertOpenerSlice';
import { allTableUser, userAPI } from '../store/services/userServices';

import AddingAlert from '../components/AddingAlert'
import RedactionAlert from '../components/RedactionAlert';

import { columns, tableUser } from '../dataLayouts/TableColumns';

import { DataGridBoxStyled, DataGridPlaceStyled,
         LoaderStyled, LogOutStyled, MainStyled,
         TitleStyled } from '../styles/TableStyle';

const TablePage: FC = ()=>{
    const [errorDontChoiceUser, setErrorDontChoiceUser] = useState<boolean>(false)
    const [errorManyChoiceUsers, setErrorManyChoiceUsers] = useState<boolean>(false)
    const [deletedRows, setDeletedRows] = useState<tableUser[]>([]);

    const dispatch = useTypedDispatch()
    const {AddingValue} = useTypedSelector(state => state.openAddingAlert)
    const {editValue} = useTypedSelector(state=>state.openEditAlert)

    const {data: tableData, isLoading, error} = userAPI.useFetchAllUsersQuery('')
    const [deleteUser] = userAPI.useDeleteUsersMutation()

    //finding ID that was deleted and now not in array
    const binarySearch = useCallback((array: Array<tableUser>)=>{
      let start = 0
      let begin = 0
      let end = array!.length - 1

      if( array[end].id === array!.length){
        return dispatch(setMissingId(array[end].id + 1))
      }
      else if(array[start].id !== 1){
        return dispatch(setMissingId(array[start].id - 1))
      }
      else{
        while (begin <= end){
          let middle = Math.floor((begin + end) / 2)
          if(array.slice(begin,middle).length === 0){
            return dispatch(setMissingId(Number((array[middle].id) + 1)))
          }
          else if (array.slice(start,middle).length === Number(array[middle].id) - 1){
            begin = middle
          }
          else if (array.slice(begin,end).length === 1){
            return dispatch(setMissingId(Number(array.slice(begin, end)[0].id) + 1))
          }
          else{
            end = middle
          }
        }
      }},[dispatch])
 
    const handleRowSelection = useCallback((ids:GridSelectionModel) => {
      const selectedIDs = new Set(ids);
      setDeletedRows(tableData!.filter((el) =>selectedIDs.has(el.id)))
    },[tableData])

    const handlePurge = useCallback(() => {
      if (deletedRows.length < 1){
        setErrorDontChoiceUser(true)
          setTimeout(()=>{
            setErrorDontChoiceUser(false)
          },3000)
      }
      deletedRows.forEach((el) => {
        deleteUser(el as allTableUser)
      })
    },[deletedRows, deleteUser])

    const handleAddingAlert = useCallback(()=>{
      if (!editValue){
        dispatch(setVisisbleAddingAlert(true))
        binarySearch(tableData!)
      }
    },[tableData, binarySearch, dispatch, editValue])

    const handleRedactionAlert = useCallback(()=>{
      if (deletedRows.length === 1 && !AddingValue){
        dispatch(setVisisbleEditAlert(true))
      }
      else if(deletedRows.length < 1){
        setErrorDontChoiceUser(true)
        setTimeout(()=>{
          setErrorDontChoiceUser(false)
        },3000)
      }
      else if(deletedRows.length > 1){
        setErrorManyChoiceUsers(true)
        setTimeout(()=>{
          setErrorManyChoiceUsers(false)
        },3000)
      }
    },[deletedRows, dispatch, AddingValue])

    return(
        <MainStyled style={{height: isLoading ? '100%': ''}}>
          <Link to='/' onClick={()=> localStorage.clear()}>
            <LogOutStyled>
              <ImExit style={{position:'relative', height:'100%', width:'auto',marginRight:'5px'}}/>
              LogOut
            </LogOutStyled>
          </Link>
          {errorDontChoiceUser && <Alert severity="error" style={{position:'absolute'}}>
                                    Select a user
                                  </Alert>}
          {errorManyChoiceUsers && <Alert severity="error" style={{position:'absolute'}}>
                                      You select more than one user
                                    </Alert>}
                <TitleStyled>{error ? 'ERROR' : 'TABLE'}</TitleStyled>
                {isLoading ? <LoaderStyled/> : 
                <>
                <div>
                  <Button variant="contained" color="primary" onClick={handlePurge}
                          style={{marginRight:'5px'}}>
                    <GoTrashcan/>
                  </Button>
                  <Button variant="contained" color="primary" onClick={handleAddingAlert}
                          style={{marginRight:'5px'}}>
                    <AiOutlinePlus/>
                  </Button>
                  <Button variant="contained" color="primary" onClick={handleRedactionAlert}
                          style={{marginRight:'5px'}}>
                    <BsPencilSquare/>
                  </Button>
                </div>
                <DataGridPlaceStyled>
                    <DataGridBoxStyled>
                        <DataGrid
                            rows={tableData ? tableData : []}
                            columns={columns}
                            pageSize={10}
                            rowsPerPageOptions={[10]}
                            checkboxSelection
                            disableSelectionOnClick
                            onSelectionModelChange={handleRowSelection}
                        />
                    </DataGridBoxStyled>
                </DataGridPlaceStyled>
                </>}
                {AddingValue && <AddingAlert/>}
                {editValue && <RedactionAlert SelectedRow={deletedRows[0]}/>}
        </MainStyled>
    )
}

export default TablePage