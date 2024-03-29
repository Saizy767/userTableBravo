
interface AddingArray{
    register: string,
    label: string,
    type: string,
    id:number
}

export const Array :AddingArray[]= [
        {   register: "firstName", 
            label: "First Name",
            type: "text",
            id: 1,
        },
        {   register:"MiddleName",
            label: "Middle Name",
            type: "text",
            id: 2,
        },
        {   register:"LastName",
            label: "Last Name",
            type: "text",
            id: 3,
        },
        {   register:"PersonnelNumber",
            label: "Personnel Number",
            type: "text",
            id: 4,
        },
        {   register:"Position",
            label: "Position",
            type: "text",
            id: 5,
        },
        {   register: "Description",
            label: "Description",
            type: "text",
            id: 6,
        },
        {   register:"BirthdayDate",
            label: "Birthday Date",
            type: "date",
            id: 7,
        },
        {   register:"DateOfEmployment", 
            label: "Date of Employment",
            type: "date",
            id: 8,
        },
    ]