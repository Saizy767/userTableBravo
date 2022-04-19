import { GridColDef } from "@mui/x-data-grid/models";

export interface tableUser {
    id: number,
    firstName: string,
    LastName: string,
    MiddleName: string,
    PersonnelNumber: string,
    Position: string,
    BirthdayDate: Date | string,
    DateOfEmployment: Date | string,
    Description: string
}

export const columns: GridColDef[] = [
    { field: 'id',
      headerName: 'ID',
      width: 90,
      type:'number',
      editable:false,
    },
    {
      field: 'firstName',
      headerName: 'First name',
      width: 120,
      editable:false,
    },
    {
      field: 'MiddleName',
      headerName: 'Middle name',
      width: 120,
      editable:false,
    },
    {
      field: 'LastName',
      headerName: 'Last Name',
      width: 120,
      editable:false,
    },
    {
      field: 'Position',
      headerName: 'Position',
      type: 'string',
      width: 250,
      editable:false,
    },
    {
      field: 'PersonnelNumber',
      headerName: 'Personnel number',
      type: 'string',
      width: 300,
      editable:false,
    },
    {
      field: 'DateOfEmployment',
      headerName: 'Date Of Employment',
      type: 'string',
      width: 170,
      editable:false,
    },
    {
      field: 'BirthdayDate',
      headerName: 'Birthday Date',
      type: 'string',
      width: 170,
      editable:false,
    },
    {
      field: 'Age',
      headerName: 'Age',
      type: 'number',
      width: 90,
      editable:false,
    },
    {
      field: 'Description',
      headerName: 'Description',
      type: 'string',
      width: 200,
      editable:false,
    },
  ];