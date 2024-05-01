import { createSlice } from "@reduxjs/toolkit"

export interface DataState {
    loading: boolean
    loadingMore: boolean
    data: any
    shownData: any
    error: string
    offset: number

    // Fillter

    roles: string[]
    noOfEmployees: string[]
    experience?: number
    remote: string[]
    techStack: string[]
    minSalary: string
    companyName: string
}

const inistialState: DataState = {
    loading: false,
    loadingMore: false,
    data: [],
    shownData: [],
    error: "",
    offset: 0,

    // Filter
    roles: [],
    noOfEmployees: [],
    experience: undefined,
    remote: [],
    techStack: [],
    minSalary: "",
    companyName: ""
}

const dataSlice = createSlice({
    name: "data",
    initialState: inistialState,
    reducers: {
    },
    extraReducers: (builder) => {

    }
})



export default inistialState