import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { JobList, fetchJobResolver } from "./dataAPI"

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


export const fetchDataAsync = createAsyncThunk(
    'data/fetchDataAsync',
    async ({ limit, offset }: { limit: number, offset: number }): Promise<JobList> => {
        const response = await fetchJobResolver(limit, offset)
        return response
    }
)


const dataSlice = createSlice({
    name: "data",
    initialState: inistialState,
    reducers: {
        
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchDataAsync.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchDataAsync.fulfilled, (state, action) => {
                state.loading = false
                state.data = state.data.concat(action.payload.jdList)
            })
            .addCase(fetchDataAsync.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message!
            })
    }
})



export default inistialState